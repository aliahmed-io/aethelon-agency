import { NextRequest, NextResponse } from "next/server";

export function requireSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) return null;

  try {
    return new URL(origin).host === host
      ? null
      : NextResponse.json({ error: "This request could not be verified." }, { status: 403 });
  } catch {
    return NextResponse.json({ error: "This request could not be verified." }, { status: 403 });
  }
}

export function noStoreJson(payload: Record<string, unknown>, status = 200) {
  return NextResponse.json(payload, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}
