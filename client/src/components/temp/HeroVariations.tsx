"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDownRight, Sliders, RefreshCw, Layers, Sparkles } from "lucide-react";
import TempBadge from "./TempBadge";

/* =========================================================================
   Data: Production Flagship Cards
   ========================================================================= */
interface DeckCard {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly image: string;
  readonly href: string;
  readonly objectPosition: string;
}

const DECK_CARDS: readonly DeckCard[] = [
  {
    id: "oakwell",
    title: "Oakwell",
    category: "Handcrafted Luxury",
    image: "/images/projects/oakwell.png",
    href: "/work/oakwell-furniture-commerce",
    objectPosition: "35% center",
  },
  {
    id: "aethelon",
    title: "Aethelon",
    category: "Spatial Commerce",
    image: "/images/projects/aethelon.png",
    href: "/work/aethelon-furniture-commerce",
    objectPosition: "center center",
  },
  {
    id: "lundev",
    title: "Lundev",
    category: "Tactile 3D Studio",
    image: "/images/projects/lundev-furniture.png",
    href: "/work/lundev-furniture-experience",
    objectPosition: "32% center",
  },
  {
    id: "velorum",
    title: "Velorum",
    category: "Haute Horology",
    image: "/images/projects/velorum.png",
    href: "/work/velorum-watch-commerce",
    objectPosition: "center center",
  },
];

type AnimationMode = "phill-flow" | "magnetic-center" | "legacy-single";
type SpeedPreset = "butter" | "crisp" | "liquid";

interface CardTransformState {
  rotation: number;
  translateX: number;
  translateY: number;
  translateZ: number;
  scale: number;
  zIndex: number;
  isChosen: boolean;
}

/**
 * Calculates transform matrix for every card in the deck based on the active card index and chosen mode.
 */
function computeCardTransform(
  cardIndex: number,
  chosenIndex: number,
  mode: AnimationMode
): CardTransformState {
  // -------------------------------------------------------------
  // Mode 3: Legacy Single-Card Stand (Old behavior before tweak)
  // -------------------------------------------------------------
  if (mode === "legacy-single") {
    const legacyDefaults = [
      { rotation: -14, translateX: -125, translateY: 24, zIndex: 2 },
      { rotation: 0, translateX: -20, translateY: -12, zIndex: 5 },
      { rotation: 12, translateX: 80, translateY: 18, zIndex: 3 },
      { rotation: 24, translateX: 175, translateY: 46, zIndex: 1 },
    ];
    const def = legacyDefaults[cardIndex] ?? legacyDefaults[0]!;
    const isChosen = cardIndex === chosenIndex;

    return {
      rotation: isChosen ? 0 : def.rotation,
      translateX: def.translateX,
      translateY: isChosen ? def.translateY - 26 : def.translateY,
      translateZ: isChosen ? 40 : 0,
      scale: isChosen ? 1.05 : 1,
      zIndex: isChosen ? 25 : def.zIndex,
      isChosen,
    };
  }

  // -------------------------------------------------------------
  // Mode 2: Magnetic Center (Snaps chosen card to 0px center)
  // -------------------------------------------------------------
  if (mode === "magnetic-center") {
    const delta = cardIndex - chosenIndex;
    const isChosen = delta === 0;

    if (isChosen) {
      return {
        rotation: 0,
        translateX: 0,
        translateY: -28,
        translateZ: 60,
        scale: 1.06,
        zIndex: 30,
        isChosen: true,
      };
    }

    const sign = Math.sign(delta);
    const dist = Math.abs(delta);
    const angle = sign * (dist === 1 ? 13 : dist === 2 ? 23 : 32);
    const x = sign * (dist === 1 ? 95 : dist === 2 ? 180 : 255);
    const y = dist === 1 ? 12 : dist === 2 ? 28 : 46;
    const z = 20 - dist * 5;
    const tz = 30 - dist * 20;

    return {
      rotation: angle,
      translateX: x,
      translateY: y,
      translateZ: tz,
      scale: 1 - dist * 0.035,
      zIndex: z,
      isChosen: false,
    };
  }

  // -------------------------------------------------------------
  // Mode 1: Ask Phill Dynamic Flow (Exact Whole-Deck Tweak)
  // Left cards fan negative (-), right cards fan positive (+),
  // chosen card stands upright at 0° in front with true 3D Z-depth.
  // -------------------------------------------------------------
  const delta = cardIndex - chosenIndex;
  const isChosen = delta === 0;

  // Natural horizontal anchors for the chosen card
  const chosenAnchors = [-85, -20, 45, 110];
  const baseX = chosenAnchors[chosenIndex] ?? 0;

  if (isChosen) {
    return {
      rotation: 0,
      translateX: baseX,
      translateY: -26,
      translateZ: 60,
      scale: 1.05,
      zIndex: 25,
      isChosen: true,
    };
  }

  const dist = Math.abs(delta);
  const sign = Math.sign(delta); // -1 for cards to the left, +1 for cards to the right

  // Fanning angles: -12°/-22°/-31° for left, +12°/+22°/+31° for right
  const angleStep = dist === 1 ? 12 : dist === 2 ? 22 : 31;
  const angle = sign * angleStep;

  // Staggered horizontal positioning around the chosen anchor
  const xStep = dist === 1 ? 88 : dist === 2 ? 168 : 240;
  const x = baseX + sign * xStep;

  // Gentle vertical downward cascade behind the upright card
  const yStep = dist === 1 ? 14 : dist === 2 ? 30 : 48;
  const y = -8 + yStep;

  // Continuous 3D spatial depth for butter smooth layering
  const tz = 35 - dist * 18;
  const z = 20 - dist * 4;

  return {
    rotation: angle,
    translateX: x,
    translateY: y,
    translateZ: tz,
    scale: 1 - dist * 0.03,
    zIndex: z,
    isChosen: false,
  };
}

/* =========================================================================
   Main Component: HeroCurrentPhillTweak
   ========================================================================= */
export function HeroCurrentPhillTweak() {
  // Active chosen card (defaults to index 1 = Aethelon)
  const [chosenIndex, setChosenIndex] = useState<number>(1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mode, setMode] = useState<AnimationMode>("phill-flow");
  const [speed, setSpeed] = useState<SpeedPreset>("butter");

  // Pointer tracking & drag physics
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const initialXRef = useRef<number>(0);
  const startXRef = useRef<number>(0);
  const totalMovedRef = useRef<number>(0);
  const stageRef = useRef<HTMLDivElement>(null);

  // Effective active index (hover overrides locked selection while hovering)
  const effectiveIndex = hoveredIndex !== null ? hoveredIndex : chosenIndex;

  // Buttery transition timing curves (0.72s cubic-bezier(0.22, 1, 0.36, 1))
  const transitionTiming =
    speed === "crisp"
      ? "transform 0.48s cubic-bezier(0.25, 1, 0.3, 1), box-shadow 0.45s cubic-bezier(0.25, 1, 0.3, 1), filter 0.45s ease"
      : speed === "liquid"
      ? "transform 0.88s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.8s ease, filter 0.7s ease"
      : "transform 0.72s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.68s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease";

  // Drag interaction handlers
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    initialXRef.current = e.clientX;
    startXRef.current = e.clientX;
    totalMovedRef.current = 0;
    try {
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      if (isDragging) {
        const deltaX = e.clientX - startXRef.current;
        const totalMoved = Math.abs(e.clientX - initialXRef.current);
        totalMovedRef.current = totalMoved;
        setDragOffset(deltaX * 0.35);

        // Threshold cycle on drag (45px sweep triggers next/prev card)
        const threshold = 45;
        if (deltaX < -threshold) {
          setChosenIndex((prev) => Math.min(DECK_CARDS.length - 1, prev + 1));
          startXRef.current = e.clientX;
          setDragOffset(0);
        } else if (deltaX > threshold) {
          setChosenIndex((prev) => Math.max(0, prev - 1));
          startXRef.current = e.clientX;
          setDragOffset(0);
        }
      } else {
        setMouseOffset({ x: relX * 10, y: relY * 10 });
      }
    },
    [isDragging]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    setDragOffset(0);
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (!isDragging) {
      setHoveredIndex(null);
      setMouseOffset({ x: 0, y: 0 });
    }
  }, [isDragging]);

  const handleCardClick = useCallback((e: React.MouseEvent, index: number) => {
    if (totalMovedRef.current > 8) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    setChosenIndex(index);
  }, []);

  return (
    <div className="temp-hero-lab-container" id="hero-phill-tweak">
      <TempBadge
        label="HERO / ASK PHILL TWEAK"
        description="Current Homepage Hero with Dynamic Whole-Deck Fanning Animation"
      />

      {/* Control Strip to Test & Tune Animation Live */}
      <div className="temp-hero-tweak-controls">
        <div className="control-group">
          <span className="control-label">
            <Sliders size={13} aria-hidden="true" />
            <span>Deck Behavior:</span>
          </span>
          <div className="control-pill-group">
            <button
              type="button"
              className={`control-pill ${mode === "phill-flow" ? "active" : ""}`}
              onClick={() => setMode("phill-flow")}
              title="Whole deck redistributes angles around chosen card"
            >
              <Sparkles size={12} className="pill-icon" /> Ask Phill Dynamic Fan
            </button>
            <button
              type="button"
              className={`control-pill ${mode === "magnetic-center" ? "active" : ""}`}
              onClick={() => setMode("magnetic-center")}
              title="Chosen card centers, surrounding cards fan symmetrically"
            >
              Magnetic Center
            </button>
            <button
              type="button"
              className={`control-pill ${mode === "legacy-single" ? "active" : ""}`}
              onClick={() => setMode("legacy-single")}
              title="Old behavior: only chosen card straightens, others frozen"
            >
              Original Baseline (Before)
            </button>
          </div>
        </div>

        <div className="control-group">
          <span className="control-label">
            <span>Motion Velocity:</span>
          </span>
          <div className="control-pill-group">
            <button
              type="button"
              className={`control-pill ${speed === "butter" ? "active" : ""}`}
              onClick={() => setSpeed("butter")}
              title="Buttery silk 720ms luxury agency ease"
            >
              <Sparkles size={12} className="pill-icon" /> Butter Silk (720ms)
            </button>
            <button
              type="button"
              className={`control-pill ${speed === "crisp" ? "active" : ""}`}
              onClick={() => setSpeed("crisp")}
              title="Crisp dynamic 480ms response"
            >
              Crisp Studio (480ms)
            </button>
            <button
              type="button"
              className={`control-pill ${speed === "liquid" ? "active" : ""}`}
              onClick={() => setSpeed("liquid")}
              title="Ultra-cushioned liquid 880ms ease"
            >
              Liquid Cushioned (880ms)
            </button>
          </div>
        </div>

        <div className="control-group">
          <button
            type="button"
            className="control-reset-btn"
            onClick={() => {
              setChosenIndex(1);
              setHoveredIndex(null);
              setMode("phill-flow");
              setSpeed("butter");
            }}
          >
            <RefreshCw size={12} /> Reset to Default
          </button>
        </div>
      </div>

      {/* Production Hero Layout with Upgraded Deck Stage */}
      <section className="hero phill-tweak-hero-section">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="signal-dot" /> Freelance Full-Stack Developer
          </div>
          <h1>
            I build custom ecommerce experiences and full-stack web applications.
          </h1>
          <p>
            From high-speed storefronts and interactive configurators to database schemas, checkout endpoints, and custom admin portals. Direct senior execution.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/contact">
              Start a project <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <a className="text-link" href="#flagship">
              Explore flagship <ArrowDownRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Dynamic Cards Stage with Ask Phill Whole-Deck Fanning */}
        <div className="hero-visual-wrapper">
          <div
            ref={stageRef}
            className={`hero-fanned-stage ${isDragging ? "is-dragging" : ""}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerLeave}
            role="region"
            aria-label="Interactive Flagship Deck"
          >
            {/* Ambient Deck Wrapper with Pointer Parallax */}
            <div
              className="fanned-deck-wrapper"
              style={{
                transform: `translate3d(${mouseOffset.x + dragOffset}px, ${mouseOffset.y}px, 0) rotate(${dragOffset * 0.04}deg)`,
                transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0, 0, 0.2, 1)",
              }}
            >
              {DECK_CARDS.map((card, idx) => {
                const transform = computeCardTransform(idx, effectiveIndex, mode);

                return (
                  <Link
                    key={card.id}
                    href={card.href}
                    className={`fanned-card ${transform.isChosen ? "is-chosen hovered" : "is-background"}`}
                    style={{
                      transform: `translate3d(${transform.translateX}px, ${transform.translateY}px, ${transform.translateZ}px) rotate(${transform.rotation}deg) scale(${transform.scale})`,
                      zIndex: transform.zIndex,
                      transition: transitionTiming,
                    }}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    onMouseEnter={() => {
                      if (!isDragging) {
                        setChosenIndex(idx);
                        setHoveredIndex(idx);
                      }
                    }}
                    onMouseLeave={() => {
                      if (!isDragging) setHoveredIndex(null);
                    }}
                    onClick={(e) => handleCardClick(e, idx)}
                    aria-label={`Select and view ${card.title} platform build`}
                  >
                    <div className="fanned-card-inner">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 760px) 70vw, 340px"
                        priority
                        unoptimized
                        draggable={false}
                        className="fanned-card-img"
                        style={{ objectPosition: card.objectPosition }}
                      />
                      <div className="fanned-card-overlay" />
                      <div className="fanned-card-pill">
                        <span className="pill-title">{card.title}</span>
                        <span className="pill-category">{card.category}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Live Transform Inspector Box for Review */}
      <div className="temp-hero-transform-inspector">
        <div className="inspector-head">
          <Layers size={13} />
          <span>Active Deck Matrix Diagnostics</span>
          <span className="inspector-mode-tag">Mode: {mode}</span>
          <span className="inspector-active-tag">
            Active: #{effectiveIndex + 1} ({DECK_CARDS[effectiveIndex]?.title})
          </span>
        </div>
        <div className="inspector-cards-grid">
          {DECK_CARDS.map((card, idx) => {
            const t = computeCardTransform(idx, effectiveIndex, mode);
            return (
              <div
                key={card.id}
                className={`inspector-card-cell ${t.isChosen ? "cell-chosen" : ""}`}
                onClick={() => setChosenIndex(idx)}
              >
                <div className="cell-header">
                  <span className="cell-num">0{idx + 1}</span>
                  <span className="cell-title">{card.title}</span>
                  {t.isChosen && <span className="cell-badge">CHOSEN (0°)</span>}
                </div>
                <div className="cell-specs">
                  <span>rot: <b>{t.rotation > 0 ? `+${t.rotation}°` : `${t.rotation}°`}</b></span>
                  <span>tx: <b>{t.translateX}px</b></span>
                  <span>ty: <b>{t.translateY}px</b></span>
                  <span>tz: <b>{t.translateZ}px</b></span>
                  <span>z: <b>{t.zIndex}</b></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* Backward-compatibility aliases so previous imports don't break */
export const HeroVersionA = HeroCurrentPhillTweak;
export const HeroVersionB = HeroCurrentPhillTweak;
export const HeroVersionC = HeroCurrentPhillTweak;
