"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { getFlagshipProject, projects } from "../../../shared/projects";
import ServicesAccordion from "../components/islands/ServicesAccordion";
import ProductDemo from "../components/islands/ProductDemo";
import FaqAccordion from "../components/islands/FaqAccordion";
import HeroFannedCards from "../components/islands/HeroFannedCards";
import FlagshipShowcaseIsland from "../components/islands/FlagshipShowcaseIsland";
import WorkArchiveIsland from "../components/islands/WorkArchiveIsland";

const flagship = getFlagshipProject();

const capabilities = [
  [
    "01",
    "Bespoke Storefront Engineering",
    "Custom Next.js storefronts, catalog architecture, persistent cart drawers, and instant checkout integrations.",
    [
      "Custom Next.js & Headless storefronts",
      "Optimistic cart drawers & 0.2s checkout flows",
      "Product variant matrices & stock synchronization",
      "Stripe & merchant payment integrations",
    ],
  ],
  [
    "02",
    "Full-Stack Web Applications",
    "Custom web applications, databases, REST / GraphQL APIs, authentication, dashboards, and internal business tools.",
    [
      "Admin portals & inventory management dashboards",
      "PostgreSQL & Prisma database schemas",
      "Secure authentication & session state flows",
      "Custom REST & Server Action APIs",
    ],
  ],
  [
    "03",
    "Spatial 3D & Product Configurators",
    "Interactive product customizers, 3D WebGL inspection, and material finish selectors that genuinely lift conversion.",
    [
      "Interactive 3D product inspection & orbit controls",
      "Material finish, texture, and color customizers",
      "Lightweight WebGL product moments (Three.js/Fiber)",
      "Responsive canvas visualization across desktop & mobile",
    ],
  ],
  [
    "04",
    "Conversion & Search Architecture",
    "Fast product discovery, intelligent semantic filtering, guided recommendation routines, and performance audits.",
    [
      "Semantic product discovery & fast search",
      "Guided recommendation step-flows",
      "100/100 Core Web Vitals optimization",
      "Decision-support flows designed to reduce cart drop-off",
    ],
  ],
] as const;

const faqItems = [
  {
    question: "How do you structure projects, milestones, and pricing?",
    answer:
      "Every project is structured around transparent, fixed-scope agreements with clearly defined milestones—typically ranging from $2k to $5k for bespoke storefronts, targeted 3D configurators, or custom admin tools. Milestones are agreed upon upfront so there are never surprise billings or bloated scope creep.",
  },
  {
    question: "Do you build custom frontends for Shopify, Stripe, or custom backends?",
    answer:
      "Yes. I specialize in building custom Next.js storefronts powered by headless Shopify, Stripe, or Medusa, as well as bespoke full-stack applications with PostgreSQL, Prisma, and dedicated administrative portals. You retain complete ownership of your data and infrastructure.",
  },
  {
    question: "Can you rebuild or modernize an existing underperforming store?",
    answer:
      "Yes. If your current store suffers from slow load times, rigid off-the-shelf templates, or poor mobile checkout conversion, I can redesign and re-engineer the frontend while keeping your existing product catalogs, customer records, and order history completely intact.",
  },
  {
    question: "What does the handoff and post-launch process look like?",
    answer:
      "Every project includes clean, strictly typed TypeScript code, administrative training, and structured deployment on modern infrastructure (Vercel/AWS). Full code ownership is transferred to you upon launch, with direct ongoing support and feature development available as your business scales.",
  },
] as const;

function Hero() {
  return (
    <section className="hero-unified-canvas">
      <HeroFannedCards />
      <div className="hero-copy-layered">
        <div className="hero-copy-inner">
          <div className="eyebrow">
            Independent Commerce Engineering
          </div>
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
            <a className="text-link" href="#manifesto">
              Explore studio thesis <ArrowDownRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <div className="trust-strip">
      {[
        "Custom Storefronts",
        "Spatial 3D Configurators",
        "Headless Commerce & APIs",
        "Checkout & Payments",
        "Admin & CMS Portals",
        "Direct Senior Partnership",
      ].map((item, index) => (
        <span key={item}>
          <b>{String(index + 1).padStart(2, "0")}</b>
          {item}
        </span>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* 01: Arrival & Living Commerce Identity (Exact Initial Window Viewport) */}
      <div className="hero-landing-fold">
        <Hero />
        <TrustStrip />
      </div>

      <main>
        {/* 02: The Studio Thesis & Architectural Manifesto */}
        <section className="studio-thesis-section" id="manifesto">
          <div className="studio-thesis-container">
            <div className="thesis-lead-wrap">
              <span className="thesis-eyebrow">Studio Thesis · 2026</span>
              <h2 className="thesis-headline">
                Most online stores look like they were ordered from the same factory. We build custom commerce systems with the weight, tactile calm, and desire of enduring physical craft.
              </h2>
              <p className="thesis-subtext">
                Modern consumers are exhausted by aggressive popups, identical card templates, and bloated third-party plugins. We treat your digital flagship with the architectural discipline of a physical flagship store: unhurried whitespace, immaculate typography, and sub-second performance.
              </p>
            </div>

            <div className="thesis-pillars-grid">
              <div className="thesis-pillar">
                <span className="thesis-pillar-tag">Pillar 01</span>
                <h3>The Discipline of Restraint</h3>
                <p>
                  Zero aggressive popups. Zero artificial countdown urgency. Discerning customers respond to quiet confidence, generous breathing room, and interfaces that respect their intelligence.
                </p>
              </div>

              <div className="thesis-pillar">
                <span className="thesis-pillar-tag">Pillar 02</span>
                <h3>True Full-Stack Ownership</h3>
                <p>
                  From sub-second Next.js edge rendering and custom Prisma/PostgreSQL schemas to optimistic cart drawers and resilient Stripe checkout flows. Complete technical autonomy with zero platform lock-in.
                </p>
              </div>

              <div className="thesis-pillar">
                <span className="thesis-pillar-tag">Pillar 03</span>
                <h3>Direct Senior Collaboration</h3>
                <p>
                  You work directly with the specialist designing the interface, writing the production code, and optimizing the system. No account managers, no junior contractors, and zero diluted context.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 03: Flagship Cinematic Experience */}
        <section className="flagship-section section-pad" id="flagship">
          <div className="section-intro row-intro">
            <div>
              <span className="thesis-eyebrow">Flagship Build</span>
              <h2>
                Aethelon Modern Furniture Platform
              </h2>
              <p>
                An end-to-end custom furniture commerce platform engineered with interactive room staging, persistent optimistic cart drawer, and high-conversion catalog discovery.
              </p>
            </div>
            <Link href="/work" className="text-link">
              View full portfolio <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <FlagshipShowcaseIsland project={flagship} />
        </section>

        {/* 04: Tactile Commerce Interaction Slice */}
        <section className="demo-section">
          <div className="demo-copy">
            <span className="thesis-eyebrow">Tactile Standard</span>
            <h2>
              Interactive commerce architecture in production.
            </h2>
            <p>
              A live commerce slice demonstrating real-time finish switching, dynamic subtotal calculations, and optimistic cart updates without layout shift.
            </p>
            <span className="demo-note">
              Live interaction slice · Optimistic state handling
            </span>
          </div>
          <ProductDemo />
        </section>

        {/* 05: Scannable Curated Project Archive */}
        <section className="homepage-archive-section section-pad" id="archive">
          <div className="section-intro row-intro">
            <div>
              <span className="thesis-eyebrow">Selected Works</span>
              <h2>
                Curated platforms &amp; interface studies
              </h2>
              <p>
                A curated selection of production-grade storefronts, 3D customizers, and editorial conversion flows built for independent commercial brands.
              </p>
            </div>
          </div>

          <WorkArchiveIsland projects={projects} />
        </section>

        {/* 06: Asymmetrical Visual Exhibition (Design Studies) */}
        <section className="design-exhibition-section section-pad">
          <div className="section-intro">
            <span className="thesis-eyebrow">Visual Craft</span>
            <h2>
              Commerce lookbooks &amp; spatial interfaces
            </h2>
            <p>
              Focused design studies demonstrating editorial layout hierarchy, ambient day/night modes, and tactile scale visualization.
            </p>
          </div>

          <div className="exhibition-asymmetric-grid">
            <div className="exhibition-item-large">
              <Link href="/work/monolith-audio" className="exhibition-card">
                <div className="exhibition-image-wrap">
                  <Image
                    src="/images/projects/vantiq.png"
                    alt="Vantiq Hypercar 3D Visualization and Sonic Gallery"
                    fill
                    unoptimized
                    sizes="(max-width: 900px) 100vw, 60vw"
                    className="cover-image"
                  />
                  <span className="exhibition-badge">3D &amp; Web Audio · Hypercar</span>
                </div>
                <div className="exhibition-meta">
                  <h3>Vantiq</h3>
                  <p>Hypercar 3D Anatomy Deconstruction &amp; Real-Time Sonic Waveform Visualizer</p>
                </div>
              </Link>
            </div>

            <div className="exhibition-col-pair">
              <Link href="/work/in-your-space" className="exhibition-card">
                <div className="exhibition-image-wrap">
                  <Image
                    src="/images/projects/vonex.png"
                    alt="Vonex Brutalist Techwear Luxury"
                    fill
                    unoptimized
                    sizes="(max-width: 900px) 100vw, 35vw"
                    className="cover-image"
                  />
                  <span className="exhibition-badge">Techwear · Minimalist UI</span>
                </div>
                <div className="exhibition-meta">
                  <h3>Vonex</h3>
                  <p>Brutalist Luxury Streetwear Flagship &amp; Hero Slider</p>
                </div>
              </Link>

              <Link href="/work/afterlight" className="exhibition-card">
                <div className="exhibition-image-wrap">
                  <Image
                    src="/images/projects/maison-lumiere.png"
                    alt="Maison Lumiere High-Jewelry 3D Showroom"
                    fill
                    unoptimized
                    sizes="(max-width: 900px) 100vw, 35vw"
                    className="cover-image"
                  />
                  <span className="exhibition-badge">3D Carousel · Fine Jewelry</span>
                </div>
                <div className="exhibition-meta">
                  <h3>Maison Lumière</h3>
                  <p>High-Jewelry Digital Showroom &amp; 3D Rotating Carousel</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 07: Capabilities Breakdown */}
        <section className="services-preview section-pad">
          <div className="section-intro">
            <span className="thesis-eyebrow">Integrated Capabilities</span>
            <h2>
              What we build for ambitious commerce brands.
            </h2>
            <p>
              Direct full-stack engineering across the entire commerce journey—from initial customer impression to administrative fulfillment.
            </p>
            <Link href="/services" className="text-link">
              Explore detailed services <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <ServicesAccordion services={capabilities} />
        </section>

        {/* 08: Direct Collaboration & Practice */}
        <section className="split-statement">
          <div className="split-image">
            <Image
              src="/images/aethelon-portfolio-chair.webp"
              alt="Design and development studio space"
              fill
              unoptimized
              sizes="(max-width: 760px) 100vw, 50vw"
              className="cover-image"
            />
          </div>
          <div className="split-copy">
            <span className="thesis-eyebrow">Practice Model</span>
            <h2>
              Direct collaboration. Senior execution.
            </h2>
            <p>
              You work directly with the person designing the interface, writing the full-stack code, and shipping the system. No account managers, no junior handoffs, and zero diluted context.
            </p>
            <p>
              This direct model ensures faster iterations, deeper technical context, and a commercially sensible budget without agency overhead.
            </p>
            <Link href="/about" className="text-link">
              Learn about the practice <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* 09: FAQ */}
        <section className="faq section-pad">
          <div className="faq-heading">
            <span className="thesis-eyebrow">Commercial Transparency</span>
            <h2>
              Clear answers before we begin.
            </h2>
          </div>
          <FaqAccordion items={faqItems} />
        </section>
      </main>
    </>
  );
}
