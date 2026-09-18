"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ConceptEditorialSpotlight() {
  const [activeStory, setActiveStory] = useState<"vision" | "craft">("vision");

  return (
    <div className="concept-spotlight-section">
      <div className="spotlight-container">
        {/* Left: Large Breathing Editorial Visual */}
        <div className="spotlight-visual-col">
          <div className="spotlight-image-frame">
            <Image
              src="/images/oakwell/editorial/living.jpg"
              alt="Oakwell handcrafted solid walnut living space"
              fill
              unoptimized
              className="cover-image spotlight-img"
              sizes="(max-width: 900px) 100vw, 48vw"
            />
            <div className="spotlight-image-caption">
              <span>ARCHITECTURAL CASE STUDY</span>
              <strong>Oakwell · Hand-Turned Walnut & Stone</strong>
            </div>
          </div>
        </div>

        {/* Right: Thoughtful Editorial Storytelling */}
        <div className="spotlight-story-col">
          <div className="spotlight-eyebrow">
            <span className="signal-dot" /> 02 · The Client Transformation
          </div>

          <h2 className="spotlight-headline">
            Translating physical craft into<br />
            <em>serene digital desire.</em>
          </h2>

          {/* Simple, Calm Story Switcher */}
          <div className="spotlight-narrative-tabs">
            <button
              type="button"
              className={`narrative-tab-btn ${activeStory === "vision" ? "active" : ""}`}
              onClick={() => setActiveStory("vision")}
            >
              The Transformation
            </button>
            <button
              type="button"
              className={`narrative-tab-btn ${activeStory === "craft" ? "active" : ""}`}
              onClick={() => setActiveStory("craft")}
            >
              The Living Details
            </button>
          </div>

          {activeStory === "vision" ? (
            <div className="spotlight-story-body">
              <p>
                Oakwell spends months hand-carving every single console and dining table from sustainable walnut and Roman travertine. Yet their online store felt like a templated catalog—flat, transactional, and detached from the physical workshop.
              </p>
              <p>
                We partnered directly with their team to build an editorial world: full-bleed spatial room tours, daylight-responsive photography, and quiet typographic pacing that lets visitors feel the weight and permanence of every object.
              </p>
            </div>
          ) : (
            <div className="spotlight-story-body">
              <p>
                Every interaction was designed to mirror the calm of a physical gallery. We replaced aggressive popups and cart alerts with fluid drawer transitions, authentic artisan essays, and unhurried material zoom views.
              </p>
              <p>
                The digital platform doesn’t just sell furniture—it validates the six-month waitlist and establishes Oakwell as an enduring modern heritage brand.
              </p>
            </div>
          )}

          {/* Founder Quote */}
          <blockquote className="spotlight-quote">
            <p>
              “Our online inquiries tripled within ninety days, but more importantly, our collectors finally understand the patience and craft behind our pieces before they ever place an order.”
            </p>
            <cite>— Julian & Clara Vance, Founders of Oakwell</cite>
          </blockquote>

          <div className="spotlight-action">
            <Link href="/work/oakwell-furniture-commerce" className="text-link spotlight-link">
              Explore the full Oakwell case study <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
