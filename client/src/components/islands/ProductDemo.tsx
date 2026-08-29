"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, Minus, Plus } from "lucide-react";

interface FinishOption {
  id: string;
  name: string;
  color: string;
  image: string;
  sku: string;
  price: number;
}

const finishes: readonly FinishOption[] = [
  {
    id: "walnut",
    name: "Smoked Walnut & Travertine",
    color: "#5c4738",
    image: "/images/aethelon-work-furniture.webp",
    sku: "SLS-WLN-01",
    price: 1480,
  },
  {
    id: "oak",
    name: "Oiled Oak & Carrara",
    color: "#c89d7c",
    image: "/images/aethelon-portfolio-chair.webp",
    sku: "SLS-OAK-02",
    price: 1360,
  },
  {
    id: "ash",
    name: "Charcoal Ash & Granite",
    color: "#3b3836",
    image: "/images/aethelon-portfolio-sofa.webp",
    sku: "SLS-ASH-03",
    price: 1540,
  },
];

export default function ProductDemo() {
  const [selectedFinish, setSelectedFinish] = useState<FinishOption>(finishes[0]!);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const subtotal = selectedFinish.price * quantity;

  const handleAddToCart = () => {
    setAddedNotice(`Added ${quantity} × Solis Console (${selectedFinish.name}) to bag`);
    setTimeout(() => {
      setAddedNotice(null);
    }, 4000);
  };

  return (
    <div className="product-demo-card">
      <div className="product-demo-preview">
        <Image
          src={selectedFinish.image}
          alt={`Aethelon Solis Console in ${selectedFinish.name}`}
          fill
          unoptimized
          sizes="(max-width: 760px) 100vw, 420px"
          className="cover-image"
        />
        <span className="product-demo-badge">Interactive product slice</span>
        <span className="product-demo-sku">{selectedFinish.sku}</span>
      </div>

      <div className="product-demo-details">
        <div className="product-demo-header">
          <div>
            <span className="product-demo-collection">Aethelon Collection · Architectural Casegoods</span>
            <h3 className="product-demo-title">Solis Console</h3>
          </div>
          <strong className="product-demo-price">${selectedFinish.price.toLocaleString()}</strong>
        </div>

        <div className="product-demo-swatches">
          <div className="swatch-label-row">
            <span>Material & Stone</span>
            <b className="selected-finish-name">{selectedFinish.name}</b>
          </div>
          <div className="swatch-buttons">
            {finishes.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-label={`Select ${f.name}`}
                className={selectedFinish.id === f.id ? "selected" : ""}
                style={{ background: f.color }}
                onClick={() => setSelectedFinish(f)}
              />
            ))}
          </div>
        </div>

        <div className="product-demo-actions-row">
          <div className="quantity-control" aria-label="Quantity selector">
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Minus size={13} aria-hidden="true" />
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              disabled={quantity >= 10}
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            >
              <Plus size={13} aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            className="button button-dark demo-add-button"
            onClick={handleAddToCart}
          >
            Add to Bag · ${subtotal.toLocaleString()}{" "}
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </div>

        <div className="product-demo-status">
          <span>
            <Check size={13} aria-hidden="true" /> In stock · Made to order in 10 days
          </span>
          <span>Optimistic cart update</span>
        </div>

        {addedNotice && (
          <div className="product-demo-toast" role="status">
            <Check size={14} aria-hidden="true" />
            <span>{addedNotice}</span>
          </div>
        )}
      </div>
    </div>
  );
}
