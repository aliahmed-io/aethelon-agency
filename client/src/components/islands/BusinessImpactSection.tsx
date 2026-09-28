"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowUpRight, 
  ArrowRight,
} from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";

/**
 * Tactile 3D Tilt Card with cursor-following spotlight
 * Inspired by ReactBits SpotlightCard & TiltedCard
 */
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

    // Smooth subtle tilt (-6deg to +6deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = -((y - centerY) / centerY) * 6;
    const rotY = ((x - centerX) / centerX) * 6;
    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className={cn("kinetic-card-anchor", floatClass)}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn("kinetic-floating-card", className)}
        style={{
          transform: isHovered
            ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px) scale(1.02)`
            : "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)",
        }}
      >
        {/* ReactBits Cursor-Following Spotlight Glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 ease-out z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle 180px at ${coords.x}px ${coords.y}px, rgba(189, 59, 5, 0.08), transparent 75%)`,
          }}
        />
        <div className="relative z-10 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function BusinessImpactSection() {
  return (
    <section className="dramatic-stage-section" id="impact" aria-label="Commercial Performance Standard">
      <div className="dramatic-stage-container">
        
        {/* HEADLINE */}
        <div className="dramatic-center-copy">
          <h2 className="dramatic-giant-headline">
            Stores Built to Outperform.
          </h2>
          <p className="dramatic-center-subtext">
            Faster load times, fewer returns, higher revenue. Here's what our stores deliver.
          </p>
        </div>

        {/* CARDS */}
        <div className="dramatic-cards-orbit">

          {/* ------------------------------------------------------------------
              CARD 1: TOP-LEFT — REVENUE ACCELERATION (+38% NUMBERTICKER)
              ------------------------------------------------------------------ */}
          <KineticTiltCard
            className="card-orbit-top-left"
            floatClass="orbit-float-1"
          >
            <div className="card-header-row">
              <span className="card-eyebrow-label">
                Revenue
              </span>
              <Link
                href="/contact"
                className="card-arrow-circle"
                aria-label="Start project for revenue lift"
              >
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="card-metric-wrap">
              <span className="kinetic-stat-number">
                +<NumberTicker value={38} className="kinetic-stat-number" />%
              </span>
            </div>

            <p className="card-footnote-text">
              Average first-year revenue increase.
            </p>
          </KineticTiltCard>

          {/* ------------------------------------------------------------------
              CARD 2: TOP-RIGHT — SUB-100MS + 4-BAR METRIC SPARKLINE
              ------------------------------------------------------------------ */}
          <KineticTiltCard
            className="card-orbit-top-right"
            floatClass="orbit-float-2"
          >
            <div className="card-header-row">
              <span className="card-eyebrow-label">
                Speed
              </span>
            </div>

            <div className="card-metric-title">
              Sub-100ms
            </div>

            {/* 4-Bar Kinetic Latency Equalizer (Ask Phill bar chart reference) */}
            <div className="kinetic-bar-chart" aria-label="Global latency bars">
              <div className="kinetic-bar kinetic-bar-1" title="US East: 42ms" />
              <div className="kinetic-bar kinetic-bar-2" title="Europe: 38ms" />
              <div className="kinetic-bar kinetic-bar-3" title="Asia Pacific: 85ms" />
              <div className="kinetic-bar kinetic-bar-4" title="Global Average: <100ms" />
            </div>

            <p className="card-footnote-text">
              Global edge delivery, zero cold starts.
            </p>
          </KineticTiltCard>

          {/* ------------------------------------------------------------------
              CARD 3: BOTTOM-LEFT — EDITORIAL SPATIAL VISUAL
              ------------------------------------------------------------------ */}
          <KineticTiltCard
            className="card-orbit-bottom-left"
            floatClass="orbit-float-3"
          >
            <a href="#spatial-stage" className="spatial-preview-img-box group">
              <Image
                src="/images/projects/velorum-campaign.png"
                alt="Tactile spatial 3D preview"
                fill
                sizes="(max-width: 768px) 100vw, 340px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="spatial-img-overlay" />
              
              <div className="spatial-pill-tag">
                3D & AR
              </div>

              <div className="spatial-img-copy">
                <div className="spatial-img-title">
                  40% Return Reduction
                </div>
                <div className="spatial-img-link">
                  <span>Explore spatial stage</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          </KineticTiltCard>

          {/* ------------------------------------------------------------------
              CARD 4: BOTTOM-RIGHT — BESPOKE ARCHITECTURE FLAGSHIP CARD
              ------------------------------------------------------------------ */}
          <KineticTiltCard
            className="card-orbit-bottom-right"
            floatClass="orbit-float-4"
          >
            {/* Top Architecture Badge */}
            <div className="partner-badge-header">
              <div className="partner-icon-sq" aria-hidden="true">
                ae/
              </div>
              <div className="partner-badge-text">
                <span className="partner-badge-sup">Next.js 16 + Shopify API</span>
                <span className="partner-badge-sub">Native Architecture</span>
              </div>
            </div>

            {/* Bottom Typographic Command */}
            <div className="partner-bottom-copy">
              <div className="partner-prompt-text">
                Fast by default
              </div>
              <div className="partner-hero-title">
                Your Stack
              </div>
              <div className="partner-specs-footnote">
                No app bloat. Sub-100ms everywhere.
              </div>
            </div>
          </KineticTiltCard>

        </div>
      </div>
    </section>
  );
}
