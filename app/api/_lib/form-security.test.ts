import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { limitPublicRequest, requireSameOrigin } from "./form-security";

function makeRequest(headers: Record<string, string> = {}) {
  return new NextRequest("https://aethelon.example/api/contact", {
    method: "POST",
    headers,
  });
}

describe("requireSameOrigin", () => {
  it("allows a matching browser origin", () => {
    expect(requireSameOrigin(makeRequest({ origin: "https://aethelon.example" }))).toBeNull();
  });

  it("rejects missing and cross-site origins", async () => {
    const missingOrigin = requireSameOrigin(makeRequest());
    const crossSiteOrigin = requireSameOrigin(makeRequest({ origin: "https://evil.example" }));

    expect(missingOrigin?.status).toBe(403);
    expect(crossSiteOrigin?.status).toBe(403);
    await expect(crossSiteOrigin?.json()).resolves.toEqual({ error: "This request could not be verified." });
  });
});

describe("limitPublicRequest", () => {
  it("returns a 429 response after the configured request limit", () => {
    const request = makeRequest({ origin: "https://aethelon.example", "x-forwarded-for": "203.0.113.10" });
    const scope = `test-${Date.now()}`;

    expect(limitPublicRequest(request, { scope, limit: 1, windowMs: 60_000 })).toBeNull();

    const limitedResponse = limitPublicRequest(request, { scope, limit: 1, windowMs: 60_000 });
    expect(limitedResponse?.status).toBe(429);
    expect(limitedResponse?.headers.get("Retry-After")).toBeTruthy();
  });
});
