import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    title: "Headless or 100% Custom Store",
    description:
      "No migration headache: keep your existing Shopify or WooCommerce backend, inventory, and checkout—or launch a 100% custom full-stack website.",
  },
  {
    title: "Desktop + Mobile AR Room Preview",
    description:
      "Customers place 3D products in their room on their phone OR upload a room photo on desktop to preview fit and materials before buying.",
  },
  {
    title: "24/7 AI Assistant & Smart Search",
    description:
      "Catalog-trained AI shopping assistant that answers sizing, shipping, and product questions in under 3 seconds, paired with intent-aware search.",
  },
  {
    title: "2-Stage Abandoned Cart Recovery",
    description:
      "Automated follow-up emails at 1 hour and 24 hours plus wishlist price-drop alerts that recover 10–15% of lost sales with zero ad spend.",
  },
  {
    title: "Automated Revenue & SEO Blog",
    description:
      "Newsletter welcome sequences ($36 return per $1 spent), campaign blast generator, custom admin dashboard, and fast SEO blog infrastructure.",
  },
  {
    title: "2 Months Free Support + Care Plan",
    description:
      "Includes 2 months of free support & updates after launch. Need ongoing help after that? Optional $200/mo care plan—cancel anytime, zero lock-in.",
  },
];

export default function ServicesCapabilitiesGrid() {
  return (
    <section className="section-pad-lg" id="services">
      <div className="section-head-wrap">
        <h2>Everything a high-converting store needs.</h2>
        <p>
          Delivered in 10–14 days for $2,000–$4,000 fixed price. Start with just a $400 deposit and pay as you approve each live step.
        </p>
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
        <Link href="/services" className="services-cta-link">
          <span>View $2k–$4k packages &amp; 10-day roadmap</span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
