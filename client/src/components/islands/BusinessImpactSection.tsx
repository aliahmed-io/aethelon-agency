"use client";

import React from "react";
import { 
  TrendingUp, 
  RefreshCcw, 
  Rotate3d, 
  Zap, 
  Lock,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

export default function BusinessImpactSection() {
  return (
    <section className="section-pad-lg" id="impact">
      <div className="impact-grid-container">
        {/* Left Column: 1 BIG STAT */}
        <div className="impact-stat-card">
          <div className="impact-stat-eyebrow">
            <TrendingUp size={14} className="text-orange-600 inline mr-1.5" />
            Commercial Retention &amp; Lift
          </div>

          <div className="impact-big-stat-wrap">
            <span className="impact-big-number">+38%</span>
            <span className="impact-stat-sub">Average First-Year Revenue Lift</span>
          </div>

          <p className="impact-stat-lead">
            We engineer commerce storefronts that turn casual visitors into repeat buyers. By eliminating checkout friction, verifying product scale in AR, and deploying autonomous recovery, we engineer lasting customer retention.
          </p>

          <Link href="/contact" className="impact-cta-link">
            <span>Calculate potential lift for your store</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Right Column: WORDS ONLY (No stats overload, clear business outcomes) */}
        <div className="impact-pillars-stack">
          {/* Pillar 1: Cart Recovery */}
          <div className="impact-pillar-item">
            <div className="pillar-icon-box">
              <RefreshCcw size={18} className="text-orange-600" />
            </div>
            <div className="pillar-content">
              <h3 className="pillar-title">Automated Cart Recovery Without SaaS Fees</h3>
              <p className="pillar-desc">
                When a customer abandons their cart, our autonomous recovery sequences deliver timed, single-use checkout URLs. We recover 10%–15% of dropped sales natively without charging you monthly subscription bills.
              </p>
            </div>
          </div>

          {/* Pillar 2: Reduced Return Rates */}
          <div className="impact-pillar-item">
            <div className="pillar-icon-box">
              <Rotate3d size={18} className="text-orange-600" />
            </div>
            <div className="pillar-content">
              <h3 className="pillar-title">Drastic Return Reduction via Spatial AR</h3>
              <p className="pillar-desc">
                The number one reason luxury home goods and jewelry are returned is size and finish mismatch. Allowing customers to place items in their living rooms to-scale removes doubt before purchase.
              </p>
            </div>
          </div>

          {/* Pillar 3: Sub-100ms Speed */}
          <div className="impact-pillar-item">
            <div className="pillar-icon-box">
              <Zap size={18} className="text-orange-600" />
            </div>
            <div className="pillar-content">
              <h3 className="pillar-title">Sub-100ms Worldwide Page Transitions</h3>
              <p className="pillar-desc">
                Every 100 milliseconds of latency costs luxury brands valuable conversions. Our edge-cached storefronts load catalogs instantly across every continent, keeping high-ticket shoppers fully engaged.
              </p>
            </div>
          </div>

          {/* Pillar 4: Scarcity & Exclusive Portals */}
          <div className="impact-pillar-item">
            <div className="pillar-icon-box">
              <Lock size={18} className="text-orange-600" />
            </div>
            <div className="pillar-content">
              <h3 className="pillar-title">Psychological Scarcity &amp; VIP Vault Portals</h3>
              <p className="pillar-desc">
                Build brand prestige through password-protected client portals and scheduled product drops. Engineered to anchor higher price points and reward your highest-value clientele.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
