"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import TempBadge from "./TempBadge";

const FAQ_DATA = [
  {
    category: "Storefronts & Shopify",
    question: "Do you work with Shopify and hosted platforms?",
    answer:
      "Yes. We frequently build custom Next.js storefronts connected to Shopify Plus via Storefront API, keeping your proven catalog, payment gateways, and order management completely intact while replacing the templated customer interface with custom high-speed architecture.",
  },
  {
    category: "Storefronts & Shopify",
    question: "Can you improve or redesign an existing storefront without starting from scratch?",
    answer:
      "Yes. If your current store suffers from template bloat, slow mobile load times, or clunky cart flows, we can redesign and re-engineer targeted modules (e.g. cart drawer, product customizer, checkout routing) while preserving your existing data pipelines.",
  },
  {
    category: "3D & AI Commerce",
    question: "Do we need existing 3D CAD files to implement 3D or AR?",
    answer:
      "Not necessarily. If you have existing CAD or industrial design files (STEP, OBJ, FBX), we convert and optimize them into ultra-compact GLTF/GLB formats. If you only have physical studio photography, we can coordinate 3D photogrammetry and polygonal modeling for your flagship items.",
  },
  {
    category: "3D & AI Commerce",
    question: "Can AI shopping assistants be added to an existing catalog safely?",
    answer:
      "Yes. We connect vector-based semantic search to your verified catalog attributes. The assistant only recommends in-stock items with verified specifications—eliminating hallucination risks while providing conversational styling and routine advice.",
  },
  {
    category: "Scope & Handover",
    question: "Do we own the code and design assets after launch?",
    answer:
      "100% yes. You receive complete intellectual property ownership, a clean TypeScript repository, design token documentation, and administrative training. We never impose proprietary platform locks or unexpected ongoing licensing fees.",
  },
  {
    category: "Scope & Handover",
    question: "How long does a typical custom build take?",
    answer:
      "Targeted interactive features or 3D customizers typically ship in 2–4 weeks. A full custom headless storefront generally ranges from 6–10 weeks depending on custom variant logic and third-party integrations.",
  },
];

/* =========================================================================
   FAQ — Version A: Editorial Split-Column Disclosures
   ========================================================================= */
export function FaqA() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="temp-section-block" id="faq-a">
      <TempBadge label="FAQ / CONCEPT A" description="Editorial Split-Column Disclosures · Architectural Hairlines" />
      <section className="faq-a-section">
        <div className="faq-a-layout">
          <div className="faq-a-sticky-col">
            <span className="section-kicker">Clarity First</span>
            <h2>Frequently asked architectural questions.</h2>
            <p>
              Straight answers on how we collaborate, handle third-party engines, and transition IP ownership upon completion.
            </p>
            <div className="faq-a-contact-note">
              <span>Have a specific architectural question?</span>
              <Link href="/contact" className="text-link">
                Ask directly <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="faq-a-accordion-col">
            {FAQ_DATA.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={item.question} className={`faq-a-item ${isOpen ? "is-open" : ""}`}>
                  <button
                    type="button"
                    className="faq-a-trigger"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-a-q-text">{item.question}</span>
                    <span className="faq-a-icon">
                      {isOpen ? <Minus size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-a-body">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   FAQ — Version B: Categorized Minimal Matrix
   ========================================================================= */
export function FaqB() {
  const categories = ["All", "Storefronts & Shopify", "3D & AI Commerce", "Scope & Handover"];
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filtered =
    selectedCat === "All" ? FAQ_DATA : FAQ_DATA.filter((i) => i.category === selectedCat);

  return (
    <div className="temp-section-block" id="faq-b">
      <TempBadge label="FAQ / CONCEPT B" description="Categorized Minimal Matrix · Filtered Disclosures" />
      <section className="faq-b-section">
        <div className="faq-b-header">
          <span className="section-kicker">Common Inquiries</span>
          <h2>Clear parameters before we write the first line of code.</h2>

          <div className="faq-b-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`cat-pill ${selectedCat === cat ? "active" : ""}`}
                onClick={() => {
                  setSelectedCat(cat);
                  setOpenIdx(0);
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="faq-b-grid">
          {filtered.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={item.question} className={`faq-b-card ${isOpen ? "expanded" : ""}`}>
                <button
                  type="button"
                  className="faq-b-card-trigger"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                >
                  <span className="card-cat">{item.category}</span>
                  <h4>{item.question}</h4>
                  <span className="card-icon">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="faq-b-card-body">
                    <p>{item.answer}</p>
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
