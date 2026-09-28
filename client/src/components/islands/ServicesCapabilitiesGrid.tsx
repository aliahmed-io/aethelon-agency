"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    title: "Headless Storefronts",
    description: "Fast Next.js frontends connected to your existing Shopify or WooCommerce backend.",
  },
  {
    title: "Custom Design",
    description: "Distinctive UI designed for your brand. No templates, no themes.",
  },
  {
    title: "3D & AR Experiences",
    description: "Interactive product previews that let customers inspect and place items in their space.",
  },
  {
    title: "AI-Powered Search",
    description: "Smart product discovery that understands what your customers actually mean.",
  },
  {
    title: "Cart Recovery",
    description: "Automated follow-ups that recover 10–15% of abandoned sales.",
  },
  {
    title: "Operations Dashboards",
    description: "Real-time analytics, inventory tracking, and daily performance summaries.",
  },
];

export default function ServicesCapabilitiesGrid() {
  return (
    <section className="section-pad-lg" id="services">
      <div className="section-head-wrap">
        <h2>What we build.</h2>
        <p>From fast storefronts to interactive 3D, AI search, and automated revenue recovery.</p>
      </div>

      <div className="services-simple-grid">
        {SERVICES.map((srv) => (
          <div key={srv.title} className="service-simple-item">
            <h3 className="service-simple-title">{srv.title}</h3>
            <p className="service-simple-desc">{srv.description}</p>
          </div>
        ))}
      </div>

      <div className="services-cta-row">
        <Link href="/contact" className="services-cta-link">
          <span>Start a project</span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
