import { NextRequest } from "next/server";
import { ZodError } from "zod";
import { createContactSubmission } from "../../../server/db";
import { noStoreJson, requireSameOrigin } from "../_lib/form-security";
import { contactInputSchema } from "../_lib/form-schemas";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;

  try {
    const input = contactInputSchema.parse(await request.json());
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
    console.error("[contact] submission failed", error);
    return noStoreJson({ error: error instanceof Error ? error.message : "Could not send your note." }, 503);
  }
}
