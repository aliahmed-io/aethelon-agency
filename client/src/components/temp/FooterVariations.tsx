"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import TempBadge from "./TempBadge";

/* =========================================================================
   Footer — Version A: Monumental Wordmark & Architectural Columns
   ========================================================================= */
export function FooterA() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="temp-section-block" id="footer-a">
      <TempBadge label="FOOTER / CONCEPT A" description="Monumental Wordmark & Architectural Columns" />
      <footer className="footer-a-section">
        {/* Upper Action Tier */}
        <div className="footer-a-upper">
          <div className="upper-statement">
            <span className="section-kicker">Start a Conversation</span>
            <h2>Let’s build a digital flagship that sets your brand apart.</h2>
          </div>
          <div className="upper-action">
            <Link href="/contact" className="circle-cta-large">
              <span>Start</span>
              <span>Project</span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Middle Directory Tier */}
        <div className="footer-a-directory">
          <div className="dir-col brand-col">
            <div className="brand-mark-box">
              <span className="brand-mark">AE/</span>
              <span className="brand-name">Aethelon</span>
            </div>
            <p>
              Independent ecommerce design and full-stack engineering practice. Crafting custom storefronts, spatial 3D experiences, and high-performance digital systems.
            </p>
            <span className="studio-location">Available Worldwide · Based in Europe</span>
          </div>

          <div className="dir-col">
            <span className="dir-title">Navigation</span>
            <ul className="dir-links">
              <li><Link href="/work">Selected Work</Link></li>
              <li><Link href="/services">Services & Scope</Link></li>
              <li><Link href="/about">Studio Model</Link></li>
              <li><Link href="/insights">Commerce Insights</Link></li>
              <li><Link href="/contact">Initiate Build</Link></li>
            </ul>
          </div>

          <div className="dir-col">
            <span className="dir-title">Capabilities</span>
            <ul className="dir-links">
              <li><span>Custom Storefronts</span></li>
              <li><span>WebGL 3D Viewers</span></li>
              <li><span>In-Room AR QuickLook</span></li>
              <li><span>AI Catalog Discovery</span></li>
              <li><span>High-Velocity Cart</span></li>
            </ul>
          </div>

          <div className="dir-col">
            <span className="dir-title">Connect</span>
            <ul className="dir-links">
              <li><a href="https://github.com" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={12} /></a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={12} /></a></li>
              <li><a href="https://x.com" target="_blank" rel="noreferrer">X / Twitter <ArrowUpRight size={12} /></a></li>
              <li><a href="mailto:hello@aethelon.com">hello@aethelon.com</a></li>
            </ul>
          </div>
        </div>

        {/* Lower Monumental Wordmark Tier */}
        <div className="footer-a-wordmark-tier">
          <div className="monumental-wordmark" aria-hidden="true">
            AETHELON
          </div>
          <div className="wordmark-subline">
            <span>© 2026 Aethelon Studio. All rights reserved.</span>
            <button type="button" onClick={scrollToTop} className="back-to-top-btn" aria-label="Back to top">
              <span>Return to top</span>
              <ArrowUp size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* =========================================================================
   Footer — Version B: Editorial Studio Colophon
   ========================================================================= */
export function FooterB() {
  return (
    <div className="temp-section-block" id="footer-b">
      <TempBadge label="FOOTER / CONCEPT B" description="Editorial Studio Colophon · Quiet Typographic Cadence" />
      <footer className="footer-b-section">
        <div className="footer-b-top-row">
          <div className="colophon-block">
            <span className="colophon-kicker">Colophon</span>
            <h3>Engineered with intention. Built for permanence.</h3>
            <p>
              Type set in Space Grotesk and DM Sans. Designed around the 8pt grid, sub-500ms edge cache standards, and zero layout shift.
            </p>
          </div>

          <div className="colophon-contact-block">
            <span className="colophon-kicker">New Inquiries</span>
            <a href="mailto:build@aethelon.com" className="inquiry-link">
              build@aethelon.com
            </a>
            <p>Direct line to principal engineer. Response within 24 hours.</p>
          </div>
        </div>

        <div className="footer-b-links-row">
          <div className="footer-b-brand">
            <strong>Aethelon / Commerce Practice</strong>
          </div>
          <div className="footer-b-nav">
            <Link href="/work">Work</Link>
            <Link href="/services">Services</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer-b-copyright">
            <span>© 2026 Aethelon</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
