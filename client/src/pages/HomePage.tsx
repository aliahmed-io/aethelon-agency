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
import ServicesCapabilitiesGrid from "../components/islands/ServicesCapabilitiesGrid";
import FlagshipConversionSection from "../components/islands/FlagshipConversionSection";
import { Marquee } from "../components/ui/marquee";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

/* --- CLIENT HIGHLIGHTS TICKER --- */
const protocols = [
  { spec: "Custom Design & Headless Dev", tag: "Shopify + Next.js" },
  { spec: "Fast 2–4 Week Delivery", tag: "Guaranteed Timeline" },
  { spec: "Affordable Fixed Rates", tag: "From $2,000" },
  { spec: "Sub-100ms Page Speed", tag: "Higher Conversion" },
  { spec: "Interactive 3D & AR", tag: "40% Fewer Returns" },
  { spec: "2 Months Free Maintenance", tag: "Full Support Included" },
  { spec: "Automated Cart Recovery", tag: "15% More Sales" },
  { spec: "Senior Engineers", tag: "No Agency Overhead" },
];



/* --- FAQ --- */
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
          HERO
          ==================================================================== */}
      <div className="hero-landing-fold">
        <section className="hero-unified-canvas">
          <HeroFannedCards />
          <div className="hero-copy-layered">
            <div className="hero-copy-inner">
              <div className="eyebrow">Commerce Engineering Studio</div>
              <h1>Custom online stores for brands that refuse to blend in.</h1>
              <p>We design and build Next.js storefronts, interactive 3D product experiences, and fast commerce systems. Senior engineers. No templates.</p>
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

        {/* TICKER */}
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
        {/* BUSINESS IMPACT */}
        <BusinessImpactSection />

        {/* 3D & AR STAGE */}
        <section id="spatial-stage">
          <SpatialProductStage />
        </section>


        {/* SERVICES */}
        <ServicesCapabilitiesGrid />

        {/* FAQ */}
        <section className="section-pad-lg" id="faq">
          <div className="section-head-wrap">
            <h2>Answers before we start.</h2>
            <p>Clear scope, honest timelines, and straightforward pricing.</p>
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

        {/* CTA */}
        <FlagshipConversionSection />
      </main>
    </>
  );
}
