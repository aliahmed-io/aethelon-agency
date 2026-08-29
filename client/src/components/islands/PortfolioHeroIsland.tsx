"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";

interface FloatingProject {
  id: string;
  title: string;
  category: string;
  image: string;
  slug: string;
  stack: string;
  className: string;
}

const floatingProjects: readonly FloatingProject[] = [
  {
    id: "aethelon",
    title: "Aethelon Furniture",
    category: "Flagship Commerce",
    image: "/images/projects/aethelon.png",
    slug: "aethelon-furniture-commerce",
    stack: "Next.js 16 · AR / 3D",
    className: "orbit-card-top-right",
  },
  {
    id: "novexa",
    title: "Novexa Footwear",
    category: "AI & 3D Platform",
    image: "/images/projects/novexa.png",
    slug: "novexa-product-commerce",
    stack: "Three.js · Gemini AI",
    className: "orbit-card-bottom-left",
  },
  {
    id: "velorum",
    title: "Velorum Horology",
    category: "Luxury Horology",
    image: "/images/projects/velorum.png",
    slug: "velorum-watch-commerce",
    stack: "WebGL · 99 Lighthouse",
    className: "orbit-card-bottom-right",
  },
];

export default function PortfolioHeroIsland() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="portfolio-interactive-hero">
      {/* Background Ambient Mesh Subtle Texture */}
      <div className="hero-orbit-stage">
        {/* Floating Interactive Project Preview Cards */}
        {floatingProjects.map((project) => (
          <Link
            key={project.id}
            href={`/work/${project.slug}`}
            className={`hero-orbit-card ${project.className} ${
              hoveredCard === project.id ? "hovered" : ""
            }`}
            onMouseEnter={() => setHoveredCard(project.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="orbit-card-thumb">
              <Image
                src={project.image}
                alt={project.title}
                fill
                unoptimized
                sizes="240px"
                className="cover-image orbit-card-img"
              />
              <span className="orbit-card-badge">{project.category}</span>
              <span className="orbit-card-arrow">
                <ArrowUpRight size={14} aria-hidden="true" />
              </span>
            </div>
            <div className="orbit-card-caption">
              <strong>{project.title}</strong>
              <span>{project.stack}</span>
            </div>
          </Link>
        ))}

        {/* Central Typographic Statement */}
        <div className="portfolio-hero-core">
          <div className="eyebrow">
            <span className="signal-dot" /> Selected Works & Case Studies
          </div>

          <h1 className="portfolio-hero-title">
            Commerce systems &<br />
            <em>interactive craft.</em>
          </h1>

          <p className="portfolio-hero-subtitle">
            A curated collection of production-grade storefronts, full-stack commerce platforms, and spatial 3D configurators. Engineered to commercial standards with clean TypeScript, resilient data layers, and tactile user feel.
          </p>

          <div className="portfolio-hero-cta-row">
            <a href="#flagship" className="button button-dark">
              Explore Flagship <ArrowDownRight size={15} aria-hidden="true" />
            </a>
            <a href="#archive" className="text-link">
              Jump to Project Archive <ArrowDownRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Hero Stats & Verification Strip */}
      <div className="portfolio-hero-stats-strip">
        <div className="stat-pill">
          <Layers size={13} className="stat-pill-icon" aria-hidden="true" />
          <span><strong>4</strong> Full-Stack Platforms</span>
        </div>
        <div className="stat-pill">
          <Sparkles size={13} className="stat-pill-icon" aria-hidden="true" />
          <span><strong>5</strong> Visual Design Studies</span>
        </div>
        <div className="stat-pill">
          <Zap size={13} className="stat-pill-icon" aria-hidden="true" />
          <span><strong>100/100</strong> Performance Baseline</span>
        </div>
        <div className="stat-pill">
          <ShieldCheck size={13} className="stat-pill-icon" aria-hidden="true" />
          <span><strong>Production-Ready</strong> Codebases</span>
        </div>
      </div>
    </div>
  );
}
