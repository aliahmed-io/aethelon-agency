import { and, eq, gte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { contactSubmissions, type InsertContactSubmission, newsletterSubscriptions } from "../drizzle/schema";

let database: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!database && process.env.DATABASE_URL) {
    database = drizzle(process.env.DATABASE_URL);
  }
  return database;
}

export async function createContactSubmission(submission: InsertContactSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Submission storage is temporarily unavailable.");

  const cutoff = new Date(Date.now() - 60 * 60 * 1000);
  const [recent] = await db
    .select({ count: sql<number>`count(*)` })
    .from(contactSubmissions)
    .where(and(eq(contactSubmissions.email, submission.email), gte(contactSubmissions.submittedAt, cutoff)));

  if (Number(recent?.count ?? 0) >= 4) {
    throw new Error("Please wait before sending another project note.");
  }

  const result = await db.insert(contactSubmissions).values(submission);
  return Number(result[0].insertId);
}

export async function subscribeEmail(email: string, source = "website-newsletter") {
  const db = await getDb();
  if (!db) throw new Error("Subscription storage is temporarily unavailable.");

  const existing = await db
    .select({ id: newsletterSubscriptions.id })
    .from(newsletterSubscriptions)
    .where(eq(newsletterSubscriptions.email, email))
    .limit(1);

  if (existing.length > 0) return { created: false as const };

  await db.insert(newsletterSubscriptions).values({ email, source });
  return { created: true as const };
}
