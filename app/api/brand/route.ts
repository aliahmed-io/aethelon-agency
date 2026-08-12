import { NextResponse } from "next/server";

export const dynamic = "force-static";

/** Lightweight public metadata for health checks and brand-consistency verification. */
export function GET() {
  return NextResponse.json({ name: process.env.VITE_APP_TITLE ?? "Aethelon" });
}
