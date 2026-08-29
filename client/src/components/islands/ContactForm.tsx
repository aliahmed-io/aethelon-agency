"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { budgetOptions, projectFocusOptions, timelineOptions } from "../../../../shared/form-options";
import { submitContact } from "../../lib/submissionApi";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (sent) {
    return (
      <div className="success-state">
        <span className="signal-dot" />
        <h1>
          Good.<br />
          <em>Let’s make it useful.</em>
        </h1>
        <p>Your project note is safely recorded. I’ll review the brief and reply with a clear next step.</p>
        {reference && (
          <p className="submission-reference">
            Reference: <strong>{reference}</strong>
          </p>
        )}
        <Link href="/" className="button button-dark">
          Back home <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    setSending(true);
    setErrorMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await submitContact({
        name: data.get("name")?.toString() || "",
        email: data.get("email")?.toString() || "",
        company: data.get("company")?.toString(),
        website: data.get("website")?.toString(),
        focus: data.get("focus")?.toString() || "",
        budget: data.get("budget")?.toString(),
        timeline: data.get("timeline")?.toString(),
        description: data.get("description")?.toString() || "",
        middleName: data.get("middleName")?.toString() || "",
      });
      setReference(response.reference);
      setSent(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not send your note.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <input className="form-honeypot" name="middleName" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form-grid">
        <label>
          Name
          <input name="name" required autoComplete="name" placeholder="Your name" />
        </label>
        <label>
          Email
          <input name="email" required type="email" autoComplete="email" placeholder="you@brand.com" />
        </label>
        <label>
          Company / brand
          <input name="company" autoComplete="organization" placeholder="Brand name" />
        </label>
        <label>
          Website
          <input name="website" type="url" inputMode="url" autoComplete="url" placeholder="https://" />
        </label>
      </div>
      <label>
        What do you need?
        <select name="focus" defaultValue="" required>
          <option value="" disabled>
            Select a focus
          </option>
          {projectFocusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <div className="form-grid">
        <label>
          Budget range
          <select name="budget" defaultValue="">
            <option value="" disabled>
              Choose a range
            </option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Timeline
          <select name="timeline" defaultValue="">
            <option value="" disabled>
              Choose a timeline
            </option>
            {timelineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Project description
        <textarea
          name="description"
          required
          minLength={20}
          placeholder="What are you trying to make happen?"
          rows={6}
        />
      </label>
      <button className="button button-dark" type="submit" disabled={sending}>
        {sending ? "Sending project note…" : "Send project note"}{" "}
        {!sending && <ArrowUpRight size={16} aria-hidden="true" />}
      </button>
      {errorMessage && (
        <p className="form-feedback is-error" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
