"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

interface CardDef {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly image: string;
  readonly objectPosition: string;
}

const CARDS: readonly CardDef[] = [
  {
    id: "oakwell",
    title: "Oakwell",
    category: "Handcrafted Luxury",
    image: "/images/projects/oakwell.png",
    objectPosition: "38% center",
  },
  {
    id: "aethelon",
    title: "Aethelon",
    category: "Spatial Commerce",
    image: "/images/projects/aethelon.png",
    objectPosition: "center center",
  },
  {
    id: "lundev",
    title: "Lundev",
    category: "Tactile 3D Studio",
    image: "/images/projects/lundev-furniture.png",
    objectPosition: "32% center",
  },
  {
    id: "velorum",
    title: "Velorum",
    category: "Haute Horology",
    image: "/images/projects/velorum.png",
    objectPosition: "center center",
  },
];

const N = CARDS.length;
const DRAG_SENSITIVITY = 150; // px of drag per card transition

/** Compute visual transform properties for a given float offset from center */
function computeCardTransform(offset: number): {
  rotation: number;
  translateX: number;
  translateY: number;
  scale: number;
  zIndex: number;
  opacity: number;
} {
  const absOffset = Math.abs(offset);
  // Negative offset = card to the left; Positive = card to the right
  const rotation = offset * 11.5;
  const translateX = offset * 76;
  const translateY = absOffset * 11;
  const scale = Math.max(0.72, 1.02 - absOffset * 0.038);
  // Highest z-index for the card closest to center
  const zIndex = Math.round(20 - Math.min(10, absOffset * 3));
  const opacity = Math.max(0.45, 1 - absOffset * 0.12);

  return { rotation, translateX, translateY, scale, zIndex, opacity };
}

export default function HeroFannedCards() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [dragDelta, setDragDelta] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const startXRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const hasMovedRef = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation for accessibility
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(0, prev - 1));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(N - 1, prev + 1));
    }
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary button
    if (e.button !== 0) return;

    setIsDragging(true);
    setDragDelta(0);
    startXRef.current = e.clientX;
    startTimeRef.current = Date.now();
    hasMovedRef.current = false;

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture not supported
    }
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;

      const rawDelta = e.clientX - startXRef.current;
      if (Math.abs(rawDelta) > 5) {
        hasMovedRef.current = true;
      }

      // Elastic resistance when dragging past stack boundaries
      let effectiveDelta = rawDelta;
      if (activeIndex === 0 && rawDelta > 0) {
        effectiveDelta = rawDelta * 0.28;
      } else if (activeIndex === N - 1 && rawDelta < 0) {
        effectiveDelta = rawDelta * 0.28;
      }

      setDragDelta(effectiveDelta);
    },
    [isDragging, activeIndex],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;

      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }

      setIsDragging(false);

      const deltaX = dragDelta;
      const elapsed = Math.max(1, Date.now() - startTimeRef.current);
      const velocity = deltaX / elapsed; // px per ms

      if (hasMovedRef.current && Math.abs(deltaX) > 10) {
        let shift = 0;

        // Swipe flick detection or distance threshold
        if (velocity < -0.32 || deltaX < -50) {
          shift = deltaX < -180 ? 2 : 1;
        } else if (velocity > 0.32 || deltaX > 50) {
          shift = deltaX > 180 ? -2 : -1;
        } else {
          shift = Math.round(-deltaX / DRAG_SENSITIVITY);
        }

        const nextIndex = Math.max(0, Math.min(N - 1, activeIndex + shift));
        setActiveIndex(nextIndex);
      }

      setDragDelta(0);
    },
    [isDragging, dragDelta, activeIndex],
  );

  const handleCardClick = useCallback(
    (index: number) => {
      // If user performed a drag gesture, do not treat as click
      if (hasMovedRef.current) return;
      setActiveIndex(index);
    },
    [],
  );

  // Virtual float position of the active center
  // Dragging left (negative delta) moves active position forward
  const virtualCenter = activeIndex - dragDelta / DRAG_SENSITIVITY;

  return (
    <div
      ref={containerRef}
      className={`hero-fanned-stage ${isDragging ? "is-dragging" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Interactive portfolio cards — hold and drag or click to switch center card"
    >
      {/* Cards Deck Container */}
      <div className="fanned-deck-wrapper">
        {CARDS.map((card, i) => {
          const offset = i - virtualCenter;
          const isCenter = Math.abs(offset) < 0.45;
          const isHovered = !isDragging && hoveredIndex === i;
          const transform = computeCardTransform(offset);

          // Subtle elevation lift on hover when not dragging
          const hoverLift = isHovered && !isCenter ? -14 : isHovered && isCenter ? -8 : 0;
          const currentTranslateY = transform.translateY + hoverLift;
          const currentScale = isHovered ? transform.scale * 1.025 : transform.scale;

          return (
            <div
              key={card.id}
              role="button"
              tabIndex={-1}
              className={`fanned-card ${isCenter ? "is-center" : ""} ${isHovered ? "hovered" : ""}`}
              style={{
                transform: `translate3d(${transform.translateX}px, ${currentTranslateY}px, 0) rotate(${transform.rotation}deg) scale(${currentScale})`,
                zIndex: transform.zIndex,
                opacity: transform.opacity,
                transition: isDragging
                  ? "none"
                  : "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, opacity 0.4s ease",
              }}
              onClick={() => handleCardClick(i)}
              onMouseEnter={() => {
                if (!isDragging) setHoveredIndex(i);
              }}
              onMouseLeave={() => {
                if (!isDragging) setHoveredIndex(null);
              }}
              onDragStart={(e) => e.preventDefault()}
              aria-label={`Showcase ${card.title} - ${card.category}`}
            >
              <div className="fanned-card-inner">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 70vw, 360px"
                  priority={i < 2}
                  unoptimized
                  draggable={false}
                  className="fanned-card-img"
                  style={{ objectPosition: card.objectPosition }}
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

      {/* Indicator dots for direct switching */}
      <div className="fanned-dot-nav" aria-label="Card selection indicators">
        {CARDS.map((card, i) => (
          <button
            key={card.id}
            type="button"
            className={`fanned-dot ${i === activeIndex ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(i);
            }}
            tabIndex={0}
            aria-label={`Select ${card.title}`}
          />
        ))}
      </div>
    </div>
  );
}
