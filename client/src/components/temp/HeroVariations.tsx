"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

const N = DECK_CARDS.length;
const DRAG_SENSITIVITY = 140; // px of horizontal drag per full card cycle

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
 * Calculates continuous 3D transform matrix based on continuous float offset from active center.
 * offset = cardIndex - activeFloatCenter
 */
function computeContinuousTransform(
  cardIndex: number,
  offset: number,
  mode: AnimationMode
): CardTransformState {
  const isChosen = Math.abs(offset) < 0.45;
  const absOffset = Math.abs(offset);
  const sign = Math.sign(offset) || 1;

  // -------------------------------------------------------------
  // Mode 3: Legacy Single-Card Stand
  // -------------------------------------------------------------
  if (mode === "legacy-single") {
    const legacyDefaults = [
      { rotation: -14, translateX: -125, translateY: 24, zIndex: 2 },
      { rotation: 0, translateX: -20, translateY: -12, zIndex: 5 },
      { rotation: 12, translateX: 80, translateY: 18, zIndex: 3 },
      { rotation: 24, translateX: 175, translateY: 46, zIndex: 1 },
    ];
    const def = legacyDefaults[cardIndex] ?? legacyDefaults[0]!;

    return {
      rotation: isChosen ? 0 : def.rotation,
      translateX: def.translateX,
      translateY: isChosen ? def.translateY - 26 : def.translateY,
      translateZ: isChosen ? 50 : 0,
      scale: isChosen ? 1.05 : 1,
      zIndex: isChosen ? 25 : def.zIndex,
      isChosen,
    };
  }

  // -------------------------------------------------------------
  // Mode 2: Magnetic Center Pivot
  // -------------------------------------------------------------
  if (mode === "magnetic-center") {
    const angle = sign * Math.min(34, absOffset * 13);
    const x = sign * Math.min(260, absOffset * 92);
    const y = absOffset * 16 - (isChosen ? 22 : 0);
    const tz = 50 - Math.min(60, absOffset * 22);
    const scale = Math.max(0.86, 1.05 - absOffset * 0.04);
    const zIndex = Math.round(25 - Math.min(15, absOffset * 4));

    return {
      rotation: angle,
      translateX: x,
      translateY: y,
      translateZ: tz,
      scale,
      zIndex,
      isChosen,
    };
  }

  // -------------------------------------------------------------
  // Mode 1: Ask Phill Dynamic Flow (Continuous Whole-Deck Tweak)
  // Left cards fan negative (-), right cards fan positive (+),
  // active center stands upright at 0° in front with true 3D depth.
  // -------------------------------------------------------------
  // Natural anchor calculation
  const centerCard = Math.max(0, Math.min(N - 1, Math.round(cardIndex - offset)));
  const chosenAnchors = [-85, -20, 45, 110];
  const baseX = chosenAnchors[centerCard] ?? -20;

  const angle = offset * 11.8;
  const x = baseX + offset * 86;
  const y = absOffset * 14 - (isChosen ? (1 - absOffset * 1.5) * 26 : 0);
  const tz = 55 - absOffset * 20;
  const scale = Math.max(0.88, 1.05 - absOffset * 0.035);
  const zIndex = Math.round(25 - Math.min(15, absOffset * 4));

  return {
    rotation: angle,
    translateX: x,
    translateY: y,
    translateZ: tz,
    scale,
    zIndex,
    isChosen,
  };
}

/* =========================================================================
   Main Component: HeroCurrentPhillTweak
   ========================================================================= */
export function HeroCurrentPhillTweak() {
  const router = useRouter();

  // Active chosen card index (default 1 = Aethelon)
  const [chosenIndex, setChosenIndex] = useState<number>(1);
  const [dragDelta, setDragDelta] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [mode, setMode] = useState<AnimationMode>("phill-flow");
  const [speed, setSpeed] = useState<SpeedPreset>("butter");

  // Subtle ambient mouse parallax
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const startXRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const initialXRef = useRef<number>(0);
  const hasMovedRef = useRef<boolean>(false);
  const stageRef = useRef<HTMLDivElement>(null);

  // Transitions: when dragging, we update positions with instant 60fps tracking;
  // when dragging stops or during hover, we use the buttery luxury agency ease curve.
  const transitionTiming =
    speed === "crisp"
      ? "transform 0.48s cubic-bezier(0.25, 1, 0.3, 1), box-shadow 0.45s cubic-bezier(0.25, 1, 0.3, 1), filter 0.45s ease"
      : speed === "liquid"
      ? "transform 0.88s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.8s ease, filter 0.7s ease"
      : "transform 0.72s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.68s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease";

  // Active float center position for continuous drag interpolation
  const activeFloatCenter = isDragging
    ? chosenIndex - dragDelta / DRAG_SENSITIVITY
    : chosenIndex;

  // Pointer Down: captures pointer for desktop mouse and mobile touch
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragDelta(0);
    startXRef.current = e.clientX;
    initialXRef.current = e.clientX;
    startTimeRef.current = Date.now();
    hasMovedRef.current = false;

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  }, []);

  // Pointer Move: continuous drag tracking with boundary resistance
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      if (isDragging) {
        const rawDelta = e.clientX - startXRef.current;
        const totalMoved = Math.abs(e.clientX - initialXRef.current);
        if (totalMoved > 5) {
          hasMovedRef.current = true;
        }

        // Elastic resistance past boundaries
        let effectiveDelta = rawDelta;
        if (chosenIndex === 0 && rawDelta > 0) {
          effectiveDelta = rawDelta * 0.28;
        } else if (chosenIndex === N - 1 && rawDelta < 0) {
          effectiveDelta = rawDelta * 0.28;
        }

        setDragDelta(effectiveDelta);
      } else {
        setMouseOffset({ x: relX * 10, y: relY * 10 });
      }
    },
    [isDragging, chosenIndex]
  );

  // Pointer Up: flick velocity detection and snap to nearest card
  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;

      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }

      setIsDragging(false);

      const deltaX = dragDelta;
      const elapsed = Math.max(1, Date.now() - startTimeRef.current);
      const velocity = deltaX / elapsed; // px per ms

      if (hasMovedRef.current && Math.abs(deltaX) > 8) {
        let shift = 0;
        // Velocity flick detection or distance threshold
        if (velocity < -0.28 || deltaX < -45) {
          shift = deltaX < -160 ? 2 : 1;
        } else if (velocity > 0.28 || deltaX > 45) {
          shift = deltaX > 160 ? -2 : -1;
        } else {
          shift = Math.round(-deltaX / DRAG_SENSITIVITY);
        }

        const nextIndex = Math.max(0, Math.min(N - 1, chosenIndex + shift));
        setChosenIndex(nextIndex);
      }

      setDragDelta(0);
    },
    [isDragging, dragDelta, chosenIndex]
  );

  const handlePointerLeave = useCallback(() => {
    if (!isDragging) {
      setMouseOffset({ x: 0, y: 0 });
    }
  }, [isDragging]);

  // Card click: selects card if background; navigates if already active
  const handleCardClick = useCallback(
    (index: number, href: string) => {
      if (hasMovedRef.current) return;
      if (chosenIndex === index) {
        router.push(href);
      } else {
        setChosenIndex(index);
      }
    },
    [chosenIndex, router]
  );

  return (
    <div className="temp-hero-lab-container" id="hero-phill-tweak">
      <TempBadge
        label="HERO / ASK PHILL TWEAK"
        description="Current Homepage Hero with Dynamic Drag-to-Cycle & Whole-Deck Fanning"
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

        {/* Dynamic Cards Stage with Full Drag Gestures & Ask Phill Fanning */}
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
            aria-label="Interactive flagship cards — hold and drag to cycle, or hover to inspect"
            style={{ touchAction: "none" }}
          >
            {/* Ambient Deck Wrapper with Pointer Parallax */}
            <div
              className="fanned-deck-wrapper"
              style={{
                transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
                transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0, 0, 0.2, 1)",
              }}
            >
              {DECK_CARDS.map((card, idx) => {
                const offset = idx - activeFloatCenter;
                const transform = computeContinuousTransform(idx, offset, mode);

                return (
                  <div
                    key={card.id}
                    role="button"
                    tabIndex={0}
                    className={`fanned-card ${transform.isChosen ? "is-chosen hovered" : "is-background"}`}
                    style={{
                      transform: `translate3d(${transform.translateX}px, ${transform.translateY}px, ${transform.translateZ}px) rotate(${transform.rotation}deg) scale(${transform.scale})`,
                      zIndex: transform.zIndex,
                      transition: isDragging ? "none" : transitionTiming,
                      cursor: isDragging ? "grabbing" : "grab",
                    }}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    onMouseEnter={() => {
                      if (!isDragging) {
                        setChosenIndex(idx);
                      }
                    }}
                    onClick={() => handleCardClick(idx, card.href)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleCardClick(idx, card.href);
                      }
                    }}
                    aria-label={`Select ${card.title} platform build`}
                  >
                    <div className="fanned-card-inner">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 760px) 70vw, 340px"
                        priority={idx < 2}
                        unoptimized
                        draggable={false}
                        className="fanned-card-img"
                        style={{ objectPosition: card.objectPosition, pointerEvents: "none" }}
                        onDragStart={(e) => e.preventDefault()}
                      />
                      <div className="fanned-card-overlay" />
                      <div className="fanned-card-pill">
                        <span className="pill-title">{card.title}</span>
                        <span className="pill-category">{card.category}</span>
                      </div>
                    </div>
                  </div>
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
            Active: #{chosenIndex + 1} ({DECK_CARDS[chosenIndex]?.title})
          </span>
        </div>
        <div className="inspector-cards-grid">
          {DECK_CARDS.map((card, idx) => {
            const offset = idx - activeFloatCenter;
            const t = computeContinuousTransform(idx, offset, mode);
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
                  <span>rot: <b>{Math.round(t.rotation)}°</b></span>
                  <span>tx: <b>{Math.round(t.translateX)}px</b></span>
                  <span>ty: <b>{Math.round(t.translateY)}px</b></span>
                  <span>tz: <b>{Math.round(t.translateZ)}px</b></span>
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
