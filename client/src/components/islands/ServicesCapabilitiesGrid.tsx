"use client";

import React from "react";
import { 
  Boxes, 
  Paintbrush, 
  Rotate3d, 
  Sparkles, 
  RefreshCcw, 
  LayoutDashboard,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

interface ServiceItem {
  number: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  Icon: React.ElementType;
}

const SERVICES: ServiceItem[] = [
  {
    number: "01",
    title: "Headless Storefronts & Migrations",
    category: "Architecture & Speed",
    description: "Decoupling legacy, plugin-heavy Shopify or WooCommerce stores into high-speed Next.js 16 storefronts with zero downtime, instant cart drawers, and preserved customer data.",
    features: [
      "Next.js 16 App Router & Server Actions",
      "Shopify Storefront GraphQL & Medusa API",
      "Sub-100ms global Edge CDN caching",
      "Zero third-party script drag",
    ],
    Icon: Boxes,
  },
  {
    number: "02",
    title: "Bespoke Design & Development",
    category: "Brand & Art Direction",
    description: "Distinctive, high-ticket UI/UX tailored specifically for luxury brands. Editorial typography, smooth kinetic micro-interactions, and bespoke design tokens that refuse to look like anyone else.",
    features: [
      "Bespoke editorial typography & design tokens",
      "Calm, deliberate kinetic motion discipline",
      "Full mobile, tablet, and 4K responsive scale",
      "Zero commodity templates or off-the-shelf themes",
    ],
    Icon: Paintbrush,
  },
  {
    number: "03",
    title: "Spatial 3D & Universal AR",
    category: "Interactive 3D",
    description: "Tactile product customizers, 360° material inspection, and native Augmented Reality that lets customers place items in their living rooms before buying—slashing returns by up to 40%.",
    features: [
      "Native iOS Quick Look (.usdz) & Android Scene Viewer",
      "Smart semantic wall & floor surface auto-snapping",
      "Lightweight, 60fps mobile WebGL shaders",
      "Zero app downloads required for customers",
    ],
    Icon: Rotate3d,
  },
  {
    number: "04",
    title: "Multimodal AI & Semantic Search",
    category: "AI & Discovery",
    description: "Integrating Gemini 3.0 Pro computer vision so customers can upload room photos for instant aesthetic harmony matching, backed by natural language search that understands style intent.",
    features: [
      "Multimodal room photo lighting & palette analysis",
      "Hybrid vector & aesthetic semantic search",
      "Zero 'No Results Found' customer drop-offs",
      "Automated customer review sentiment scoring",
    ],
    Icon: Sparkles,
  },
  {
    number: "05",
    title: "Automated Cart Recovery & Retention",
    category: "Revenue Optimization",
    description: "Autonomous recovery systems that detect dropped checkouts and deliver timed, cryptographic recovery links. Recover 10%–15% of abandoned sales natively without expensive monthly SaaS bills.",
    features: [
      "2-stage automated email recovery crons",
      "Dynamic price-drop & wishlist alert pipelines",
      "Psychological scarcity & VIP vault portals",
      "Eliminates $1,000+/mo in third-party app subscriptions",
    ],
    Icon: RefreshCcw,
  },
  {
    number: "06",
    title: "Custom Admin & Operations Dashboards",
    category: "Operations & Control",
    description: "Tailored executive portals giving founders complete visibility and control: autonomous AI executive briefings, real-time integration health diagnostics, and double-entry stock ledgers.",
    features: [
      "Autonomous AI COO executive briefing suite",
      "Millisecond third-party API health diagnostics",
      "Double-entry immutable stock reservation ledger",
      "Multi-package shipping & automated tracking sync",
    ],
    Icon: LayoutDashboard,
  },
];

export default function ServicesCapabilitiesGrid() {
  return (
    <section className="section-pad-lg" id="services">
      <div className="section-head-wrap">
        <span className="eyebrow">Service Capabilities</span>
        <h2>
          Complete commerce engineering &amp; digital craft.
        </h2>
        <p>
          From headless architectures and bespoke design systems to interactive 3D, multimodal AI, and autonomous revenue recovery. We engineer the complete modern commerce experience.
        </p>
      </div>

      <div className="services-capabilities-grid">
        {SERVICES.map((srv) => {
          const Icon = srv.Icon;
          return (
            <div key={srv.title} className="service-cap-card">
              <div>
                <div className="service-cap-header">
                  <span className="service-cap-num">{srv.number}</span>
                  <div className="service-cap-icon-box">
                    <Icon size={18} className="text-orange-600" />
                  </div>
                </div>

                <span className="service-cap-cat">{srv.category}</span>
                <h3 className="service-cap-title">{srv.title}</h3>
                <p className="service-cap-desc">{srv.description}</p>

                <ul className="service-cap-features">
                  {srv.features.map((feat) => (
                    <li key={feat} className="service-cap-feature-item">
                      <span className="service-cap-bullet">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="service-cap-footer">
                <Link href="/contact" className="service-cap-link">
                  <span>Inquire about this capability</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
