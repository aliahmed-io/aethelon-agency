"use client";

import React, { useState, useRef, useCallback } from "react";
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
const DRAG_THRESHOLD = 45; // px of horizontal drag to cycle a card

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
 * Computes exact 3D transform for card `cardIndex` given the active `chosenIndex`.
 * Pure Ask Phill fan math:
 * - Active card (slot 0): straight upright at 0°, elevated in Z and Y, crisp highlight.
 * - Left cards (slot < 0): fan out to the left with negative rotations (-14°, -26°, -36°).
 * - Right cards (slot > 0): fan out to the right with positive rotations (+14°, +26°, +36°).
 * - Dynamic deck centering so active card remains balanced in the visual frame.
 */
function getCardTransform(cardIndex: number, chosenIndex: number): CardTransformState {
  const slot = cardIndex - chosenIndex;
  const isChosen = slot === 0;

  // Deck recentering offsets per chosen card to keep overall visual weight balanced
  const deckCenters = [55, 0, -55, -110];
  const centerShift = deckCenters[chosenIndex] ?? 0;

  const translateX = centerShift + slot * 105;

  let rotation = 0;
  if (slot === -1) rotation = -14;
  else if (slot === -2) rotation = -26;
  else if (slot <= -3) rotation = -36;
  else if (slot === 1) rotation = 14;
  else if (slot === 2) rotation = 26;
  else if (slot >= 3) rotation = 36;

  const absSlot = Math.abs(slot);
  const translateY = isChosen ? -24 : absSlot * 15;
  const translateZ = isChosen ? 40 : 15 - absSlot * 12;
  const scale = isChosen ? 1.05 : Math.max(0.84, 1 - absSlot * 0.055);
  const zIndex = isChosen ? 20 : 15 - absSlot * 4;

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

  // Active chosen card index (default 1 = Aethelon)
  const [chosenIndex, setChosenIndex] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragDelta, setDragDelta] = useState<number>(0);

  // Subtle ambient mouse parallax when not dragging
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const totalMovedRef = useRef<number>(0);
  const isPointerDownRef = useRef<boolean>(false);
  const stageRef = useRef<HTMLDivElement>(null);

  // Buttery silk luxury agency transition timing (0.72s cubic-bezier(0.22, 1, 0.36, 1))
  const cardTransition =
    "transform 0.72s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.68s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease";

  // Pointer Down: captures pointer for desktop mouse and mobile touch
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    isPointerDownRef.current = true;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    startTimeRef.current = Date.now();
    totalMovedRef.current = 0;
    setIsDragging(true);
    setDragDelta(0);

    try {
      if (e.currentTarget.setPointerCapture) {
        e.currentTarget.setPointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
  }, []);

  // Pointer Move: continuous drag tracking with boundary resistance & chain-drag support
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isPointerDownRef.current) {
        // Ambient mouse parallax
        const rect = e.currentTarget.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        setMouseOffset({ x: relX * 8, y: relY * 8 });
        return;
      }

      const deltaX = e.clientX - startXRef.current;
      const deltaY = e.clientY - startYRef.current;
      const moveDistance = Math.hypot(deltaX, deltaY);
      totalMovedRef.current = Math.max(totalMovedRef.current, moveDistance);

      // Boundary resistance if trying to drag past edge cards
      let dampedDeltaX = deltaX;
      if (chosenIndex === 0 && deltaX > 0) {
        dampedDeltaX = deltaX * 0.22;
      } else if (chosenIndex === N - 1 && deltaX < 0) {
        dampedDeltaX = deltaX * 0.22;
      }

      setDragDelta(dampedDeltaX);

      // Cycle threshold with chain-dragging support
      if (deltaX < -DRAG_THRESHOLD) {
        if (chosenIndex < N - 1) {
          setChosenIndex((prev) => Math.min(N - 1, prev + 1));
          startXRef.current = e.clientX;
          setDragDelta(0);
        }
      } else if (deltaX > DRAG_THRESHOLD) {
        if (chosenIndex > 0) {
          setChosenIndex((prev) => Math.max(0, prev - 1));
          startXRef.current = e.clientX;
          setDragDelta(0);
        }
      }
    },
    [chosenIndex]
  );

  // Pointer Up: flick velocity detection and release spring
  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isPointerDownRef.current) return;
      isPointerDownRef.current = false;

      try {
        if (e.currentTarget.hasPointerCapture && e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // ignore
      }

      // Check flick velocity on release
      const elapsed = Math.max(1, Date.now() - startTimeRef.current);
      const velocity = dragDelta / elapsed; // px/ms

      if (Math.abs(velocity) > 0.22 && Math.abs(dragDelta) > 12) {
        if (velocity < 0 && chosenIndex < N - 1) {
          setChosenIndex((prev) => Math.min(N - 1, prev + 1));
        } else if (velocity > 0 && chosenIndex > 0) {
          setChosenIndex((prev) => Math.max(0, prev - 1));
        }
      }

      setIsDragging(false);
      setDragDelta(0);
    },
    [dragDelta, chosenIndex]
  );

  const handlePointerLeave = useCallback(() => {
    if (!isPointerDownRef.current) {
      setMouseOffset({ x: 0, y: 0 });
    }
  }, []);

  // Card click: selects card if background; navigates if already active
  const handleCardClick = useCallback(
    (index: number, href: string) => {
      // If user moved more than 6px, it was a drag, not a click
      if (totalMovedRef.current > 6) return;

      if (chosenIndex === index) {
        router.push(href);
      } else {
        setChosenIndex(index);
      }
    },
    [chosenIndex, router]
  );

  // Keyboard navigation for WCAG compliance
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setChosenIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setChosenIndex((prev) => Math.min(N - 1, prev + 1));
      }
    },
    []
  );

  // Tactile deck wrapper feedback during drag and ambient parallax
  const deckProgressX = isDragging ? dragDelta * 0.32 : 0;
  const deckProgressTilt = isDragging ? dragDelta * 0.04 : 0;
  const mouseProgressX = !isDragging ? mouseOffset.x : 0;
  const mouseProgressY = !isDragging ? mouseOffset.y : 0;

  return (
    <div className="temp-hero-lab-container" id="hero-phill-tweak">
      <TempBadge
        label="HERO / ASK PHILL TWEAK"
        description="Current Homepage Hero with Buttery Smooth Drag-to-Cycle & Whole-Deck Fanning"
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

        {/* Dynamic Cards Stage with Buttery Drag Gestures & Ask Phill Fanning */}
        <div className="hero-visual-wrapper">
          <div
            ref={stageRef}
            tabIndex={0}
            className={`hero-fanned-stage ${isDragging ? "is-dragging" : ""}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerLeave}
            onKeyDown={handleKeyDown}
            role="region"
            aria-label="Interactive flagship cards — drag horizontally or hover to fan through projects, press left/right arrows to navigate"
            style={{ touchAction: "pan-y" }}
          >
            {/* Ambient Deck Wrapper with Pointer Drag & Parallax */}
            <div
              className="fanned-deck-wrapper"
              style={{
                transform: `translate3d(${deckProgressX + mouseProgressX}px, ${mouseProgressY}px, 0) rotate(${deckProgressTilt}deg)`,
                transition: isDragging ? "none" : "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {DECK_CARDS.map((card, idx) => {
                const t = getCardTransform(idx, chosenIndex);

                return (
                  <div
                    key={card.id}
                    role="button"
                    tabIndex={0}
                    className={`fanned-card ${t.isChosen ? "is-chosen hovered" : "is-background"}`}
                    style={{
                      transform: `translate3d(${t.translateX}px, ${t.translateY}px, ${t.translateZ}px) rotate(${t.rotation}deg) scale(${t.scale})`,
                      zIndex: t.zIndex,
                      transition: cardTransition,
                      cursor: isDragging ? "grabbing" : t.isChosen ? "pointer" : "grab",
                    }}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    onMouseEnter={() => {
                      if (!isPointerDownRef.current) {
                        setChosenIndex(idx);
                      }
                    }}
                    onClick={() => handleCardClick(idx, card.href)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleCardClick(idx, card.href);
                      }
                    }}
                    aria-label={`Project: ${card.title} — ${card.category}${t.isChosen ? " (selected, click to view)" : " (click or hover to inspect)"}`}
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

