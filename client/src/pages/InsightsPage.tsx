import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { insightIndex, insightTopics } from "../lib/insight-index";
import InsightsArchiveIsland from "../components/islands/InsightsArchiveIsland";
import FlagshipConversionSection from "../components/islands/FlagshipConversionSection";

export default function InsightsPage() {
  return (
    <main className="inner-page insights-page">
      {/* 1. MODERN EDITORIAL HERO */}
      <div className="inner-hero modern-insights-hero">
        <div className="modern-hero-pill">
          <Sparkles size={12} aria-hidden="true" />
          <span>Research Publications & Field Notes</span>
        </div>

        <h1 className="modern-insights-title">
          Useful notes for<br />
          <em>better commerce.</em>
        </h1>

        <p className="modern-insights-subtitle">
          Evidence-backed thinking on the technical systems and design choices that make modern commerce storefronts faster to load, easier to buy from, and simpler to scale.
        </p>

        <div className="modern-insights-stats-deck">
          <div className="modern-stat-card">
            <strong>{insightIndex.length}</strong>
            <span>Field Notes in Archive</span>
          </div>
          <div className="modern-stat-card">
            <strong>2026</strong>
            <span>Editorial Series</span>
          </div>
          <div className="modern-stat-card">
            <strong>Sub-100ms</strong>
            <span>Performance Standard</span>
          </div>
          <div className="modern-stat-card">
            <strong>100%</strong>
            <span>Peer-Verified Data</span>
          </div>
        </div>
      </div>

      {/* 2. ARCHIVE WITH CATEGORY TOPIC FILTERS & EDITORIAL GRID */}
      <InsightsArchiveIsland insightIndex={insightIndex} insightTopics={insightTopics} />

      {/* 3. THE GROWTH / SEO SYSTEM PREVIEW */}
      <section className="seo-plan-preview">
        <div>
          <div className="section-label">
            <span>02</span>
            <span>The Growth Layer</span>
            <span className="label-line" />
          </div>
          <h2>
            SEO is the system<br />
            <em>behind the signal.</em>
          </h2>
        </div>
        <div>
          <p>
            A practical architectural guide for turning technical performance, structured metadata, and editorial routes into a compounding organic search surface—without vanity keyword stuffing or gimmicks.
          </p>
          <Link href="/insights/seo-for-commerce-that-compounds" className="text-link">
            Read the SEO architectural note <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 4. PRE-FOOTER CONVERSION & EMAIL CAPTURE */}
      <FlagshipConversionSection />
    </main>
  );
}
