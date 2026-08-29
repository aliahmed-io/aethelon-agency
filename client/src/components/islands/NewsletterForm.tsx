"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { subscribeNewsletter } from "../../lib/submissionApi";

export default function NewsletterForm() {
  const [subscribing, setSubscribing] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [newsletterError, setNewsletterError] = useState(false);

  async function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (subscribing) return;
    setSubscribing(true);
    setNewsletterMessage("");
    setNewsletterError(false);
    const form = event.currentTarget;
    const email = new FormData(form).get("email")?.toString() || "";
    const middleName = new FormData(form).get("middleName")?.toString() || "";
    try {
      const result = await subscribeNewsletter({ email, middleName });
      form.reset();
      setNewsletterMessage(result.created ? "You’re on the list." : "You’re already on the list.");
    } catch (error) {
      setNewsletterError(true);
      setNewsletterMessage(error instanceof Error ? error.message : "Could not subscribe.");
    } finally {
      setSubscribing(false);
    }
  }

  return (
    <div className="newsletter-form-container">
      <form onSubmit={handleSubscribe} className="newsletter-form">
        <input className="form-honeypot" name="middleName" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <input name="email" required type="email" placeholder="Your email address" aria-label="Your email address" />
        <button type="submit" disabled={subscribing} aria-label="Subscribe to newsletter">
          {subscribing ? "…" : <ArrowUpRight aria-hidden="true" />}
        </button>
      </form>
      {newsletterMessage && (
        <p className={`form-feedback${newsletterError ? " is-error" : ""}`} role={newsletterError ? "alert" : "status"}>
          {newsletterMessage}
        </p>
      )}
    </div>
  );
}
