"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FocusCardItem {
  title: string;
  category: string;
  src: string;
  href: string;
  techStack: string[];
  metrics: string;
  description: string;
}

export const FocusCards = ({ cards }: { cards: FocusCardItem[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="focus-cards-grid">
      {cards.map((card, index) => {
        const isMuted = hovered !== null && hovered !== index;
        return (
          <Link
            key={card.title}
            href={card.href}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={cn("focus-card-item", isMuted && "is-blurred")}
            style={{
              position: "relative",
              display: "block",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              borderRadius: "20px",
            }}
          >
            <div className="focus-card-image-layer" style={{ position: "absolute", inset: 0 }}>
              <Image
                src={card.src}
                alt={card.title}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 33vw"
                className="focus-card-image"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="focus-card-gradient-overlay" />

            {/* Top metadata tags */}
            <div className="focus-card-top-tags">
              <span className="focus-tag-category">{card.category}</span>
              <span className="focus-tag-metric">{card.metrics}</span>
            </div>

            {/* Bottom content info */}
            <div className="focus-card-bottom-info">
              <div className="focus-card-title-row">
                <h3 className="focus-card-title">{card.title}</h3>
                <div className="focus-card-arrow-circle">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              <p className="focus-card-desc">{card.description}</p>

              <div className="focus-card-tech-row">
                {card.techStack.map((tech) => (
                  <span key={tech} className="focus-tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default FocusCards;
