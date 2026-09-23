"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, ArrowDownRight, Sparkles, MoveHorizontal, Compass, Layers } from "lucide-react";
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
const SWIPE_DRAG_PX = 190; // px of horizontal drag per full card cycle

interface CardPose {
  rotation: number;
  rotateY: number;
  translateX: number;
  translateY: number;
  translateZ: number;
  scale: number;
  zIndex: number;
  isChosen: boolean;
}

/* =========================================================================
   ALTERNATIVE A: PARABOLIC ARC-LIFT · UNCLIPPED SPLIT
   - Z-Layer Fix: Incoming card arcs 48px UP and 55px FORWARD, flying over the
     deck so it physically clears the front card before settling. Zero clipping.
   - Canvas Cut-Off Fix: overflow: visible on stage + compact 82px deck spacing
     so left cards never get sliced by the column boundary.
   ========================================================================= */
function getBasePoseA(cardIndex: number, chosen: number) {
  const slot = cardIndex - chosen;
  const deckCenters = [45, 0, -45, -90];
  const centerShift = deckCenters[chosen] ?? 0;
  const translateX = centerShift + slot * 82;

  let rotation = 0;
  if (slot === -1) rotation = -13;
  else if (slot === -2) rotation = -24;
  else if (slot <= -3) rotation = -34;
  else if (slot === 1) rotation = 13;
  else if (slot === 2) rotation = 24;
  else if (slot >= 3) rotation = 34;

  const absSlot = Math.abs(slot);
  const translateY = slot === 0 ? -24 : absSlot * 14;
  const translateZ = slot === 0 ? 40 : 15 - absSlot * 12;
  const scale = slot === 0 ? 1.04 : Math.max(0.86, 1 - absSlot * 0.05);

  return { rotation, translateX, translateY, translateZ, scale };
}

function getAltAPose(cardIndex: number, virtualIndex: number): CardPose {
  const clamped = Math.max(0, Math.min(N - 1, virtualIndex));
  const c0 = Math.floor(clamped);
  const c1 = Math.min(N - 1, c0 + 1);
  const fraction = clamped - c0;
  const t = fraction * fraction * (3 - 2 * fraction);
  const parabola = 4 * fraction * (1 - fraction); // Peaks at 1.0 mid-transition

  const p0 = getBasePoseA(cardIndex, c0);
  const p1 = getBasePoseA(cardIndex, c1);

  let rot = p0.rotation + (p1.rotation - p0.rotation) * t;
  let tx = p0.translateX + (p1.translateX - p0.translateX) * t;
  let ty = p0.translateY + (p1.translateY - p0.translateY) * t;
  let tz = p0.translateZ + (p1.translateZ - p0.translateZ) * t;
  let sc = p0.scale + (p1.scale - p0.scale) * t;
  let rotY = 0;

  // Elastic overscroll damping
  const overscroll =
    virtualIndex < 0
      ? virtualIndex * 40
      : virtualIndex > N - 1
      ? (virtualIndex - (N - 1)) * 40
      : 0;
  tx += overscroll;

  // Parabolic 3D Arc-Lift: incoming card lifts up into the air and forward
  if (cardIndex === c1 && fraction > 0) {
    ty -= parabola * 48; // flies 48px upward
    tz += parabola * 55; // pushes 55px forward in 3D
    rotY = -parabola * 12; // subtle 3D card pitch
  } else if (cardIndex === c0 && fraction > 0) {
    tz -= parabola * 16; // outgoing card gently sinks behind
  }

  // Z-Index: incoming card takes the top layer as soon as it lifts up
  let zIndex = Math.round(18 - Math.abs(cardIndex - virtualIndex) * 4);
  if (cardIndex === c1 && fraction > 0.06) {
    zIndex = 26; // in the air above the deck
  } else if (cardIndex === c0 && fraction <= 0.06) {
    zIndex = 24;
  }

  const isChosen = Math.abs(cardIndex - virtualIndex) < 0.48;

  return {
    rotation: rot,
    rotateY: rotY,
    translateX: tx,
    translateY: ty,
    translateZ: tz,
    scale: sc,
    zIndex,
    isChosen,
  };
}

export function HeroAlternativeA() {
  const router = useRouter();
  const [virtualIndex, setVirtualIndex] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const virtualIndexRef = useRef<number>(1);
  virtualIndexRef.current = virtualIndex;

  const startXRef = useRef<number>(0);
  const startVirtualRef = useRef<number>(1);
  const startTimeRef = useRef<number>(0);
  const totalMovedRef = useRef<number>(0);
  const isPointerDownRef = useRef<boolean>(false);
  const animFrameRef = useRef<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const animateTo = useCallback((targetIndex: number) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const startV = virtualIndexRef.current;
    const targetV = Math.max(0, Math.min(N - 1, targetIndex));
    const animStartTime = performance.now();
    const duration = 520;

    function step(now: number) {
      const elapsed = now - animStartTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 5); // Quintic ease-out
      const currentV = startV + (targetV - startV) * ease;

      setVirtualIndex(currentV);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setVirtualIndex(targetV);
        animFrameRef.current = null;
      }
    }

    animFrameRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    isPointerDownRef.current = true;
    startXRef.current = e.clientX;
    startVirtualRef.current = virtualIndexRef.current;
    startTimeRef.current = Date.now();
    totalMovedRef.current = 0;
    setIsDragging(true);

    try {
      if (e.currentTarget.setPointerCapture) {
        e.currentTarget.setPointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    totalMovedRef.current = Math.max(totalMovedRef.current, Math.abs(deltaX));

    const rawTarget = startVirtualRef.current - deltaX / SWIPE_DRAG_PX;
    let boundedTarget = rawTarget;
    if (rawTarget < 0) {
      boundedTarget = rawTarget * 0.26;
    } else if (rawTarget > N - 1) {
      boundedTarget = (N - 1) + (rawTarget - (N - 1)) * 0.26;
    }
    setVirtualIndex(boundedTarget);
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isPointerDownRef.current) return;
      isPointerDownRef.current = false;
      setIsDragging(false);

      try {
        if (e.currentTarget.hasPointerCapture && e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // ignore
      }

      const deltaX = e.clientX - startXRef.current;
      const elapsed = Math.max(1, Date.now() - startTimeRef.current);
      const velocity = deltaX / elapsed;

      const currentV = virtualIndexRef.current;
      let targetIndex = Math.round(currentV);

      if (velocity < -0.22 && currentV < N - 1) {
        targetIndex = Math.min(N - 1, Math.floor(currentV) + 1);
      } else if (velocity > 0.22 && currentV > 0) {
        targetIndex = Math.max(0, Math.ceil(currentV) - 1);
      }

      animateTo(targetIndex);
    },
    [animateTo]
  );

  const handleCardClick = useCallback(
    (index: number, href: string) => {
      if (totalMovedRef.current > 6) return;
      const currentCenter = Math.round(virtualIndexRef.current);
      if (currentCenter === index) {
        router.push(href);
      } else {
        animateTo(index);
      }
    },
    [router, animateTo]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const currentCenter = Math.round(virtualIndexRef.current);
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        animateTo(Math.max(0, currentCenter - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        animateTo(Math.min(N - 1, currentCenter + 1));
      }
    },
    [animateTo]
  );

  return (
    <div className="temp-hero-lab-container" id="hero-alt-a">
      <TempBadge
        label="ALTERNATIVE A · PARABOLIC ARC-LIFT"
        description="Fixes Z-layer pop via 3D vertical arc-lift over the deck; fixes cut canvas via overflow: visible & 82px deck spacing."
      />

      <section className="hero phill-tweak-hero-section">
        <div className="hero-copy">
          <div className="eyebrow">
            Freelance Full-Stack Developer
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

        <div className="hero-visual-unclipped">
          <div
            ref={stageRef}
            tabIndex={0}
            className={`hero-stage-unclipped ${isDragging ? "is-dragging" : ""}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onKeyDown={handleKeyDown}
            role="region"
            aria-label="Interactive flagship cards — drag horizontally to cycle with arc-lift"
            style={{ touchAction: "pan-y" }}
          >
            <div className="fanned-deck-wrapper" style={{ overflow: "visible" }}>
              {DECK_CARDS.map((card, idx) => {
                const t = getAltAPose(idx, virtualIndex);

                return (
                  <div
                    key={card.id}
                    role="button"
                    tabIndex={0}
                    className={`fanned-card ${t.isChosen ? "is-chosen" : "is-background"}`}
                    style={{
                      transform: `translate3d(${t.translateX}px, ${t.translateY}px, ${t.translateZ}px) rotate(${t.rotation}deg) rotateY(${t.rotateY}deg) scale(${t.scale})`,
                      zIndex: t.zIndex,
                      cursor: isDragging ? "grabbing" : t.isChosen ? "pointer" : "grab",
                    }}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    onClick={() => handleCardClick(idx, card.href)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleCardClick(idx, card.href);
                      }
                    }}
                    aria-label={`Project: ${card.title} — ${card.category}${t.isChosen ? " (selected)" : " (drag to select)"}`}
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
    </div>
  );
}

/* =========================================================================
   ALTERNATIVE B: ASK PHILL CENTERED HORIZON · LATERAL SIDE-ORBIT
   - Canvas Cut-Off Fix: Entire hero is centered like Ask Phill! Cards are centered
     with 100% full-width viewport freedom. Zero dividing lines, zero clipping!
   - Z-Layer Fix: Incoming card swings laterally OUTWARD in X and orbits along
     the Y-axis (rotateY), swinging around the side of the deck before docking.
   ========================================================================= */
function getBasePoseB(cardIndex: number, chosen: number) {
  const slot = cardIndex - chosen;
  const step = 145;
  const translateX = slot * step;

  let rotation = 0;
  if (slot === -1) rotation = -13;
  else if (slot === -2) rotation = -24;
  else if (slot <= -3) rotation = -34;
  else if (slot === 1) rotation = 13;
  else if (slot === 2) rotation = 24;
  else if (slot >= 3) rotation = 34;

  const absSlot = Math.abs(slot);
  const translateY = slot === 0 ? -22 : absSlot * 16;
  const translateZ = slot === 0 ? 45 : 15 - absSlot * 14;
  const scale = slot === 0 ? 1.05 : Math.max(0.82, 1 - absSlot * 0.06);

  return { rotation, translateX, translateY, translateZ, scale };
}

function getAltBPose(cardIndex: number, virtualIndex: number): CardPose {
  const clamped = Math.max(0, Math.min(N - 1, virtualIndex));
  const c0 = Math.floor(clamped);
  const c1 = Math.min(N - 1, c0 + 1);
  const fraction = clamped - c0;
  const t = fraction * fraction * (3 - 2 * fraction);
  const parabola = 4 * fraction * (1 - fraction);

  const p0 = getBasePoseB(cardIndex, c0);
  const p1 = getBasePoseB(cardIndex, c1);

  let rot = p0.rotation + (p1.rotation - p0.rotation) * t;
  let tx = p0.translateX + (p1.translateX - p0.translateX) * t;
  let ty = p0.translateY + (p1.translateY - p0.translateY) * t;
  let tz = p0.translateZ + (p1.translateZ - p0.translateZ) * t;
  let sc = p0.scale + (p1.scale - p0.scale) * t;
  let rotY = 0;

  // Lateral Side-Swing Orbit: incoming card swings outward in X, rotates in Y
  if (cardIndex === c1 && fraction > 0) {
    const swingSide = c1 > c0 ? 1 : -1;
    tx += parabola * 55 * swingSide; // swings wide to the side
    rotY = -parabola * 20 * swingSide; // 3D Y-axis tilt
    tz += parabola * 60; // moves forward in Z to clear front card
    ty -= parabola * 16;
  }

  let zIndex = Math.round(18 - Math.abs(cardIndex - virtualIndex) * 4);
  if (cardIndex === c1 && fraction > 0.1) {
    zIndex = 26;
  } else if (cardIndex === c0 && fraction <= 0.1) {
    zIndex = 24;
  }

  const isChosen = Math.abs(cardIndex - virtualIndex) < 0.48;

  return {
    rotation: rot,
    rotateY: rotY,
    translateX: tx,
    translateY: ty,
    translateZ: tz,
    scale: sc,
    zIndex,
    isChosen,
  };
}

export function HeroAlternativeB() {
  const router = useRouter();
  const [virtualIndex, setVirtualIndex] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const virtualIndexRef = useRef<number>(1);
  virtualIndexRef.current = virtualIndex;

  const startXRef = useRef<number>(0);
  const startVirtualRef = useRef<number>(1);
  const startTimeRef = useRef<number>(0);
  const totalMovedRef = useRef<number>(0);
  const isPointerDownRef = useRef<boolean>(false);
  const animFrameRef = useRef<number | null>(null);

  const animateTo = useCallback((targetIndex: number) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const startV = virtualIndexRef.current;
    const targetV = Math.max(0, Math.min(N - 1, targetIndex));
    const animStartTime = performance.now();
    const duration = 520;

    function step(now: number) {
      const elapsed = now - animStartTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 5);
      const currentV = startV + (targetV - startV) * ease;

      setVirtualIndex(currentV);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setVirtualIndex(targetV);
        animFrameRef.current = null;
      }
    }

    animFrameRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    isPointerDownRef.current = true;
    startXRef.current = e.clientX;
    startVirtualRef.current = virtualIndexRef.current;
    startTimeRef.current = Date.now();
    totalMovedRef.current = 0;
    setIsDragging(true);

    try {
      if (e.currentTarget.setPointerCapture) {
        e.currentTarget.setPointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    totalMovedRef.current = Math.max(totalMovedRef.current, Math.abs(deltaX));

    const rawTarget = startVirtualRef.current - deltaX / SWIPE_DRAG_PX;
    let boundedTarget = rawTarget;
    if (rawTarget < 0) {
      boundedTarget = rawTarget * 0.26;
    } else if (rawTarget > N - 1) {
      boundedTarget = (N - 1) + (rawTarget - (N - 1)) * 0.26;
    }
    setVirtualIndex(boundedTarget);
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isPointerDownRef.current) return;
      isPointerDownRef.current = false;
      setIsDragging(false);

      try {
        if (e.currentTarget.hasPointerCapture && e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // ignore
      }

      const deltaX = e.clientX - startXRef.current;
      const elapsed = Math.max(1, Date.now() - startTimeRef.current);
      const velocity = deltaX / elapsed;

      const currentV = virtualIndexRef.current;
      let targetIndex = Math.round(currentV);

      if (velocity < -0.22 && currentV < N - 1) {
        targetIndex = Math.min(N - 1, Math.floor(currentV) + 1);
      } else if (velocity > 0.22 && currentV > 0) {
        targetIndex = Math.max(0, Math.ceil(currentV) - 1);
      }

      animateTo(targetIndex);
    },
    [animateTo]
  );

  const handleCardClick = useCallback(
    (index: number, href: string) => {
      if (totalMovedRef.current > 6) return;
      const currentCenter = Math.round(virtualIndexRef.current);
      if (currentCenter === index) {
        router.push(href);
      } else {
        animateTo(index);
      }
    },
    [router, animateTo]
  );

  return (
    <div className="temp-hero-lab-container" id="hero-alt-b">
      <TempBadge
        label="ALTERNATIVE B · ASK PHILL CENTERED HORIZON"
        description="True Ask Phill centered architecture with 100% viewport breathing room (zero edge cuts) + lateral 3D orbit around the deck."
      />

      <section className="hero-centered-layout">
        <div className="hero-copy-centered">
          <div className="eyebrow">
            Freelance Full-Stack Developer
          </div>
          <h1>
            I build custom ecommerce experiences and full-stack web applications.
          </h1>
          <p>
            From high-speed storefronts and interactive configurators to database schemas, checkout endpoints, and custom admin portals. Direct senior execution.
          </p>
        </div>

        {/* Full-Width Centered Deck with Side-Swing Orbit */}
        <div
          className={`hero-visual-centered ${isDragging ? "is-dragging" : ""}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          role="region"
          aria-label="Centered interactive card deck — drag to orbit through flagship builds"
          style={{ touchAction: "pan-y" }}
        >
          <div className="fanned-deck-wrapper" style={{ overflow: "visible" }}>
            {DECK_CARDS.map((card, idx) => {
              const t = getAltBPose(idx, virtualIndex);

              return (
                <div
                  key={card.id}
                  role="button"
                  tabIndex={0}
                  className={`fanned-card ${t.isChosen ? "is-chosen" : "is-background"}`}
                  style={{
                    transform: `translate3d(${t.translateX}px, ${t.translateY}px, ${t.translateZ}px) rotate(${t.rotation}deg) rotateY(${t.rotateY}deg) scale(${t.scale})`,
                    zIndex: t.zIndex,
                    cursor: isDragging ? "grabbing" : t.isChosen ? "pointer" : "grab",
                  }}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  onClick={() => handleCardClick(idx, card.href)}
                  aria-label={`Project: ${card.title} — ${card.category}${t.isChosen ? " (selected)" : " (drag to orbit)"}`}
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

        <div className="hero-actions-centered">
          <Link className="button button-dark" href="/contact">
            Start a project <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <a className="text-link" href="#flagship">
            Explore flagship <ArrowDownRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   ALTERNATIVE C: DIRECTION-LOCKED DEPTH PEEL · ASYMMETRIC LOOKBOOK
   - Z-Layer Fix: Incoming card is locked in front (top zIndex) from frame 0
     with strictly monotonic Z-ascent. No mid-transition layer collision.
   - Canvas Cut-Off Fix: Asymmetric 42% / 58% split with overflow: visible and
     editorial drop-shadow bleed across the dividing line.
   ========================================================================= */
function getBasePoseC(cardIndex: number, chosen: number) {
  const slot = cardIndex - chosen;
  const deckCenters = [40, 0, -40, -80];
  const centerShift = deckCenters[chosen] ?? 0;
  const translateX = centerShift + slot * 90;

  let rotation = 0;
  if (slot === -1) rotation = -14;
  else if (slot === -2) rotation = -25;
  else if (slot <= -3) rotation = -35;
  else if (slot === 1) rotation = 14;
  else if (slot === 2) rotation = 25;
  else if (slot >= 3) rotation = 35;

  const absSlot = Math.abs(slot);
  const translateY = slot === 0 ? -24 : absSlot * 14;
  const translateZ = slot === 0 ? 50 : 20 - absSlot * 16;
  const scale = slot === 0 ? 1.05 : Math.max(0.85, 1 - absSlot * 0.05);

  return { rotation, translateX, translateY, translateZ, scale };
}

function getAltCPose(cardIndex: number, virtualIndex: number): CardPose {
  const clamped = Math.max(0, Math.min(N - 1, virtualIndex));
  const c0 = Math.floor(clamped);
  const c1 = Math.min(N - 1, c0 + 1);
  const fraction = clamped - c0;
  const t = fraction * fraction * (3 - 2 * fraction);

  const p0 = getBasePoseC(cardIndex, c0);
  const p1 = getBasePoseC(cardIndex, c1);

  const rot = p0.rotation + (p1.rotation - p0.rotation) * t;
  let tx = p0.translateX + (p1.translateX - p0.translateX) * t;
  const ty = p0.translateY + (p1.translateY - p0.translateY) * t;
  const tz = p0.translateZ + (p1.translateZ - p0.translateZ) * t;
  const sc = p0.scale + (p1.scale - p0.scale) * t;

  const overscroll =
    virtualIndex < 0
      ? virtualIndex * 40
      : virtualIndex > N - 1
      ? (virtualIndex - (N - 1)) * 40
      : 0;
  tx += overscroll;

  // Direction-Locked Z-Index:
  // Incoming card holds top z-index from the instant movement starts.
  let zIndex = 10;
  if (fraction > 0 && fraction < 1) {
    if (cardIndex === c1) {
      zIndex = 26; // incoming card sits in front throughout the move
    } else if (cardIndex === c0) {
      zIndex = 22; // outgoing card is immediately behind
    } else {
      zIndex = Math.round(16 - Math.abs(cardIndex - virtualIndex) * 3);
    }
  } else {
    const dist = Math.abs(cardIndex - Math.round(virtualIndex));
    zIndex = dist === 0 ? 25 : Math.round(18 - dist * 4);
  }

  const isChosen = Math.abs(cardIndex - virtualIndex) < 0.48;

  return {
    rotation: rot,
    rotateY: 0,
    translateX: tx,
    translateY: ty,
    translateZ: tz,
    scale: sc,
    zIndex,
    isChosen,
  };
}

export function HeroAlternativeC() {
  const router = useRouter();
  const [virtualIndex, setVirtualIndex] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const virtualIndexRef = useRef<number>(1);
  virtualIndexRef.current = virtualIndex;

  const startXRef = useRef<number>(0);
  const startVirtualRef = useRef<number>(1);
  const startTimeRef = useRef<number>(0);
  const totalMovedRef = useRef<number>(0);
  const isPointerDownRef = useRef<boolean>(false);
  const animFrameRef = useRef<number | null>(null);

  const animateTo = useCallback((targetIndex: number) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const startV = virtualIndexRef.current;
    const targetV = Math.max(0, Math.min(N - 1, targetIndex));
    const animStartTime = performance.now();
    const duration = 520;

    function step(now: number) {
      const elapsed = now - animStartTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 5);
      const currentV = startV + (targetV - startV) * ease;

      setVirtualIndex(currentV);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setVirtualIndex(targetV);
        animFrameRef.current = null;
      }
    }

    animFrameRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    isPointerDownRef.current = true;
    startXRef.current = e.clientX;
    startVirtualRef.current = virtualIndexRef.current;
    startTimeRef.current = Date.now();
    totalMovedRef.current = 0;
    setIsDragging(true);

    try {
      if (e.currentTarget.setPointerCapture) {
        e.currentTarget.setPointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    totalMovedRef.current = Math.max(totalMovedRef.current, Math.abs(deltaX));

    const rawTarget = startVirtualRef.current - deltaX / SWIPE_DRAG_PX;
    let boundedTarget = rawTarget;
    if (rawTarget < 0) {
      boundedTarget = rawTarget * 0.26;
    } else if (rawTarget > N - 1) {
      boundedTarget = (N - 1) + (rawTarget - (N - 1)) * 0.26;
    }
    setVirtualIndex(boundedTarget);
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isPointerDownRef.current) return;
      isPointerDownRef.current = false;
      setIsDragging(false);

      try {
        if (e.currentTarget.hasPointerCapture && e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // ignore
      }

      const deltaX = e.clientX - startXRef.current;
      const elapsed = Math.max(1, Date.now() - startTimeRef.current);
      const velocity = deltaX / elapsed;

      const currentV = virtualIndexRef.current;
      let targetIndex = Math.round(currentV);

      if (velocity < -0.22 && currentV < N - 1) {
        targetIndex = Math.min(N - 1, Math.floor(currentV) + 1);
      } else if (velocity > 0.22 && currentV > 0) {
        targetIndex = Math.max(0, Math.ceil(currentV) - 1);
      }

      animateTo(targetIndex);
    },
    [animateTo]
  );

  const handleCardClick = useCallback(
    (index: number, href: string) => {
      if (totalMovedRef.current > 6) return;
      const currentCenter = Math.round(virtualIndexRef.current);
      if (currentCenter === index) {
        router.push(href);
      } else {
        animateTo(index);
      }
    },
    [router, animateTo]
  );

  return (
    <div className="temp-hero-lab-container" id="hero-alt-c">
      <TempBadge
        label="ALTERNATIVE C · DEPTH PEEL & ASYMMETRIC BLEED"
        description="Fixes Z-layer pop via direction-locked monotonic Z-ascent; fixes cut canvas via 58% asymmetric stage & editorial shadow bleed."
      />

      <section className="hero-asymmetric-split">
        <div className="hero-copy">
          <div className="eyebrow">
            Freelance Full-Stack Developer
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

        <div className="hero-visual-asymmetric">
          <div
            tabIndex={0}
            className={`hero-stage-asymmetric ${isDragging ? "is-dragging" : ""}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            role="region"
            aria-label="Interactive flagship cards — direction-locked depth peel"
            style={{ touchAction: "pan-y" }}
          >
            <div className="fanned-deck-wrapper" style={{ overflow: "visible" }}>
              {DECK_CARDS.map((card, idx) => {
                const t = getAltCPose(idx, virtualIndex);

                return (
                  <div
                    key={card.id}
                    role="button"
                    tabIndex={0}
                    className={`fanned-card ${t.isChosen ? "is-chosen" : "is-background"}`}
                    style={{
                      transform: `translate3d(${t.translateX}px, ${t.translateY}px, ${t.translateZ}px) rotate(${t.rotation}deg) scale(${t.scale})`,
                      zIndex: t.zIndex,
                      cursor: isDragging ? "grabbing" : t.isChosen ? "pointer" : "grab",
                    }}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    onClick={() => handleCardClick(idx, card.href)}
                    aria-label={`Project: ${card.title} — ${card.category}${t.isChosen ? " (selected)" : " (drag to peel)"}`}
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
    </div>
  );
}

/* =========================================================================
   ALTERNATIVE D: UNIFIED FULL CANVAS · CRAMPED DECK & EMPOWERING ECOMMERCE
   - User Request: "change the text position and the text itself no one knows
     what fullstack even is, just write something like i built a modern website,
     or i builed unique ecommers, or i build ecommerce with everything you might
     need and so on, something sentimintil and empowering not boring with details,
     my clients will be small ecommerce that pays 2k - 5k for it in usa so they
     dont care or know the details they want to the goal"
   - Spatial Collision Fix: Deck wrapper shifted to right zone (clamp(130px, 15vw, 230px))
     with tuned deck centers ([35, 10, -10, -30]), compact 72px spacing, and
     dedicated left text zone (32vw) so cards never cover text or CTA buttons.
   - Sentimental & Empowering Copy: Replaces tech jargon (full-stack, schemas, endpoints)
     with goal-driven value for $2k-$5k store owners: distinctive design, customer trust,
     instant readiness, and sales growth.
   - Z-Layer Fix: Alt 1's 3D Parabolic Arc-Lift physics (48px up, 55px forward).
   ========================================================================= */
function getBasePoseD(cardIndex: number, chosen: number) {
  const slot = cardIndex - chosen;
  // Anchored rightward to prevent cards from ever covering text or CTAs
  const deckCenters = [20, 8, 2, 0];
  const centerShift = deckCenters[chosen] ?? 0;
  const translateX = centerShift + slot * 72;

  let rotation = 0;
  if (slot === -1) rotation = -13;
  else if (slot === -2) rotation = -22;
  else if (slot <= -3) rotation = -30;
  else if (slot === 1) rotation = 13;
  else if (slot === 2) rotation = 22;
  else if (slot >= 3) rotation = 30;

  const absSlot = Math.abs(slot);
  const translateY = slot === 0 ? -20 : absSlot * 13;
  const translateZ = slot === 0 ? 46 : 18 - absSlot * 14;
  const scale = slot === 0 ? 1.04 : Math.max(0.85, 1 - absSlot * 0.05);

  return { rotation, translateX, translateY, translateZ, scale };
}

function getAltDPose(cardIndex: number, virtualIndex: number): CardPose {
  const clamped = Math.max(0, Math.min(N - 1, virtualIndex));
  const c0 = Math.floor(clamped);
  const c1 = Math.min(N - 1, c0 + 1);
  const fraction = clamped - c0;
  const t = fraction * fraction * (3 - 2 * fraction);
  const parabola = 4 * fraction * (1 - fraction); // Peaks at 1.0 mid-transition

  const p0 = getBasePoseD(cardIndex, c0);
  const p1 = getBasePoseD(cardIndex, c1);

  let rot = p0.rotation + (p1.rotation - p0.rotation) * t;
  let tx = p0.translateX + (p1.translateX - p0.translateX) * t;
  let ty = p0.translateY + (p1.translateY - p0.translateY) * t;
  let tz = p0.translateZ + (p1.translateZ - p0.translateZ) * t;
  let sc = p0.scale + (p1.scale - p0.scale) * t;
  let rotY = 0;

  // Elastic overscroll damping
  const overscroll =
    virtualIndex < 0
      ? virtualIndex * 40
      : virtualIndex > N - 1
      ? (virtualIndex - (N - 1)) * 40
      : 0;
  tx += overscroll;

  // Alt 1 3D Parabolic Arc-Lift: incoming card flies 48px upward and 55px forward
  if (cardIndex === c1 && fraction > 0) {
    ty -= parabola * 48; // flies 48px upward
    tz += parabola * 55; // pushes 55px forward in 3D
    rotY = -parabola * 12; // subtle 3D card pitch
  } else if (cardIndex === c0 && fraction > 0) {
    tz -= parabola * 16; // outgoing card gently sinks behind
  }

  // Z-Index: incoming card takes the top layer as soon as it lifts up
  let zIndex = Math.round(18 - Math.abs(cardIndex - virtualIndex) * 4);
  if (cardIndex === c1 && fraction > 0.06) {
    zIndex = 26; // in the air above the deck
  } else if (cardIndex === c0 && fraction <= 0.06) {
    zIndex = 24;
  }

  const isChosen = Math.abs(cardIndex - virtualIndex) < 0.48;

  return {
    rotation: rot,
    rotateY: rotY,
    translateX: tx,
    translateY: ty,
    translateZ: tz,
    scale: sc,
    zIndex,
    isChosen,
  };
}

export function HeroAlternativeD() {
  const router = useRouter();
  const [virtualIndex, setVirtualIndex] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const virtualIndexRef = useRef<number>(1);
  virtualIndexRef.current = virtualIndex;

  const startXRef = useRef<number>(0);
  const startVirtualRef = useRef<number>(1);
  const startTimeRef = useRef<number>(0);
  const totalMovedRef = useRef<number>(0);
  const isPointerDownRef = useRef<boolean>(false);
  const animFrameRef = useRef<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const animateTo = useCallback((targetIndex: number) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const startV = virtualIndexRef.current;
    const targetV = Math.max(0, Math.min(N - 1, targetIndex));
    const animStartTime = performance.now();
    const duration = 520;

    function step(now: number) {
      const elapsed = now - animStartTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 5); // Quintic ease-out
      const currentV = startV + (targetV - startV) * ease;

      setVirtualIndex(currentV);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setVirtualIndex(targetV);
        animFrameRef.current = null;
      }
    }

    animFrameRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    isPointerDownRef.current = true;
    startXRef.current = e.clientX;
    startVirtualRef.current = virtualIndexRef.current;
    startTimeRef.current = Date.now();
    totalMovedRef.current = 0;
    setIsDragging(true);

    try {
      if (e.currentTarget.setPointerCapture) {
        e.currentTarget.setPointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    totalMovedRef.current = Math.max(totalMovedRef.current, Math.abs(deltaX));

    const rawTarget = startVirtualRef.current - deltaX / SWIPE_DRAG_PX;
    let boundedTarget = rawTarget;
    if (rawTarget < 0) {
      boundedTarget = rawTarget * 0.26;
    } else if (rawTarget > N - 1) {
      boundedTarget = (N - 1) + (rawTarget - (N - 1)) * 0.26;
    }
    setVirtualIndex(boundedTarget);
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isPointerDownRef.current) return;
      isPointerDownRef.current = false;
      setIsDragging(false);

      try {
        if (e.currentTarget.hasPointerCapture && e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // ignore
      }

      const deltaX = e.clientX - startXRef.current;
      const elapsed = Math.max(1, Date.now() - startTimeRef.current);
      const velocity = deltaX / elapsed;

      const currentV = virtualIndexRef.current;
      let targetIndex = Math.round(currentV);

      if (velocity < -0.22 && currentV < N - 1) {
        targetIndex = Math.min(N - 1, Math.floor(currentV) + 1);
      } else if (velocity > 0.22 && currentV > 0) {
        targetIndex = Math.max(0, Math.ceil(currentV) - 1);
      }

      animateTo(targetIndex);
    },
    [animateTo]
  );

  const handleCardClick = useCallback(
    (index: number, href: string) => {
      if (totalMovedRef.current > 6) return;
      const currentCenter = Math.round(virtualIndexRef.current);
      if (currentCenter === index) {
        router.push(href);
      } else {
        animateTo(index);
      }
    },
    [router, animateTo]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const currentCenter = Math.round(virtualIndexRef.current);
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        animateTo(Math.max(0, currentCenter - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        animateTo(Math.min(N - 1, currentCenter + 1));
      }
    },
    [animateTo]
  );

  return (
    <div className="temp-hero-lab-container" id="hero-alt-d">
      <TempBadge
        label="ALTERNATIVE D · UNIFIED FULL CANVAS · CRAMPED DECK & SCREEN-FITTED"
        description="Zero vertical dividers. Alt 3's cramped intimate deck clustering (78px interval, ±15/26/36° fan) with Alt 1's 3D Parabolic Arc-Lift, tuned directly adjacent to screen-fitted balanced typography."
      />

      <section className="hero-unified-canvas">
        {/* Full-bleed interactive 3D cards canvas */}
        <div
          ref={stageRef}
          tabIndex={0}
          className={`hero-unified-stage ${isDragging ? "is-dragging" : ""}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={handleKeyDown}
          role="region"
          aria-label="Interactive flagship cards — unified full canvas with 3D arc-lift"
          style={{ touchAction: "pan-y" }}
        >
          <div className="unified-deck-wrapper">
            {DECK_CARDS.map((card, idx) => {
              const t = getAltDPose(idx, virtualIndex);

              return (
                <div
                  key={card.id}
                  role="button"
                  tabIndex={0}
                  className={`fanned-card ${t.isChosen ? "is-chosen" : "is-background"}`}
                  style={{
                    transform: `translate3d(${t.translateX}px, ${t.translateY}px, ${t.translateZ}px) rotate(${t.rotation}deg) rotateY(${t.rotateY}deg) scale(${t.scale})`,
                    zIndex: t.zIndex,
                    cursor: isDragging ? "grabbing" : t.isChosen ? "pointer" : "grab",
                  }}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  onClick={() => handleCardClick(idx, card.href)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCardClick(idx, card.href);
                    }
                  }}
                  aria-label={`Project: ${card.title} — ${card.category}${t.isChosen ? " (selected)" : " (drag to select)"}`}
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

        {/* Stacked editorial copy layer */}
        <div className="hero-copy-layered">
          <div className="hero-copy-inner">
            <div className="eyebrow">
              Modern Ecommerce Design & Build
            </div>
            <h1>
              I build unique ecommerce stores with everything your brand needs to sell.
            </h1>
            <p>
              Your business deserves more than a generic template. I craft distinctive online stores designed to showcase your products, earn customer trust, and turn visitors into buyers.
            </p>
            <div className="hero-actions">
              <Link className="button button-dark" href="/contact">
                Start your project <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
              <a className="text-link" href="#flagship">
                Explore recent work <ArrowDownRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* Backward-compatibility aliases */
export const HeroCurrentPhillTweak = HeroAlternativeA;
export const HeroVersionA = HeroAlternativeA;
export const HeroVersionB = HeroAlternativeB;
export const HeroVersionC = HeroAlternativeC;
export const HeroVersionD = HeroAlternativeD;



