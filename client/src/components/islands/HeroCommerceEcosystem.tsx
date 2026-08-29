"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ShoppingBag, Zap, Layers } from "lucide-react";

interface HeroFinish {
  id: string;
  name: string;
  color: string;
  image: string;
  price: string;
  sku: string;
}

const heroFinishes: readonly HeroFinish[] = [
  {
    id: "walnut",
    name: "Smoked Walnut & Travertine",
    color: "#5c4738",
    image: "/images/aethelon-work-furniture.webp",
    price: "$1,480",
    sku: "SLS-WLN-01",
  },
  {
    id: "oak",
    name: "Oiled Oak & Carrara",
    color: "#c89d7c",
    image: "/images/aethelon-portfolio-chair.webp",
    price: "$1,360",
    sku: "SLS-OAK-02",
  },
  {
    id: "ash",
    name: "Charcoal Ash & Granite",
    color: "#3b3836",
    image: "/images/aethelon-portfolio-sofa.webp",
    price: "$1,540",
    sku: "SLS-ASH-03",
  },
];

export default function HeroCommerceEcosystem() {
  const [activeFinish, setActiveFinish] = useState<HeroFinish>(heroFinishes[0]!);
  const [cartCount, setCartCount] = useState(2);
  const [optimisticFlash, setOptimisticFlash] = useState(false);

  const handleQuickAdd = () => {
    setCartCount((c) => c + 1);
    setOptimisticFlash(true);
    setTimeout(() => setOptimisticFlash(false), 1200);
  };

  return (
    <div className="hero-ecosystem">
      {/* Living Product Visual Canvas */}
      <div className="hero-ecosystem-canvas">
        <Image
          src={activeFinish.image}
          alt={`Aethelon Solis Console in ${activeFinish.name}`}
          fill
          priority
          unoptimized
          sizes="(max-width: 760px) 100vw, 50vw"
          className="cover-image hero-ecosystem-image"
        />

        {/* Live UI Token 1: Cart Drawer State Pill */}
        <div className={`ecosystem-pill ecosystem-pill-top-left ${optimisticFlash ? "flash" : ""}`}>
          <div className="pill-icon-box">
            <ShoppingBag size={13} aria-hidden="true" />
          </div>
          <div className="pill-text-group">
            <span className="pill-meta-label">Live Cart Drawer</span>
            <strong className="pill-meta-value">
              {cartCount} items · ${(cartCount * 1420).toLocaleString()}
            </strong>
          </div>
          <span className="pill-live-dot" title="Optimistic State Synchronized" />
        </div>

        {/* Live UI Token 2: Architecture Spec Pill */}
        <div className="ecosystem-pill ecosystem-pill-top-right">
          <Zap size={13} className="pill-accent-icon" aria-hidden="true" />
          <div className="pill-text-group">
            <span className="pill-meta-label">Architecture</span>
            <strong className="pill-meta-value">Next.js App Router · Zero Shift</strong>
          </div>
        </div>

        {/* Live UI Token 3: Real-Time Stock Status */}
        <div className="ecosystem-pill ecosystem-pill-bottom-left">
          <span className="stock-signal-dot" />
          <div className="pill-text-group">
            <span className="pill-meta-label">{activeFinish.sku}</span>
            <strong className="pill-meta-value">In Stock · {activeFinish.price}</strong>
          </div>
        </div>

        {/* Live UI Token 4: Interactive Finish Selector Dock */}
        <div className="ecosystem-dock ecosystem-pill-bottom-right" role="group" aria-label="Interactive Material Swatches">
          <div className="dock-header">
            <Layers size={11} aria-hidden="true" />
            <span>Finish · {activeFinish.name.split(" ")[0]}</span>
          </div>
          <div className="dock-swatches">
            {heroFinishes.map((finish) => (
              <button
                key={finish.id}
                type="button"
                aria-label={`Switch to ${finish.name}`}
                className={`dock-swatch-btn ${activeFinish.id === finish.id ? "active" : ""}`}
                style={{ background: finish.color }}
                onClick={() => setActiveFinish(finish)}
              />
            ))}
            <button
              type="button"
              className="dock-quick-add"
              onClick={handleQuickAdd}
              aria-label="Quick test optimistic add to bag"
            >
              + Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
