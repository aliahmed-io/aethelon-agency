import { NextRequest } from "next/server";
import { ZodError } from "zod";
import {
  SubmissionRateLimitError,
  SubmissionUnavailableError,
  createContactSubmission,
} from "../../../server/db";
import {
  createRequestId,
  limitPublicRequest,
  noStoreJson,
  requireSameOrigin,
} from "../_lib/form-security";
import { contactInputSchema } from "../_lib/form-schemas";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const requestId = createRequestId();
  const originError = requireSameOrigin(request);
  if (originError) return originError;

  const rateLimitError = limitPublicRequest(request, {
    scope: "contact",
    limit: 4,
    windowMs: 60 * 60 * 1000,
  });
  if (rateLimitError) return rateLimitError;

  try {
    const input = contactInputSchema.parse(await request.json());

    // Return a success-shaped response to avoid teaching automated submitters
    // which detection rule they triggered.
    if (input.middleName) return noStoreJson({ ok: true, reference: "AET-RECEIVED" }, 201);

    const id = await createContactSubmission({
      name: input.name,
      email: input.email,
      company: input.company || null,
      website: input.website || null,
      focus: input.focus,
      budget: input.budget || null,
      timeline: input.timeline || null,
      description: input.description,
      source: "website-contact",
    });

    return noStoreJson({ ok: true, reference: `AET-${String(id).padStart(6, "0")}` }, 201);
  } catch (error) {
    if (error instanceof ZodError) {
      return noStoreJson({ error: error.issues[0]?.message ?? "Check the project fields and try again." }, 400);
    }

    if (error instanceof SubmissionRateLimitError) {
      return noStoreJson({ error: "Please wait before sending another project note." }, 429, { "Retry-After": "3600" });
    }

    if (error instanceof SubmissionUnavailableError) {
      console.error(`[contact:${requestId}] submission storage is unavailable`);
      return noStoreJson({ error: "We could not send your project note right now. Please try again shortly.", requestId }, 503);
    }

    console.error(`[contact:${requestId}] submission failed`, error);
    return noStoreJson({ error: "We could not send your project note right now. Please try again shortly.", requestId }, 503);
  }
}
