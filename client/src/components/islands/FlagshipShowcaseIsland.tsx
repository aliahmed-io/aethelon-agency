"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Eye, Layers, ShieldCheck, Zap } from "lucide-react";
import type { Project } from "../../../../shared/projects";

type ShowcaseView = "storefront" | "visualizer" | "admin";

interface ShowcaseViewConfig {
  id: ShowcaseView;
  label: string;
  badge: string;
  image: string;
  caption: string;
  systemTags: readonly string[];
}

const views: readonly ShowcaseViewConfig[] = [
  {
    id: "storefront",
    label: "01 Storefront Staging",
    badge: "Public Storefront Experience",
    image: "/images/projects/aethelon.png",
    caption: "High-speed editorial product catalog with natural-language discovery, variant matrix selection, and instant bag drawer.",
    systemTags: ["React Server Components", "Zero Layout Shift", "Instant Bag Drawer"],
  },
  {
    id: "visualizer",
    label: "02 Room Visualizer & AR",
    badge: "Spatial Staging & WebXR",
    image: "/images/aethelon/landing_chair.png",
    caption: "Spatial room staging tool and native 1-tap mobile Augmented Reality (AR) visualizer allowing customers to preview dimensions and material finishes in their own space.",
    systemTags: ["WebXR / iOS AR QuickLook", "Dynamic Lighting Swatches", "60 FPS Transitions"],
  },
  {
    id: "admin",
    label: "03 Operations & Admin",
    badge: "Operational CMS & Inventory",
    image: "/images/aethelon/og-default.jpg",
    caption: "Custom administrative portal for inventory SKU tracking, real-time stock sync, and Stripe webhook order dispatching.",
    systemTags: ["PostgreSQL & Prisma Schema", "Stripe Webhook Handlers", "Role-Based Access"],
  },
];

export default function FlagshipShowcaseIsland({
  project,
}: {
  project: Project;
}) {
  const [activeView, setActiveView] = useState<ShowcaseView>("storefront");
  const currentConfig = views.find((v) => v.id === activeView) ?? views[0]!;

  return (
    <div className="flagship-cinematic-wrapper">
      {/* View Switcher Controls Bar */}
      <div className="showcase-nav-bar" role="tablist" aria-label="Flagship architecture view selector">
        <div className="showcase-nav-tabs">
          {views.map((view) => (
            <button
              key={view.id}
              type="button"
              role="tab"
              aria-selected={activeView === view.id}
              className={`showcase-nav-pill ${activeView === view.id ? "active" : ""}`}
              onClick={() => setActiveView(view.id)}
            >
              {view.label}
            </button>
          ))}
        </div>
        <div className="showcase-indicator">
          <span className="signal-dot" />
          <span>Interactive Architecture Lens</span>
        </div>
      </div>

      {/* Main Full-Scale Canvas Frame */}
      <div className="showcase-canvas-frame">
        <Image
          src={currentConfig.image}
          alt={`${project.title} — ${currentConfig.label}`}
          fill
          unoptimized
          sizes="(max-width: 900px) 100vw, 92vw"
          className="cover-image showcase-canvas-image"
        />

        {/* Inset System Inspector Overlay Badges */}
        <div className="showcase-inspector-badge-top">
          <span className="inspector-pill-badge">{currentConfig.badge}</span>
        </div>

        <div className="showcase-inspector-tags-bottom">
          {currentConfig.systemTags.map((tag, idx) => (
            <span key={tag} className="inspector-tech-pill">
              {idx === 0 ? <Zap size={11} aria-hidden="true" /> : <Check size={11} aria-hidden="true" />}
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Showcase Metadata & Systems Breakdown Bar */}
      <div className="showcase-details-row">
        <div className="showcase-caption-col">
          <span className="showcase-mode-label">{currentConfig.label}</span>
          <p className="showcase-caption-text">{currentConfig.caption}</p>
        </div>

        <div className="showcase-actions-col">
          <div className="showcase-stack-pills">
            <span>Next.js App Router</span>
            <span>TypeScript</span>
            <span>PostgreSQL</span>
            <span>Prisma</span>
            <span>Stripe</span>
          </div>
          <Link href={`/work/${project.slug}`} className="button button-dark showcase-cta-btn">
            Read Full Architecture Breakdown <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
