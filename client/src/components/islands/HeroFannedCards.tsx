"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface CardItem {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly image: string;
  readonly href: string;
  readonly rotation: number;
  readonly translateX: number;
  readonly translateY: number;
  readonly zIndex: number;
  readonly objectPosition: string;
}

const CARDS: readonly CardItem[] = [
  {
    id: "oakwell",
    title: "Oakwell",
    category: "Handcrafted Luxury",
    image: "/images/projects/oakwell.png",
    href: "/work/oakwell-furniture-commerce",
    rotation: -14,
    translateX: -125,
    translateY: 24,
    zIndex: 2,
    objectPosition: "35% center",
  },
  {
    id: "aethelon",
    title: "Aethelon",
    category: "Spatial Commerce",
    image: "/images/projects/aethelon.png",
    href: "/work/aethelon-furniture-commerce",
    rotation: 0,
    translateX: -20,
    translateY: -12,
    zIndex: 5,
    objectPosition: "center center",
  },
  {
    id: "lundev",
    title: "Lundev",
    category: "Tactile 3D Studio",
    image: "/images/projects/lundev-furniture.png",
    href: "/work/lundev-furniture-experience",
    rotation: 12,
    translateX: 80,
    translateY: 18,
    zIndex: 3,
    objectPosition: "32% center",
  },
  {
    id: "velorum",
    title: "Velorum",
    category: "Haute Horology",
    image: "/images/projects/velorum.png",
    href: "/work/velorum-watch-commerce",
    rotation: 24,
    translateX: 175,
    translateY: 46,
    zIndex: 1,
    objectPosition: "center center",
  },
];

export default function HeroFannedCards() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const startXRef = useRef<number>(0);
  const totalMovedRef = useRef<number>(0);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    totalMovedRef.current = 0;
    try {
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    if (isDragging) {
      const deltaX = e.clientX - startXRef.current;
      totalMovedRef.current = Math.abs(deltaX);
      setDragOffset(deltaX * 0.35);
    } else {
      setMouseOffset({ x: relX * 12, y: relY * 12 });
    }
  }, [isDragging]);

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
      setHoveredId(null);
      setMouseOffset({ x: 0, y: 0 });
    }
  }, [isDragging]);

  const handleCardClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (totalMovedRef.current > 6) {
      e.preventDefault();
    }
  }, []);

  return (
    <div
      className={`hero-fanned-stage ${isDragging ? "is-dragging" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      role="region"
      aria-label="Featured Portfolio Flagships"
    >
      {/* Cards Deck Container */}
      <div
        className="fanned-deck-wrapper"
        style={{
          transform: `translate3d(${mouseOffset.x + dragOffset}px, ${mouseOffset.y}px, 0) rotate(${dragOffset * 0.04}deg)`,
          transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0, 0, 0.2, 1)",
        }}
      >
        {CARDS.map((card) => {
          const isHovered = hoveredId === card.id;

          // Smooth elevation & straightening on hover
          const currentRotation = isHovered ? 0 : card.rotation;
          const currentTranslateX = card.translateX;
          const currentTranslateY = isHovered ? card.translateY - 26 : card.translateY;
          const currentScale = isHovered ? 1.05 : 1;
          const currentZ = isHovered ? 20 : card.zIndex;

          return (
            <Link
              key={card.id}
              href={card.href}
              className={`fanned-card ${isHovered ? "hovered" : ""}`}
              style={{
                transform: `translate(${currentTranslateX}px, ${currentTranslateY}px) rotate(${currentRotation}deg) scale(${currentScale})`,
                zIndex: currentZ,
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
    </div>
  );
}
