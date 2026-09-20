"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface BrandWorld {
  id: string;
  brand: string;
  category: string;
  headline: string;
  narrative: string;
  image: string;
  detailCaption: string;
  link: string;
}

const BRAND_WORLDS: readonly BrandWorld[] = [
  {
    id: "velorum",
    brand: "Velorum Genève",
    category: "Haute Horology",
    headline: "Translating Swiss mechanical precision into a serene digital collector’s vault.",
    narrative: "For Velorum, we discarded the aggressive pop-ups and flashy countdowns of typical luxury storefronts. Instead, we engineered an unhurried, tactile atelier where each tourbillon bridge, hand-beveled edge, and sapphire reflection commands quiet reverence.",
    image: "/images/velorum/gallery/gallery_wrist_luxury_1768638707354.png",
    detailCaption: "Velorum Atelier · Haute Horology Digital Vault",
    link: "/work/velorum-watch-commerce",
  },
  {
    id: "oakwell",
    brand: "Oakwell Interiors",
    category: "Architectural Wood & Stone",
    headline: "Capturing the grain, weight, and physical permanence of handcrafted objects.",
    narrative: "Every digital touchpoint was crafted to honor the slow, physical craft of the furniture workshop: daylight-responsive photography, generous typographic white space, and an unhurried browsing tempo that evokes walking through a serene private gallery.",
    image: "/images/oakwell/editorial/detail.jpg",
    detailCaption: "Oakwell Atelier · Hand-Turned Walnut Joinery",
    link: "/work/oakwell-furniture-commerce",
  },
  {
    id: "novexa",
    brand: "Novexa Silhouettes",
    category: "Technical Objects & Footwear",
    headline: "Architectural minimalism meets tactile material studies.",
    narrative: "Designed with the restraint of an industrial design monograph. Stark ink contrasts, tactile material macro shots, and fluid gesture navigation present footwear not as disposable fashion, but as engineered structural objects.",
    image: "/images/novexa/all.jpeg",
    detailCaption: "Novexa Studio · Ergonomic Technical Silhouettes",
    link: "/work/novexa-product-commerce",
  },
];

export default function ConceptVisualCurationReel() {
  const [selectedBrand, setSelectedBrand] = useState<string>("velorum");

  const current = BRAND_WORLDS.find((b) => b.id === selectedBrand) || BRAND_WORLDS[0]!;

  return (
    <div className="concept-curation-section">
      <div className="curation-container">
        {/* Header Bar */}
        <div className="curation-header">
          <div>
            <div className="curation-eyebrow">
              02 · Bespoke Visual Worlds
            </div>
            <h2 className="curation-title">
              Stores with the weight & desire of<br />
              <em>enduring physical objects.</em>
            </h2>
          </div>

          {/* Calm Brand Selector Tabs */}
          <div className="curation-tabs">
            {BRAND_WORLDS.map((item) => {
              const isActive = item.id === selectedBrand;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`curation-tab-btn ${isActive ? "active" : ""}`}
                  onClick={() => setSelectedBrand(item.id)}
                >
                  <span className="curation-tab-brand">{item.brand}</span>
                  <span className="curation-tab-cat">{item.category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cinematic Split Spread */}
        <div className="curation-spread">
          {/* Left: Expansive Editorial Visual */}
          <div className="curation-image-frame">
            <Image
              src={current.image}
              alt={current.headline}
              fill
              unoptimized
              className="cover-image curation-img"
              sizes="(max-width: 900px) 100vw, 55vw"
            />
            <div className="curation-caption-tag">
              <span>{current.detailCaption}</span>
            </div>
          </div>

          {/* Right: Thoughtful Brand Narrative */}
          <div className="curation-copy-frame">
            <span className="curation-category-kicker">{current.category}</span>
            <h3 className="curation-headline">{current.headline}</h3>
            <p className="curation-paragraph">{current.narrative}</p>

            <div className="curation-link-wrap">
              <Link href={current.link} className="text-link curation-cta">
                View {current.brand} platform study <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
