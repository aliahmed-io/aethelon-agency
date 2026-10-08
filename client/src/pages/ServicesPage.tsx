import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  X,
  ShieldCheck,
  Zap,
  Layers,
  Clock,
  Sparkles,
  Quote,
} from "lucide-react";
import { Marquee } from "../components/ui/marquee";
import FlagshipConversionSection from "../components/islands/FlagshipConversionSection";

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

const packages = [
  {
    number: "01",
    name: "The Fast Custom Storefront",
    price: "$2,000",
    deposit: "$400 (20% to start)",
    timeline: "~10 Days",
    badge: "Foundation",
    popular: false,
    subtitle: "Headless (Shopify / WooCommerce) or Custom Website",
    bestFor:
      "Stores that want a custom-designed, sub-second Next.js storefront without losing their existing backend—or a clean standalone store.",
    includes: [
      "Custom Next.js responsive design (Product, Collections, Cart & Checkout)",
      "Connects to your existing Shopify/WooCommerce (zero migration headache) OR custom backend",
      "Sub-second page loads & 95+ Lighthouse performance score",
      "2-Stage Abandoned Cart Recovery emails (1h & 24h — recovers 10–15% lost sales)",
      "Newsletter signup & automated welcome email sequence ($36:$1 avg ROI)",
      "SEO-ready blog infrastructure & structured schema markup",
      "Full security audit & vulnerability protection",
      "Multi-language & multi-currency ready",
      "2 months of free post-launch support & updates",
    ],
    carePlan: "Optional $200/mo care plan after 2 free months (cancel anytime)",
  },
  {
    number: "02",
    name: "The Flagship 3D & AI Store",
    price: "$3,500",
    deposit: "$700 (20% to start)",
    timeline: "10—12 Days",
    badge: "Most Popular",
    popular: true,
    subtitle: "Complete Spatial 3D, AR & AI Conversion System",
    bestFor:
      "Brands ready to offer interactive 3D/AR room previews and 24/7 AI shopping assistance as an unfair conversion advantage.",
    includes: [
      "Everything in the $2,000 Custom Storefront package",
      "5 to 10 custom 3D product models for your best-selling items",
      "Mobile Wall & Floor AR Preview (place products in real rooms)",
      "Desktop AR Room Photo Compositing (upload a room photo on any device)",
      "24/7 AI Product Assistant & Chatbot (trained on your catalog, replies in <3s)",
      "Smart AI Semantic Search (understands buyer intent, zero dead-ends)",
      "AR Snapshot Sharing (shoppers save & share room previews)",
      "1 extra custom high-converting campaign landing page",
      "2 months of free post-launch support & updates",
    ],
    carePlan: "Optional $200/mo care plan after 2 free months (cancel anytime)",
  },
  {
    number: "03",
    name: "Full Custom Platform & Admin",
    price: "$4,000",
    deposit: "$800 (20% to start)",
    timeline: "10—14 Days",
    badge: "Complete Ownership",
    popular: false,
    subtitle: "100% Independent Full-Stack Platform + AI Operations",
    bestFor:
      "Brands that want a fully custom backend and admin dashboard tailored to their workflow—with zero Shopify or WooCommerce dependency ever.",
    includes: [
      "Everything in the $3,500 Flagship 3D & AI Store package",
      "Fully custom Next.js backend & PostgreSQL database (or deep headless API sync)",
      "Custom Admin & Operations Dashboard built around your workflow",
      "AI Room Photo Analyzer (Gemini Vision recommends products from customer photos)",
      "Campaign Generator, email blast engine & wishlist price-drop alerts",
      "Automated daily sales briefings & inventory reorder alerts",
      "Custom team walk-through training video & documentation",
      "100% platform independence — zero recurring SaaS transaction fees",
      "2 months of free post-launch support & updates",
    ],
    carePlan: "Optional $300/mo priority care plan after 2 free months",
  },
];

const addOns = [
  { name: "5 Extra 3D Product Models", price: "+$400" },
  { name: "Standalone 24/7 AI Shopping Chatbot", price: "+$500" },
  { name: "Smart AI Search & Recommendations", price: "+$400" },
  { name: "Multi-Language & Multi-Currency Setup", price: "+$300" },
  { name: "Admin Dashboard Audit & Upgrade", price: "+$400" },
  { name: "Extra Campaign Landing Page", price: "+$200" },
];

const revenueFeatures = [
  {
    number: "01",
    title: "Headless or 100% Custom Full-Stack",
    subtitle: "Zero Migration Headache or Complete Independence",
    timeline: "Included",
    description:
      "No migration stress. Keep your existing Shopify or WooCommerce backend, inventory, and checkout while we supercharge the storefront your customers see—or choose a 100% custom full-stack website with your own database and zero platform fees.",
    bullets: [
      "Connects directly to Shopify or WooCommerce via GraphQL/REST APIs",
      "Or launch a standalone Next.js + PostgreSQL full-stack platform",
      "Keep your existing products, order history & Stripe/Shopify payments",
      "Sub-100ms page transitions that pass Core Web Vitals out of the box",
    ],
    highlight: "Result: Up to 70% faster load times without disrupting your operations.",
  },
  {
    number: "02",
    title: "Desktop + Mobile AR Room Preview",
    subtitle: "3D Viewers & Room Photo Compositing",
    timeline: "Included in $3.5k+",
    description:
      "Customers can rotate and inspect photorealistic 3D models from every angle, project items onto their floor or wall on mobile, or upload a photo of their room right on their desktop laptop.",
    bullets: [
      "5–10 custom optimized 3D models included for your top products",
      "Mobile WebXR floor & wall augmented reality placement",
      "Desktop room-photo upload & 3D staging (works on every device)",
      "Built-in AR snapshot capture so shoppers share their room setups",
    ],
    highlight: "Result: Up to 94% higher conversion rate and 40% fewer product returns.",
  },
  {
    number: "03",
    title: "24/7 AI Product Assistant & Smart Search",
    subtitle: "Under-3-Second Decision Support",
    timeline: "Included in $3.5k+",
    description:
      "An intelligent shopping assistant trained on your exact catalog that answers sizing, material, compatibility, and shipping questions in under 3 seconds—paired with search that understands what shoppers mean.",
    bullets: [
      "24/7 catalog-trained AI assistant that never hallucinates inventory",
      "Natural-language semantic search ('oak desk for a small apartment')",
      "AI Room Photo Analyzer that recommends matching items from a photo",
      "Server-side AI security with zero exposed client API keys",
    ],
    highlight: "Result: Automates up to 80% of repetitive support questions and lifts conversion.",
  },
  {
    number: "04",
    title: "2-Stage Abandoned Cart Recovery",
    subtitle: "Automated 1h & 24h Revenue Recovery",
    timeline: "Included in All Tiers",
    description:
      "Most stores lose 70%+ of shoppers at checkout. We wire automated 2-stage cart recovery emails (at 1 hour and 24 hours) plus wishlist price-drop alerts that bring buyers back automatically.",
    bullets: [
      "1-hour gentle reminder & 24-hour high-intent recovery sequence",
      "Automated newsletter signup & high-converting welcome flow",
      "Wishlist restock & price-drop email notifications",
      "Recovers 10–15% of abandoned carts with zero extra ad spend",
    ],
    highlight: "Result: Email automation averages $36 return for every $1 spent.",
  },
  {
    number: "05",
    title: "Automated Revenue & Retention Systems",
    subtitle: "Admin Dashboard, Campaigns & SEO Blog",
    timeline: "Included",
    description:
      "Everything you need to run and grow your store day-to-day without hiring a marketing agency: a clean admin dashboard, one-click email campaign blasts, and an SEO-engineered blog.",
    bullets: [
      "Intuitive admin dashboard for catalog, orders & daily sales metrics",
      "Built-in editorial blog & automatic sitemap/schema SEO markup",
      "One-click campaign & promotional email blast generator",
      "Clean documentation + custom video walkthrough for your team",
    ],
    highlight: "Result: Complete operational clarity and long-term organic search traffic.",
  },
  {
    number: "06",
    title: "2 Months Free Support & $200/mo Care Plan",
    subtitle: "Zero Lock-In Post-Launch Partnership",
    timeline: "2 Months Free",
    description:
      "You are never left stranded after launch. Every store includes 2 full months of free maintenance, bug fixes, and updates—followed by an optional, low-cost monthly care plan if you want ongoing engineering.",
    bullets: [
      "First 2 months of post-launch support & updates 100% free",
      "Optional $200/mo Care Plan afterwards (security, speed & updates)",
      "Month-to-month flexibility — pause or cancel anytime with 7 days notice",
      "You own 100% of the code and 3D assets from day one",
    ],
    highlight: "Result: Peace of mind without expensive agency retainers or lock-in.",
  },
];

const milestoneSteps = [
  {
    step: "01",
    phase: "Kickoff & Setup",
    day: "Day 1",
    pct: "20% Deposit ($400—$800)",
    summary:
      "We lock in your fixed scope and price, connect your Shopify/WooCommerce backend (or initialize your custom database), and start building within 24 hours.",
  },
  {
    step: "02",
    phase: "Interactive Design Approval",
    day: "Day 4",
    pct: "30% Upon Approval",
    summary:
      "You review and approve the high-fidelity custom design, typography, and mobile/desktop layouts before full feature integration continues.",
  },
  {
    step: "03",
    phase: "Live Staging Storefront",
    day: "Day 8",
    pct: "30% Upon Approval",
    summary:
      "Your complete store—including 3D product viewers, AR preview, AI search, cart recovery, and checkout—is live on a private staging link for you to test firsthand.",
  },
  {
    step: "04",
    phase: "Launch & Full Handover",
    day: "Day 10—14",
    pct: "20% Final Sign-off",
    summary:
      "We map your domain, verify 95+ Lighthouse speed, transfer 100% of the code and 3D assets to you, deliver your training video, and start your 2 months of free support.",
  },
];

const comparisons = [
  {
    feature: "Total Price & Value",
    generic: "Charges $15,000–$30,000+ to cover account managers & agency overhead",
    aethelon: "$2,000–$4,000 fixed price — you pay only for senior engineering",
  },
  {
    feature: "Upfront Risk",
    generic: "Demands 50% upfront ($7,500+) before you see a single line of work",
    aethelon: "Start with just 20% ($400) — pay each step only after you approve live work",
  },
  {
    feature: "Delivery Speed",
    generic: "Takes 2 to 4 months of drawn-out meetings and handoffs",
    aethelon: "Live on staging in 8 days, launched in 10–14 days",
  },
  {
    feature: "Who Builds Your Store",
    generic: "Pitched by a senior partner, then handed off to a junior developer",
    aethelon: "Direct 1-on-1 collaboration with the senior engineer building your store",
  },
  {
    feature: "Platform Flexibility",
    generic: "Forces you into a rigid pre-made theme or painful migration",
    aethelon: "Keep your Shopify/WooCommerce backend (headless) OR go 100% custom full-stack",
  },
  {
    feature: "3D, AR & AI Features",
    generic: "Treated as expensive $5k+ add-ons or slow third-party plugins",
    aethelon: "Native 3D models, Mobile/Desktop AR, AI assistant & cart recovery built in",
  },
  {
    feature: "Code Ownership & Support",
    generic: "Proprietary lock-in and mandatory $1,500+/mo retainers",
    aethelon: "You own 100% of code & 3D assets + 2 months free support ($200/mo optional after)",
  },
];

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
      {/* 1. HERO */}
      <div className="inner-hero">
        <SectionLabel index="01">Packages &amp; Fast-Track Delivery</SectionLabel>
        <h1>
          Agency-grade stores.<br />
          <em>Live in 10 days.</em>
        </h1>
        <p>
          Whether you want a fast headless storefront on top of your existing Shopify or WooCommerce backend (zero migration headache) or a 100% custom full-stack website, you work directly with a senior engineer—starting at $2,000 with just $400 down.
        </p>
      </div>

      {/* 2. STUDIO STANDARDS TICKER */}
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

      {/* 3. PRODUCTIZED PACKAGES ($2K - $4K) */}
      <section className="services-packages-section section-pad" id="packages">
        <div className="services-section-head">
          <SectionLabel index="02">Simple, Transparent Pricing</SectionLabel>
          <h2>Choose your build package</h2>
          <p>
            No hidden fees, no hourly billing surprises. Pick the package that fits your store, start with a 20% deposit, and go live in 10–14 days.
          </p>
        </div>

        <div className="packages-modern-grid">
          {packages.map((pkg) => (
            <article
              key={pkg.number}
              className={`package-modern-card ${pkg.popular ? "is-popular" : ""}`}
            >
              <div className="package-card-top">
                <span className="package-badge-pill">
                  {pkg.popular && <Sparkles size={11} aria-hidden="true" />}
                  {pkg.badge}
                </span>
                <span className="service-timeline-pill">
                  <Clock size={12} aria-hidden="true" />
                  {pkg.timeline}
                </span>
              </div>

              <div className="package-card-header">
                <h3>{pkg.name}</h3>
                <span className="package-card-sub">{pkg.subtitle}</span>
              </div>

              <div className="package-price-block">
                <div className="package-price-row">
                  <span className="package-price-value">{pkg.price}</span>
                  <span className="package-price-note">fixed scope</span>
                </div>
                <div className="package-deposit-pill">
                  Deposit to start: <strong>{pkg.deposit}</strong>
                </div>
              </div>

              <p className="package-best-for">{pkg.bestFor}</p>

              <div className="service-card-divider" />

              <div className="package-includes-label">What&apos;s included:</div>
              <ul className="service-card-bullets">
                {pkg.includes.map((item) => (
                  <li key={item}>
                    <Check size={14} className="service-check-icon" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="package-card-footer">
                <div className="package-care-note">
                  <span>Post-Launch Care</span>
                  <strong>{pkg.carePlan}</strong>
                </div>
                <Link
                  href="/contact"
                  className={`package-cta-btn ${pkg.popular ? "is-primary" : ""}`}
                >
                  <span>Start with {pkg.deposit.split(" ")[0]}</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* MODULAR ADD-ONS BOX */}
        <div className="addons-box-container">
          <div className="addons-box-header">
            <div>
              <span className="addons-eyebrow">Modular Upgrades</span>
              <h3>Optional Add-Ons (Can be added to any package)</h3>
            </div>
            <p>Start with the $2,000 foundation and add only the specific capabilities you need.</p>
          </div>
          <div className="addons-grid">
            {addOns.map((addon) => (
              <div key={addon.name} className="addon-item-row">
                <span className="addon-name">{addon.name}</span>
                <span className="addon-price">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TWO REASSURANCE BANNERS: HEADLESS OR CUSTOM + POST-LAUNCH CARE */}
        <div className="reassurance-dual-grid">
          <div className="reassurance-card">
            <span className="reassurance-tag">01 / Platform Flexibility</span>
            <h3>Keep Your Shopify / WooCommerce — Or Go 100% Custom</h3>
            <p>
              <strong>No migration headache:</strong> We can connect your new Next.js storefront directly to your existing Shopify or WooCommerce backend so your products, orders, and payments stay untouched. Want zero platform fees instead? We also build <strong>100% custom full-stack websites</strong> with your own database and admin panel.
            </p>
          </div>
          <div className="reassurance-card">
            <span className="reassurance-tag">02 / Long-Term Peace of Mind</span>
            <h3>2 Months Free Support + Optional $200/mo Care Plan</h3>
            <p>
              Every build includes <strong>2 full months of free support, bug fixes, and updates</strong> after launch. Need ongoing help after that? Opt into our simple <strong>$200/mo Care Plan</strong> (covering security patches, speed optimization, and monthly updates)—month-to-month, cancel anytime, zero lock-in.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CONCRETE REVENUE-SAVING FEATURES */}
      <div className="services-capabilities-section section-pad">
        <div className="services-section-head">
          <SectionLabel index="03">Built to Convert</SectionLabel>
          <h2>Features that pay for the build</h2>
          <p>Practical tools that speed up your store, answer buyer questions, and recover lost sales automatically.</p>
        </div>

        <div className="services-modern-grid">
          {revenueFeatures.map((cap) => (
            <article key={cap.number} className="service-modern-card">
              <div className="service-card-top">
                <span className="service-card-num">{cap.number}</span>
                <span className="service-timeline-pill">
                  <Clock size={12} aria-hidden="true" />
                  {cap.timeline}
                </span>
              </div>

              <div className="service-card-header">
                <h3>{cap.title}</h3>
                <span className="service-card-sub">{cap.subtitle}</span>
              </div>

              <p className="service-card-desc">{cap.description}</p>

              <div className="service-card-divider" />

              <ul className="service-card-bullets">
                {cap.bullets.map((b) => (
                  <li key={b}>
                    <Check size={14} className="service-check-icon" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="service-card-highlight">
                <span className="highlight-tag">Commercial Impact</span>
                <p>{cap.highlight}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* 5. THE 4-STAGE MILESTONE PLAN (20% / $400 TO START) */}
      <section className="services-milestones-section section-pad" id="milestones">
        <div className="milestones-header">
          <SectionLabel index="04">Zero-Risk Payment Schedule</SectionLabel>
          <h2>Start with $400. Pay as you approve.</h2>
          <p>Four clear checkpoints across a 10–14 day build. You never pay for work you haven&apos;t seen and tested live.</p>
        </div>

        {/* PULL QUOTE */}
        <div className="milestone-pullquote-box">
          <Quote size={28} className="milestone-quote-icon" aria-hidden="true" />
          <blockquote>
            &ldquo;You start with $400. You only pay the next step after you see and approve the work on a live link. Zero risk.&rdquo;
          </blockquote>
          <span className="milestone-quote-author">— The Aethelon Guarantee</span>
        </div>

        <div className="milestones-grid milestones-grid-4">
          {milestoneSteps.map((m) => (
            <div key={m.step} className="milestone-card">
              <div className="milestone-top">
                <span className="milestone-num">
                  {m.step} · {m.day}
                </span>
                <span className="milestone-pct">{m.pct}</span>
              </div>
              <h3>{m.phase}</h3>
              <p>{m.summary}</p>
            </div>
          ))}
        </div>

        <div className="milestones-guarantees">
          <div className="guarantee-item">
            <ShieldCheck size={16} aria-hidden="true" />
            <span>100% Code &amp; 3D Asset Ownership</span>
          </div>
          <div className="guarantee-item">
            <Zap size={16} aria-hidden="true" />
            <span>Fast 10—14 Day Delivery</span>
          </div>
          <div className="guarantee-item">
            <Layers size={16} aria-hidden="true" />
            <span>2 Months Free Post-Launch Support</span>
          </div>
        </div>
      </section>

      {/* 6. WHY SOLO ENGINEER VS GENERIC AGENCY COMPARISON TABLE */}
      <section className="services-comparison-section section-pad" id="compare">
        <div className="services-section-head">
          <SectionLabel index="05">Why Clients Switch</SectionLabel>
          <h2>Direct senior engineer vs. traditional agency</h2>
          <p>
            Why you get a $15,000 flagship build for $2,000–$4,000: zero account managers, zero agency bloat, and direct collaboration with the engineer building your store.
          </p>
        </div>

        <div className="comparison-table-wrapper">
          <table className="agency-comparison-table">
            <thead>
              <tr>
                <th>What Matters</th>
                <th>Generic Agency</th>
                <th className="is-aethelon-col">Aethelon (Direct Engineer)</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row) => (
                <tr key={row.feature}>
                  <td className="comp-feature-cell">{row.feature}</td>
                  <td className="comp-generic-cell">
                    <div className="comp-cell-inner">
                      <X size={15} className="comp-icon-x" aria-hidden="true" />
                      <span>{row.generic}</span>
                    </div>
                  </td>
                  <td className="comp-aethelon-cell">
                    <div className="comp-cell-inner">
                      <Check size={15} className="comp-icon-check" aria-hidden="true" />
                      <span>{row.aethelon}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. PRE-FOOTER CONVERSION CARD */}
      <FlagshipConversionSection />
    </main>
  );
}
