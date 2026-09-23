"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

function getBasePose(cardIndex: number, chosen: number) {
  const slot = cardIndex - chosen;
  // Anchored harmoniously to frame the bold typography with balanced breathing room
  const deckCenters = [14, 6, 2, 0];
  const centerShift = deckCenters[chosen] ?? 0;
  const translateX = centerShift + slot * 74;

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

function getCardPose(cardIndex: number, virtualIndex: number): CardPose {
  const clamped = Math.max(0, Math.min(N - 1, virtualIndex));
  const c0 = Math.floor(clamped);
  const c1 = Math.min(N - 1, c0 + 1);
  const fraction = clamped - c0;
  const t = fraction * fraction * (3 - 2 * fraction);
  const parabola = 4 * fraction * (1 - fraction); // Peaks at 1.0 mid-transition

  const p0 = getBasePose(cardIndex, c0);
  const p1 = getBasePose(cardIndex, c1);

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

  // 3D Parabolic Arc-Lift: incoming card flies 48px upward and 55px forward
  if (cardIndex === c1 && fraction > 0) {
    ty -= parabola * 48; // flies 48px upward
    tz += parabola * 55; // pushes 55px forward in 3D
    rotY = -parabola * 12; // subtle 3D card pitch
  } else if (cardIndex === c0 && fraction > 0) {
    tz -= parabola * 16; // outgoing card gently sinks behind
  }

  // Z-Index: incoming card takes top layer cleanly during flight
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

export default function HeroFannedCards() {
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
      aria-label="Featured Portfolio Flagships — drag horizontally to cycle with 3D arc-lift"
      style={{ touchAction: "pan-y" }}
    >
      <div className="unified-deck-wrapper">
        {DECK_CARDS.map((card, idx) => {
          const t = getCardPose(idx, virtualIndex);

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
  );
}
