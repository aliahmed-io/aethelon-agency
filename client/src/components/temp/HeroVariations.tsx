"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
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
const SWIPE_DRAG_PX = 180; // px of horizontal drag per card cycle

interface CardPose {
  rotation: number;
  translateX: number;
  translateY: number;
  translateZ: number;
  scale: number;
}

/**
 * Base Ask Phill card pose when integer card index `chosen` is active.
 */
function getCardPoseAt(cardIndex: number, chosen: number): CardPose {
  const slot = cardIndex - chosen;
  const deckCenters = [55, 0, -55, -110];
  const centerShift = deckCenters[chosen] ?? 0;

  const translateX = centerShift + slot * 105;

  let rotation = 0;
  if (slot === -1) rotation = -14;
  else if (slot === -2) rotation = -26;
  else if (slot <= -3) rotation = -36;
  else if (slot === 1) rotation = 14;
  else if (slot === 2) rotation = 26;
  else if (slot >= 3) rotation = 36;

  const absSlot = Math.abs(slot);
  const translateY = slot === 0 ? -24 : absSlot * 15;
  const translateZ = slot === 0 ? 40 : 15 - absSlot * 12;
  const scale = slot === 0 ? 1.05 : Math.max(0.84, 1 - absSlot * 0.055);

  return { rotation, translateX, translateY, translateZ, scale };
}

/**
 * C1-continuous Hermite smoothstep interpolation across all 4 card poses for any float virtual index.
 */
function getInterpolatedPose(
  cardIndex: number,
  virtualIndex: number
): CardPose & { zIndex: number; isChosen: boolean } {
  const clamped = Math.max(0, Math.min(N - 1, virtualIndex));
  const c0 = Math.floor(clamped);
  const c1 = Math.min(N - 1, c0 + 1);
  const fraction = clamped - c0; // [0, 1]

  // Hermite smoothstep: 3t^2 - 2t^3 ensures zero derivative at integer boundaries
  const t = fraction * fraction * (3 - 2 * fraction);

  const p0 = getCardPoseAt(cardIndex, c0);
  const p1 = getCardPoseAt(cardIndex, c1);

  // Elastic rubber-band displacement when dragged past bounds
  const overscroll =
    virtualIndex < 0
      ? virtualIndex * 45
      : virtualIndex > N - 1
      ? (virtualIndex - (N - 1)) * 45
      : 0;

  const rotation = p0.rotation + (p1.rotation - p0.rotation) * t;
  const translateX = p0.translateX + (p1.translateX - p0.translateX) * t + overscroll;
  const translateY = p0.translateY + (p1.translateY - p0.translateY) * t;
  const translateZ = p0.translateZ + (p1.translateZ - p0.translateZ) * t;
  const scale = p0.scale + (p1.scale - p0.scale) * t;

  const dist = Math.abs(cardIndex - virtualIndex);
  const isChosen = dist < 0.48;
  const zIndex = Math.round(20 - dist * 4);

  return {
    rotation,
    translateX,
    translateY,
    translateZ,
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

  // Active float virtual index (default 1.0 = Aethelon)
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

  // Smooth quintic ease-out animation to target integer index
  const animateTo = useCallback((targetIndex: number) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const startV = virtualIndexRef.current;
    const targetV = Math.max(0, Math.min(N - 1, targetIndex));
    const animStartTime = performance.now();
    const duration = 520; // ms luxury agency ease

    function step(now: number) {
      const elapsed = now - animStartTime;
      const progress = Math.min(1, elapsed / duration);
      // Quintic ease out: 1 - (1 - t)^5
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

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Pointer Down: initiates drag gesture
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;

    // Interrupt any active settling animation immediately
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

  // Pointer Move: direct continuous 1-to-1 card scrubbing
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;

    const deltaX = e.clientX - startXRef.current;
    totalMovedRef.current = Math.max(totalMovedRef.current, Math.abs(deltaX));

    // Drag left (deltaX < 0) advances forward; Drag right (deltaX > 0) goes back
    const rawTarget = startVirtualRef.current - deltaX / SWIPE_DRAG_PX;

    // Elastic resistance past boundaries
    let boundedTarget = rawTarget;
    if (rawTarget < 0) {
      boundedTarget = rawTarget * 0.28;
    } else if (rawTarget > N - 1) {
      boundedTarget = (N - 1) + (rawTarget - (N - 1)) * 0.28;
    }

    setVirtualIndex(boundedTarget);
  }, []);

  // Pointer Up: flick velocity detection and smooth release settling
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
      const velocity = deltaX / elapsed; // px per ms

      const currentV = virtualIndexRef.current;
      let targetIndex = Math.round(currentV);

      // Fast flick detection
      if (velocity < -0.22 && currentV < N - 1) {
        targetIndex = Math.min(N - 1, Math.floor(currentV) + 1);
      } else if (velocity > 0.22 && currentV > 0) {
        targetIndex = Math.max(0, Math.ceil(currentV) - 1);
      }

      animateTo(targetIndex);
    },
    [animateTo]
  );

  // Card click: navigates if already active, or animates to card if clicked
  const handleCardClick = useCallback(
    (index: number, href: string) => {
      // If user dragged more than 6px, it was a drag gesture
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

  // Keyboard navigation for WCAG compliance
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
    <div className="temp-hero-lab-container" id="hero-phill-tweak">
      <TempBadge
        label="HERO / ASK PHILL TWEAK"
        description="Current Homepage Hero with Smooth Direct Drag-to-Cycle (Hover Disabled)"
      />

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

        {/* Dynamic Cards Stage with Direct Drag Gestures & Ask Phill Fanning */}
        <div className="hero-visual-wrapper">
          <div
            ref={stageRef}
            tabIndex={0}
            className={`hero-fanned-stage ${isDragging ? "is-dragging" : ""}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onKeyDown={handleKeyDown}
            role="region"
            aria-label="Interactive flagship cards — drag horizontally to browse projects, press left/right arrows to navigate"
            style={{ touchAction: "pan-y" }}
          >
            {/* Cards Deck Container */}
            <div className="fanned-deck-wrapper">
              {DECK_CARDS.map((card, idx) => {
                const t = getInterpolatedPose(idx, virtualIndex);

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
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleCardClick(idx, card.href);
                      }
                    }}
                    aria-label={`Project: ${card.title} — ${card.category}${t.isChosen ? " (selected, click to view)" : " (drag to select)"}`}
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

/* Backward-compatibility aliases so previous imports don't break */
export const HeroVersionA = HeroCurrentPhillTweak;
export const HeroVersionB = HeroCurrentPhillTweak;
export const HeroVersionC = HeroCurrentPhillTweak;


