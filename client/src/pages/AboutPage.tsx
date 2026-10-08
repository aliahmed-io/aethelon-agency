import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Layers, Sparkles, ShieldCheck, Zap } from "lucide-react";
import FlagshipConversionSection from "../components/islands/FlagshipConversionSection";

function SectionLabel({ children, index }: { children: ReactNode; index?: string }) {
  return (
    <div className="section-label">
      <span>{index || ""}</span>
      <span>{children}</span>
      <span className="label-line" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="inner-page about-page">
      {/* 1. HERO */}
      <div className="inner-hero">
        <SectionLabel index="01">About the Practice</SectionLabel>
        <h1>
          Direct collaboration.<br />
          <em>Senior execution.</em>
        </h1>
        <p>
          Aethelon is an independent commerce engineering practice building custom Next.js storefronts—either connected to your existing Shopify/WooCommerce backend or built 100% custom—delivered in 10–14 days for $2,000–$4,000.
        </p>
      </div>

      {/* 2. STATS & VERIFICATION STRIP */}
      <div className="portfolio-hero-stats-strip">
        <div className="stat-pill">
          <Zap size={13} className="stat-pill-icon" aria-hidden="true" />
          <span><strong>10—14 Days</strong> Fast Delivery</span>
        </div>
        <div className="stat-pill">
          <Layers size={13} className="stat-pill-icon" aria-hidden="true" />
          <span><strong>$400 Deposit</strong> 20% to Start</span>
        </div>
        <div className="stat-pill">
          <ShieldCheck size={13} className="stat-pill-icon" aria-hidden="true" />
          <span><strong>100%</strong> Code Ownership</span>
        </div>
        <div className="stat-pill">
          <Sparkles size={13} className="stat-pill-icon" aria-hidden="true" />
          <span><strong>Direct</strong> Senior Engineer</span>
        </div>
      </div>

      {/* 3. THE PREMISE & MEANING OF AETHELON */}
      <div className="about-story">
        <div>
          <span className="story-year">01 / The Premise</span>
          <h2>
            Good commerce<br />
            makes complexity<br />
            <em>feel effortless.</em>
          </h2>
        </div>
        <div>
          <div className="about-poetic-quote">
            <p>
              The name <em>Aethelon</em> carries an ancient meaning: the prize awarded after hard work—the reward earned through disciplined labor and trial. In commerce engineering, that prize is a system built with such care and rigor that immense technical complexity feels completely effortless to the customer.
            </p>
          </div>

          <p>
            Most ecommerce development suffers from friction at the seams between disconnected teams: designers who don&apos;t write production code, developers who don&apos;t understand typography or spatial hierarchy, and agency account managers who inflate budgets to $15,000+.
          </p>
          <p>
            When you hire a traditional agency, you pay for account directors, sales coordinators, and junior developers learning on your timeline.
          </p>
          <p>
            Working 1-on-1 directly with the senior full-stack engineer building your store gives you a single point of accountability, a store live in 10 days, and a $15,000 flagship system for $2,000–$4,000—starting with just a $400 deposit.
          </p>
        </div>
      </div>

      {/* 4. HOW PROJECTS RUN (10-DAY RHYTHM) */}
      <div className="studio-rhythm">
        <SectionLabel index="02">How a 10-day build runs</SectionLabel>
        {[
          [
            "Day 1 · 20% ($400)",
            "Kickoff & Backend Setup",
            "We lock in your fixed $2k–$4k package, connect your existing Shopify/WooCommerce backend (or initialize your custom database), and start building within 24 hours.",
          ],
          [
            "Day 4 · 30%",
            "Interactive Design Approval",
            "You review and approve the custom responsive design, typography, and layout on a live preview link before full engineering continues.",
          ],
          [
            "Day 8 · 30%",
            "Live Staging Storefront",
            "I deploy the full system—including 3D product models, mobile/desktop AR, AI assistant, and cart recovery—to a private staging URL for you to test firsthand.",
          ],
          [
            "Day 10–14 · 20%",
            "Launch & 2 Months Free Support",
            "We map your domain, verify 95+ Lighthouse speed, transfer 100% of the code and 3D assets to you, and begin 2 full months of free support (with an optional $200/mo care plan after).",
          ],
        ].map(([n, t, d]) => (
          <div key={n} className="rhythm-step-card">
            <span className="rhythm-step-num">{n}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
      </div>

      {/* 5. CORE STANDARDS */}
      <div className="principles">
        <SectionLabel index="03">Core standards</SectionLabel>
        {[
          "Direct 1-on-1 communication with the engineer—zero agency middlemen",
          "Keep your Shopify/WooCommerce backend (headless) OR go 100% custom full-stack",
          "Start with just $400 (20%)—pay each step only after you approve live work",
          "Interactive 3D models, Desktop/Mobile AR, AI search & 2-stage cart recovery",
          "100% code ownership + 2 months free support ($200/mo optional care plan after)",
        ].map((x, i) => (
          <div key={x} className="principle-item">
            <span>0{i + 1}</span>
            <strong>{x}</strong>
            <Link href="/services" aria-label="View packages">
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        ))}
      </div>

      {/* 6. PRE-FOOTER CONVERSION CARD */}
      <FlagshipConversionSection />
    </main>
  );
}
