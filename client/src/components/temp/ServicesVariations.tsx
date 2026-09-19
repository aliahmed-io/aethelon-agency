"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus, Minus, CheckCircle2 } from "lucide-react";
import TempBadge from "./TempBadge";

const SERVICES_DATA = [
  {
    id: "ecommerce-engineering",
    num: "01",
    title: "Ecommerce Design & Engineering",
    tagline: "Custom Next.js & Headless Storefronts Built for Speed",
    summary:
      "We design and engineer tailored commerce storefronts that surpass template constraints. From bespoke checkout flows to dynamic variant matrices, our storefronts run with sub-500ms edge caching.",
    subServices: [
      "Custom Next.js 16 App Router storefronts",
      "Headless Shopify, Stripe & Medusa integration",
      "Tailored cart slide-outs & instant checkout flows",
      "Product matrix filtering & real-time inventory sync",
    ],
    image: "/images/projects/oakwell.png",
    metric: "100/100 Core Web Vitals Standard",
  },
  {
    id: "immersive-commerce",
    num: "02",
    title: "Immersive 3D & AR Commerce",
    tagline: "Lightweight WebGL Configurators & In-Room Projection",
    summary:
      "Enable shoppers to rotate, customize, and inspect products in high-fidelity 3D directly in their mobile browser—no external apps required. Proven to increase buying confidence and eliminate return friction.",
    subServices: [
      "WebGL / Three.js lightweight product customizers",
      "Native iOS QuickLook & Android WebXR integration",
      "Material, grain, and finish color swappers",
      "Optimized GLTF/GLB asset compression pipelines",
    ],
    image: "/images/projects/lundev-furniture.png",
    metric: "60 FPS Interactive Mobile Performance",
  },
  {
    id: "ai-commerce",
    num: "03",
    title: "AI Commerce & Smart Discovery",
    tagline: "Semantic Search, Routine Builders & Guided Quizzes",
    summary:
      "Upgrade blunt catalog search into an intuitive concierge experience. We build semantic discovery engines and conversational assistants that guide buyers to the exact product without hallucinations.",
    subServices: [
      "Vector-based natural language product discovery",
      "Guided multi-step recommendation flows",
      "Automated catalog attribute enrichment",
      "Customer decision-support purchase flows",
    ],
    image: "/images/projects/aethelon.png",
    metric: "Sub-200ms Semantic Matching",
  },
  {
    id: "conversion-retention",
    num: "04",
    title: "Conversion Architecture & Retention",
    tagline: "High-Velocity Cart Flows & Editorial Newsletter Engines",
    summary:
      "Storefront performance directly impacts margin. We optimize the customer journey from first editorial impression through post-purchase confirmation with zero-flicker cart actions.",
    subServices: [
      "Optimistic UI state updates across cart items",
      "Automated cart recovery & webhook notifications",
      "Editorial newsletter & content publishing systems",
      "Comprehensive performance & bundle audits",
    ],
    image: "/images/projects/velorum.png",
    metric: "Zero Layout Shift (CLS < 0.02)",
  },
];

/* =========================================================================
   Services — Version A: Large Accordion Rows with Rich Reveal
   ========================================================================= */
export function ServicesA() {
  const [expandedId, setExpandedId] = useState<string>("ecommerce-engineering");

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? "" : id));
  };

  return (
    <div className="temp-section-block" id="services-a">
      <TempBadge label="SERVICES / CONCEPT A" description="Architectural Accordion Rows · Live Visual Reveal" />
      <section className="services-a-section">
        <div className="services-a-header">
          <span className="section-kicker">Services & Engagements</span>
          <h2>What you can hire the studio to build.</h2>
          <p>
            End-to-end execution from creative direction to full-stack deployment. Clean deliverables, fixed milestone scopes, and full IP ownership.
          </p>
        </div>

        <div className="services-a-accordion">
          {SERVICES_DATA.map((srv) => {
            const isOpen = expandedId === srv.id;
            return (
              <div key={srv.id} className={`services-a-item ${isOpen ? "is-open" : ""}`}>
                <button
                  type="button"
                  className="services-a-trigger"
                  onClick={() => toggle(srv.id)}
                  aria-expanded={isOpen}
                >
                  <div className="trigger-left">
                    <span className="services-a-num">{srv.num}</span>
                    <h3>{srv.title}</h3>
                  </div>
                  <div className="trigger-right">
                    <span className="services-a-tagline">{srv.tagline}</span>
                    <span className="services-a-icon">
                      {isOpen ? <Minus size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="services-a-panel">
                    <div className="panel-col-text">
                      <p className="panel-summary">{srv.summary}</p>
                      <ul className="panel-deliverables">
                        {srv.subServices.map((sub) => (
                          <li key={sub}>
                            <CheckCircle2 size={15} aria-hidden="true" />
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="panel-cta-wrap">
                        <Link href="/contact" className="button button-dark">
                          Discuss this service <ArrowUpRight size={14} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>

                    <div className="panel-col-visual">
                      <div className="panel-visual-frame">
                        <Image
                          src={srv.image}
                          alt={srv.title}
                          fill
                          sizes="(max-width: 900px) 100vw, 400px"
                          unoptimized
                          className="panel-img"
                        />
                        <div className="panel-scrim" />
                        <span className="panel-metric-chip">{srv.metric}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   Services — Version B: Sticky Left Index + Dynamic Right Visual
   ========================================================================= */
export function ServicesB() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const current = SERVICES_DATA[activeIdx] || SERVICES_DATA[0]!;

  return (
    <div className="temp-section-block" id="services-b">
      <TempBadge label="SERVICES / CONCEPT B" description="Sticky Index + Dynamic Canvas · Studio Directory" />
      <section className="services-b-section">
        <div className="services-b-layout">
          {/* Left Column: Sticky Service Index */}
          <div className="services-b-left">
            <span className="section-kicker">Capabilities Directory</span>
            <h2>Bespoke engineering for modern commerce brands.</h2>
            <div className="services-b-index-list">
              {SERVICES_DATA.map((srv, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={srv.id}
                    type="button"
                    className={`services-b-item-btn ${isActive ? "is-active" : ""}`}
                    onClick={() => setActiveIdx(idx)}
                  >
                    <span className="item-num">{srv.num}</span>
                    <div className="item-text">
                      <h4>{srv.title}</h4>
                      <span className="item-tagline">{srv.tagline}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="services-b-bottom-cta">
              <Link href="/services" className="text-link">
                Explore detailed service specifications <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right Column: High-Definition Canvas */}
          <div className="services-b-right">
            <div className="services-b-canvas">
              <Image
                src={current.image}
                alt={current.title}
                fill
                sizes="(max-width: 900px) 100vw, 55vw"
                unoptimized
                className="canvas-img"
              />
              <div className="canvas-overlay" />
              <div className="canvas-content-box">
                <span className="canvas-badge">{current.metric}</span>
                <h3>{current.title}</h3>
                <p>{current.summary}</p>
                <div className="canvas-tags">
                  {current.subServices.map((sub) => (
                    <span key={sub} className="canvas-tag-pill">
                      {sub}
                    </span>
                  ))}
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
   Services — Version C: Monolithic Editorial Rows
   ========================================================================= */
export function ServicesC() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="temp-section-block" id="services-c">
      <TempBadge label="SERVICES / CONCEPT C" description="Monolithic Editorial Rows · High-Impact Typography" />
      <section className="services-c-section">
        <div className="services-c-header">
          <span className="section-kicker">Practice Areas</span>
          <h2>Four core disciplines. One unified senior team.</h2>
        </div>

        <div className="services-c-rows">
          {SERVICES_DATA.map((srv, idx) => (
            <div
              key={srv.id}
              className="services-c-row"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="services-c-row-top">
                <span className="row-num">{srv.num}</span>
                <h3 className="row-title">{srv.title}</h3>
                <Link href="/contact" className="row-link" aria-label={`Hire us for ${srv.title}`}>
                  <ArrowUpRight size={22} aria-hidden="true" />
                </Link>
              </div>
              <div className="services-c-row-bottom">
                <p className="row-summary">{srv.summary}</p>
                <div className="row-chips">
                  {srv.subServices.map((sub) => (
                    <span key={sub} className="chip">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
