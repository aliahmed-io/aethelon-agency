"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import ConceptEditorialSpotlight from "../components/preview/ConceptEditorialSpotlight";
import ConceptStudioPromise from "../components/preview/ConceptStudioPromise";
import ConceptVisualCurationReel from "../components/preview/ConceptVisualCurationReel";
import ConceptRestraintManifesto from "../components/preview/ConceptRestraintManifesto";

export default function SectionPreviewPage() {
  const [activeNav, setActiveNav] = useState<string>("concept-1");

  const scrollTo = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="section-preview-page">
      {/* Sticky Concept Switcher Bar */}
      <nav className="preview-nav-bar" aria-label="Concept Navigation">
        <div className="preview-nav-inner">
          <div className="preview-nav-brand">
            <span className="preview-badge">STUDIO LAB</span>
            <strong>Section 02 · Storytelling & Trust</strong>
          </div>

          <div className="preview-nav-buttons">
            <button
              type="button"
              className={`preview-nav-btn ${activeNav === "concept-1" ? "active" : ""}`}
              onClick={() => scrollTo("concept-1")}
            >
              01 Case Spotlight
            </button>
            <button
              type="button"
              className={`preview-nav-btn ${activeNav === "concept-2" ? "active" : ""}`}
              onClick={() => scrollTo("concept-2")}
            >
              02 Studio Promise
            </button>
            <button
              type="button"
              className={`preview-nav-btn ${activeNav === "concept-3" ? "active" : ""}`}
              onClick={() => scrollTo("concept-3")}
            >
              03 Visual Worlds
            </button>
            <button
              type="button"
              className={`preview-nav-btn ${activeNav === "concept-4" ? "active" : ""}`}
              onClick={() => scrollTo("concept-4")}
            >
              04 Philosophy of Restraint
            </button>
          </div>

          <Link href="/" className="button button-paper preview-back-link">
            Return to Homepage <ArrowRight size={13} />
          </Link>
        </div>
      </nav>

      {/* Hero Intro */}
      <header className="preview-hero-intro">
        <div className="preview-eyebrow">
          <span className="signal-dot" /> Visual Craft, Storytelling & Trust
        </div>
        <h1>
          4 New Editorial Directions for<br />
          <em>Section 02.</em>
        </h1>
        <p>
          We’ve completely replaced the technical dashboards and simulated widgets with authentic editorial storytelling, generous breathing space, and genuine human trust. Explore all four live proposals below.
        </p>
      </header>

      {/* =========================================================================
          CONCEPT 01: THE EDITORIAL CASE SPOTLIGHT
          ========================================================================= */}
      <section id="concept-1" className="preview-concept-container">
        <ConceptEditorialSpotlight />
      </section>

      {/* WHITE BREAK 1 */}
      <aside className="white-break-divider">
        <div className="white-break-content">
          <div className="break-tag-row">
            <span className="break-badge">EVALUATION BREAK // 01</span>
            <span className="break-status">Brand Transformation & Storytelling</span>
          </div>
          <h3 className="break-title">Concept 01: The Editorial Case Spotlight</h3>
          <div className="break-grid">
            <div className="break-col">
              <h5>Why it works & builds trust</h5>
              <ul>
                <li>Highlights real client work (Oakwell) through an authentic transformation story instead of a generic feature list.</li>
                <li>Includes an honest, grounded founder testimonial that reassures potential clients of real-world results.</li>
                <li>Warm, breathing photography paired with generous editorial typography creates instant perceived luxury.</li>
              </ul>
            </div>
            <div className="break-col">
              <h5>Aesthetic Feeling</h5>
              <p>Feels like an architectural feature article in Kinfolk or Cereal Magazine. Quiet, human, and deeply credible.</p>
            </div>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          CONCEPT 02: THE FOUNDER'S STUDIO PROMISE
          ========================================================================= */}
      <section id="concept-2" className="preview-concept-container">
        <ConceptStudioPromise />
      </section>

      {/* WHITE BREAK 2 */}
      <aside className="white-break-divider">
        <div className="white-break-content">
          <div className="break-tag-row">
            <span className="break-badge">EVALUATION BREAK // 02</span>
            <span className="break-status">Founder Transparency & Direct Partnership</span>
          </div>
          <h3 className="break-title">Concept 02: The Founder's Studio Promise</h3>
          <div className="break-grid">
            <div className="break-col">
              <h5>Why it works & builds trust</h5>
              <ul>
                <li>Directly addresses the primary fear of hiring an agency: being passed off to junior contractors and buried in bureaucracy.</li>
                <li>Explicitly states the studio's capacity limit (4 flagship builds/year), conveying exclusivity and dedicated focus.</li>
                <li>Guarantees 100% client code ownership, direct communication, and zero lock-in retainers.</li>
              </ul>
            </div>
            <div className="break-col">
              <h5>Aesthetic Feeling</h5>
              <p>Direct, confident, and utterly transparent. Speaks directly to founders who value personal accountability and senior craftsmanship.</p>
            </div>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          CONCEPT 03: THE VISUAL CURATION REEL
          ========================================================================= */}
      <section id="concept-3" className="preview-concept-container">
        <ConceptVisualCurationReel />
      </section>

      {/* WHITE BREAK 3 */}
      <aside className="white-break-divider">
        <div className="white-break-content">
          <div className="break-tag-row">
            <span className="break-badge">EVALUATION BREAK // 03</span>
            <span className="break-status">Tactile Brand Worlds & Sensory Curation</span>
          </div>
          <h3 className="break-title">Concept 03: The Visual Curation Reel</h3>
          <div className="break-grid">
            <div className="break-col">
              <h5>Why it works & builds trust</h5>
              <ul>
                <li>Proves versatile design mastery across three distinct luxury domains: Haute Horology, Spatial Furniture, and Technical Footwear.</li>
                <li>Focuses on sensory desire—treating digital stores as physical ateliers with rich textures and unhurried pacing.</li>
                <li>A clean, intuitive tab interaction with zero tech jargon or clutter.</li>
              </ul>
            </div>
            <div className="break-col">
              <h5>Aesthetic Feeling</h5>
              <p>High-end European digital studio (Ask Phill, Studio Freight, B-Reel). Cinematic, sensory, and visually magnetic.</p>
            </div>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          CONCEPT 04: THE PHILOSOPHY OF RESTRAINT
          ========================================================================= */}
      <section id="concept-4" className="preview-concept-container">
        <ConceptRestraintManifesto />
      </section>

      {/* WHITE BREAK 4 */}
      <aside className="white-break-divider">
        <div className="white-break-content">
          <div className="break-tag-row">
            <span className="break-badge">EVALUATION BREAK // 04</span>
            <span className="break-status">Swiss Restraint & Quiet Luxury</span>
          </div>
          <h3 className="break-title">Concept 04: The Philosophy of Restraint</h3>
          <div className="break-grid">
            <div className="break-col">
              <h5>Why it works & builds trust</h5>
              <ul>
                <li>Bold, contrarian positioning: *"The best stores don’t shout. They create calm."*</li>
                <li>Reassures premium brands that their online presence will be treated with timeless elegance rather than disposable trends.</li>
                <li>Editorial diptych pairing physical workshop craftsmanship with serene digital execution.</li>
              </ul>
            </div>
            <div className="break-col">
              <h5>Aesthetic Feeling</h5>
              <p>Swiss modernist manifesto. Generous negative space, uncompromising typography, and quiet, enduring authority.</p>
            </div>
          </div>
        </div>
      </aside>

      {/* FINAL DECISION SUMMARY CARD */}
      <footer className="preview-decision-footer">
        <div className="decision-card">
          <div className="decision-header">
            <Sparkles size={20} className="text-amber-500" />
            <h3>Which storytelling direction feels right to you?</h3>
          </div>
          <p>
            Review these four calm, breathing designs on desktop and mobile:
          </p>
          <div className="decision-options-list">
            <div className="decision-item">
              <strong>Option 1: The Editorial Case Spotlight</strong> — Brand transformation narrative with founder quote & warm imagery.
            </div>
            <div className="decision-item">
              <strong>Option 2: The Founder's Studio Promise</strong> — Personal partnership, direct senior communication & 100% code ownership.
            </div>
            <div className="decision-item">
              <strong>Option 3: The Visual Curation Reel</strong> — Sensory luxury worlds across Horology, Furniture, and Technical Footwear.
            </div>
            <div className="decision-item">
              <strong>Option 4: The Philosophy of Restraint</strong> — Quiet luxury manifesto with physical/digital photographic diptych.
            </div>
          </div>
          <p className="decision-note">
            When you decide which one best captures your brand vision, simply tell me your choice. I will apply it to the live homepage and remove this temporary page!
          </p>
        </div>
      </footer>
    </div>
  );
}
