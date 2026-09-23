"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";
import HeroFannedCards from "../components/islands/HeroFannedCards";
import BusinessImpactSection from "../components/islands/BusinessImpactSection";
import SpatialProductStage from "../components/islands/SpatialProductStage";
import AiVisionShowcase from "../components/islands/AiVisionShowcase";
import ServicesCapabilitiesGrid from "../components/islands/ServicesCapabilitiesGrid";
import { Marquee } from "../components/ui/marquee";
import { FocusCards, type FocusCardItem } from "../components/ui/focus-cards";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

/* --- PRESTIGIOUS CLIENT-FACING OUTCOME TICKER --- */
const protocols = [
  { spec: "Sub-100ms Speed", tag: "Instant Global TTFB" },
  { spec: "Spatial 3D & Instant AR", tag: "40% Lower Return Rates" },
  { spec: "Zero Monthly App Fees", tag: "Native Architecture" },
  { spec: "Bespoke Brand Identity", tag: "Zero Templates" },
  { spec: "Next.js 16 Storefronts", tag: "High-Ticket Conversion" },
  { spec: "Complete Code Ownership", tag: "Zero Platform Lock-In" },
  { spec: "Automated Cart Recovery", tag: "15% Revenue Restored" },
  { spec: "Lighthouse 100/100", tag: "Zero Layout Shift" },
];

/* --- CLIENT COMMISSIONS SHOWCASE (ZERO DEVELOPER JARGON) --- */
const studioCommissions: FocusCardItem[] = [
  {
    title: "Aethelon Living Furniture",
    category: "Luxury Furniture",
    src: "/images/projects/aethelon.png",
    href: "/work/aethelon-furniture-commerce",
    metrics: "360° Room Staging",
    techStack: ["Spatial 3D", "Instant AR", "Shopify Backend"],
    description:
      "Bespoke furniture commerce with real-time finish inspection, dynamic room staging, and persistent one-click checkout.",
  },
  {
    title: "Velorum Haute Horlogerie",
    category: "Luxury Timepieces",
    src: "/images/projects/velorum.png",
    href: "/work/velorum-watch-commerce",
    metrics: "360° Sapphire Inspection",
    techStack: ["Micro-Mechanical 3D", "Tactile Audio", "Global Stripe"],
    description:
      "High-jewelry horology showcase featuring micro-mechanical crown inspection, sapphire reflection previews, and instant checkout.",
  },
  {
    title: "Novexa Precision Audio",
    category: "Acoustic Engineering",
    src: "/images/projects/novexa.png",
    href: "/work/novexa-product-commerce",
    metrics: "Sound Isolation Preview",
    techStack: ["Acoustic WebGL", "Sub-100ms Speed", "Direct Checkout"],
    description:
      "Interactive acoustic isolation comparison and instant one-click purchase flow engineered for high-intent audiophile conversion.",
  },
];

/* --- COMMERCIAL TRANSPARENCY FAQ --- */
const transparentFaqItems = [
  {
    question: "What are your realistic project scopes, turnaround times, and pricing?",
    answer:
      "We operate exclusively on fixed-scope, milestone-based agreements—typically ranging from $2k to $5k for bespoke storefronts, interactive 3D configurators, or performance overhauls. Projects are delivered within 3 to 5 weeks with weekly staging demos. You receive a guaranteed price and timeline upfront with zero surprise billing.",
  },
  {
    question: "Can you build on top of our existing Shopify backend?",
    answer:
      "Yes. We connect custom Next.js storefronts directly to your existing Shopify backend via the Storefront GraphQL API. Your product database, order management, inventory counts, discount codes, and payment gateways remain completely intact while the customer-facing experience is dramatically accelerated.",
  },
  {
    question: "How do you ensure 3D configurators run smoothly on budget mobile phones?",
    answer:
      "Every 3D asset adheres to strict performance budgets: lightweight compressed geometries, modern texture compression, and device-aware progressive fallbacks. On lower-powered devices, customers get fluid 60fps interaction without battery drain or stutter.",
  },
  {
    question: "Do we own the intellectual property and code upon project completion?",
    answer:
      "Yes, 100%. Upon launch, full ownership of the private Git repository, design assets, and deployment configuration is transferred to you. There are zero recurring agency licensing fees and zero vendor lock-in.",
  },
  {
    question: "When should an e-commerce brand NOT go bespoke?",
    answer:
      "If your store sells fewer than 5 simple items and an off-the-shelf theme already satisfies your revenue goals, a bespoke store is unnecessary. You should invest in a bespoke build when your brand requires distinctive luxury positioning, true-to-scale 3D product previews, or sub-100ms global speeds that standard themes cannot deliver.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ====================================================================
          01: HERO & OUTCOME TICKER (EXACT 100DVH INITIAL WINDOW VIEWPORT)
          ==================================================================== */}
      <div className="hero-landing-fold">
        <section className="hero-unified-canvas">
          <HeroFannedCards />
          <div className="hero-copy-layered">
            <div className="hero-copy-inner">
              <div className="eyebrow">Bespoke Commerce Engineering</div>
              <h1>
                Bespoke online stores engineered for brands that refuse to look like everyone else.
              </h1>
              <p>
                We design and engineer custom Next.js storefronts, tactile 3D configurators, and resilient commerce systems. Direct senior craft. Zero templates. Built to convert.
              </p>
              <div className="hero-actions">
                <Link className="button button-dark" href="/contact">
                  Start your project <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                <a className="text-link" href="#impact">
                  Explore business impact <ArrowDownRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* OUTCOME-DRIVEN CLIENT TICKER */}
        <div className="tech-protocol-strip" aria-label="Aethelon studio performance standards">
          <Marquee pauseOnHover repeat={4} className="[--duration:38s]">
            {protocols.map((proto) => (
              <div key={proto.spec} className="protocol-badge-item">
                <span className="proto-spec">{proto.spec}</span>
                <span className="proto-tag">{proto.tag}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>

      <main>
        {/* ====================================================================
            02: BUSINESS IMPACT & RETENTION
            1 BIG STAT (+38%) + WORDS ONLY (Cart Recovery, Returns, Speed, Scarcity)
            ==================================================================== */}
        <BusinessImpactSection />

        {/* ====================================================================
            03: CORE SUPERPOWER FEATURES (3D, AR, AI)
            FEATURE A: SPATIAL 3D & UNIVERSAL AR
            FEATURE B: MULTIMODAL AI ROOM VISION & SEMANTIC SEARCH
            ==================================================================== */}
        <section id="spatial-stage">
          <SpatialProductStage />
        </section>

        <section id="ai-engine">
          <AiVisionShowcase />
        </section>

        {/* ====================================================================
            04: "JOIN US" FLAGSHIP COMMISSIONS SHOWCASE ("WHO ARE THEIR CLIENTS?")
            SHOWCASING RECENT COMMISSIONS WITHOUT FALSE CLAIMS
            ==================================================================== */}
        <section className="section-pad-lg" id="commissions">
          <div className="section-head-wrap">
            <span className="eyebrow">Recent Studio Commissions</span>
            <h2>
              Join ambitious brands elevating their digital flagships.
            </h2>
            <p>
              We collaborate with emerging founders who refuse generic commerce. Explore recent digital storefronts and bespoke interactive experiences built to convert.
            </p>
          </div>

          <FocusCards cards={studioCommissions} />
        </section>

        {/* ====================================================================
            05: COMPREHENSIVE SERVICE CAPABILITIES ("WHAT SERVICES DO THEY OFFER?")
            HEADLESS, CUSTOM DESIGN/DEV, 3D, AR, AI, CART RECOVERY, ADMIN DASHBOARDS
            ==================================================================== */}
        <ServicesCapabilitiesGrid />

        {/* ====================================================================
            06: COMMERCIAL CLARITY & TRANSPARENT FAQ
            ==================================================================== */}
        <section className="section-pad-lg" id="faq">
          <div className="section-head-wrap">
            <span className="eyebrow">Commercial Transparency</span>
            <h2>Direct answers before we write a single line of code.</h2>
            <p>
              Clear scopes, realistic timelines, and guaranteed pricing so you can make an informed decision without agency sales pressure.
            </p>
          </div>

          <div className="faq-container-wrap">
            <Accordion type="single" collapsible className="faq-accordion-root">
              {transparentFaqItems.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${index}`}
                  className="faq-accordion-item"
                >
                  <AccordionTrigger className="faq-accordion-trigger">
                    <span>{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="faq-accordion-content">
                    <p>{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ====================================================================
            07: STUDIO CONVERSION BAR & FOOTER (CALL TO ACTION)
            ==================================================================== */}
        <section className="section-pad-lg pt-4 pb-20">
          <div className="studio-conversion-bar">
            <div className="conversion-glow" aria-hidden="true" />

            <div className="conversion-content-grid">
              <div className="conversion-left">
                <span className="conversion-eyebrow">
                  Booking Q2 / Q3 Commissions
                </span>
                <h2 className="conversion-title">
                  Ready to build a digital flagship that commands authority?
                </h2>
                <p className="conversion-subtext">
                  Schedule a 30-minute technical discovery session or request a storefront performance audit. Direct senior engineering. Fixed milestones between $2k–$5k.
                </p>

                <div className="conversion-actions">
                  <Link
                    href="/contact"
                    className="button-orange"
                  >
                    Start your project <ArrowUpRight size={15} />
                  </Link>
                  <Link
                    href="/contact?type=audit"
                    className="button-outline-light"
                  >
                    Request Architecture Audit
                  </Link>
                </div>
              </div>

              <div className="conversion-right">
                <div className="conversion-specs-grid">
                  <div className="conversion-spec-card">
                    <span className="spec-val">Q2/Q3 2026</span>
                    <span className="spec-lbl">Commissions Open</span>
                  </div>
                  <div className="conversion-spec-card">
                    <span className="spec-val">Senior Direct</span>
                    <span className="spec-lbl">Zero Middlemen</span>
                  </div>
                  <div className="conversion-spec-card">
                    <span className="spec-val">$2k–$5k Scope</span>
                    <span className="spec-lbl">Fixed Milestones</span>
                  </div>
                  <div className="conversion-spec-card">
                    <span className="spec-val">&lt; 24h Response</span>
                    <span className="spec-lbl">Direct Communication</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
