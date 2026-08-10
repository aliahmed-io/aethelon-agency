// Paper Signal: static-safe submission simulation for demos and QA; replace with a real API when connected.
export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  website?: string;
  focus: string;
  budget?: string;
  timeline?: string;
  description: string;
};

export type NewsletterPayload = { email: string };

const CONTACT_KEY = "commerce-studio:contact-submissions";
const NEWSLETTER_KEY = "commerce-studio:newsletter-subscriptions";

function wait(ms: number) {
  return new Promise(resolve => window.setTimeout(resolve, ms));
}

function save<T>(key: string, value: T) {
  const existing = JSON.parse(localStorage.getItem(key) || "[]") as T[];
  localStorage.setItem(key, JSON.stringify([...existing, { ...value, createdAt: new Date().toISOString() }]));
}

export async function submitContact(payload: ContactPayload) {
  await wait(650);
  if (!payload.name.trim() || !payload.email.includes("@") || !payload.focus || !payload.description.trim()) {
    throw new Error("Please complete the required project fields.");
  }
  save(CONTACT_KEY, payload);
  return { ok: true as const, reference: `CS-${Date.now().toString().slice(-6)}` };
}

export async function subscribeNewsletter(payload: NewsletterPayload) {
  await wait(500);
  if (!payload.email.includes("@")) throw new Error("Enter a valid email address.");
  save(NEWSLETTER_KEY, payload);
  return { ok: true as const };
}
