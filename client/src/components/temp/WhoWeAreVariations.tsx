"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Sparkles, Box, Cpu, Zap, ShoppingBag } from "lucide-react";
import TempBadge from "./TempBadge";

const CAPABILITIES = [
  {
    id: "3d-ar",
    title: "Spatial & 3D Commerce",
    subtitle: "Interactive WebGL viewers & in-room AR projection",
    desc: "We bring products into physical reality before checkout. Lightweight, high-frame-rate 3D configurators that run without plugins on mobile Safari and Chrome.",
    image: "/images/projects/lundev-furniture.png",
    metric: "60fps WebGL / Zero App Install",
    deliverables: ["Real-time material customizers", "Native iOS QuickLook & Android WebXR", "Automated GLTF asset compression"],
  },
  {
    id: "ai-search",
    title: "AI Search & Shopping Intelligence",
    subtitle: "Semantic catalog discovery & automated routine building",
    desc: "Replace blunt keyword search with natural-language discovery. We integrate context-aware assistants that guide buyers to the exact product variation.",
    image: "/images/projects/aethelon.png",
    metric: "Sub-200ms Semantic Matching",
    deliverables: ["Vector product recommendations", "Guided multi-step purchase quiz", "Zero hallucination fallback"],
  },
  {
    id: "conversion",
    title: "Conversion Architecture",
    subtitle: "Optimistic cart drawers & high-velocity checkout flows",
    desc: "Every millisecond of latency costs margin. We build persistent cart slides, dynamic bundle calculators, and zero-flicker checkout integrations.",
    image: "/images/projects/oakwell.png",
    metric: "Sub-500ms Edge Storefronts",
    deliverables: ["Headless Shopify & Stripe engines", "Optimistic state line-item updates", "Abandoned bag edge webhooks"],
  },
  {
    id: "senior-build",
    title: "Direct Senior Engineering",
    subtitle: "No junior handoffs · Direct founder execution",
    desc: "You partner directly with senior full-stack developers from first architectural schema to final DNS cutover. Unmatched speed with zero agency bureaucracy.",
    image: "/images/oakwell/editorial/detail.jpg",
    metric: "3x Faster Than Traditional Retainers",
    deliverables: ["Full IP and codebase ownership", "Clean TypeScript + Tailwind tokens", "Direct Slack / WhatsApp channel"],
  },
];

/* =========================================================================
   Who We Are — Version A: Editorial Index
   ========================================================================= */
export function WhoWeAreA() {
  const [activeItem, setActiveItem] = useState<number>(0);

  return (
    <div className="temp-section-block" id="who-a">
      <TempBadge label="WHO WE ARE / CONCEPT A" description="Editorial Index · Monumental Typography" />
      <section className="who-a-section">
        <div className="who-a-intro">
          <span className="section-kicker">01 · Who We Are</span>
          <h2>
            A lean studio engineered for brands that refuse to look like templates.
          </h2>
          <p>
            Aethelon combines world-class visual art direction, deep full-stack engineering, and emerging commerce technology. We operate with a senior studio model: exceptional craft without enterprise agency bloat.
          </p>
        </div>

        <div className="who-a-index-list">
          {CAPABILITIES.map((cap, idx) => {
            const isActive = activeItem === idx;
            return (
              <div
                key={cap.id}
                className={`who-a-row ${isActive ? "is-active" : ""}`}
                onMouseEnter={() => setActiveItem(idx)}
                onClick={() => setActiveItem(idx)}
              >
                <div className="who-a-row-header">
                  <span className="who-a-num">{String(idx + 1).padStart(2, "0")}</span>
                  <div className="who-a-headings">
                    <h3>{cap.title}</h3>
                    <p className="who-a-subtitle">{cap.subtitle}</p>
                  </div>
                  <span className="who-a-badge">{cap.metric}</span>
                </div>

                <div className="who-a-row-body">
                  <div className="who-a-body-text">
                    <p>{cap.desc}</p>
                    <ul className="who-a-deliverables">
                      {cap.deliverables.map((d) => (
                        <li key={d}>
                          <Check size={14} aria-hidden="true" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="who-a-body-preview">
                    <Image
                      src={cap.image}
                      alt={cap.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      unoptimized
                      className="who-a-img"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   Who We Are — Version B: Interactive Capability Stage
   ========================================================================= */
export function WhoWeAreB() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const current = CAPABILITIES[selectedIdx] || CAPABILITIES[0]!;

  return (
    <div className="temp-section-block" id="who-b">
      <TempBadge label="WHO WE ARE / CONCEPT B" description="Interactive Capability Stage · Live Focus View" />
      <section className="who-b-section">
        <div className="who-b-header">
          <span className="section-kicker">Core Capabilities</span>
          <h2>Where design craft meets high-performance commerce systems.</h2>
        </div>

        <div className="who-b-stage-layout">
          {/* Left: Interactive Menu */}
          <div className="who-b-menu" role="tablist">
            {CAPABILITIES.map((cap, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={cap.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`who-b-menu-item ${isSelected ? "is-selected" : ""}`}
                  onClick={() => setSelectedIdx(idx)}
                >
                  <div className="who-b-menu-top">
                    <span className="menu-num">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="menu-title">{cap.title}</span>
                  </div>
                  <span className="menu-sub">{cap.subtitle}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Live Visual & Detail Viewport */}
          <div className="who-b-viewport">
            <div className="viewport-image-wrap">
              <Image
                src={current.image}
                alt={current.title}
                fill
                sizes="(max-width: 900px) 100vw, 55vw"
                unoptimized
                className="viewport-img"
              />
              <div className="viewport-scrim" />
              <div className="viewport-floating-stat">
                <span className="stat-value">{current.metric}</span>
              </div>
            </div>

            <div className="viewport-content">
              <h3>{current.title}</h3>
              <p>{current.desc}</p>
              <div className="viewport-deliverables-strip">
                {current.deliverables.map((item) => (
                  <span key={item} className="deliverable-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   Who We Are — Version C: Asymmetric Visual Mosaic
   ========================================================================= */
export function WhoWeAreC() {
  return (
    <div className="temp-section-block" id="who-c">
      <TempBadge label="WHO WE ARE / CONCEPT C" description="Asymmetric Visual Mosaic · Bento Rhythm" />
      <section className="who-c-section">
        <div className="who-c-header">
          <span className="section-kicker">Architecture & Expertise</span>
          <h2>Four unfair advantages we give independent luxury & lifestyle stores.</h2>
        </div>

        <div className="who-c-mosaic-grid">
          {/* Card 1: 3D / Spatial (Large Landscape) */}
          <div className="mosaic-card card-large">
            <div className="mosaic-image-wrap">
              <Image
                src="/images/projects/lundev-furniture.png"
                alt="3D Commerce Experience"
                fill
                sizes="(max-width: 900px) 100vw, 60vw"
                unoptimized
                className="mosaic-img"
              />
              <div className="mosaic-overlay" />
            </div>
            <div className="mosaic-card-content">
              <div className="mosaic-icon-pill">
                <Box size={14} aria-hidden="true" />
                <span>3D & AR Visualization</span>
              </div>
              <h3>Tactile product inspection that drives conversion.</h3>
              <p>Mobile-optimized 3D models with true-to-scale dimensions, realistic light reflections, and instant AR room projection.</p>
            </div>
          </div>

          {/* Card 2: AI Discovery (Portrait) */}
          <div className="mosaic-card card-tall">
            <div className="mosaic-image-wrap">
              <Image
                src="/images/projects/velorum.png"
                alt="AI Product Discovery"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                unoptimized
                className="mosaic-img"
              />
              <div className="mosaic-overlay" />
            </div>
            <div className="mosaic-card-content">
              <div className="mosaic-icon-pill">
                <Cpu size={14} aria-hidden="true" />
                <span>AI Commerce</span>
              </div>
              <h3>Intelligent catalog discovery without generic chatbots.</h3>
              <p>Natural language search filters and guided recommendation flows that behave like senior showroom stylists.</p>
            </div>
          </div>

          {/* Card 3: Conversion Engineering */}
          <div className="mosaic-card card-mid">
            <div className="mosaic-image-wrap">
              <Image
                src="/images/projects/oakwell.png"
                alt="Conversion Architecture"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                unoptimized
                className="mosaic-img"
              />
              <div className="mosaic-overlay" />
            </div>
            <div className="mosaic-card-content">
              <div className="mosaic-icon-pill">
                <Zap size={14} aria-hidden="true" />
                <span>Performance & Cart</span>
              </div>
              <h3>Sub-500ms edge storefronts.</h3>
              <p>Optimistic checkout updates, headless speed, and zero cart drop-off latency.</p>
            </div>
          </div>

          {/* Card 4: Lean Studio Model */}
          <div className="mosaic-card card-textual">
            <div className="mosaic-card-content studio-box">
              <span className="studio-kicker">The Studio Model</span>
              <h3>No account managers. No junior handoffs.</h3>
              <p>Direct communication with the senior software engineer building your brand’s actual digital flagship. Transparent milestones and complete code ownership.</p>
              <div className="studio-stats">
                <div className="stat-col">
                  <strong>100%</strong>
                  <span>Code Ownership</span>
                </div>
                <div className="stat-col">
                  <strong>Direct</strong>
                  <span>Founder Line</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   Who We Are — Version D: Horizontal Capability Story
   ========================================================================= */
export function WhoWeAreD() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="temp-section-block" id="who-d">
      <TempBadge label="WHO WE ARE / CONCEPT D" description="Horizontal Capability Flow · Step progression" />
      <section className="who-d-section">
        <div className="who-d-intro">
          <span className="section-kicker">Integrated Disciplines</span>
          <h2>A unified practice designed for the next era of commerce.</h2>
          <div className="who-d-nav-dots">
            {CAPABILITIES.map((c, i) => (
              <button
                key={c.id}
                type="button"
                className={`who-d-dot ${activeStep === i ? "active" : ""}`}
                onClick={() => setActiveStep(i)}
                aria-label={`Show ${c.title}`}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="who-d-track">
          {CAPABILITIES.map((cap, i) => {
            const isCurrent = activeStep === i;
            return (
              <div
                key={cap.id}
                className={`who-d-panel ${isCurrent ? "is-focused" : ""}`}
                onClick={() => setActiveStep(i)}
              >
                <div className="panel-visual">
                  <Image
                    src={cap.image}
                    alt={cap.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 420px"
                    unoptimized
                    className="panel-img"
                  />
                  <div className="panel-scrim" />
                  <span className="panel-badge">{cap.metric}</span>
                </div>
                <div className="panel-info">
                  <span className="panel-idx">Step {String(i + 1).padStart(2, "0")}</span>
                  <h3>{cap.title}</h3>
                  <p>{cap.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
