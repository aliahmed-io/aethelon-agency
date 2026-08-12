import { NextRequest } from "next/server";
import { ZodError } from "zod";
import { SubmissionUnavailableError, subscribeEmail } from "../../../server/db";
import {
  createRequestId,
  limitPublicRequest,
  noStoreJson,
  requireSameOrigin,
} from "../_lib/form-security";
import { newsletterInputSchema } from "../_lib/form-schemas";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const requestId = createRequestId();
  const originError = requireSameOrigin(request);
  if (originError) return originError;

  const rateLimitError = limitPublicRequest(request, {
    scope: "newsletter",
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });
  if (rateLimitError) return rateLimitError;

  try {
    const input = newsletterInputSchema.parse(await request.json());
    if (input.middleName) return noStoreJson({ ok: true, created: false });

    const result = await subscribeEmail(input.email);
    return noStoreJson({ ok: true, ...result }, result.created ? 201 : 200);
  } catch (error) {
    if (error instanceof ZodError) {
      return noStoreJson({ error: error.issues[0]?.message ?? "Check your email address and try again." }, 400);
    }

    if (error instanceof SubmissionUnavailableError) {
      console.error(`[newsletter:${requestId}] subscription storage is unavailable`);
      return noStoreJson({ error: "We could not subscribe you right now. Please try again shortly.", requestId }, 503);
    }

    console.error(`[newsletter:${requestId}] subscription failed`, error);
    return noStoreJson({ error: "We could not subscribe you right now. Please try again shortly.", requestId }, 503);
  }
}
