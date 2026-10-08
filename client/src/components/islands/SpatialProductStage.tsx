"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

const SHOWCASES: ShowcaseItem[] = [
  {
    id: "vonex",
    title: "Vonex Essentials",
    category: "Luxury Apparel",
    description:
      "Editorial fashion storefront with tailored lookbooks, tactile fabric previews, and rapid checkout.",
    image: "/images/projects/vonex.png",
  },
  {
    id: "aethelon",
    title: "Aethelon Living",
    category: "Spatial Furniture",
    description:
      "Architectural home commerce with real-time stone & wood finish inspection and spatial room staging.",
    image: "/images/projects/aethelon.png",
  },
  {
    id: "atelier",
    title: "Atelier Studio",
    category: "Collectible Furniture",
    description:
      "Museum-grade collectible furniture flagship featuring 3D sculptural plinths, tactile material libraries, and bespoke concierge flows.",
    image: "/images/projects/atelier-hero-v2.png",
  },
];

export default function SpatialProductStage() {
  const [activeItem, setActiveItem] = useState<ShowcaseItem>(SHOWCASES[0]!);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = -((y - centerY) / centerY) * 7;
    const rotY = ((x - centerX) / centerX) * 7;
    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="spatial-stage-wrapper">
      <div className="section-head-wrap">
        <h2>Selected store designs.</h2>
        <p>
          Explore custom storefronts and interactive commerce systems we've designed and engineered for modern brands.
        </p>
      </div>

      <div className="spatial-stage-card">
        {/* Interactive Visual Viewport */}
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="spatial-viewport"
        >
          <div className="spatial-ambient-glow" aria-hidden="true" />
          <div className="spatial-floor-shadow" aria-hidden="true" />

          <div 
            className="spatial-product-rotor"
            style={{
              transform: isHovered
                ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
                : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
              transition: isHovered ? "transform 0.15s ease-out" : "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            <div className="spatial-image-box">
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                className="spatial-render-image"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          </div>
        </div>

        {/* Showcase Selector & Studio CTA */}
        <div className="spatial-info-panel">
          <div className="spatial-showcase-list">
            {SHOWCASES.map((item) => {
              const isSelected = item.id === activeItem.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveItem(item)}
                  className={cn("spatial-item-btn", isSelected && "is-active")}
                  aria-label={`View ${item.title}`}
                >
                  <div className="spatial-item-header">
                    <span className="spatial-item-title">{item.title}</span>
                    <span className="spatial-item-cat">{item.category}</span>
                  </div>
                  <p className="spatial-item-desc">{item.description}</p>
                </button>
              );
            })}
          </div>

          <div className="spatial-footer-cta">
            <Link href="/contact" className="spatial-cta-btn">
              <span>Build your custom store</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
