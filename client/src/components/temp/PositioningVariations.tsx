"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, ShieldCheck, Terminal, Compass, Layers, GitBranch } from "lucide-react";
import TempBadge from "./TempBadge";

/* =========================================================================
   Positioning — Version A: Interactive Build Process Timeline
   ========================================================================= */
export function PositioningA() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: "01",
      title: "Direct Architectural Blueprint",
      tagline: "First sprint: Schema, routing, and conversion priorities",
      detail:
        "You sit directly with the senior engineer. Within the first week, we map the exact component architecture, database schemas, headless checkout hooks, and Core Web Vitals targets. No sales reps, no diluted requirements.",
      deliverable: "Architecture Spec & Technical Milestone Roadmap",
    },
    {
      num: "02",
      title: "Working Interactive Prototypes",
      tagline: "Real code in your browser, not passive Figma decks",
      detail:
        "We build live Next.js branches you can open on your actual mobile phone. You test real cart drawers, actual 3D rendering speeds, and real micro-interactions before committing to full production rollout.",
      deliverable: "Deploy Preview URL on Real Infrastructure",
    },
    {
      num: "03",
      title: "Production Hardening & Edge Caching",
      tagline: "Sub-500ms TTFB, 100/100 Lighthouse, zero CLS",
      detail:
        "We optimize asset payloads, compress GLTF 3D models with Draco/KTX2, configure edge-caching headers, and stress-test payment webhooks. Your storefront launches with enterprise-grade resilience.",
      deliverable: "Audited Production Build & Automated CI Tests",
    },
    {
      num: "04",
      title: "Full Code Ownership & Handover",
      tagline: "Zero vendor lock-in · Your repo, your cloud, your IP",
      detail:
        "You own 100% of the TypeScript code, design tokens, and infrastructure configuration. We provide thorough administrative documentation and walk your internal team through ongoing operations.",
      deliverable: "Clean Repository Transfer & Admin Video Walkthrough",
    },
  ];

  const current = steps[activeStep] || steps[0]!;

  return (
    <div className="temp-section-block" id="positioning-a">
      <TempBadge label="POSITIONING / CONCEPT A" description="Interactive Build Timeline · 'How We Ship'" />
      <section className="positioning-a-section">
        <div className="positioning-a-header">
          <span className="section-kicker">Transparent Methodology</span>
          <h2>How working with Aethelon actually works.</h2>
          <p>
            No bloated account teams or bureaucratic status meetings. A structured, transparent engineering process designed to take ambitious storefronts to market rapidly.
          </p>
        </div>

        <div className="positioning-a-timeline-grid">
          {/* Left: Step Buttons */}
          <div className="timeline-stepper">
            {steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={step.num}
                  type="button"
                  className={`timeline-step-btn ${isSelected ? "is-selected" : ""}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className="step-btn-top">
                    <span className="step-num">{step.num}</span>
                    <span className="step-title">{step.title}</span>
                  </div>
                  <span className="step-tagline">{step.tagline}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Active Viewport */}
          <div className="timeline-detail-card">
            <div className="detail-card-top">
              <span className="detail-phase">Phase {current.num}</span>
              <div className="detail-badge">
                <ShieldCheck size={14} aria-hidden="true" />
                <span>Senior Build Standard</span>
              </div>
            </div>

            <div className="detail-card-body">
              <h3>{current.title}</h3>
              <p className="detail-desc">{current.detail}</p>
              <div className="detail-deliverable-box">
                <span className="box-label">Key Deliverable:</span>
                <span className="box-val">{current.deliverable}</span>
              </div>
            </div>

            <div className="detail-card-footer">
              <Link href="/contact" className="button button-dark">
                Schedule an architectural review <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   Positioning — Version B: "Built Differently" Studio Model Comparison
   ========================================================================= */
export function PositioningB() {
  const comparisonRows = [
    {
      factor: "Team Structure",
      traditional: "Account managers, junior developers, fragmented communication",
      aethelon: "Direct senior software engineer from first commit to DNS cutover",
    },
    {
      factor: "Early Prototyping",
      traditional: "Static Figma mockups that hide performance & mobile hurdles",
      aethelon: "Live Next.js deploy previews you can test on real devices immediately",
    },
    {
      factor: "Code & IP Ownership",
      traditional: "Proprietary modules, monthly agency lock-in, restrictive licensing",
      aethelon: "100% full intellectual property and clean TypeScript repository ownership",
    },
    {
      factor: "Speed to Market",
      traditional: "Multi-month discovery phases with heavy agency overhead",
      aethelon: "Rapid, milestone-driven delivery focused on conversion-critical features",
    },
  ];

  return (
    <div className="temp-section-block" id="positioning-b">
      <TempBadge label="POSITIONING / CONCEPT B" description="'Built Differently' Studio Model Comparison" />
      <section className="positioning-b-section">
        <div className="positioning-b-header">
          <span className="section-kicker">The Studio Model</span>
          <h2>Built differently by intention.</h2>
          <p>
            We deliberately remain a focused senior studio so every brand gets undivided technical mastery rather than a handoff to a junior agency bench.
          </p>
        </div>

        <div className="positioning-b-table-wrap">
          <div className="comparison-table">
            <div className="table-header-row">
              <span className="col-factor">Operational Factor</span>
              <span className="col-agency">Traditional Agency Model</span>
              <span className="col-aethelon">The Aethelon Studio Model</span>
            </div>

            {comparisonRows.map((row) => (
              <div key={row.factor} className="table-body-row">
                <div className="col-factor">
                  <strong>{row.factor}</strong>
                </div>
                <div className="col-agency">
                  <span className="mobile-label">Traditional Agency:</span>
                  <p>{row.traditional}</p>
                </div>
                <div className="col-aethelon">
                  <span className="mobile-label">Aethelon:</span>
                  <p>
                    <Check size={16} className="check-icon" aria-hidden="true" />
                    <span>{row.aethelon}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="positioning-b-summary-strip">
          <div className="summary-col">
            <strong>Senior Focus</strong>
            <span>Zero diluted context</span>
          </div>
          <div className="summary-col">
            <strong>Sub-500ms Edge</strong>
            <span>Built for conversion</span>
          </div>
          <div className="summary-col">
            <strong>Transparent Scope</strong>
            <span>Fixed milestone commitments</span>
          </div>
          <div className="summary-cta">
            <Link href="/contact" className="button button-dark">
              Discuss your project <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
