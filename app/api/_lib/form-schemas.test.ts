import { describe, expect, it } from "vitest";
import { contactInputSchema, newsletterInputSchema } from "./form-schemas";

describe("contactInputSchema", () => {
  it("normalizes a valid project note without accepting malformed email input", () => {
    const parsed = contactInputSchema.parse({
      name: "  Samira Youssef  ",
      email: "SAMIRA@EXAMPLE.COM ",
      focus: "AI integration",
      description: "We need an AI concierge for a complex furniture catalog.",
      middleName: "",
    });

    expect(parsed.name).toBe("Samira Youssef");
    expect(parsed.email).toBe("samira@example.com");
    expect(() => contactInputSchema.parse({ ...parsed, email: "not-an-email" })).toThrow("Enter a valid email address.");
  });

  it("rejects short descriptions and filled honeypot fields", () => {
    const baseline = {
      name: "Samira Youssef",
      email: "samira@example.com",
      focus: "AI integration",
      description: "A real project brief with enough initial context.",
    };

    expect(() => contactInputSchema.parse({ ...baseline, description: "Too short" })).toThrow("Share a little more about the project.");
    expect(() => contactInputSchema.parse({ ...baseline, middleName: "Automated sender" })).toThrow();
  });
});

describe("newsletterInputSchema", () => {
  it("normalizes a subscriber email and blocks a filled honeypot", () => {
    expect(newsletterInputSchema.parse({ email: " READER@EXAMPLE.COM ", middleName: "" }).email).toBe("reader@example.com");
    expect(() => newsletterInputSchema.parse({ email: "reader@example.com", middleName: "bot" })).toThrow();
  });
});
