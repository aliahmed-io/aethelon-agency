"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { 
  Rotate3d, 
  Smartphone, 
  Sparkles, 
  Maximize2, 
  Check, 
  ArrowRight,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FinishOption {
  id: string;
  name: string;
  material: string;
  colorHex: string;
  price: string;
  leadTime: string;
  image: string;
  specNote: string;
}

const FINISHES: FinishOption[] = [
  {
    id: "travertine",
    name: "Navona Travertine",
    material: "Honed Roman Stone & Smoked Walnut",
    colorHex: "#e3dac9",
    price: "$3,450",
    leadTime: "Crafted in 14 days",
    image: "/images/projects/aethelon.png",
    specNote: "Hand-honed open pore travertine with architectural walnut framework",
  },
  {
    id: "walnut",
    name: "Smoked American Walnut",
    material: "FSC Heritage Hardwood & Brushed Bronze",
    colorHex: "#5c4033",
    price: "$3,100",
    leadTime: "Crafted in 10 days",
    image: "/images/projects/velorum.png",
    specNote: "Quarter-sawn American black walnut finished in organic low-sheen beeswax",
  },
  {
    id: "brass",
    name: "Brushed Patina Brass",
    material: "Solid Alloy Brass & Nero Marquina",
    colorHex: "#c5a059",
    price: "$3,850",
    leadTime: "Crafted in 18 days",
    image: "/images/projects/novexa.png",
    specNote: "Solid hot-forged brass casing hand-relieved with micro-mechanical bevels",
  },
];

export default function SpatialProductStage() {
  const [activeFinish, setActiveFinish] = useState<FinishOption>(FINISHES[0]!);
  const [rotationAngle, setRotationAngle] = useState(15);
  const [isDragging, setIsDragging] = useState(false);
  const [showArModal, setShowArModal] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const startXRef = useRef<number>(0);
  const currentAngleRef = useRef<number>(15);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    currentAngleRef.current = rotationAngle;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    const newAngle = currentAngleRef.current + deltaX * 0.45;
    setRotationAngle(newAngle);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2400);
  };

  return (
    <div className="spatial-stage-wrapper">
      {/* Top Value Statement */}
      <div className="spatial-stage-header">
        <span className="spatial-eyebrow">
          <Sparkles size={12} className="text-orange-600 inline mr-1" />
          Spatial Computing &amp; Augmented Reality
        </span>
        <h2 className="spatial-headline">
          Experience before purchase. Zero hesitation.
        </h2>
        <p className="spatial-subtext">
          Let customers inspect finishes in 360° and instantly place true-to-scale items in their living rooms through native WebXR and iOS Quick Look. No app downloads required.
        </p>
      </div>

      {/* Main 3D / AR Interactive Canvas Container */}
      <div className="spatial-stage-canvas-card">
        {/* Interactive 3D Viewport Stage */}
        <div 
          className={cn("spatial-canvas-viewport", isDragging && "is-grabbing")}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          role="region"
          aria-label="Interactive 360-degree spatial product inspection"
        >
          {/* Ambient Lighting & Backdrop Halo */}
          <div className="spatial-halo-glow" aria-hidden="true" />
          
          {/* Spatial Floor Shadow Plane */}
          <div className="spatial-floor-shadow" aria-hidden="true" />

          {/* Interactive Rotatable 3D Product Simulation */}
          <div 
            className="spatial-product-rotor"
            style={{
              transform: `perspective(1000px) rotateY(${rotationAngle}deg) rotateX(3deg)`,
              transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            <div className="spatial-image-box">
              <Image
                src={activeFinish.image}
                alt={activeFinish.name}
                fill
                priority
                className="spatial-render-image"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>
          </div>

          {/* 360 Drag Prompt Floating Badge */}
          <div className="spatial-drag-hint">
            <Rotate3d size={14} className="text-orange-600" />
            <span>Drag to rotate 360°</span>
          </div>

          {/* Dimension Metric Marker */}
          <div className="spatial-spec-pill">
            <Maximize2 size={12} className="text-neutral-500" />
            <span>180cm × 45cm × 52cm · True-to-scale</span>
          </div>

          {/* AR Trigger Button */}
          <button
            type="button"
            onClick={() => setShowArModal(true)}
            className="spatial-ar-button"
            aria-label="Preview in Augmented Reality"
          >
            <Smartphone size={15} />
            <span>View in Your Room (AR)</span>
          </button>
        </div>

        {/* Right Configuration & Value Panel */}
        <div className="spatial-config-panel">
          <div className="config-header">
            <span className="config-collection">Living Architecture · 01</span>
            <h3 className="config-title">{activeFinish.name}</h3>
            <div className="config-price-row">
              <span className="config-price">{activeFinish.price}</span>
              <span className="config-lead">{activeFinish.leadTime}</span>
            </div>
            <p className="config-description">{activeFinish.specNote}</p>
          </div>

          {/* Material Swatch Selector */}
          <div className="config-finish-group">
            <label className="config-group-label">
              <Layers size={13} className="text-neutral-500" />
              <span>Select Material Finish</span>
            </label>
            <div className="config-swatches">
              {FINISHES.map((finish) => {
                const isSelected = finish.id === activeFinish.id;
                return (
                  <button
                    key={finish.id}
                    type="button"
                    onClick={() => setActiveFinish(finish)}
                    className={cn("config-swatch-btn", isSelected && "is-selected")}
                    aria-label={`Select ${finish.name}`}
                  >
                    <span 
                      className="swatch-color-disc"
                      style={{ backgroundColor: finish.colorHex }}
                    />
                    <div className="swatch-info">
                      <span className="swatch-title">{finish.name}</span>
                      <span className="swatch-mat">{finish.material}</span>
                    </div>
                    {isSelected && <Check size={14} className="swatch-check" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Commerce Action Strip */}
          <div className="config-actions">
            <button
              type="button"
              onClick={handleAddToCart}
              className={cn("spatial-add-btn", isAdded && "is-success")}
            >
              {isAdded ? (
                <>
                  <Check size={16} />
                  <span>Added to Bespoke Order</span>
                </>
              ) : (
                <>
                  <span>Order Custom Prototype</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
            <div className="config-guarantee">
              <span>✓ Proven 40% reduction in customer return rates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Instant AR Simulation Modal */}
      {showArModal && (
        <div 
          className="ar-modal-backdrop" 
          onClick={() => setShowArModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="ar-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="ar-modal-header">
              <div className="ar-modal-title-row">
                <Smartphone size={18} className="text-orange-600" />
                <h4 className="ar-modal-title">Universal Augmented Reality</h4>
              </div>
              <button 
                type="button" 
                onClick={() => setShowArModal(false)}
                className="ar-close-btn"
                aria-label="Close AR modal"
              >
                ✕
              </button>
            </div>

            <div className="ar-modal-body">
              <div className="ar-device-preview">
                <div className="ar-scan-grid" />
                <div className="ar-product-ghost">
                  <div className="ar-snap-indicator">
                    <span className="ar-snap-pulse" />
                    <span>Auto-snapped to Floor Plane (0.00cm drift)</span>
                  </div>
                  <div className="ar-product-silhouette">
                    <Image
                      src={activeFinish.image}
                      alt={activeFinish.name}
                      width={320}
                      height={240}
                      className="ar-ghost-image"
                    />
                  </div>
                </div>
              </div>

              <div className="ar-modal-details">
                <h5>Device-Aware Spatial Routing</h5>
                <ul className="ar-protocol-list">
                  <li>
                    <strong>iOS Safari:</strong> Instant Apple Quick Look (.usdz)
                  </li>
                  <li>
                    <strong>Android Chrome:</strong> Google Scene Viewer &amp; WebXR
                  </li>
                  <li>
                    <strong>Desktop WebGL:</strong> Photo-mode room upload &amp; compositing
                  </li>
                </ul>
                <p className="ar-note">
                  Zero client friction. Customers point their camera and see exactly how the item complements their space before tapping Checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
