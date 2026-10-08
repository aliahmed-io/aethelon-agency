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

/* --- STUDIO PRACTICES & OFFERS TICKER --- */
const protocols = [
  { spec: "Packages from $2,000—$4,000", tag: "Fixed Price" },
  { spec: "$400 Deposit to Start", tag: "20% Kick-off" },
  { spec: "Live in 10—14 Days", tag: "Fast Turnaround" },
  { spec: "Headless or Full Custom", tag: "Shopify / Woo / Custom DB" },
  { spec: "5—10 Custom 3D Models", tag: "Mobile & Desktop AR" },
  { spec: "2 Months Free Support", tag: "Optional $200/mo Care Plan" },
  { spec: "Direct Senior Engineer", tag: "No Agency Overhead" },
  { spec: "100% Code Ownership", tag: "Zero Lock-In" },
];

/* --- FAQ --- */
const transparentFaqItems = [
  {
    question: "What are your packages, turnaround times, and payment milestones?",
    answer:
      "We offer transparent, fixed-price packages from $2,000 to $4,000 with fast 10 to 14 day delivery. You start with just a 20% deposit ($400 on the $2k package) and pay across 4 zero-risk checkpoints: 20% at kickoff, 30% after you approve the interactive design, 30% when you test the live working staging store, and 20% at launch. You only pay the next step after you see and approve the work on a live link.",
  },
  {
    question: "Can I keep my existing Shopify or WooCommerce backend—or get a 100% custom website?",
    answer:
      "Both! If you use Shopify or WooCommerce, there is zero migration headache: you keep your existing product catalog, inventory, orders, and checkout while we supercharge the storefront your customers see. If you prefer complete independence with zero platform fees, we also build 100% custom full-stack websites with a custom database and admin dashboard.",
  },
  {
    question: "How do the 3D viewers, Desktop/Mobile AR, and AI assistant increase sales?",
    answer:
      "Shoppers can rotate 3D models, place products in their room on mobile AR, or upload a photo of their room right on their desktop—lifting conversion rates by up to 94% and cutting returns by 40%. Meanwhile, our 24/7 AI product assistant answers sizing and shipping questions in under 3 seconds, and automated 2-stage cart recovery emails (1h & 24h) recover 10–15% of lost sales automatically.",
  },
  {
    question: "What happens after launch? Do I own the code?",
    answer:
      "You own 100% of the code, repository, and 3D assets from day one with zero lock-in. Every build includes 2 full months of free support and updates after launch. Need ongoing help after that? We offer an optional $200/mo care plan that you can pause or cancel anytime.",
  },
  {
    question: "Why are your builds $2,000–$4,000 when traditional agencies charge $15,000+?",
    answer:
      "When you hire a traditional agency, you pay for account managers, sales directors, office overhead, and junior developer handoffs. At Aethelon, you collaborate 1-on-1 directly with the senior engineer building your store—giving you a $15k flagship storefront in 10 days at a fraction of the cost.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* ====================================================================
          HERO
          ==================================================================== */}
      <div className="hero-landing-fold">
        <section className="hero-unified-canvas">
          <div data-reveal="cards" style={{ width: "100%", height: "100%" }}>
            <HeroFannedCards />
          </div>
          <div className="hero-copy-layered">
            <div className="hero-copy-inner">
              <div className="eyebrow">Direct Senior Commerce Engineering · Live in 10 Days</div>
              <h1 data-reveal="headline">Custom online stores for brands that refuse to blend in.</h1>
              <p>
                Keep your existing Shopify/WooCommerce backend or launch a 100% custom full-stack platform—complete with 3D/AR room previews, 24/7 AI search, and automated cart recovery. Fixed packages from $2,000 ($400 to start).
              </p>
              <div className="hero-actions">
                <Link className="button button-dark" href="/services">
                  View $2k–$4k packages <ArrowUpRight size={15} aria-hidden="true" />
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
          <Marquee pauseOnHover repeat={2} className="[--duration:38s]">
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
            <p>Clear $2k–$4k packages, 10-day delivery, and $400 deposit to start.</p>
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
    </div>
  );
}
