"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  X,
  Command,
  Clock,
  ArrowRight,
} from "lucide-react";
import TempBadge from "./TempBadge";

const NAV_ITEMS = [
  {
    index: "01",
    label: "Portfolio",
    href: "/work",
    tag: "Selected Works",
    desc: "Custom headless storefronts & 3D configurators",
    previewImage: "/images/projects/oakwell.png",
    previewTitle: "Oakwell · Handcrafted Luxury Furniture",
    metric: "$2.4M ARR",
  },
  {
    index: "02",
    label: "Services",
    href: "/services",
    tag: "Capabilities",
    desc: "Next.js engineering, full-stack apps & APIs",
    previewImage: "/images/projects/aethelon.png",
    previewTitle: "Aethelon · Bespoke Architectural Commerce",
    metric: "0.2s TTFB",
  },
  {
    index: "03",
    label: "About",
    href: "/about",
    tag: "Studio Philosophy",
    desc: "Direct senior craft with zero agency bloat",
    previewImage: "/images/projects/lundev-furniture.png",
    previewTitle: "Lundev · Tactile 3D Furniture Studio",
    metric: "100/100 Perf",
  },
  {
    index: "04",
    label: "Insights",
    href: "/insights",
    tag: "Knowledge Base",
    desc: "Engineering essays on modern ecommerce architecture",
    previewImage: "/images/projects/velorum.png",
    previewTitle: "Velorum · Haute Horology Interactive 3D",
    metric: "12 Articles",
  },
  {
    index: "05",
    label: "Contact",
    href: "/contact",
    tag: "Commissions",
    desc: "Initiate your bespoke commerce build",
    previewImage: "/images/projects/oakwell.png",
    previewTitle: "Start a Commission · Booking for Q2/Q3",
    metric: "Direct Access",
  },
] as const;

type NavItem = (typeof NAV_ITEMS)[number];

/* =========================================================================
   ALTERNATIVE 1: THE ARCHITECTURAL INDEX (ULTRA-MINIMAL)
   - Zero chunky buttons, zero cartoon hamburger bars.
   - Quiet hairline typographic trigger: [ Index / 05 + ]
   - Serene architectural monograph slide-down drawer with generous breathing room.
   ========================================================================= */
export function NavAlternative1() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="nav-alt-wrapper" id="nav-alt-1">
      <TempBadge
        label="ALTERNATIVE 1 · THE ARCHITECTURAL INDEX"
        description="Ultra-Minimal · Quiet typographic [ Index / 05 ] trigger with zero chunky buttons + serene Swiss monograph drawer."
      />

      {/* Mock Browser Frame */}
      <div className="nav-mock-browser">
        {/* Header Bar */}
        <div className="nav-alt1-header">
          {/* Brand */}
          <div className="nav-alt1-brand">
            <span className="alt1-mark">AE/</span>
            <span className="alt1-name">Aethelon</span>
          </div>

          {/* Center Subtle Coordinate */}
          <div className="nav-alt1-meta">
            <span>Independent Commerce Engineering</span>
          </div>

          {/* Right: Quiet Hairline Index Trigger */}
          <div className="nav-alt1-actions">
            <button
              type="button"
              className={`alt1-trigger ${isOpen ? "is-open" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle architectural index"
            >
              <span className="alt1-trigger-text">{isOpen ? "Close" : "Index"}</span>
              <span className="alt1-trigger-count">/ 05</span>
              <span className="alt1-trigger-icon" aria-hidden="true">
                {isOpen ? "✕" : "+"}
              </span>
            </button>
            <Link href="/contact" className="alt1-cta-link">
              Commission <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Monograph Slide Drawer */}
        <div className={`alt1-drawer ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
          <div className="alt1-drawer-inner">
            <div className="alt1-drawer-grid">
              {/* Left: Numbered Links */}
              <div className="alt1-links-col">
                <span className="alt1-section-kicker">Navigation Directory</span>
                <nav className="alt1-nav-list" aria-label="Architectural Index Navigation">
                  {NAV_ITEMS.map((item, idx) => (
                    <Link
                      key={item.index}
                      href={item.href}
                      className={`alt1-nav-item ${hoveredIdx === idx ? "is-hovered" : ""}`}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="alt1-item-num">{item.index}</span>
                      <span className="alt1-item-title">{item.label}</span>
                      <span className="alt1-item-tag">{item.tag}</span>
                      <ArrowRight size={14} className="alt1-item-arrow" aria-hidden="true" />
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Right: Monograph Note & Studio Signal */}
              <div className="alt1-note-col">
                <span className="alt1-section-kicker">Studio Ethos</span>
                <p className="alt1-manifesto">
                  We reject the visual noise of generic web templates. Every build is treated with architectural discipline: clean Next.js foundations, unhurried typography, and direct founder-level craft.
                </p>
                <div className="alt1-availability-card">
                  <div className="alt1-avail-header">
                    <span className="alt1-avail-status">Availability</span>
                    <strong className="alt1-avail-slot">Accepting Q2/Q3 Commissions</strong>
                  </div>
                  <p className="alt1-avail-sub">2 bespoke build slots remaining for 2026.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mock Hero Content Behind Header */}
        <div className="nav-mock-canvas">
          <div className="mock-canvas-copy">
            <span className="mock-kicker">Modern Ecommerce Design & Build</span>
            <h3>Distinctive online stores designed to sell.</h3>
            <p>Click &quot;Index / 05 +&quot; on the top right to test the quiet monograph drawer.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   ALTERNATIVE 2: THE STUDIO RIBBON (DIRECT INLINE / NO HIDDEN MENU)
   - Zero hamburger on desktop: why bury routes when you have horizontal space?
   - Sleek sculpted floating center pill with magnetic hover slide.
   - Smooth single-tap drawer on mobile.
   ========================================================================= */
export function NavAlternative2() {
  const [activeTab, setActiveTab] = useState<string>("Portfolio");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="nav-alt-wrapper" id="nav-alt-2">
      <TempBadge
        label="ALTERNATIVE 2 · THE DIRECT STUDIO RIBBON"
        description="Functional Modernist · Zero hidden hamburger menu on desktop; sculpted floating ribbon with magnetic pill hover."
      />

      <div className="nav-mock-browser">
        {/* Header Bar */}
        <div className="nav-alt2-header">
          {/* Brand */}
          <div className="nav-alt2-brand">
            <span className="alt2-mark">AE/</span>
            <span className="alt2-name">Aethelon</span>
          </div>

          {/* Center: The Sculpted Inline Ribbon */}
          <nav className="nav-alt2-ribbon" aria-label="Desktop Studio Ribbon">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.label;
              return (
                <button
                  key={item.index}
                  type="button"
                  className={`alt2-ribbon-btn ${isActive ? "is-active" : ""}`}
                  onClick={() => setActiveTab(item.label)}
                >
                  <span className="alt2-btn-num">{item.index}</span>
                  <span className="alt2-btn-label">{item.label}</span>
                  {isActive && <span className="alt2-active-pill" />}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="nav-alt2-actions">
            <button
              type="button"
              className="alt2-mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
            >
              <span>{mobileOpen ? "Close" : "Menu"}</span>
            </button>
            <Link href="/contact" className="alt2-project-btn">
              Start a project <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Mobile Dropdown Sheet */}
        {mobileOpen && (
          <div className="alt2-mobile-sheet">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.index}
                href={item.href}
                className="alt2-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                <span>{item.index} / {item.label}</span>
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            ))}
          </div>
        )}

        {/* Mock Hero Content */}
        <div className="nav-mock-canvas">
          <div className="mock-canvas-copy">
            <span className="mock-kicker">Instant 1-Click Desktop Access</span>
            <h3>No hidden clicks between visitors and your work.</h3>
            <p>Hover and click the sculpted ribbon links above to test instant tab transitions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   ALTERNATIVE 3: THE TACTILE DYNAMIC ISLAND & COMPASS (KINETIC CREATIVE)
   - Centered interactive capsule: [ ⌘ Directory · Available ]
   - Expands with spring physics into a rich spatial studio dial with live work preview.
   ========================================================================= */
export function NavAlternative3() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<NavItem>(NAV_ITEMS[0]!);

  return (
    <div className="nav-alt-wrapper" id="nav-alt-3">
      <TempBadge
        label="ALTERNATIVE 3 · THE DYNAMIC ISLAND & COMPASS"
        description="Tactile & Kinetic · Floating capsule [ ⌘ Directory ] with micro-compass that blossoms into a spatial preview dial."
      />

      <div className="nav-mock-browser">
        {/* Header Bar */}
        <div className="nav-alt3-header">
          {/* Brand */}
          <div className="nav-alt3-brand">
            <span className="alt3-mark">AE/</span>
            <span className="alt3-name">Aethelon</span>
          </div>

          {/* Center: The Dynamic Island Capsule */}
          <div className="alt3-island-container">
            <button
              type="button"
              className={`alt3-island-pill ${isOpen ? "is-expanded" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle studio directory dial"
            >
              <Command size={13} className="alt3-cmd-icon" aria-hidden="true" />
              <span className="alt3-island-text">AE · Directory</span>
              <span className="alt3-badge-pill">Available</span>
              <span className="alt3-toggle-arrow">{isOpen ? "▲" : "▼"}</span>
            </button>

            {/* Expanded Morphing Dial Card */}
            {isOpen && (
              <div className="alt3-dial-card" role="dialog" aria-modal="true">
                <div className="alt3-dial-grid">
                  {/* Left: Routes */}
                  <div className="alt3-dial-nav">
                    <span className="alt3-dial-kicker">Studio Index</span>
                    {NAV_ITEMS.map((item) => {
                      const isSelected = activeItem.label === item.label;
                      return (
                        <button
                          key={item.index}
                          type="button"
                          className={`alt3-dial-row ${isSelected ? "is-selected" : ""}`}
                          onMouseEnter={() => setActiveItem(item)}
                          onClick={() => {
                            setActiveItem(item);
                            setIsOpen(false);
                          }}
                        >
                          <span className="alt3-row-num">{item.index}</span>
                          <span className="alt3-row-title">{item.label}</span>
                          <span className="alt3-row-desc">{item.tag}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right: Live Interactive Work Snapshot */}
                  <div className="alt3-dial-preview">
                    <span className="alt3-dial-kicker">Live Preview Lens</span>
                    <div className="alt3-preview-card">
                      <div className="alt3-preview-img-frame">
                        <Image
                          src={activeItem.previewImage}
                          alt={activeItem.previewTitle}
                          fill
                          unoptimized
                          className="alt3-preview-img"
                        />
                      </div>
                      <div className="alt3-preview-meta">
                        <strong>{activeItem.previewTitle}</strong>
                        <div className="alt3-meta-tag-row">
                          <span>{activeItem.desc}</span>
                          <b>{activeItem.metric}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="alt3-dial-footer">
                  <div className="alt3-footer-stat">
                    <Clock size={12} aria-hidden="true" />
                    <span>Amsterdam / NYC · 20:23 Local</span>
                  </div>
                  <Link href="/contact" className="alt3-footer-cta" onClick={() => setIsOpen(false)}>
                    Start a project <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right CTA */}
          <div className="nav-alt3-actions">
            <Link href="/contact" className="alt3-direct-cta">
              Start a project <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Mock Hero Content */}
        <div className="nav-mock-canvas">
          <div className="mock-canvas-copy">
            <span className="mock-kicker">Kinetic Micro-Interactions</span>
            <h3>A fluid dynamic island that rewards curiosity.</h3>
            <p>Click &quot;AE · Directory&quot; in the center to test the physics-inspired preview card.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   ALTERNATIVE 4: THE SPATIAL MONOLITH / SPLIT CURTAIN (EXTREME CREATIVITY)
   - Awwwards Site of the Year scale: theatrical, bold, unmistakable.
   - Deconstructed trigger: [ 01–05 ⤢ DIRECTORY ] with coordinate ticker.
   - Full-screen dual-tone architectural curtain with giant kinetic type and dynamic image projections.
   ========================================================================= */
export function NavAlternative4() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<NavItem>(NAV_ITEMS[0]!);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="nav-alt-wrapper" id="nav-alt-4">
      <TempBadge
        label="ALTERNATIVE 4 · THE SPATIAL MONOLITH"
        description="Extreme Creativity · Theatrical dual-tone curtain with giant kinetic typography, cursor hover projections, and Awwwards gravitas."
      />

      <div className="nav-mock-browser">
        {/* Header Bar */}
        <div className="nav-alt4-header">
          {/* Left: Deconstructed Trigger */}
          <button
            type="button"
            className="alt4-trigger-btn"
            onClick={() => setIsOpen(true)}
            aria-expanded={isOpen}
            aria-label="Open spatial monolith curtain"
          >
            <span className="alt4-bracket">[</span>
            <span className="alt4-btn-text">01–05 ⤢ DIRECTORY</span>
            <span className="alt4-bracket">]</span>
          </button>

          {/* Center: Brand */}
          <div className="nav-alt4-brand">
            <span className="alt4-mark">AE/</span>
            <span className="alt4-name">Aethelon</span>
          </div>

          {/* Right: Coordinates & Direct Link */}
          <div className="nav-alt4-actions">
            <span className="alt4-coord">40.7128° N, 74.0060° W</span>
            <Link href="/contact" className="alt4-cta">
              Initiate <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Spatial Monolith Curtain (In-Frame Simulation) */}
        {isOpen && (
          <div className="alt4-curtain" role="dialog" aria-modal="true">
            {/* Top Close Bar */}
            <div className="alt4-curtain-top">
              <div className="alt4-curtain-logo">
                <b>AE/</b> Aethelon Spatial Archive
              </div>
              <button
                type="button"
                className="alt4-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close spatial monolith"
              >
                <span>Close</span>
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            {/* Split Screen Stage */}
            <div className="alt4-curtain-split">
              {/* Left Column: Giant Kinetic Typography */}
              <div className="alt4-type-col">
                <div className="alt4-type-kicker">Navigation Matrix · 2026</div>
                <nav className="alt4-nav-col" aria-label="Spatial Monolith Navigation">
                  {NAV_ITEMS.map((item) => {
                    const isHovered = activeItem.label === item.label;
                    return (
                      <Link
                        key={item.index}
                        href={item.href}
                        className={`alt4-giant-link ${isHovered ? "is-hovered" : ""}`}
                        onMouseEnter={() => setActiveItem(item)}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="alt4-link-num">{item.index}</span>
                        <span className="alt4-link-title">{item.label}</span>
                        <span className="alt4-link-meta">{item.tag}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Right Column: Full-Bleed Hover Projection */}
              <div className="alt4-projection-col">
                <div className="alt4-projection-frame">
                  <Image
                    src={activeItem.previewImage}
                    alt={activeItem.previewTitle}
                    fill
                    unoptimized
                    className="alt4-projection-img"
                  />
                  <div className="alt4-projection-glass">
                    <span className="alt4-proj-kicker">Case Projection</span>
                    <h4>{activeItem.previewTitle}</h4>
                    <p>{activeItem.desc}</p>
                    <div className="alt4-proj-stat">
                      <span>Performance Baseline</span>
                      <strong>{activeItem.metric}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Horizon */}
            <div className="alt4-curtain-bottom">
              <span>Bespoke Full-Stack Commerce · High-Impact Visual Worlds</span>
              <div className="alt4-bottom-right">
                <Link href="/contact" className="alt4-bottom-cta" onClick={() => setIsOpen(false)}>
                  Start your build <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Mock Hero Content */}
        <div className="nav-mock-canvas">
          <div className="mock-canvas-copy">
            <span className="mock-kicker">Museum-Grade Brand Theater</span>
            <h3>Turn navigation into an unforgettable brand experience.</h3>
            <p>Click &quot;[ 01–05 ⤢ DIRECTORY ]&quot; on the top left to launch the spatial monolith curtain.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   MAIN COMPARISON COMPONENT (SECTIONS 0)
   ========================================================================= */
export default function NavigationVariations() {
  const [selectedAlt, setSelectedAlt] = useState<"all" | "alt1" | "alt2" | "alt3" | "alt4">("all");

  return (
    <section className="temp-section-block" id="sec-nav">
      <div className="nav-variations-header">
        <div className="nav-variations-kicker">
          <span>Direction Exploration · Section 0</span>
        </div>
        <h2 className="nav-variations-title">
          4 Navigation Alternatives: From Minimal to Extreme Creativity.
        </h2>
        <p className="nav-variations-subtitle">
          Exploring four distinct architectural directions to replace the generic hamburger menu. Test each interactive mockup live below: from whisper-quiet Swiss monographs to direct inline ribbons, tactile dynamic islands, and full-viewport spatial curtains.
        </p>

        {/* Filter Switcher */}
        <div className="nav-filter-pills">
          <button
            type="button"
            className={`nav-filter-pill ${selectedAlt === "all" ? "is-active" : ""}`}
            onClick={() => setSelectedAlt("all")}
          >
            Show All 4 (Side-by-Side)
          </button>
          <button
            type="button"
            className={`nav-filter-pill ${selectedAlt === "alt1" ? "is-active" : ""}`}
            onClick={() => setSelectedAlt("alt1")}
          >
            Alt 1: Architectural Index (Minimal)
          </button>
          <button
            type="button"
            className={`nav-filter-pill ${selectedAlt === "alt2" ? "is-active" : ""}`}
            onClick={() => setSelectedAlt("alt2")}
          >
            Alt 2: Direct Studio Ribbon (Inline)
          </button>
          <button
            type="button"
            className={`nav-filter-pill ${selectedAlt === "alt3" ? "is-active" : ""}`}
            onClick={() => setSelectedAlt("alt3")}
          >
            Alt 3: Dynamic Island (Kinetic)
          </button>
          <button
            type="button"
            className={`nav-filter-pill ${selectedAlt === "alt4" ? "is-active" : ""}`}
            onClick={() => setSelectedAlt("alt4")}
          >
            Alt 4: Spatial Monolith (Extreme)
          </button>
        </div>
      </div>

      {/* Render Alternatives */}
      <div className="nav-variations-deck">
        {(selectedAlt === "all" || selectedAlt === "alt1") && <NavAlternative1 />}
        {(selectedAlt === "all" || selectedAlt === "alt2") && <NavAlternative2 />}
        {(selectedAlt === "all" || selectedAlt === "alt3") && <NavAlternative3 />}
        {(selectedAlt === "all" || selectedAlt === "alt4") && <NavAlternative4 />}
      </div>

      {/* Comparison Matrix Table */}
      <div className="nav-matrix-container">
        <h3 className="nav-matrix-title">Navigation Direction Comparison Matrix</h3>
        <div className="nav-matrix-table-wrapper">
          <table className="nav-matrix-table">
            <thead>
              <tr>
                <th>Direction</th>
                <th>Aesthetic Archetype</th>
                <th>Desktop Access</th>
                <th>Interaction Feel</th>
                <th>Best Suited For</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Alt 1 · Architectural Index</strong></td>
                <td>Swiss / Monograph Minimalist</td>
                <td>1-click slide drawer</td>
                <td>Quiet, restrained, calm</td>
                <td>Luxury brands, architects, bespoke studios</td>
              </tr>
              <tr>
                <td><strong>Alt 2 · Direct Studio Ribbon</strong></td>
                <td>Functional Modernist</td>
                <td>0-click direct links</td>
                <td>Fast, frictionless, magnetic</td>
                <td>Commercial conversion, tech-forward storefronts</td>
              </tr>
              <tr>
                <td><strong>Alt 3 · Dynamic Island</strong></td>
                <td>Kinetic Product Craft</td>
                <td>1-click morphing capsule</td>
                <td>Playful, tactile, spring physics</td>
                <td>Digital product studios, 3D/AI showcases</td>
              </tr>
              <tr>
                <td><strong>Alt 4 · Spatial Monolith</strong></td>
                <td>Avant-Garde Brand Theater</td>
                <td>Full curtain projection</td>
                <td>Immersive, dramatic, Awwwards</td>
                <td>High-fashion, artistic luxury, statement agencies</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
