"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Zap,
  Gauge,
  Layers,
  ShieldCheck,
  Boxes,
  Cpu,
  Sparkles,
  Workflow,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
} from "lucide-react";
import HeroFannedCards from "../components/islands/HeroFannedCards";
import ProductDemo from "../components/islands/ProductDemo";
import CodeComparisonCard from "../components/islands/CodeComparisonCard";
import { Marquee } from "../components/ui/marquee";
import { NumberTicker } from "../components/ui/number-ticker";
import { BentoGrid, BentoCard } from "../components/ui/bento-grid";
import { BorderBeam } from "../components/ui/border-beam";
import { FocusCards, type FocusCardItem } from "../components/ui/focus-cards";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

/* --- PROTOCOL & TECH STACK TICKER DATA --- */
const protocols = [
  { spec: "Next.js 16.3", tag: "App Router & Server Actions" },
  { spec: "Three.js / R3F", tag: "WebGL 60fps Shaders" },
  { spec: "Shopify Storefront API", tag: "Headless GraphQL" },
  { spec: "Sub-100ms TTFB", tag: "Edge CDN Caching" },
  { spec: "Strict TypeScript", tag: "100% Zero Warnings" },
  { spec: "Tailwind CSS v4", tag: "Editorial Design Tokens" },
  { spec: "Stripe Elements", tag: "Optimistic 0.2s State" },
  { spec: "Medusa Engine", tag: "Composable Architecture" },
  { spec: "Turbopack Bundler", tag: "Instant HMR & Build" },
  { spec: "Lighthouse 100/100", tag: "Zero CLS Layout Shift" },
];

/* --- BUILT-TO-SPEC SHOWCASES DATA --- */
const builtToSpecCards: FocusCardItem[] = [
  {
    title: "Aethelon Furniture Platform",
    category: "Spatial 3D & Living Catalog",
    src: "/images/projects/aethelon.png",
    href: "/work/aethelon-furniture-commerce",
    metrics: "0.2s State · 3D Staging",
    techStack: ["Next.js 16", "Three.js / R3F", "Shopify GraphQL", "Zustand"],
    description:
      "End-to-end custom furniture commerce platform with interactive spatial room customizer, real-time finish switching, and persistent optimistic cart.",
  },
  {
    title: "Velorum Luxury Horology",
    category: "Micro-Mechanical 3D · High-Jewelry",
    src: "/images/projects/velorum.png",
    href: "/work/velorum-watch-commerce",
    metrics: "PBR Shaders · Web Audio",
    techStack: ["Three.js PBR", "Web Audio API", "Headless Stripe", "Edge SSR"],
    description:
      "Micro-mechanical 3D crown inspection, sapphire reflection simulation, and personalized engraving preview with zero client lag.",
  },
  {
    title: "Novexa Precision Audio",
    category: "Acoustic Engineering · Instant Flow",
    src: "/images/projects/novexa.png",
    href: "/work/novexa-product-commerce",
    metrics: "Real-Time FFT · Sub-second TTFB",
    techStack: ["Web Audio Analyser", "Next.js App Router", "Tailwind v4"],
    description:
      "Real-time frequency response curve visualizer with interactive acoustic isolation comparison and instant one-click purchase flow.",
  },
];

/* --- CORE ARCHITECTURAL MODULES --- */
const engineeringModules = [
  {
    title: "Headless Commerce & Migrations",
    eyebrow: "Module 01 · Decoupled Stacks",
    description:
      "Modernizing legacy, plugin-heavy Shopify or WooCommerce stores into high-speed Next.js 16 storefronts with zero downtime, instant cart drawers, and preserved customer data.",
    features: [
      "Headless Shopify Storefront GraphQL & Medusa API",
      "Optimistic cart state with sub-200ms checkout redirection",
      "Automated catalog and inventory synchronization",
      "Decoupled edge architecture with zero third-party script drag",
    ],
    tech: ["Next.js 16", "Shopify API", "Medusa.js", "Edge Middleware"],
  },
  {
    title: "Interactive 3D & Digital Experiences",
    eyebrow: "Module 02 · Spatial WebGL",
    description:
      "Tactile product customizers, 3D WebGL material inspection, and interactive product configurations that demonstrably lift add-to-cart rate without slowing page loads.",
    features: [
      "DRACO & KTX2 compressed 3D asset delivery pipeline",
      "Dynamic material, leather, and metal PBR shader switching",
      "Guaranteed 60fps canvas performance across mobile and desktop",
      "Accessible progressive fallbacks for low-tier hardware",
    ],
    tech: ["Three.js", "React Three Fiber", "DRACO", "WebGL Shaders"],
  },
  {
    title: "Performance & Core Web Vitals Auditing",
    eyebrow: "Module 03 · Sub-Second TTFB",
    description:
      "Architectural performance remediation targeting sub-second LCP, zero cumulative layout shift, and elimination of bloated tracking scripts.",
    features: [
      "Edge-rendered SSR with granular tag revalidation",
      "Aggressive tree-shaking & code splitting per route",
      "Elimination of render-blocking stylesheets and fonts",
      "Lighthouse 100/100 performance, accessibility, and SEO targets",
    ],
    tech: ["Lighthouse CI", "Edge CDN", "Turbopack", "Bundle Analyzer"],
  },
  {
    title: "Design Systems & Motion UI",
    eyebrow: "Module 04 · Kinetic Systems",
    description:
      "Bespoke design systems built strictly with modern Tailwind tokens, accessible Radix UI primitives, and kinetic micro-interactions that feel calm and deliberate.",
    features: [
      "Strict 8pt grid token system exported with TypeScript types",
      "WCAG AA accessible keyboard-first navigation patterns",
      "Hardware-accelerated CSS & GPU motion discipline",
      "Full dark/light mode parity and responsive scale to 4K",
    ],
    tech: ["Tailwind v4", "Motion", "Radix UI", "WCAG AA Compliance"],
  },
];

/* --- TECHNICAL PLAYBOOKS --- */
const technicalPlaybooks = [
  {
    title: "Why Headless Fails Without Proper Edge Caching",
    category: "Architecture Playbook",
    readTime: "6 min read",
    description:
      "A deep dive into stale-while-revalidate, edge CDN routing, and cache invalidation strategies that keep headless Shopify storefronts sub-100ms globally.",
    href: "/insights/custom-storefront-vs-hosted-platform",
    tag: "Edge Architecture",
  },
  {
    title: "Liquid vs Next.js Storefront: The Honest Trade-Offs",
    category: "Technical Strategy",
    readTime: "8 min read",
    description:
      "An unvarnished engineering comparison of monolithic themes versus decoupled Next.js storefronts. When to stay on Liquid, and when custom architecture unlocks 3x conversion.",
    href: "/insights/custom-storefront-vs-hosted-platform",
    tag: "Platform Analysis",
  },
  {
    title: "Optimizing Three.js Assets for Mobile Conversion",
    category: "WebGL Engineering",
    readTime: "5 min read",
    description:
      "DRACO geometry compression, KTX2 texture encoding, polygon budgets, and progressive video fallbacks on budget mobile devices.",
    href: "/insights/why-3d-product-previews-earn-their-bandwidth",
    tag: "3D Performance",
  },
];

/* --- COMMERCIAL TRANSPARENT FAQ --- */
const transparentFaqItems = [
  {
    question: "What are your realistic project scopes, turnaround times, and pricing?",
    answer:
      "We operate exclusively on fixed-scope, milestone-based agreements—typically ranging from $2k to $5k for bespoke storefronts, interactive 3D configurators, or performance overhauls. Projects are delivered within 3 to 5 weeks with weekly staging demos. You receive a guaranteed price and timeline upfront with zero surprise billing.",
  },
  {
    question: "When should an e-commerce brand NOT go headless?",
    answer:
      "If your store sells fewer than 5 simple products and an existing Shopify theme converts adequately for your current revenue, do not go headless. It is unnecessary overhead. You should go headless when you require interactive 3D configurators, complex variant pricing, sub-100ms global speeds, or absolute brand distinction that cannot be achieved inside theme limits.",
  },
  {
    question: "Can you build on top of our existing Shopify backend?",
    answer:
      "Yes. We connect custom Next.js storefronts directly to your existing Shopify backend via the Storefront GraphQL API. Your product database, order management, inventory counts, discount codes, and payment gateways remain completely intact while the customer-facing experience is dramatically accelerated.",
  },
  {
    question: "How do you guarantee 60fps performance with interactive 3D configurators?",
    answer:
      "Every 3D model adheres to strict performance budgets: DRACO geometry compression, KTX2 texture compression, and automatic level-of-detail (LOD) degradation. On low-tier mobile GPUs, we serve pre-rendered progressive video fallbacks, ensuring zero stutter or battery drain for mobile shoppers.",
  },
  {
    question: "What does the handoff and post-launch process look like?",
    answer:
      "Upon launch, full ownership of the private Git repository, CI/CD pipeline configuration, and deployment environments (Vercel/AWS) is transferred to you. We provide administrative training and clean, strictly typed code with zero vendor lock-in. Direct ongoing retainer support is also available as your brand scales.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ====================================================================
          01: HERO & PROTOCOL TICKER (EXACT 100DVH INITIAL WINDOW VIEWPORT)
          ==================================================================== */}
      <div className="hero-landing-fold">
        <section className="hero-unified-canvas">
          <HeroFannedCards />
          <div className="hero-copy-layered">
            <div className="hero-copy-inner">
              <div className="eyebrow">Independent Commerce Engineering</div>
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
                <a className="text-link" href="#benchmarks">
                  Explore architecture guarantees <ArrowDownRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* REPLACEMENT FOR CLIENT LOGO TICKER: TECH STACK & PROTOCOL TICKER */}
        <div className="tech-protocol-strip" aria-label="Engineered tech stack protocols">
          <Marquee pauseOnHover repeat={4} className="[--duration:40s]">
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
            02: THE AGENCY THESIS & BENCHMARKS (METRICS ALTERNATIVE)
            ==================================================================== */}
        <section className="section-pad-lg" id="benchmarks">
          <div className="section-head-wrap">
            <span className="eyebrow">Architecture Guarantees</span>
            <h2>
              Sub-100ms page loads. Composable headless stacks. Zero technical debt.
            </h2>
            <p>
              We replace vanity claims and bloated plugin marketplaces with deterministic technical benchmarks engineered directly into the core application codebase.
            </p>
          </div>

          <BentoGrid>
            <BentoCard
              name="Sub-100ms TTFB"
              description="Edge-rendered server architecture cached across global CDN nodes, preventing bounce before page hydration."
              Icon={Zap}
              metric={
                <>
                  <NumberTicker value={98} />
                  <span className="text-xl font-normal text-muted-foreground ml-1">ms</span>
                </>
              }
              tag="Latency Standard"
              href="#spec-showcase"
              cta="View live speed benchmarks"
            />
            <BentoCard
              name="Lighthouse 100/100"
              description="Zero cumulative layout shift, instantaneous first contentful paint, and strict AA accessibility compliance across all routes."
              Icon={Gauge}
              metric={
                <>
                  <NumberTicker value={100} />
                  <span className="text-xl font-normal text-muted-foreground ml-1">/100</span>
                </>
              }
              tag="Vitals Target"
              href="#spec-showcase"
              cta="Inspect audit protocol"
            />
            <BentoCard
              name="Zero Third-Party Bloat"
              description="Eliminating 40+ unvetted scripts and jQuery plugins. Persistent cart drawers and variant selectors are bespoke and natively compiled."
              Icon={Layers}
              metric={
                <>
                  <span>0</span>
                  <span className="text-lg font-normal text-muted-foreground ml-1.5">Plugins</span>
                </>
              }
              tag="Purity Metric"
              href="#manifesto"
              cta="Review code comparison"
            />
            <BentoCard
              name="Strict Type Safety"
              description="End-to-end strict TypeScript across all APIs, database schemas, and client state with full automated Vitest test coverage."
              Icon={ShieldCheck}
              metric={
                <>
                  <NumberTicker value={100} />
                  <span className="text-xl font-normal text-muted-foreground ml-1">%</span>
                </>
              }
              tag="Code Quality"
              href="#manifesto"
              cta="Inspect engineering manifesto"
            />
          </BentoGrid>
        </section>

        {/* ====================================================================
            03: FLAGSHIP PROOF OF WORK ("BUILT TO SPEC" SHOWCASES)
            ==================================================================== */}
        <section className="section-pad-lg" id="spec-showcase">
          <div className="section-head-wrap">
            <span className="eyebrow">Built To Spec Showcases</span>
            <h2>
              Working architectural prototypes &amp; production-ready flagships.
            </h2>
            <p>
              Explore end-to-end commerce environments built to demonstrate real-time 3D configuration, optimistic cart handling, and instantaneous catalog discovery.
            </p>
          </div>

          <FocusCards cards={builtToSpecCards} />
        </section>

        {/* ====================================================================
            04: TACTILE COMMERCE INTERACTION SLICE
            ==================================================================== */}
        <section className="demo-section">
          <div className="demo-copy">
            <span className="thesis-eyebrow">Tactile Standard</span>
            <h2>Interactive commerce architecture in production.</h2>
            <p>
              A live commerce slice demonstrating real-time finish switching, dynamic subtotal calculations, and optimistic cart updates without layout shift.
            </p>
            <span className="demo-note">
              Live interaction slice · Optimistic state handling
            </span>
          </div>
          <ProductDemo />
        </section>

        {/* ====================================================================
            05: CORE SERVICES & ARCHITECTURAL MODULES (WITH BORDER BEAM)
            ==================================================================== */}
        <section className="section-pad-lg" id="services">
          <div className="section-head-wrap">
            <span className="eyebrow">Core Engineering Modules</span>
            <h2>What we build for ambitious commerce brands.</h2>
            <p>
              Direct, no-fluff technical execution across the entire commerce journey—from initial customer impression to administrative fulfillment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {engineeringModules.map((mod, index) => (
              <div key={mod.title} className="service-module-card">
                {/* Border Beam subtle traveling highlight on first card */}
                {index === 0 && <BorderBeam size={70} duration={7} borderWidth={1.5} />}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-semibold">
                      {mod.eyebrow}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-display text-neutral-900 dark:text-neutral-100 tracking-tight mb-3">
                    {mod.title}
                  </h3>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    {mod.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {mod.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-300/40 dark:border-neutral-800">
                  {mod.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10.5px] font-mono text-neutral-600 dark:text-neutral-400 bg-neutral-200/50 dark:bg-neutral-800/60 px-2.5 py-1 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====================================================================
            06: TECHNICAL INSIGHTS & ARCHITECTURE PLAYBOOKS
            ==================================================================== */}
        <section className="section-pad-lg" id="insights">
          <div className="section-head-wrap">
            <span className="eyebrow">Technical Playbooks</span>
            <h2>Practical architecture insights from the engineering floor.</h2>
            <p>
              Clear, direct breakdowns of headless tradeoffs, 3D mobile budgets, and caching mechanics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {technicalPlaybooks.map((book) => (
              <Link
                key={book.title}
                href={book.href}
                className="group relative flex flex-col justify-between p-6 rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-[rgba(243,240,232,0.6)] dark:bg-[rgba(18,19,26,0.6)] backdrop-blur-md transition-all duration-300 hover:border-orange-500/50 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-4">
                    <span className="text-orange-600 dark:text-orange-400 uppercase tracking-wider font-semibold">
                      {book.tag}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {book.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-neutral-900 dark:text-neutral-100 tracking-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {book.title}
                  </h3>

                  <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {book.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-neutral-300/40 dark:border-neutral-800 text-xs font-medium text-neutral-900 dark:text-neutral-100">
                  <span>Read technical breakdown</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ====================================================================
            07: ENGINEERING STANDARDS & MANIFESTO (CODE COMPARISON)
            ==================================================================== */}
        <section className="section-pad-lg" id="manifesto">
          <div className="section-head-wrap text-center max-w-3xl mx-auto">
            <span className="eyebrow">Engineering Standard</span>
            <h2>Direct senior execution. Zero middle managers. Transparent code.</h2>
            <p className="mx-auto">
              In place of account coordinators and junior handoffs, you collaborate directly with the senior specialist architecting and coding your system.
            </p>
          </div>

          <div className="mt-8 mb-16">
            <CodeComparisonCard />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-neutral-300 dark:border-neutral-800">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-semibold block mb-2">
                Pillar 01 · Restraint Over Noise
              </span>
              <h4 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                The Discipline of Restraint
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Zero aggressive popups. Zero artificial countdown urgency. Discerning customers respond to quiet confidence, generous breathing room, and interfaces that respect their intelligence.
              </p>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-semibold block mb-2">
                Pillar 02 · Full-Stack Ownership
              </span>
              <h4 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                True Full-Stack Ownership
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                From sub-second Next.js edge rendering and custom Prisma/PostgreSQL schemas to optimistic cart drawers and resilient Stripe checkout flows. Complete technical autonomy with zero platform lock-in.
              </p>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-semibold block mb-2">
                Pillar 03 · Direct Collaboration
              </span>
              <h4 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                Direct Senior Collaboration
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                You work directly with the specialist designing the interface, writing the production code, and optimizing the system. No account managers, no junior contractors, and zero diluted context.
              </p>
            </div>
          </div>
        </section>

        {/* ====================================================================
            08: TRANSPARENT FAQ (ASK PHILL STYLE)
            ==================================================================== */}
        <section className="section-pad-lg" id="faq">
          <div className="section-head-wrap">
            <span className="eyebrow">Commercial Transparency</span>
            <h2>Direct answers before we write a single line of code.</h2>
            <p>
              Clear scopes, realistic timelines, and technical trade-offs so you can make an informed decision without agency sales pressure.
            </p>
          </div>

          <div className="max-w-4xl">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {transparentFaqItems.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${index}`}
                  className="border border-neutral-300 dark:border-neutral-800 rounded-xl px-6 py-2 bg-[rgba(243,240,232,0.5)] dark:bg-[rgba(18,19,26,0.5)] backdrop-blur-md"
                >
                  <AccordionTrigger className="text-left font-display font-bold text-base md:text-lg text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-400 transition-colors py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ====================================================================
            09: FINAL CALL TO ACTION & STUDIO CONVERSION BAR
            ==================================================================== */}
        <section className="section-pad-lg pt-4 pb-20">
          <div className="studio-conversion-bar">
            <div className="conversion-glow" aria-hidden="true" />

            <div className="relative z-10 max-w-2xl">
              <span className="inline-block text-xs font-mono uppercase tracking-widest text-orange-400 font-bold mb-3">
                Booking Q2 / Q3 Commissions
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-white leading-tight mb-4">
                Ready to build a digital flagship that commands authority?
              </h2>
              <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-8">
                Schedule a 30-minute technical discovery session or request a storefront performance audit. Direct senior engineering. Fixed milestones between $2k–$5k.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Link
                  href="/contact"
                  className="button button-dark bg-orange-600 hover:bg-orange-500 text-white font-medium px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                >
                  Start your project <ArrowUpRight size={16} />
                </Link>
                <Link
                  href="/contact?type=audit"
                  className="px-6 py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/10 transition-colors text-sm"
                >
                  Request Architecture Audit
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-[11px] font-mono text-neutral-400">
                <div>
                  <span className="block text-white font-semibold">Q2/Q3 2026</span>
                  <span>Commissions Open</span>
                </div>
                <div>
                  <span className="block text-white font-semibold">Senior Direct</span>
                  <span>Zero Middlemen</span>
                </div>
                <div>
                  <span className="block text-white font-semibold">$2k–$5k Scope</span>
                  <span>Fixed Milestones</span>
                </div>
                <div>
                  <span className="block text-white font-semibold">&lt; 24h Response</span>
                  <span>Direct Communication</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
