"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Compass, Sparkles, Layout, ChevronDown } from "lucide-react";

import { HeroAlternativeA, HeroAlternativeB, HeroAlternativeC, HeroAlternativeD } from "../components/temp/HeroVariations";
import NavigationVariations from "../components/temp/NavigationVariations";
import { WhoWeAreA, WhoWeAreB, WhoWeAreC, WhoWeAreD } from "../components/temp/WhoWeAreVariations";
import { SelectedWorkA, SelectedWorkB, SelectedWorkC } from "../components/temp/SelectedWorkVariations";
import { ServicesA, ServicesB, ServicesC } from "../components/temp/ServicesVariations";
import { InsightsA, InsightsB, InsightsC } from "../components/temp/InsightsVariations";
import { PositioningA, PositioningB } from "../components/temp/PositioningVariations";
import { FaqA, FaqB } from "../components/temp/FaqVariations";
import { NewsletterA, NewsletterB } from "../components/temp/NewsletterVariations";
import { FooterA, FooterB } from "../components/temp/FooterVariations";

export default function TempComparisonPage() {
  const sections = [
    { id: "sec-nav", label: "0. Navigation Bar", count: "4 Alternatives" },
    { id: "sec-hero", label: "1. Hero Section", count: "4 Alternatives" },
    { id: "sec-who", label: "2. Who We Are", count: "4 Concepts" },
    { id: "sec-work", label: "3. Selected Work", count: "3 Concepts" },
    { id: "sec-services", label: "4. Services", count: "3 Concepts" },
    { id: "sec-insights", label: "5. Insights", count: "3 Concepts" },
    { id: "sec-positioning", label: "6. Positioning", count: "2 Concepts" },
    { id: "sec-faq", label: "7. FAQ", count: "2 Concepts" },
    { id: "sec-newsletter", label: "8. Newsletter", count: "2 Concepts" },
    { id: "sec-footer", label: "9. Footer", count: "2 Concepts" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="temp-comparison-page">
      {/* Sticky Quick-Jump Navigation Bar */}
      <header className="temp-sticky-nav" role="navigation" aria-label="Comparison Sections">
        <div className="temp-nav-inner">
          <div className="temp-nav-brand">
            <span className="nav-pill-badge">Design Evaluation Lab</span>
            <span className="nav-title">Homepage Redesign Review</span>
          </div>

          <div className="temp-nav-links">
            {sections.map((sec) => (
              <button
                key={sec.id}
                type="button"
                className="temp-nav-btn"
                onClick={() => scrollTo(sec.id)}
              >
                <span className="btn-label">{sec.label}</span>
                <span className="btn-count">{sec.count}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Lab Overview Banner */}
      <section className="temp-lab-hero">
        <div className="lab-hero-inner">
          <div className="lab-eyebrow">
            Aethelon Homepage Evolution
          </div>
          <h1>Compare & Select Your Preferred Homepage Direction.</h1>
          <p>
            Review all major section alternatives implemented below in production-grade code. Each option adheres strictly to Aethelon’s warm archival paper aesthetic, Space Grotesk / DM Sans typography, generous vertical breathing room, and intentional micro-interactions.
          </p>
          <div className="lab-instructions">
            <span>Scroll through the live options below, test their interactions, and note your picks (e.g. Hero A/B/C/D, Who We Are C, Work A, Services B, Insights A, Positioning B, FAQ A, Newsletter A, Footer A).</span>
          </div>
        </div>
      </section>

      {/* ===================================================================
          0. NAVIGATION & MENU: 4 DISTINCT ALTERNATIVES (MINIMAL TO EXTREME)
          =================================================================== */}
      <NavigationVariations />

      <div className="temp-sub-divider" />

      {/* ===================================================================
          1. HERO SECTION: 4 DISTINCT ALTERNATIVES (Z-LAYER & CANVAS CUT FIXES)
          =================================================================== */}
      <div id="sec-hero" className="temp-section-separator">
        <div className="separator-inner">
          <span className="separator-num">SECTION 01 · 4 ALTERNATIVES</span>
          <h2>Hero Section · Z-Layer Transition & Uncut Canvas Alternatives</h2>
          <p>Comparing 4 distinct approaches to eliminate mid-transition Z-index popping and prevent cards from being sliced by the canvas container boundary. All options have hover animations completely removed and operate via butter-smooth dragging.</p>
        </div>
      </div>

      {/* Alternative A: 3D Vertical Arc-Lift + Unclipped Split Stage */}
      <HeroAlternativeA />

      <div className="temp-sub-divider" />

      {/* Alternative B: True Ask Phill Centered Horizon + Lateral Side-Swing Orbit */}
      <HeroAlternativeB />

      <div className="temp-sub-divider" />

      {/* Alternative C: Direction-Locked Depth Peel + Asymmetric Editorial Bleed */}
      <HeroAlternativeC />

      <div className="temp-sub-divider" />

      {/* Alternative D: Unified Full Canvas + Layered Copy (Alt 1 Build) */}
      <HeroAlternativeD />

      {/* ===================================================================
          2. WHO WE ARE / CAPABILITIES
          =================================================================== */}
      <div id="sec-who" className="temp-section-separator">
        <div className="separator-inner">
          <span className="separator-num">SECTION 02</span>
          <h2>Who We Are / What We're Good At (4 Concepts)</h2>
          <p>Establishing what makes Aethelon different: 3D, AR, AI, conversion systems, and direct senior execution without agency overhead.</p>
        </div>
      </div>
      <WhoWeAreA />
      <div className="temp-sub-divider" />
      <WhoWeAreB />
      <div className="temp-sub-divider" />
      <WhoWeAreC />
      <div className="temp-sub-divider" />
      <WhoWeAreD />

      {/* ===================================================================
          3. SELECTED WORK / WHAT WE BUILD
          =================================================================== */}
      <div id="sec-work" className="temp-section-separator">
        <div className="separator-inner">
          <span className="separator-num">SECTION 03</span>
          <h2>Selected Work / What We Build (3 Concepts)</h2>
          <p>Visual-first showcase using real project imagery (Oakwell, Velorum, Aethelon, Lundev, Novexa) with zero fabricated client results.</p>
        </div>
      </div>
      <SelectedWorkA />
      <div className="temp-sub-divider" />
      <SelectedWorkB />
      <div className="temp-sub-divider" />
      <SelectedWorkC />

      {/* ===================================================================
          4. SERVICES
          =================================================================== */}
      <div id="sec-services" className="temp-section-separator">
        <div className="separator-inner">
          <span className="separator-num">SECTION 04</span>
          <h2>Services (3 Concepts)</h2>
          <p>Clear architectural offerings: Ecommerce Engineering, Immersive 3D & AR, AI Commerce, and Conversion Systems.</p>
        </div>
      </div>
      <ServicesA />
      <div className="temp-sub-divider" />
      <ServicesB />
      <div className="temp-sub-divider" />
      <ServicesC />

      {/* ===================================================================
          5. COMMERCE INSIGHTS / BLOG
          =================================================================== */}
      <div id="sec-insights" className="temp-section-separator">
        <div className="separator-inner">
          <span className="separator-num">SECTION 05</span>
          <h2>Commerce Insights / Editorial Notes (3 Concepts)</h2>
          <p>Magazine-like publications demonstrating technical authority using real Aethelon articles.</p>
        </div>
      </div>
      <InsightsA />
      <div className="temp-sub-divider" />
      <InsightsB />
      <div className="temp-sub-divider" />
      <InsightsC />

      {/* ===================================================================
          6. POSITIONING / CONVERSION
          =================================================================== */}
      <div id="sec-positioning" className="temp-section-separator">
        <div className="separator-inner">
          <span className="separator-num">SECTION 06</span>
          <h2>Positioning / Studio Trust (2 Concepts)</h2>
          <p>Creating psychological confidence before the FAQ: interactive build timeline vs. transparent studio model comparison.</p>
        </div>
      </div>
      <PositioningA />
      <div className="temp-sub-divider" />
      <PositioningB />

      {/* ===================================================================
          7. COMMON QUESTIONS / FAQ
          =================================================================== */}
      <div id="sec-faq" className="temp-section-separator">
        <div className="separator-inner">
          <span className="separator-num">SECTION 07</span>
          <h2>Common Questions (2 Concepts)</h2>
          <p>High-clarity parameters on Shopify, headless platforms, 3D assets, timeline, and complete code ownership.</p>
        </div>
      </div>
      <FaqA />
      <div className="temp-sub-divider" />
      <FaqB />

      {/* ===================================================================
          8. NEWSLETTER
          =================================================================== */}
      <div id="sec-newsletter" className="temp-section-separator">
        <div className="separator-inner">
          <span className="separator-num">SECTION 08</span>
          <h2>Newsletter (2 Concepts)</h2>
          <p>Editorial Commerce Brief with negative space vs. architectural minimal dispatch strip.</p>
        </div>
      </div>
      <NewsletterA />
      <div className="temp-sub-divider" />
      <NewsletterB />

      {/* ===================================================================
          9. FOOTER
          =================================================================== */}
      <div id="sec-footer" className="temp-section-separator">
        <div className="separator-inner">
          <span className="separator-num">SECTION 09</span>
          <h2>Footer (2 Concepts)</h2>
          <p>Monumental architectural wordmark with expansive columns vs. quiet editorial colophon.</p>
        </div>
      </div>
      <FooterA />
      <div className="temp-sub-divider" />
      <FooterB />

      {/* Bottom Floating Decision Helper */}
      <div className="temp-bottom-bar">
        <div className="bottom-bar-inner">
          <span>Ready to combine your selected versions into the production homepage?</span>
          <a href="#sec-hero" className="button button-dark">
            Back to top
          </a>
        </div>
      </div>
    </div>
  );
}
