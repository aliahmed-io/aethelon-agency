"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDownRight, Layers } from "lucide-react";
import TempBadge from "./TempBadge";

/* =========================================================================
   Hero Version A: Large Horizontal Visual Cards with Strong Photography
   ========================================================================= */
export function HeroVersionA() {
  const [hoveredCard, setHoveredCard] = useState<number>(0);

  const cards = [
    {
      title: "Oakwell",
      domain: "Handcrafted Luxury",
      image: "/images/projects/oakwell.png",
      tag: "Spatial Lookbook & Furniture Commerce",
      position: "38% center",
    },
    {
      title: "Velorum",
      domain: "Haute Horology",
      image: "/images/projects/velorum.png",
      tag: "Interactive 3D Timepiece Showcase",
      position: "center center",
    },
    {
      title: "Aethelon",
      domain: "Spatial Commerce",
      image: "/images/projects/aethelon.png",
      tag: "Next.js Headless Platform",
      position: "center center",
    },
  ];

  return (
    <div className="temp-hero-wrapper" id="hero-a">
      <TempBadge label="HERO / VERSION A" description="Balanced Widescreen Cards · High-Impact Crop" />
      <section className="temp-hero-a">
        <div className="temp-hero-copy">
          <div className="temp-hero-eyebrow">
            <span className="signal-dot" /> Independent Ecommerce Studio
          </div>
          <h1>
            We build custom ecommerce experiences & full-stack web applications.
          </h1>
          <p>
            From high-speed storefronts and interactive 3D configurators to database schemas, custom checkouts, and admin portals. Direct senior engineering.
          </p>
          <div className="temp-hero-actions">
            <Link className="button button-dark" href="/contact">
              Start a project <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <a className="text-link" href="#work-a">
              Explore work <ArrowDownRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="temp-hero-cards-stage">
          <div className="temp-cards-fanned-container">
            {cards.map((c, i) => {
              const isHovered = hoveredCard === i;
              return (
                <div
                  key={c.title}
                  className={`temp-fanned-card card-index-${i} ${isHovered ? "is-hovered" : ""}`}
                  onMouseEnter={() => setHoveredCard(i)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${c.title}`}
                >
                  <div className="temp-card-inner">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      sizes="(max-width: 900px) 80vw, 420px"
                      priority
                      unoptimized
                      className="temp-card-img"
                      style={{ objectPosition: c.position }}
                    />
                    <div className="temp-card-gradient" />
                    <div className="temp-card-caption">
                      <span className="caption-title">{c.title}</span>
                      <span className="caption-domain">{c.domain}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="temp-hero-subtle-hint">
            <Layers size={13} aria-hidden="true" />
            <span>Interactive portfolio deck · Hover to inspect</span>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   Hero Version B: Asymmetric Editorial Composition
   ========================================================================= */
export function HeroVersionB() {
  const [activePhoto, setActivePhoto] = useState<number>(0);

  const photos = [
    {
      label: "Oakwell Living",
      category: "Furniture Commerce",
      src: "/images/oakwell/editorial/living.jpg",
      metric: "Sub-450ms Page Cache",
    },
    {
      label: "Velorum Macro",
      category: "Haute Horology",
      src: "/images/velorum/gallery/gallery_wrist_luxury.png",
      metric: "60 FPS WebGL Engine",
    },
    {
      label: "Novexa Studio",
      category: "Performance Apparel",
      src: "/images/novexa/hero-shoe-clean.png",
      metric: "Direct Stripe Checkout",
    },
  ];

  return (
    <div className="temp-hero-wrapper" id="hero-b">
      <TempBadge label="HERO / VERSION B" description="Asymmetric Editorial Spread · Architectural Split" />
      <section className="temp-hero-b">
        <div className="temp-hero-b-lead">
          <div className="temp-hero-eyebrow">
            <span className="signal-dot" /> Bespoke Digital Architecture
          </div>
          <h2>
            The modern web demands stores that feel like places, not templates.
          </h2>
          <p className="temp-hero-b-statement">
            Aethelon engineers custom digital flagships combining editorial direction, 3D interaction, and headless infrastructure for independent brands.
          </p>
          <div className="temp-hero-b-actions">
            <Link className="button button-dark" href="/contact">
              Initiate project <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link className="text-link" href="/work">
              Selected builds <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <div className="temp-hero-b-switchers">
            <span className="switcher-label">Featured Studies:</span>
            <div className="switcher-pills">
              {photos.map((item, idx) => (
                <button
                  key={item.label}
                  type="button"
                  className={`switcher-pill ${activePhoto === idx ? "active" : ""}`}
                  onClick={() => setActivePhoto(idx)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="temp-hero-b-visual">
          <div className="temp-hero-b-canvas">
            <Image
              src={photos[activePhoto]?.src || photos[0]!.src}
              alt={photos[activePhoto]?.label || "Featured"}
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
              unoptimized
              className="temp-hero-b-img"
            />
            <div className="temp-hero-b-overlay" />
            <div className="temp-hero-b-badge">
              <span className="badge-category">{photos[activePhoto]?.category}</span>
              <span className="badge-metric">{photos[activePhoto]?.metric}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   Hero Version C: Dominant Flagship Visual Canvas with Satellites
   ========================================================================= */
export function HeroVersionC() {
  const [selectedProject, setSelectedProject] = useState<number>(0);

  const projects = [
    {
      title: "Aethelon Flagship",
      subtitle: "Spatial Living & Custom Cart",
      leadImage: "/images/projects/aethelon.png",
      spec: "Next.js 16 · Prisma · Stripe Checkout",
    },
    {
      title: "Velorum Horology",
      subtitle: "Precision WebGL Watch Anatomy",
      leadImage: "/images/projects/velorum.png",
      spec: "Three.js · Interactive Shaders · Sub-400ms",
    },
    {
      title: "Lundev 3D Studio",
      subtitle: "Tactile Material Configurator",
      leadImage: "/images/projects/lundev-furniture.png",
      spec: "Interactive Orbit · GLTF Pipeline",
    },
  ];

  const current = projects[selectedProject] || projects[0]!;

  return (
    <div className="temp-hero-wrapper" id="hero-c">
      <TempBadge label="HERO / VERSION C" description="Dominant Cinematic Canvas · Satellite Navigator" />
      <section className="temp-hero-c">
        <div className="temp-hero-c-header">
          <div className="temp-hero-eyebrow">
            <span className="signal-dot" /> Creative Commerce & Systems
          </div>
          <div className="temp-hero-c-title-row">
            <h1>We build custom ecommerce storefronts that convert on craft.</h1>
            <div className="temp-hero-c-cta">
              <Link className="button button-dark" href="/contact">
                Start a project <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="temp-hero-c-stage">
          <div className="temp-hero-c-main-frame">
            <Image
              src={current.leadImage}
              alt={current.title}
              fill
              sizes="100vw"
              priority
              unoptimized
              className="temp-hero-c-main-img"
            />
            <div className="temp-hero-c-main-scrim" />
            <div className="temp-hero-c-meta">
              <div className="meta-left">
                <span className="meta-tag">Featured Platform Build</span>
                <h3>{current.title}</h3>
                <p>{current.subtitle}</p>
              </div>
              <div className="meta-right">
                <span className="meta-spec">{current.spec}</span>
              </div>
            </div>
          </div>

          <div className="temp-hero-c-satellites">
            {projects.map((p, idx) => (
              <button
                key={p.title}
                type="button"
                className={`temp-satellite-btn ${selectedProject === idx ? "is-selected" : ""}`}
                onClick={() => setSelectedProject(idx)}
                aria-label={`Switch hero project to ${p.title}`}
              >
                <div className="satellite-thumb-wrap">
                  <Image
                    src={p.leadImage}
                    alt={p.title}
                    fill
                    sizes="120px"
                    unoptimized
                    className="satellite-thumb-img"
                  />
                </div>
                <div className="satellite-text">
                  <span className="satellite-title">{p.title}</span>
                  <span className="satellite-spec">{p.subtitle}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
