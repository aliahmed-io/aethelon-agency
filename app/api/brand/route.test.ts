import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/brand", () => {
  it("returns the configured Aethelon project title", async () => {
    const response = GET();

    await expect(response.json()).resolves.toEqual({ name: "Aethelon" });
  });
});
