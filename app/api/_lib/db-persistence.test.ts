import { describe, expect, it, afterAll } from "vitest";
import fs from "node:fs/promises";
import path from "node:path";
import {
  subscribeEmail,
  createContactSubmission,
  getNewsletterSubscriptions,
  getContactSubmissions,
  SubmissionRateLimitError,
} from "../../../server/db";

const DATA_DIR = path.join(process.cwd(), "data");
const NEWSLETTER_FILE = path.join(DATA_DIR, "newsletter-subscriptions.json");
const CONTACTS_FILE = path.join(DATA_DIR, "contact-submissions.json");

describe("Database & File Storage Persistence", () => {
  const testEmail = `test-lead-${Date.now()}@example.com`;

  it("successfully subscribes an email and saves to persistent storage", async () => {
    const res1 = await subscribeEmail(testEmail, "unit-test");
    expect(res1.created).toBe(true);

    const subs = await getNewsletterSubscriptions();
    const found = subs.find((s) => s.email === testEmail);
    expect(found).toBeDefined();
    expect(found?.source).toBe("unit-test");
  });

  it("handles duplicate subscriptions idempotently without duplicate entries", async () => {
    const res2 = await subscribeEmail(testEmail, "unit-test-duplicate");
    expect(res2.created).toBe(false);

    const subs = await getNewsletterSubscriptions();
    const matches = subs.filter((s) => s.email === testEmail);
    expect(matches.length).toBe(1);
  });

  it("successfully saves a project contact submission with incremental ID", async () => {
    const id = await createContactSubmission({
      name: "Marcus Aurelius",
      email: testEmail,
      company: "Stoic Atelier",
      website: "https://stoic.example",
      focus: "Custom Storefront",
      budget: "$20k+",
      timeline: "2-4 weeks",
      description: "Need an architectural luxury storefront with 3D product inspection.",
      source: "unit-test",
    });

    expect(typeof id).toBe("number");
    expect(id).toBeGreaterThan(0);

    const contacts = await getContactSubmissions();
    const found = contacts.find((c) => c.email === testEmail);
    expect(found).toBeDefined();
    expect(found?.name).toBe("Marcus Aurelius");
    expect(found?.company).toBe("Stoic Atelier");
  });

  it("enforces rate limits on excessive rapid submissions from the same email", async () => {
    const spamEmail = `rate-limit-${Date.now()}@example.com`;
    const payload = {
      name: "Fast Submitter",
      email: spamEmail,
      focus: "Performance",
      description: "Testing rate limits.",
      source: "unit-test",
    };

    // First 4 should succeed
    await createContactSubmission(payload);
    await createContactSubmission(payload);
    await createContactSubmission(payload);
    await createContactSubmission(payload);

    // 5th should throw SubmissionRateLimitError
    await expect(createContactSubmission(payload)).rejects.toThrow(SubmissionRateLimitError);
  });
});
