"use client";

import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import TempBadge from "./TempBadge";

/* =========================================================================
   Newsletter — Version A: The Editorial Commerce Brief
   ========================================================================= */
export function NewsletterA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStatus("success");
    }
  };

  return (
    <div className="temp-section-block" id="newsletter-a">
      <TempBadge label="NEWSLETTER / CONCEPT A" description="The Commerce Brief · Editorial Scale & Negative Space" />
      <section className="newsletter-a-section">
        <div className="newsletter-a-inner">
          <div className="newsletter-a-kicker">
            <span className="signal-dot" /> Quarterly Editorial Dispatch
          </div>
          <h2>The Aethelon Commerce Brief.</h2>
          <p className="newsletter-a-desc">
            A concise quarterly journal covering custom Next.js architectures, 3D WebGL conversion data, and emerging spatial commerce experiments. Zero promotional spam.
          </p>

          {status === "success" ? (
            <div className="newsletter-success-box">
              <Check size={18} className="success-icon" aria-hidden="true" />
              <span>You are subscribed to the Commerce Brief. First issue lands next quarter.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-a-form">
              <div className="form-input-wrap">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-a-input"
                  aria-label="Email address for the Commerce Brief"
                />
                <button type="submit" className="newsletter-a-submit" aria-label="Subscribe to the Commerce Brief">
                  <span>Join dispatch</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
              <span className="form-privacy-note">
                Delivered 4 times per year. One-click unsubscribe anytime.
              </span>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   Newsletter — Version B: Architectural Dispatch Strip
   ========================================================================= */
export function NewsletterB() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStatus("success");
  };

  return (
    <div className="temp-section-block" id="newsletter-b">
      <TempBadge label="NEWSLETTER / CONCEPT B" description="Architectural Dispatch Bar · High-Contrast Minimal" />
      <section className="newsletter-b-section">
        <div className="newsletter-b-bar">
          <div className="newsletter-b-copy">
            <h3>Dispatches on Commerce Architecture.</h3>
            <p>Quarterly field notes on 3D storefronts, headless speed, and conversion engineering.</p>
          </div>

          <div className="newsletter-b-action">
            {status === "success" ? (
              <span className="b-success-text">Subscribed. Thank you.</span>
            ) : (
              <form onSubmit={handleSubmit} className="newsletter-b-form">
                <input
                  type="email"
                  required
                  placeholder="name@brand.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-b-input"
                  aria-label="Your work email"
                />
                <button type="submit" className="newsletter-b-btn">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
