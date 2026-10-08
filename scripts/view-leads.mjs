import fs from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const NEWSLETTER_FILE = path.join(DATA_DIR, "newsletter-subscriptions.json");
const CONTACTS_FILE = path.join(DATA_DIR, "contact-submissions.json");

async function loadJson(file) {
  try {
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function main() {
  console.log("\n=======================================================");
  console.log("            AETHELON STUDIO LEADS & SUBSCRIBERS        ");
  console.log("=======================================================\n");

  const subscribers = await loadJson(NEWSLETTER_FILE);
  console.log(`--- NEWSLETTER SUBSCRIBERS (${subscribers.length}) ---`);
  if (subscribers.length === 0) {
    console.log("No newsletter subscribers yet.\n");
  } else {
    console.table(
      subscribers.map((s) => ({
        ID: s.id,
        Email: s.email,
        Source: s.source,
        SubscribedAt: new Date(s.subscribedAt).toLocaleString(),
      }))
    );
    console.log();
  }

  const contacts = await loadJson(CONTACTS_FILE);
  console.log(`--- PROJECT INQUIRIES (${contacts.length}) ---`);
  if (contacts.length === 0) {
    console.log("No project contact submissions yet.\n");
  } else {
    console.table(
      contacts.map((c) => ({
        ID: `AET-${String(c.id).padStart(6, "0")}`,
        Name: c.name,
        Email: c.email,
        Company: c.company || "-",
        Focus: c.focus,
        Budget: c.budget || "-",
        Timeline: c.timeline || "-",
        SubmittedAt: new Date(c.submittedAt).toLocaleString(),
      }))
    );
    console.log();
  }

  console.log(`Data stored at: ${DATA_DIR}`);
  console.log("=======================================================\n");
}

main().catch(console.error);
