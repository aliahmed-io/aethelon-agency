"use client";

import React, { useRef, useState } from "react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────────────────
   KINETIC TILT BASE (cursor-following spotlight + 3D tilt)
   ───────────────────────────────────────────────────────────────────────────── */
function KineticTiltCard({
  children,
  className,
  floatClass,
}: {
  children: React.ReactNode;
  className?: string;
  floatClass?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setTilt({ x: -((y - cy) / cy) * 6, y: ((x - cx) / cx) * 6 });
  };

  return (
    <div className={cn("kinetic-card-anchor", floatClass)}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setTilt({ x: 0, y: 0 }); }}
        className={cn("kinetic-floating-card", className)}
        style={{
          transform: isHovered
            ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px) scale(1.02)`
            : "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 ease-out z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle 180px at ${coords.x}px ${coords.y}px, rgba(189, 59, 5, 0.08), transparent 75%)`,
          }}
        />
        <div className="relative z-10 w-full">{children}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CARD 1 — +94%  3D Commerce Conversion
   Visual: 3 layered depth planes in perspective — spatial depth signal
   Source: Shopify Platform Research
   ───────────────────────────────────────────────────────────────────────────── */
function Card3DConversion() {
  return (
    <KineticTiltCard className="card-orbit-top-left" floatClass="orbit-float-1">
      <div className="card-header-row">
        <span className="card-eyebrow-label">3D Commerce</span>
      </div>

      <div className="card-metric-wrap">
        <span className="kinetic-stat-number">
          +<NumberTicker value={94} className="kinetic-stat-number" />%
        </span>
      </div>

      {/* Spatial depth visual — 3 layered perspective planes */}
      <div className="stat3d-depth-visual" aria-hidden="true">
        <div className="stat3d-plane stat3d-plane-back" />
        <div className="stat3d-plane stat3d-plane-mid" />
        <div className="stat3d-plane stat3d-plane-front" />
      </div>

      <p className="card-footnote-text">
        Avg. conversion lift for products with 3D and AR vs. static imagery.
      </p>
      <div className="card-source-line">Shopify Platform Research</div>
    </KineticTiltCard>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CARD 2 — +35.26%  Checkout UX Conversion Lift
   Visual: Checkout funnel — 4 bars narrowing like a purchase funnel
   Source: Baymard Institute
   ───────────────────────────────────────────────────────────────────────────── */
function CardCheckoutUX() {
  const funnelSteps = [
    { label: "Visit", widthPct: 100 },
    { label: "Cart", widthPct: 68 },
    { label: "Checkout", widthPct: 44 },
    { label: "Purchase", widthPct: 28 },
  ] as const;

  return (
    <KineticTiltCard className="card-orbit-top-right" floatClass="orbit-float-2">
      <div className="card-header-row">
        <span className="card-eyebrow-label">Checkout UX</span>
      </div>

      <div className="card-metric-wrap">
        <span className="kinetic-stat-number" style={{ fontSize: "clamp(32px, 3.5vw, 44px)" }}>
          +<NumberTicker value={35} className="kinetic-stat-number" />
          <span style={{ fontSize: "0.55em", letterSpacing: "-0.02em" }}>.26%</span>
        </span>
      </div>

      {/* Funnel visualization */}
      <div className="checkout-funnel-visual" aria-label="Purchase funnel visualization" role="img">
        {funnelSteps.map((step) => (
          <div key={step.label} className="funnel-row">
            <div
              className="funnel-bar"
              style={{ width: `${step.widthPct}%` }}
              title={step.label}
            />
          </div>
        ))}
      </div>

      <p className="card-footnote-text">
        Potential conversion increase from optimizing checkout friction points.
      </p>
      <div className="card-source-line">Baymard Institute — 78K+ data points</div>
    </KineticTiltCard>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CARD 3 — $3.65  Cart Recovery Revenue per Recipient
   Visual: Dark warm card with ascending revenue signal bars
   Source: Klaviyo — 143K+ flows analyzed
   ───────────────────────────────────────────────────────────────────────────── */
function CardCartRecovery() {
  const signalBars = [0.22, 0.38, 0.52, 0.65, 0.78, 0.88, 1] as const;

  return (
    <KineticTiltCard className="card-orbit-bottom-left card-dark-recovery" floatClass="orbit-float-3">
      <div className="card-header-row">
        <span className="card-eyebrow-label card-eyebrow-light">Cart Recovery</span>
      </div>

      <div className="card-metric-wrap">
        <span className="kinetic-stat-number kinetic-stat-light">$3.65</span>
      </div>

      {/* Ascending revenue signal bars */}
      <div className="recovery-signal-bars" aria-label="Revenue recovery signal visualization" role="img">
        {signalBars.map((h, i) => (
          <div
            key={i}
            className="recovery-bar"
            style={{ height: `${h * 100}%` }}
          />
        ))}
      </div>

      <p className="card-footnote-text card-footnote-light">
        Avg. revenue per recipient generated by abandoned-cart flows.
      </p>
      <div className="card-source-line card-source-light">Klaviyo — 143K+ flows analyzed</div>
    </KineticTiltCard>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CARD 4 — 5×  AI-Assisted Conversion
   Visual: Side-by-side comparison columns — baseline vs AI-assisted
   Source: McKinsey — Karaca case study
   ───────────────────────────────────────────────────────────────────────────── */
function CardAIConversion() {
  return (
    <KineticTiltCard className="card-orbit-bottom-right card-ai-comparison" floatClass="orbit-float-4">
      <div className="card-header-row">
        <span className="card-eyebrow-label">AI-Assisted Shopping</span>
      </div>

      <div className="card-metric-wrap">
        <span className="kinetic-stat-number">
          5<span style={{ fontSize: "0.65em", letterSpacing: "-0.02em" }}>×</span>
        </span>
      </div>

      {/* Comparison columns */}
      <div className="ai-compare-columns" aria-label="Conversion rate: standard vs AI-assisted" role="img">
        <div className="ai-compare-col">
          <div className="ai-compare-bar ai-compare-bar-base" />
          <span className="ai-compare-label">Standard</span>
        </div>
        <div className="ai-compare-col">
          <div className="ai-compare-bar ai-compare-bar-ai" />
          <span className="ai-compare-label ai-compare-label-ai">AI-Assisted</span>
        </div>
      </div>

      <p className="card-footnote-text">
        Higher conversion rate from AI-assisted sessions vs. unaided browsing.
      </p>
      <div className="card-source-line">McKinsey — Karaca case study</div>
    </KineticTiltCard>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION
   ───────────────────────────────────────────────────────────────────────────── */
export default function BusinessImpactSection() {
  return (
    <section
      className="dramatic-stage-section"
      id="impact"
      aria-label="Commercial Performance Standard"
    >
      <div className="dramatic-stage-container">
        <div className="dramatic-center-copy">
          <h2 className="dramatic-giant-headline">Stores Built to Outperform.</h2>
          <p className="dramatic-center-subtext">
            Faster load times, fewer returns, higher revenue. Here&apos;s what the research says.
          </p>
        </div>

        <div className="dramatic-cards-orbit">
          <Card3DConversion />
          <CardCheckoutUX />
          <CardCartRecovery />
          <CardAIConversion />
        </div>
      </div>
    </section>
  );
}
