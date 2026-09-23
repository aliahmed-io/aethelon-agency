"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Sparkles, 
  Scan, 
  SunMedium, 
  Palette, 
  Compass, 
  CheckCircle2, 
  ArrowRight,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RoomPreset {
  id: string;
  name: string;
  lighting: string;
  temperature: string;
  flooring: string;
  palette: string[];
  recommendation: {
    title: string;
    category: string;
    matchScore: string;
    why: string;
    image: string;
  };
}

const ROOM_PRESETS: RoomPreset[] = [
  {
    id: "loft",
    name: "Sunlit Tribeca Loft",
    lighting: "South-Facing Soft Daylight",
    temperature: "3,100K Warm Neutral",
    flooring: "Bleached Scandinavian Pine",
    palette: ["#f4efe6", "#c8baa6", "#5a4d41"],
    recommendation: {
      title: "Solis Architectural Console",
      category: "Living Collection · Travertine",
      matchScore: "99.4%",
      why: "Warm travertine texture balances raw daylight while smoked walnut grounds open spatial proportions.",
      image: "/images/projects/aethelon.png",
    },
  },
  {
    id: "villa",
    name: "Mediterranean Villa",
    lighting: "Golden Hour Direct Ambient",
    temperature: "2,600K Warm Amber",
    flooring: "Handcrafted Terracotta Stone",
    palette: ["#d97c51", "#8c4a2f", "#2f221e"],
    recommendation: {
      title: "Velorum Horology Showcase",
      category: "Haute Horlogerie · Brushed Patina",
      matchScore: "98.7%",
      why: "Hot-forged brass and dark Nero Marquina marble mirror the earthy mineral palette.",
      image: "/images/projects/velorum.png",
    },
  },
  {
    id: "studio",
    name: "Japandi Acoustic Studio",
    lighting: "Diffused Architectural Cove",
    temperature: "4,000K Gallery White",
    flooring: "Polished Basalt Concrete",
    palette: ["#1c1c1f", "#3a3a40", "#9b9ba3"],
    recommendation: {
      title: "Novexa Studio Monitor Stand",
      category: "Acoustic Engineering · Matte Obsidian",
      matchScore: "99.1%",
      why: "Acoustic isolation chambers decouple low frequencies from concrete floors with zero visual clutter.",
      image: "/images/projects/novexa.png",
    },
  },
];

export default function AiVisionShowcase() {
  const [activePreset, setActivePreset] = useState<RoomPreset>(ROOM_PRESETS[0]!);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSelectPreset = (preset: RoomPreset) => {
    if (preset.id === activePreset.id) return;
    setIsAnalyzing(true);
    setActivePreset(preset);
    setTimeout(() => setIsAnalyzing(false), 600);
  };

  return (
    <div className="ai-vision-wrapper">
      {/* Top Value Statement */}
      <div className="ai-vision-header">
        <span className="ai-vision-eyebrow">
          <Sparkles size={12} className="text-orange-600 inline mr-1" />
          Multimodal Intelligence
        </span>
        <h2 className="ai-vision-headline">
          An intelligent store that predicts what buyers desire.
        </h2>
        <p className="ai-vision-subtext">
          Our stores don&apos;t just display products. Multimodal computer vision analyzes customer room photos to calibrate lighting, detect surface harmonies, and curate pieces tailored to their space.
        </p>
      </div>

      {/* Main Kinetic Neural Showcase Card */}
      <div className="ai-vision-card">
        {/* Step 1: Customer Input (Room Photo Preset Selector) */}
        <div className="ai-vision-left-col">
          <div className="ai-col-header">
            <span className="ai-col-step">01 · Customer Room Input</span>
            <h4>Select or Upload Living Space</h4>
          </div>

          <div className="ai-preset-chips">
            {ROOM_PRESETS.map((preset) => {
              const isSelected = preset.id === activePreset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={cn("ai-preset-btn", isSelected && "is-active")}
                >
                  <span className="ai-preset-dot" />
                  <span className="ai-preset-title">{preset.name}</span>
                </button>
              );
            })}
          </div>

          {/* Visual Natural Language Search Bar Demo */}
          <div className="ai-search-demo-box">
            <div className="ai-search-input-mock">
              <Search size={14} className="text-neutral-400 shrink-0" />
              <span className="ai-search-query">
                &ldquo;curved walnut coffee table for sun-drenched loft&rdquo;
              </span>
            </div>
            <span className="ai-search-meta">
              Hybrid vector &amp; aesthetic semantic search (Zero &ldquo;No Results&rdquo; drop-offs)
            </span>
          </div>
        </div>

        {/* Step 2: Kinetic Neural Scanner Center */}
        <div className="ai-vision-center-col">
          <div className="ai-scanner-box">
            <div className="ai-scanner-header">
              <Scan size={14} className="text-orange-600 animate-pulse" />
              <span>Multimodal Vision Analyzer</span>
            </div>

            <div className="ai-metrics-stack">
              <div className="ai-metric-item">
                <div className="ai-metric-label">
                  <SunMedium size={13} className="text-amber-500" />
                  <span>Ambient Light</span>
                </div>
                <span className={cn("ai-metric-value", isAnalyzing && "is-blurring")}>
                  {activePreset.lighting}
                </span>
              </div>

              <div className="ai-metric-item">
                <div className="ai-metric-label">
                  <Compass size={13} className="text-blue-400" />
                  <span>Color Temp</span>
                </div>
                <span className={cn("ai-metric-value", isAnalyzing && "is-blurring")}>
                  {activePreset.temperature}
                </span>
              </div>

              <div className="ai-metric-item">
                <div className="ai-metric-label">
                  <Palette size={13} className="text-emerald-500" />
                  <span>Surface Palette</span>
                </div>
                <div className="ai-palette-dots">
                  {activePreset.palette.map((color, i) => (
                    <span
                      key={i}
                      className="ai-swatch-circle"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="ai-scan-bar">
              <div className={cn("ai-scan-progress", isAnalyzing && "is-running")} />
            </div>
          </div>
        </div>

        {/* Step 3: Curated Recommendation Output */}
        <div className="ai-vision-right-col">
          <div className="ai-col-header">
            <span className="ai-col-step">02 · Autonomous Recommendation</span>
            <h4>Tailored Aesthetic Match</h4>
          </div>

          <div className="ai-recommendation-card">
            <div className="ai-rec-image-wrap">
              <Image
                src={activePreset.recommendation.image}
                alt={activePreset.recommendation.title}
                fill
                className="ai-rec-image"
                sizes="300px"
              />
              <div className="ai-match-badge">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>{activePreset.recommendation.matchScore} Aesthetic Match</span>
              </div>
            </div>

            <div className="ai-rec-info">
              <span className="ai-rec-cat">{activePreset.recommendation.category}</span>
              <h5 className="ai-rec-title">{activePreset.recommendation.title}</h5>
              <p className="ai-rec-desc">{activePreset.recommendation.why}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
