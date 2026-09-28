"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { subscribeNewsletter } from "@/lib/submissionApi";

export default function FlagshipConversionSection() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || !email.trim()) return;
    setSubmitting(true);
    setMessage("");
    setIsError(false);

    const form = event.currentTarget;
    const middleName = new FormData(form).get("middleName")?.toString() || "";

    try {
      const result = await subscribeNewsletter({ email: email.trim(), middleName });
      setIsSuccess(true);
      setMessage(
        result.created
          ? "We'll be in touch within 24 hours."
          : "You're already on our list."
      );
      setEmail("");
    } catch (err) {
      setIsError(true);
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section-pad-lg pt-6 pb-20" id="conversion" aria-label="Get in touch">
      <div className="flagship-conversion-card">

        <h2 className="flagship-conversion-headline">
          Let's build something worth remembering.
        </h2>

        <p className="flagship-conversion-subtext">
          Tell us about your project and we'll get back to you within a day.
        </p>

        <div className="flagship-actions-row">
          <div className="flagship-buttons-group">
            <Link
              href="/contact"
              className="flagship-btn-primary"
            >
              <span>Start your project</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <div className="flagship-intake-wrap">
            <form onSubmit={handleSubmit} className="flagship-intake-form">
              <input
                type="text"
                name="middleName"
                className="conversion-honeypot hidden"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                aria-label="Email address"
                className="flagship-intake-input"
              />

              <button
                type="submit"
                disabled={submitting || isSuccess}
                className="flagship-intake-submit-btn"
                aria-label="Submit email"
              >
                {isSuccess ? (
                  <Check size={18} aria-hidden="true" />
                ) : (
                  <ArrowUpRight size={18} aria-hidden="true" />
                )}
              </button>
            </form>

            {message && (
              <p
                className={`flagship-feedback ${isError ? "is-error" : "is-success"}`}
                role={isError ? "alert" : "status"}
              >
                {message}
              </p>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
