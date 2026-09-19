"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";
import TempBadge from "./TempBadge";

const REAL_ARTICLES = [
  {
    slug: "custom-storefront-vs-hosted-platform",
    title: "A custom storefront is not anti-Shopify. It is a decision about control.",
    excerpt:
      "Hosted commerce is excellent infrastructure. The case for custom is what happens above it: the speed, story, discovery, and buying experience your brand can own.",
    category: "Architecture & Strategy",
    readTime: "9 min read",
    date: "Jan 2026",
    image: "/images/oakwell/editorial/dining.jpg",
  },
  {
    slug: "why-3d-product-previews-earn-their-bandwidth",
    title: "Why 3D product previews earn their bandwidth.",
    excerpt:
      "Interactive 3D configurators replace speculative returns with tactile certainty. The economics of WebGL compression and 60fps mobile frame rates.",
    category: "Spatial Commerce",
    readTime: "7 min read",
    date: "Feb 2026",
    image: "/images/projects/velorum.png",
  },
  {
    slug: "why-an-ai-shopping-assistant-is-good",
    title: "Semantic discovery and the death of generic storefront chatbots.",
    excerpt:
      "Context-aware product recommendations and natural-language styling quizzes convert high-consideration buyers without hallucination risk.",
    category: "AI & Discovery",
    readTime: "6 min read",
    date: "Feb 2026",
    image: "/images/projects/aethelon.png",
  },
];

/* =========================================================================
   Commerce Insights — Version A: Featured Lead + Twin Supporting Articles
   ========================================================================= */
export function InsightsA() {
  const lead = REAL_ARTICLES[0]!;
  const supporting = REAL_ARTICLES.slice(1, 3);

  return (
    <div className="temp-section-block" id="insights-a">
      <TempBadge label="COMMERCE INSIGHTS / CONCEPT A" description="Magazine Lead + Twin Companion Cards · Editorial Weight" />
      <section className="insights-a-section">
        <div className="insights-a-header">
          <div className="header-text">
            <span className="section-kicker">Commerce Insights</span>
            <h2>Notes from the engineering studio.</h2>
          </div>
          <Link href="/insights" className="text-link">
            View all publications <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="insights-a-layout">
          {/* Main Dominant Featured Article */}
          <Link href={`/insights/${lead.slug}`} className="insights-a-lead-card">
            <div className="lead-image-frame">
              <Image
                src={lead.image}
                alt={lead.title}
                fill
                sizes="(max-width: 900px) 100vw, 60vw"
                unoptimized
                className="lead-img"
              />
              <div className="lead-scrim" />
              <span className="lead-chip">{lead.category}</span>
            </div>
            <div className="lead-body">
              <div className="meta-line">
                <span className="meta-time">{lead.readTime}</span>
                <span className="meta-sep">·</span>
                <span className="meta-date">{lead.date}</span>
              </div>
              <h3>{lead.title}</h3>
              <p>{lead.excerpt}</p>
              <span className="lead-read-link">
                Read essay <ArrowUpRight size={14} aria-hidden="true" />
              </span>
            </div>
          </Link>

          {/* Supporting Column */}
          <div className="insights-a-supporting-col">
            {supporting.map((art) => (
              <Link key={art.slug} href={`/insights/${art.slug}`} className="insights-a-sub-card">
                <div className="sub-image-wrap">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 40vw"
                    unoptimized
                    className="sub-img"
                  />
                  <span className="sub-chip">{art.category}</span>
                </div>
                <div className="sub-content">
                  <div className="meta-line">
                    <span className="meta-time">{art.readTime}</span>
                    <span className="meta-sep">·</span>
                    <span className="meta-date">{art.date}</span>
                  </div>
                  <h4>{art.title}</h4>
                  <p>{art.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   Commerce Insights — Version B: Three-Column Broadsheet
   ========================================================================= */
export function InsightsB() {
  return (
    <div className="temp-section-block" id="insights-b">
      <TempBadge label="COMMERCE INSIGHTS / CONCEPT B" description="Three-Column Editorial Broadsheet · Clean Cadence" />
      <section className="insights-b-section">
        <div className="insights-b-header">
          <span className="section-kicker">Field Notes & Essays</span>
          <h2>Perspectives on modern ecommerce engineering.</h2>
        </div>

        <div className="insights-b-grid">
          {REAL_ARTICLES.map((art, idx) => (
            <Link key={art.slug} href={`/insights/${art.slug}`} className="insights-b-col-card">
              <div className="broadsheet-image-frame">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  unoptimized
                  className="broadsheet-img"
                />
                <span className="broadsheet-tag">{art.category}</span>
              </div>
              <div className="broadsheet-content">
                <div className="broadsheet-meta">
                  <span>{art.date}</span>
                  <span>{art.readTime}</span>
                </div>
                <h3>{art.title}</h3>
                <p>{art.excerpt}</p>
                <span className="broadsheet-link">
                  Read article <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   Commerce Insights — Version C: Interactive Visual Editorial Reel
   ========================================================================= */
export function InsightsC() {
  const [focusedIdx, setFocusedIdx] = useState<number>(0);

  return (
    <div className="temp-section-block" id="insights-c">
      <TempBadge label="COMMERCE INSIGHTS / CONCEPT C" description="Interactive Editorial Reel · Focused Highlight" />
      <section className="insights-c-section">
        <div className="insights-c-header">
          <div>
            <span className="section-kicker">Dispatches</span>
            <h2>Tested research on what actually drives commerce growth.</h2>
          </div>
          <div className="insights-c-selector">
            {REAL_ARTICLES.map((art, i) => (
              <button
                key={art.slug}
                type="button"
                className={`selector-btn ${focusedIdx === i ? "is-selected" : ""}`}
                onClick={() => setFocusedIdx(i)}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="insights-c-stage">
          {REAL_ARTICLES.map((art, i) => {
            const isCurrent = focusedIdx === i;
            return (
              <Link
                key={art.slug}
                href={`/insights/${art.slug}`}
                className={`insights-c-card ${isCurrent ? "is-active" : ""}`}
                onMouseEnter={() => setFocusedIdx(i)}
              >
                <div className="c-img-wrap">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                    className="c-img"
                  />
                  <div className="c-scrim" />
                  <span className="c-badge">{art.category}</span>
                </div>
                <div className="c-info">
                  <span className="c-read">{art.readTime}</span>
                  <h3>{art.title}</h3>
                  <p>{art.excerpt}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
