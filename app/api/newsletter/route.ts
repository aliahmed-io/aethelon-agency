import { NextRequest } from "next/server";
import { ZodError } from "zod";
import { subscribeEmail } from "../../../server/db";
import { noStoreJson, requireSameOrigin } from "../_lib/form-security";
import { newsletterInputSchema } from "../_lib/form-schemas";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;

  try {
    const input = newsletterInputSchema.parse(await request.json());
    if (input.middleName) return noStoreJson({ ok: true, created: false });
    const result = await subscribeEmail(input.email);
    return noStoreJson({ ok: true, ...result }, result.created ? 201 : 200);
  } catch (error) {
    if (error instanceof ZodError) {
      return noStoreJson({ error: error.issues[0]?.message ?? "Check your email address and try again." }, 400);
    }
    console.error("[newsletter] subscription failed", error);
    return noStoreJson({ error: error instanceof Error ? error.message : "Could not subscribe." }, 503);
  }
}
