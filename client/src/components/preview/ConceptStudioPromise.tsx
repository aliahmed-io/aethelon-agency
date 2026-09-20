"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ConceptStudioPromise() {
  return (
    <div className="concept-promise-section">
      <div className="promise-container">
        {/* Left Column: Personal Narrative */}
        <div className="promise-narrative-col">
          <div className="promise-eyebrow">
            02 · The Studio Partnership
          </div>

          <h2 className="promise-headline">
            One senior partner from<br />
            <em>first sketch to launch day.</em>
          </h2>

          <p className="promise-lead">
            Traditional agencies pitch you with their executive directors, then quietly hand your build to junior contractors and bury you under project management layers.
          </p>

          <p className="promise-sub">
            Aethelon is structured differently. We intentionally limit our studio to four flagship client partnerships per year. You work directly with the senior engineer and designer who architects every database schema, refines every micro-interaction, and polishes every screen.
          </p>

          <div className="promise-meta-card">
            <div className="promise-meta-item">
              <span>Annual Capacity</span>
              <strong>4 Flagship Builds / Year</strong>
            </div>
            <div className="promise-meta-item">
              <span>Team Structure</span>
              <strong>Direct Senior Pair</strong>
            </div>
            <div className="promise-meta-item">
              <span>Code Ownership</span>
              <strong>100% Client-Owned Git</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Three Reassuring Principles */}
        <div className="promise-principles-col">
          <div className="principle-item">
            <span className="principle-num">01</span>
            <div className="principle-content">
              <h3>Direct, Unfiltered Collaboration</h3>
              <p>
                No account executives playing telephone. You have direct, transparent access via private Slack and asynchronous video updates with the person actually building your store.
              </p>
            </div>
          </div>

          <div className="principle-item">
            <span className="principle-num">02</span>
            <div className="principle-content">
              <h3>Zero Vendor Lock-In</h3>
              <p>
                Every line of TypeScript, Tailwind stylesheet, and database migration is completely yours from day one. We never hold your platform hostage with proprietary plugins or compulsory monthly retainers.
              </p>
            </div>
          </div>

          <div className="principle-item">
            <span className="principle-num">03</span>
            <div className="principle-content">
              <h3>Built for Longevity, Not Quick Flips</h3>
              <p>
                We design with architectural restraint—using proven typography, clean semantic code, and rock-solid headless infrastructure that your internal team can operate confidently for the next five to ten years.
              </p>
            </div>
          </div>

          <div className="promise-action">
            <Link href="/contact" className="button button-dark promise-btn">
              Discuss your project directly <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
