"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface CardDef {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly image: string;
  readonly href: string;
  readonly objectPosition: string;
}

const CARDS: readonly CardDef[] = [
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

const N = CARDS.length;

/** Fan layout params per slot offset from center (-2 … +2) */
function slotLayout(offset: number): {
  rotation: number;
  translateX: number;
  translateY: number;
  scale: number;
  zIndex: number;
  opacity: number;
} {
  // offset = position relative to center card (0 = center, -1 = left, 1 = right, ±2 = far)
  switch (offset) {
    case 0:
      return { rotation: 0, translateX: 0, translateY: -18, scale: 1.07, zIndex: 10, opacity: 1 };
    case -1:
      return { rotation: -13, translateX: -170, translateY: 12, scale: 0.92, zIndex: 6, opacity: 1 };
    case 1:
      return { rotation: 13, translateX: 170, translateY: 12, scale: 0.92, zIndex: 6, opacity: 1 };
    case -2:
      return { rotation: -24, translateX: -310, translateY: 40, scale: 0.8, zIndex: 3, opacity: 0.6 };
    case 2:
      return { rotation: 24, translateX: 310, translateY: 40, scale: 0.8, zIndex: 3, opacity: 0.6 };
    default:
      // hidden off to the side
      return {
        rotation: offset < 0 ? -36 : 36,
        translateX: offset < 0 ? -450 : 450,
        translateY: 60,
        scale: 0.68,
        zIndex: 1,
        opacity: 0,
      };
  }
}

const DRAG_THRESHOLD = 60; // px to commit a card cycle

export default function HeroFannedCards() {
  const [centerIndex, setCenterIndex] = useState<number>(1); // aethelon starts center
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragX, setDragX] = useState<number>(0);

  const startXRef = useRef<number>(0);
  const totalMovedRef = useRef<number>(0);
  const committedRef = useRef<boolean>(false);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragX(0);
    startXRef.current = e.clientX;
    totalMovedRef.current = 0;
    committedRef.current = false;
    try {
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const delta = e.clientX - startXRef.current;
      totalMovedRef.current = Math.abs(delta);
      setDragX(delta);

      // Commit a cycle once threshold is crossed (one per drag gesture)
      if (!committedRef.current && Math.abs(delta) >= DRAG_THRESHOLD) {
        committedRef.current = true;
        const direction = delta < 0 ? 1 : -1; // drag left → next card; drag right → prev card
        setCenterIndex((prev) => (prev + direction + N) % N);
        // Reset so user can chain if they drag far enough
        startXRef.current = e.clientX;
        setDragX(0);
        committedRef.current = false;
      }
    },
    [isDragging],
  );

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    setDragX(0);
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (!isDragging) {
      setHoveredId(null);
    }
  }, [isDragging]);

  const handleCardClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (totalMovedRef.current > 6) {
      e.preventDefault();
    }
  }, []);

  // Drag hint: subtle parallax tilt of the whole deck while dragging (before threshold)
  const deckDragTilt = isDragging ? dragX * 0.06 : 0;
  const deckDragX = isDragging ? dragX * 0.12 : 0;

  return (
    <div
      className={`hero-fanned-stage ${isDragging ? "is-dragging" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      role="region"
      aria-label="Featured Portfolio Flagships — drag to browse"
    >
      {/* Cards Deck Container */}
      <div
        className="fanned-deck-wrapper"
        style={{
          transform: `translate3d(${deckDragX}px, 0px, 0) rotate(${deckDragTilt}deg)`,
          transition: isDragging ? "none" : "transform 0.35s cubic-bezier(0, 0, 0.2, 1)",
        }}
      >
        {CARDS.map((card, i) => {
          // Compute signed offset from centerIndex, wrap to shortest path
          let offset = i - centerIndex;
          // Normalize to [-N/2, N/2] for wrapping
          if (offset > N / 2) offset -= N;
          if (offset < -N / 2) offset += N;

          const layout = slotLayout(offset);
          const isCenter = offset === 0;
          const isHovered = !isDragging && hoveredId === card.id;

          const rotation = isHovered && !isCenter ? layout.rotation * 0.6 : layout.rotation;
          const translateY = isHovered ? layout.translateY - 14 : layout.translateY;
          const scale = isHovered ? layout.scale + 0.03 : layout.scale;

          return (
            <Link
              key={card.id}
              href={card.href}
              className={`fanned-card ${isCenter ? "is-center" : ""} ${isHovered ? "hovered" : ""}`}
              style={{
                transform: `translate(${layout.translateX}px, ${translateY}px) rotate(${rotation}deg) scale(${scale})`,
                zIndex: layout.zIndex,
                opacity: layout.opacity,
                transition: isDragging
                  ? "opacity 0.2s ease"
                  : "transform 0.52s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
              }}
              onMouseEnter={() => {
                if (!isDragging) setHoveredId(card.id);
              }}
              onMouseLeave={() => {
                if (!isDragging) setHoveredId(null);
              }}
              onClick={handleCardClick}
              aria-label={`View ${card.title} platform build`}
            >
              <div className="fanned-card-inner">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 760px) 70vw, 340px"
                  priority
                  unoptimized
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

      {/* Drag hint dots */}
      <div className="fanned-dot-nav" aria-hidden="true">
        {CARDS.map((card, i) => (
          <button
            key={card.id}
            className={`fanned-dot ${i === centerIndex ? "active" : ""}`}
            onClick={() => setCenterIndex(i)}
            tabIndex={-1}
            aria-label={`Show ${card.title}`}
          />
        ))}
      </div>
    </div>
  );
}
