import type { ReactNode } from "react";
import { ArrowUpRight, Check } from "lucide-react";

const services = [
  [
    "01",
    "Custom Ecommerce Development",
    "Tailored storefronts that connect brand storytelling, high-speed product exploration, and frictionless checkout.",
    [
      "Custom Next.js & React storefronts",
      "Headless Shopify & custom commerce engines",
      "Variant matrices & real-time inventory sync",
      "Custom cart drawers & Stripe checkout flows",
    ],
    "Core deliverable: A store that is distinct, lightning fast, and built for conversion.",
  ],
  [
    "02",
    "Full-Stack Web Applications",
    "End-to-end web applications with custom database schemas, administrative portals, and secure user flows.",
    [
      "Admin portals & inventory dashboards",
      "PostgreSQL & Prisma data architecture",
      "Authentication & role-based access control",
      "Custom REST APIs & Server Actions",
    ],
    "Core deliverable: Complete operational control behind a clean, intuitive interface.",
  ],
  [
    "03",
    "AI & Search Integrations",
    "Practical AI integrations that remove customer hesitation and shorten the path to purchase.",
    [
      "Natural language product discovery",
      "Guided routine & recommendation step-flows",
      "Intelligent catalog search & filtering",
      "Automated product attribute tagging",
    ],
    "Core deliverable: Useful decision support that helps customers buy with confidence.",
  ],
  [
    "04",
    "Interactive & 3D Experiences",
    "Tactile product configurators and 3D visualizers where seeing and customizing the object aids the sale.",
    [
      "Interactive 3D model viewers (Three.js / WebGL)",
      "Real-time finish, material & color customizers",
      "Dimensional scale & room visualizers",
      "Smooth, high-frame-rate mobile interactions",
    ],
    "Core deliverable: Engaging product moments that earn their bandwidth.",
  ],
  [
    "05",
    "Storefront Redesigns & Performance",
    "Upgrading sluggish, template-constrained stores into ultra-fast, modern web architectures.",
    [
      "Sub-second page transitions & Core Web Vitals",
      "Image delivery & asset optimization",
      "Technical SEO & structured data markup",
      "Checkout drop-off reduction",
    ],
    "Core deliverable: Immediate performance gains that improve customer retention.",
  ],
  [
    "06",
    "Ongoing Development & Support",
    "A dependable technical partner for continuous feature releases, optimizations, and scaling needs.",
    [
      "New feature development & landing pages",
      "Performance monitoring & maintenance",
      "A/B test implementation",
      "Direct communication with the engineer",
    ],
    "Core deliverable: Long-term peace of mind without hiring full-time in-house developers.",
  ],
] as const;

function SectionLabel({ children, index }: { children: ReactNode; index?: string }) {
  return (
    <div className="section-label">
      <span>{index || ""}</span>
      <span>{children}</span>
      <span className="label-line" />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main className="inner-page services-page">
      <div className="inner-hero">
        <SectionLabel index="01">Capabilities</SectionLabel>
        <h1>
          Services &<br />
          <em>technical scope.</em>
        </h1>
        <p>
          From standalone custom storefronts to complete full-stack web applications, each service is delivered with direct senior execution.
        </p>
      </div>

      <div className="service-architecture">
        <SectionLabel index="02">Service overview</SectionLabel>
        <div>
          <h2>
            Full-lifecycle<br />
            <em>commerce execution.</em>
          </h2>
          <p>
            Whether you need a new flagship storefront, an administrative dashboard, or an interactive product visualizer, I handle the architecture from frontend to database.
          </p>
        </div>
        <div className="architecture-tags">
          {[
            "Storefront Architecture",
            "Full-Stack Backends",
            "Checkout & Payments",
            "Interactive 3D / AI",
            "Performance Optimization",
            "Direct Support",
          ].map((x, i) => (
            <span key={x}>
              <b>0{i + 1}</b>
              {x}
            </span>
          ))}
        </div>
      </div>

      <div className="long-services">
        {services.map(([number, title, desc, bullets, proof]) => (
          <article key={number}>
            <div className="service-num">{number}</div>
            <div>
              <h2>{title}</h2>
              <p>{desc}</p>
              <div className="service-proof">{proof}</div>
              <ul>
                {bullets.map((b) => (
                  <li key={b}>
                    <Check size={15} aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <ArrowUpRight className="article-arrow" aria-hidden="true" />
          </article>
        ))}
      </div>
    </main>
  );
}
