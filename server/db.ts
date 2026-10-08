import fs from "node:fs/promises";
import path from "node:path";
import { and, eq, gte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { contactSubmissions, type InsertContactSubmission, newsletterSubscriptions } from "../drizzle/schema";

let database: ReturnType<typeof drizzle> | null = null;

const DATA_DIR = path.join(process.cwd(), "data");
const NEWSLETTER_JSON = path.join(DATA_DIR, "newsletter-subscriptions.json");
const NEWSLETTER_CSV = path.join(DATA_DIR, "newsletter-subscriptions.csv");
const CONTACTS_JSON = path.join(DATA_DIR, "contact-submissions.json");
const CONTACTS_CSV = path.join(DATA_DIR, "contact-submissions.csv");

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
    try {
      database = drizzle(process.env.DATABASE_URL);
    } catch {
      database = null;
    }
  }
  return database;
}

/* ─────────────────────────────────────────────────────────────────────────────
   FILE STORAGE HELPERS (Guaranteed zero-drop local persistence)
   ───────────────────────────────────────────────────────────────────────────── */
async function ensureDataDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory already exists or permissions issue handled by caller
  }
}

export interface StoredSubscription {
  id: number;
  email: string;
  source: string;
  subscribedAt: string;
}

export interface StoredContactSubmission {
  id: number;
  name: string;
  email: string;
  company?: string | null;
  website?: string | null;
  focus: string;
  budget?: string | null;
  timeline?: string | null;
  description: string;
  source: string;
  submittedAt: string;
}

export async function getNewsletterSubscriptions(): Promise<StoredSubscription[]> {
  try {
    const raw = await fs.readFile(NEWSLETTER_JSON, "utf-8");
    return JSON.parse(raw) as StoredSubscription[];
  } catch {
    return [];
  }
}

export async function getContactSubmissions(): Promise<StoredContactSubmission[]> {
  try {
    const raw = await fs.readFile(CONTACTS_JSON, "utf-8");
    return JSON.parse(raw) as StoredContactSubmission[];
  } catch {
    return [];
  }
}

async function appendNewsletterCsv(entry: StoredSubscription): Promise<void> {
  try {
    const header = "ID,Email,Source,SubscribedAt\n";
    const escapeCsv = (str: string) => `"${str.replace(/"/g, '""')}"`;
    const row = `${entry.id},${escapeCsv(entry.email)},${escapeCsv(entry.source)},"${entry.subscribedAt}"\n`;

    try {
      await fs.access(NEWSLETTER_CSV);
      await fs.appendFile(NEWSLETTER_CSV, row, "utf-8");
    } catch {
      await fs.writeFile(NEWSLETTER_CSV, header + row, "utf-8");
    }
  } catch (err) {
    console.error("[appendNewsletterCsv] Failed to write CSV row:", err);
  }
}

async function appendContactCsv(entry: StoredContactSubmission): Promise<void> {
  try {
    const header = "ID,Name,Email,Company,Website,Focus,Budget,Timeline,Description,Source,SubmittedAt\n";
    const escapeCsv = (str?: string | null) => (str ? `"${String(str).replace(/"/g, '""')}"` : '""');
    const row = `${entry.id},${escapeCsv(entry.name)},${escapeCsv(entry.email)},${escapeCsv(entry.company)},${escapeCsv(entry.website)},${escapeCsv(entry.focus)},${escapeCsv(entry.budget)},${escapeCsv(entry.timeline)},${escapeCsv(entry.description)},${escapeCsv(entry.source)},"${entry.submittedAt}"\n`;

    try {
      await fs.access(CONTACTS_CSV);
      await fs.appendFile(CONTACTS_CSV, row, "utf-8");
    } catch {
      await fs.writeFile(CONTACTS_CSV, header + row, "utf-8");
    }
  } catch (err) {
    console.error("[appendContactCsv] Failed to write CSV row:", err);
  }
}

async function persistNewsletterToFile(email: string, source: string): Promise<{ created: boolean }> {
  await ensureDataDir();
  const list = await getNewsletterSubscriptions();
  const existing = list.find((item) => item.email.toLowerCase() === email.toLowerCase());

  if (existing) {
    return { created: false };
  }

  const nextId = list.length > 0 ? Math.max(...list.map((item) => item.id)) + 1 : 1;
  const newEntry: StoredSubscription = {
    id: nextId,
    email,
    source,
    subscribedAt: new Date().toISOString(),
  };

  list.push(newEntry);
  await fs.writeFile(NEWSLETTER_JSON, JSON.stringify(list, null, 2), "utf-8");
  await appendNewsletterCsv(newEntry);

  return { created: true };
}

async function persistContactToFile(submission: InsertContactSubmission): Promise<number> {
  await ensureDataDir();
  const list = await getContactSubmissions();

  // Rate limit: max 4 submissions per email in the last hour
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  const recentCount = list.filter(
    (c) => c.email.toLowerCase() === submission.email.toLowerCase() && new Date(c.submittedAt).getTime() >= oneHourAgo
  ).length;

  if (recentCount >= 4) {
    throw new SubmissionRateLimitError();
  }

  const nextId = list.length > 0 ? Math.max(...list.map((item) => item.id)) + 1 : 1;
  const newEntry: StoredContactSubmission = {
    id: nextId,
    name: submission.name,
    email: submission.email,
    company: submission.company || null,
    website: submission.website || null,
    focus: submission.focus,
    budget: submission.budget || null,
    timeline: submission.timeline || null,
    description: submission.description,
    source: submission.source || "website-contact",
    submittedAt: new Date().toISOString(),
  };

  list.push(newEntry);
  await fs.writeFile(CONTACTS_JSON, JSON.stringify(list, null, 2), "utf-8");
  await appendContactCsv(newEntry);

  return nextId;
}

/* ─────────────────────────────────────────────────────────────────────────────
   PUBLIC API
   ───────────────────────────────────────────────────────────────────────────── */
export async function createContactSubmission(submission: InsertContactSubmission): Promise<number> {
  let submissionId: number | null = null;

  // 1. If database connection is configured, attempt writing to MySQL
  try {
    const db = await getDb();
    if (db) {
      const cutoff = new Date(Date.now() - 60 * 60 * 1000);
      const [recent] = await db
        .select({ count: sql<number>`count(*)` })
        .from(contactSubmissions)
        .where(and(eq(contactSubmissions.email, submission.email), gte(contactSubmissions.submittedAt, cutoff)));

      if (Number(recent?.count ?? 0) >= 4) {
        throw new SubmissionRateLimitError();
      }

      const result = await db.insert(contactSubmissions).values(submission);
      submissionId = Number(result[0].insertId);
    }
  } catch (err) {
    if (err instanceof SubmissionRateLimitError) throw err;
    console.warn("[createContactSubmission] MySQL unavailable, using local file storage fallback:", err);
  }

  // 2. Always persist to durable local file storage
  const fileId = await persistContactToFile(submission);
  return submissionId ?? fileId;
}

export async function subscribeEmail(email: string, source = "website-newsletter"): Promise<{ created: boolean }> {
  const normalizedEmail = email.trim().toLowerCase();
  let dbResult: { created: boolean } | null = null;

  // 1. If database connection is configured, attempt writing to MySQL
  try {
    const db = await getDb();
    if (db) {
      const result = await db
        .insert(newsletterSubscriptions)
        .values({ email: normalizedEmail, source })
        .onDuplicateKeyUpdate({
          set: { email: sql`${newsletterSubscriptions.email}` },
        });

      dbResult = { created: Number(result[0].affectedRows ?? 0) === 1 };
    }
  } catch (err) {
    console.warn("[subscribeEmail] MySQL unavailable, using local file storage fallback:", err);
  }

  // 2. Always persist to durable local file storage
  const fileResult = await persistNewsletterToFile(normalizedEmail, source);

  return dbResult ?? fileResult;
}
