import { NextRequest, NextResponse } from "next/server";

type RateLimitOptions = {
  scope: string;
  limit: number;
  windowMs: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const requestBuckets = new Map<string, RateLimitEntry>();

function getExpectedOrigin(request: NextRequest) {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!configuredSiteUrl) return request.nextUrl.origin;

  try {
    return new URL(configuredSiteUrl).origin;
  } catch {
    return request.nextUrl.origin;
  }
}

function getClientAddress(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function pruneExpiredBuckets(now: number) {
  if (requestBuckets.size < 250) return;
  for (const [key, entry] of requestBuckets) {
    if (entry.resetAt <= now) requestBuckets.delete(key);
  }
}

export function requireSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const expectedOrigin = getExpectedOrigin(request);

  if (!origin || origin !== expectedOrigin) {
    return noStoreJson({ error: "This request could not be verified." }, 403);
  }

  return null;
}

export function limitPublicRequest(request: NextRequest, { scope, limit, windowMs }: RateLimitOptions) {
  const now = Date.now();
  pruneExpiredBuckets(now);

  const key = `${scope}:${getClientAddress(request)}`;
  const existing = requestBuckets.get(key);
  const entry = !existing || existing.resetAt <= now
    ? { count: 0, resetAt: now + windowMs }
    : existing;

  entry.count += 1;
  requestBuckets.set(key, entry);

  if (entry.count <= limit) return null;

  const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
  return noStoreJson(
    { error: "Please wait a moment before trying again." },
    429,
    { "Retry-After": String(retryAfter) },
  );
}

export function createRequestId() {
  return crypto.randomUUID();
}

export function noStoreJson(payload: Record<string, unknown>, status = 200, headers: HeadersInit = {}) {
  return NextResponse.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}
