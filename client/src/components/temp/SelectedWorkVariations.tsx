"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import TempBadge from "./TempBadge";

const REAL_PROJECTS = [
  {
    id: "oakwell",
    title: "Oakwell Furniture",
    category: "Spatial Furniture Commerce",
    tags: ["Headless Storefront", "Room Staging", "Next.js 16"],
    image: "/images/projects/oakwell.png",
    aspectRatio: "16/10",
    href: "/work/oakwell-furniture-commerce",
    year: "2026",
    summary: "Bespoke digital flagship engineered with room staging, persistent cart drawer, and high-resolution material inspect.",
  },
  {
    id: "velorum",
    title: "Velorum Horology",
    category: "Haute Horology Flagship",
    tags: ["Interactive 3D", "WebGL Shaders", "Sub-400ms"],
    image: "/images/projects/velorum.png",
    aspectRatio: "16/10",
    href: "/work/velorum-watch-commerce",
    year: "2026",
    summary: "Swiss watch flagship with real-time 3D case anatomy exploded view, luxury dark mode, and zero-flicker checkout.",
  },
  {
    id: "aethelon",
    title: "Aethelon Modern",
    category: "Spatial Living Platform",
    tags: ["Full-Stack App", "Prisma Database", "Stripe"],
    image: "/images/projects/aethelon.png",
    aspectRatio: "16/10",
    href: "/work/aethelon-furniture-commerce",
    year: "2026",
    summary: "End-to-end commerce ecosystem with custom inventory API, administrative management portal, and optimistic cart updates.",
  },
  {
    id: "lundev",
    title: "Lundev 3D Studio",
    category: "Tactile Materials & AR",
    tags: ["Three.js", "QuickLook AR", "GLTF Pipeline"],
    image: "/images/projects/lundev-furniture.png",
    aspectRatio: "16/10",
    href: "/work/lundev-furniture-experience",
    year: "2026",
    summary: "Browser-based 3D configurator letting customers inspect fabric textures, timber grains, and project into spaces via AR.",
  },
  {
    id: "novexa",
    title: "Novexa Athletics",
    category: "Performance Apparel",
    tags: ["Editorial Commerce", "High-Velocity Cart", "Mobile-First"],
    image: "/images/projects/novexa.png",
    aspectRatio: "16/10",
    href: "/work/novexa-product-commerce",
    year: "2026",
    summary: "High-contrast technical athletic brand featuring fluid category filters, interactive lookbook slides, and rapid checkout.",
  },
];

/* =========================================================================
   Selected Work — Version A: Premium Creative Agency Portfolio
   ========================================================================= */
export function SelectedWorkA() {
  return (
    <div className="temp-section-block" id="work-a">
      <TempBadge label="SELECTED WORK / CONCEPT A" description="Premium Creative Agency Portfolio · Editorial Hierarchy" />
      <section className="work-a-section">
        <div className="work-a-header">
          <div className="work-a-title-col">
            <span className="section-kicker">Selected Work</span>
            <h2>What we have been building.</h2>
          </div>
          <div className="work-a-desc-col">
            <p>
              A selection of digital flagships, 3D configurators, and headless storefronts engineered in the studio. Visuals lead every build.
            </p>
            <Link href="/work" className="text-link">
              View complete archive <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="work-a-grid">
          {REAL_PROJECTS.slice(0, 4).map((p, idx) => (
            <Link key={p.id} href={p.href} className={`work-a-card card-span-${idx % 2 === 0 ? "wide" : "tall"}`}>
              <div className="work-a-image-wrap">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  unoptimized
                  className="work-a-img"
                />
                <div className="work-a-overlay" />
                <div className="work-a-tags-float">
                  {p.tags.map((t) => (
                    <span key={t} className="tag-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="work-a-meta">
                <div className="meta-headline">
                  <h3>{p.title}</h3>
                  <span className="meta-arrow">
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                </div>
                <div className="meta-details">
                  <span className="meta-cat">{p.category}</span>
                  <span className="meta-year">{p.year}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   Selected Work — Version B: Horizontal Filmstrip Browsing
   ========================================================================= */
export function SelectedWorkB() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -480 : 480;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="temp-section-block" id="work-b">
      <TempBadge label="SELECTED WORK / CONCEPT B" description="Horizontal Filmstrip · Tactile Project Slider" />
      <section className="work-b-section">
        <div className="work-b-header">
          <div>
            <span className="section-kicker">Commerce Experiments</span>
            <h2>Flagship storefronts & spatial interfaces.</h2>
          </div>
          <div className="work-b-controls">
            <button
              type="button"
              className="slider-arrow-btn"
              onClick={() => scroll("left")}
              aria-label="Scroll projects left"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="slider-arrow-btn"
              onClick={() => scroll("right")}
              aria-label="Scroll projects right"
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="work-b-track" ref={scrollRef}>
          {REAL_PROJECTS.map((p) => (
            <Link key={p.id} href={p.href} className="work-b-slide">
              <div className="slide-image-frame">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="480px"
                  unoptimized
                  className="slide-img"
                />
                <div className="slide-scrim" />
                <span className="slide-badge">{p.category}</span>
              </div>
              <div className="slide-footer">
                <div className="slide-titles">
                  <h4>{p.title}</h4>
                  <p>{p.summary}</p>
                </div>
                <span className="slide-arrow">
                  <ArrowUpRight size={16} aria-hidden="true" />
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
   Selected Work — Version C: Dramatic Oversized Case-Study Spreads
   ========================================================================= */
export function SelectedWorkC() {
  const [activeCase, setActiveCase] = useState<number>(0);
  const current = REAL_PROJECTS[activeCase] || REAL_PROJECTS[0]!;

  return (
    <div className="temp-section-block" id="work-c">
      <TempBadge label="SELECTED WORK / CONCEPT C" description="Dramatic Case-Study Spread · Architectural Deep Dive" />
      <section className="work-c-section">
        <div className="work-c-header">
          <span className="section-kicker">Engineered Flagships</span>
          <h2>A closer look at how each platform functions.</h2>
          <div className="work-c-tabs">
            {REAL_PROJECTS.slice(0, 4).map((p, idx) => (
              <button
                key={p.id}
                type="button"
                className={`work-c-tab-btn ${activeCase === idx ? "is-active" : ""}`}
                onClick={() => setActiveCase(idx)}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        <div className="work-c-spread">
          <div className="work-c-visual">
            <Image
              src={current.image}
              alt={current.title}
              fill
              sizes="(max-width: 900px) 100vw, 65vw"
              unoptimized
              className="spread-img"
            />
          </div>

          <div className="work-c-anatomy">
            <div className="anatomy-top">
              <span className="anatomy-cat">{current.category}</span>
              <h3>{current.title}</h3>
              <p>{current.summary}</p>
            </div>

            <div className="anatomy-specs">
              <div className="spec-row">
                <span className="spec-label">Architecture</span>
                <span className="spec-val">Next.js 16 App Router · TypeScript</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Capabilities</span>
                <span className="spec-val">{current.tags.join(" · ")}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Year</span>
                <span className="spec-val">{current.year}</span>
              </div>
            </div>

            <div className="anatomy-actions">
              <Link href={current.href} className="button button-dark">
                Explore case study <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
