export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  website?: string;
  focus: string;
  budget?: string;
  timeline?: string;
  description: string;
  middleName?: string;
};

export type NewsletterPayload = { email: string; middleName?: string };

async function postSubmission<T>(endpoint: string, payload: Record<string, string | undefined>) {
  const response = await fetch(endpoint, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await response.json().catch(() => ({})) as T & { error?: string };
  if (!response.ok) throw new Error(body.error || "The submission could not be completed.");
  return body;
}

export function submitContact(payload: ContactPayload) {
  return postSubmission<{ ok: true; reference: string }>("/api/contact", payload);
}

export function subscribeNewsletter(payload: NewsletterPayload) {
  return postSubmission<{ ok: true; created: boolean }>("/api/newsletter", payload);
}
