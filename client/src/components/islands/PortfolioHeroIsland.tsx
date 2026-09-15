"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";

interface FloatingProject {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly image: string;
  readonly slug: string;
  readonly stack: string;
  readonly slotClass: string;
  readonly depth: "foreground" | "midground" | "background";
  readonly baseScale: number;
  readonly parallaxFactor: number;
  readonly defaultZ: number;
}

const floatingProjects: readonly FloatingProject[] = [
  {
    id: "aethelon",
    title: "Aethelon Furniture",
    category: "Flagship Commerce",
    image: "/images/projects/aethelon.png",
    slug: "aethelon-furniture-commerce",
    stack: "Next.js 16 · AR / 3D",
    slotClass: "orbit-card-top-right",
    depth: "foreground",
    baseScale: 1.03,
    parallaxFactor: 0.09,
    defaultZ: 6,
  },
  {
    id: "novexa",
    title: "Novexa Footwear",
    category: "AI & 3D Platform",
    image: "/images/projects/novexa.png",
    slug: "novexa-product-commerce",
    stack: "Three.js · Gemini AI",
    slotClass: "orbit-card-bottom-left",
    depth: "midground",
    baseScale: 1.0,
    parallaxFactor: 0.06,
    defaultZ: 5,
  },
  {
    id: "velorum",
    title: "Velorum Horology",
    category: "Luxury Horology",
    image: "/images/projects/velorum.png",
    slug: "velorum-watch-commerce",
    stack: "WebGL · 99 Lighthouse",
    slotClass: "orbit-card-bottom-right",
    depth: "background",
    baseScale: 0.96,
    parallaxFactor: 0.035,
    defaultZ: 4,
  },
];

export default function PortfolioHeroIsland() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [dragOffsets, setDragOffsets] = useState<Record<string, { x: number; y: number }>>({
    aethelon: { x: 0, y: 0 },
    novexa: { x: 0, y: 0 },
    velorum: { x: 0, y: 0 },
  });
  const [stageMouse, setStageMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const dragStartRef = useRef<{ clientX: number; clientY: number; startOffsetX: number; startOffsetY: number }>({
    clientX: 0,
    clientY: 0,
    startOffsetX: 0,
    startOffsetY: 0,
  });
  const totalDragDistanceRef = useRef<number>(0);
  const tiltAngleRef = useRef<number>(0);

  const handleStagePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (activeDragId) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      setStageMouse({ x: relX * 24, y: relY * 24 });
    },
    [activeDragId]
  );

  const handleStagePointerLeave = useCallback(() => {
    if (!activeDragId) {
      setHoveredCard(null);
      setStageMouse({ x: 0, y: 0 });
    }
  }, [activeDragId]);

  const handlePointerDown = useCallback(
    (id: string, e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;

      setActiveDragId(id);
      const currentOffset = dragOffsets[id] ?? { x: 0, y: 0 };
      dragStartRef.current = {
        clientX: e.clientX,
        clientY: e.clientY,
        startOffsetX: currentOffset.x,
        startOffsetY: currentOffset.y,
      };
      totalDragDistanceRef.current = 0;
      tiltAngleRef.current = 0;

      try {
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    },
    [dragOffsets]
  );

  const handlePointerMove = useCallback(
    (id: string, e: React.PointerEvent<HTMLDivElement>) => {
      if (activeDragId !== id) return;

      const deltaX = e.clientX - dragStartRef.current.clientX;
      const deltaY = e.clientY - dragStartRef.current.clientY;
      totalDragDistanceRef.current = Math.hypot(deltaX, deltaY);

      // Subtle dynamic tilt while dragging (capped at +-7deg)
      const tilt = Math.max(-7, Math.min(7, deltaX * 0.12));
      tiltAngleRef.current = tilt;

      setDragOffsets((prev) => ({
        ...prev,
        [id]: {
          x: dragStartRef.current.startOffsetX + deltaX,
          y: dragStartRef.current.startOffsetY + deltaY,
        },
      }));
    },
    [activeDragId]
  );

  const handlePointerUp = useCallback(
    (id: string, e: React.PointerEvent<HTMLDivElement>) => {
      if (activeDragId === id) {
        setActiveDragId(null);
        tiltAngleRef.current = 0;
        try {
          (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }
    },
    [activeDragId]
  );

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    if (totalDragDistanceRef.current > 6) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  const handleDoubleClick = useCallback((id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOffsets((prev) => ({
      ...prev,
      [id]: { x: 0, y: 0 },
    }));
  }, []);

  return (
    <div className="portfolio-interactive-hero">
      {/* Background Ambient Mesh Subtle Stage */}
      <div
        className="hero-orbit-stage"
        onPointerMove={handleStagePointerMove}
        onPointerLeave={handleStagePointerLeave}
      >
        {/* Floating Interactive Project Preview Cards */}
        {floatingProjects.map((project) => {
          const isHovered = hoveredCard === project.id;
          const isDragging = activeDragId === project.id;
          const offset = dragOffsets[project.id] ?? { x: 0, y: 0 };
          const hasBeenMoved = Math.abs(offset.x) > 1 || Math.abs(offset.y) > 1;

          // Multi-plane parallax offset
          const px = isDragging ? 0 : stageMouse.x * project.parallaxFactor;
          const py = isDragging ? 0 : stageMouse.y * project.parallaxFactor;

          const currentX = offset.x + px;
          const currentY = offset.y + py;

          const currentScale = isDragging
            ? project.baseScale * 1.06
            : isHovered
            ? project.baseScale * 1.03
            : project.baseScale;

          const currentZ = isDragging ? 50 : isHovered ? 25 : project.defaultZ;
          const tilt = isDragging ? tiltAngleRef.current : 0;

          return (
            <div
              key={project.id}
              className={`hero-orbit-slot ${project.slotClass} ${hasBeenMoved ? "is-moved" : ""}`}
              style={{ zIndex: currentZ }}
            >
              <div
                className={`hero-orbit-card depth-${project.depth} ${isHovered ? "hovered" : ""} ${
                  isDragging ? "dragging" : ""
                }`}
                style={{
                  transform: `translate3d(${currentX}px, ${currentY}px, 0px) scale(${currentScale}) rotate(${tilt}deg)`,
                  transition: isDragging
                    ? "none"
                    : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.2s ease",
                  cursor: isDragging ? "grabbing" : "grab",
                }}
                onPointerDown={(e) => handlePointerDown(project.id, e)}
                onPointerMove={(e) => handlePointerMove(project.id, e)}
                onPointerUp={(e) => handlePointerUp(project.id, e)}
                onPointerCancel={(e) => handlePointerUp(project.id, e)}
                onMouseEnter={() => {
                  if (!activeDragId) setHoveredCard(project.id);
                }}
                onMouseLeave={() => {
                  if (!activeDragId) setHoveredCard(null);
                }}
                onDoubleClick={(e) => handleDoubleClick(project.id, e)}
                title="Drag to reposition · Double-click to reset"
              >
                <Link
                  href={`/work/${project.slug}`}
                  onClick={handleCardClick}
                  className="orbit-card-link"
                  aria-label={`View ${project.title} platform build`}
                  draggable={false}
                >
                  <div className="orbit-card-thumb">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      unoptimized
                      sizes="240px"
                      className="cover-image orbit-card-img"
                      draggable={false}
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
              </div>
            </div>
          );
        })}

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
