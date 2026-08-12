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

  it("rejects short descriptions, filled honeypots, invalid options, and malformed websites", () => {
    const baseline = {
      name: "Samira Youssef",
      email: "samira@example.com",
      focus: "AI integration",
      description: "A real project brief with enough initial context.",
    };

    expect(() => contactInputSchema.parse({ ...baseline, description: "Too short" })).toThrow("Share a little more about the project.");
    expect(() => contactInputSchema.parse({ ...baseline, middleName: "Automated sender" })).toThrow();
    expect(() => contactInputSchema.parse({ ...baseline, focus: "Unknown work" })).toThrow();
    expect(() => contactInputSchema.parse({ ...baseline, website: "not a URL" })).toThrow("Enter a valid website URL.");
  });

  it("normalizes optional blank values and accepts secure website URLs", () => {
    const parsed = contactInputSchema.parse({
      name: "Samira Youssef",
      email: "samira@example.com",
      company: "   ",
      website: "https://example.com/work",
      focus: "Performance / SEO",
      budget: "$10k—$20k",
      timeline: "1—2 months",
      description: "A real project brief with enough initial context.",
    });

    expect(parsed.company).toBeUndefined();
    expect(parsed.website).toBe("https://example.com/work");
  });
});

describe("newsletterInputSchema", () => {
  it("normalizes a subscriber email and blocks a filled honeypot", () => {
    expect(newsletterInputSchema.parse({ email: " READER@EXAMPLE.COM ", middleName: "" }).email).toBe("reader@example.com");
    expect(() => newsletterInputSchema.parse({ email: "reader@example.com", middleName: "bot" })).toThrow();
  });
});
