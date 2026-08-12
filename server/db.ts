import { and, eq, gte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { contactSubmissions, type InsertContactSubmission, newsletterSubscriptions } from "../drizzle/schema";

let database: ReturnType<typeof drizzle> | null = null;

export class SubmissionUnavailableError extends Error {
  constructor() {
    super("Submission storage is temporarily unavailable.");
    this.name = "SubmissionUnavailableError";
  }
}

export class SubmissionRateLimitError extends Error {
  constructor() {
    super("Please wait before sending another project note.");
    this.name = "SubmissionRateLimitError";
  }
}

export async function getDb() {
  if (!database && process.env.DATABASE_URL) {
    database = drizzle(process.env.DATABASE_URL);
  }
  return database;
}

export async function createContactSubmission(submission: InsertContactSubmission) {
  const db = await getDb();
  if (!db) throw new SubmissionUnavailableError();

  // This is a secondary guard. The primary public boundary is the IP-based
  // limiter in the route; keeping an email-based check limits repeat abuse.
  const cutoff = new Date(Date.now() - 60 * 60 * 1000);
  const [recent] = await db
    .select({ count: sql<number>`count(*)` })
    .from(contactSubmissions)
    .where(and(eq(contactSubmissions.email, submission.email), gte(contactSubmissions.submittedAt, cutoff)));

  if (Number(recent?.count ?? 0) >= 4) {
    throw new SubmissionRateLimitError();
  }

  const result = await db.insert(contactSubmissions).values(submission);
  return Number(result[0].insertId);
}

export async function subscribeEmail(email: string, source = "website-newsletter") {
  const db = await getDb();
  if (!db) throw new SubmissionUnavailableError();

  const result = await db
    .insert(newsletterSubscriptions)
    .values({ email, source })
    .onDuplicateKeyUpdate({
      // Preserve the first subscription timestamp and source while treating
      // duplicate requests as an idempotent success.
      set: { email: sql`${newsletterSubscriptions.email}` },
    });

  return { created: Number(result[0].affectedRows ?? 0) === 1 } as const;
}
