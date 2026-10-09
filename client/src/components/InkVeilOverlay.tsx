"use client";

import React from "react";

export const GRID_COLS = 14;
export const GRID_ROWS = 9;
export const TOTAL_TILES = GRID_COLS * GRID_ROWS;
export const WIPE_SPEED_MS = 340;
export const HOLD_DURATION_MS = 380;
export const JITTER_RATIO = 0.36;

export type WavePattern = "center-out" | "edge-in" | "diagonal" | "pure-random";

/**
 * Exact Radial Wave Sequencer from Inkfish Grid Dissolve:
 * Calculates Euclidean distance from center (aspect-ratio corrected)
 * and injects controlled stochastic jitter (0.36) so the center disc
 * consolidates first while outer edges stagger in organically.
 */
export function generateRadialWaveIndices(
  cols = GRID_COLS,
  rows = GRID_ROWS,
  pattern: WavePattern = "center-out",
  jitterRatio = JITTER_RATIO
): number[] {
  const totalTiles = cols * rows;
  const cx = (cols - 1) / 2;
  const cy = (rows - 1) / 2;

  const aspect =
    typeof window !== "undefined" && window.innerWidth && window.innerHeight
      ? window.innerWidth / window.innerHeight
      : 16 / 9;

  const cellW = 1.0 * aspect;
  const cellH = 1.0;
  const maxDist = Math.hypot(cx * cellW, cy * cellH);

  const scoredTiles: Array<{ index: number; score: number }> = [];

  for (let i = 0; i < totalTiles; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;

    let baseNormalized = 0;

    if (pattern === "center-out") {
      const dist = Math.hypot((c - cx) * cellW, (r - cy) * cellH);
      baseNormalized = maxDist > 0 ? dist / maxDist : 0;
    } else if (pattern === "edge-in") {
      const dist = Math.hypot((c - cx) * cellW, (r - cy) * cellH);
      baseNormalized = maxDist > 0 ? 1 - dist / maxDist : 0;
    } else if (pattern === "diagonal") {
      baseNormalized = (r + c) / (rows + cols - 2);
    } else {
      baseNormalized = Math.random();
    }

    const jitter = (Math.random() - 0.5) * 2;
    const finalScore = Math.max(0, Math.min(1.05, baseNormalized + jitter * jitterRatio * 0.45));

    scoredTiles.push({ index: i, score: finalScore });
  }

  scoredTiles.sort((a, b) => a.score - b.score);
  return scoredTiles.map((item) => item.index);
}

interface InkVeilOverlayProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  tileRefs: React.MutableRefObject<Array<HTMLDivElement | null>>;
  hudRef: React.RefObject<HTMLDivElement | null>;
  indexTextRef: React.RefObject<HTMLSpanElement | null>;
  subtitleTextRef: React.RefObject<HTMLSpanElement | null>;
  titleTextRef: React.RefObject<HTMLSpanElement | null>;
}

export default function InkVeilOverlay({
  containerRef,
  tileRefs,
  hudRef,
  indexTextRef,
  subtitleTextRef,
  titleTextRef,
}: InkVeilOverlayProps) {
  return (
    <div
      id="transition-grid-container"
      ref={containerRef}
      className="ink-veil-container"
      aria-hidden="true"
    >
      {/* 1. Dedicated 14x9 Radial Dissolve Tile Grid */}
      <div
        className="grid-dissolve-stage"
        style={{
          gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
        }}
      >
        {Array.from({ length: TOTAL_TILES }, (_, i) => (
          <div
            key={i}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            className="grid-tile"
          />
        ))}
      </div>

      {/* 2. Subtle Architectural Film Grain */}
      <div className="grid-dissolve-grain" />

      {/* 3. Centered Editorial Route HUD on Top Layer */}
      <div ref={hudRef} className="grid-dissolve-hud">
        <div className="grid-dissolve-badge">
          <span className="grid-dissolve-dot-indicator" />
          <span ref={indexTextRef} className="grid-dissolve-idx">
            [01]
          </span>
          <span className="grid-dissolve-sep">//</span>
          <span ref={subtitleTextRef} className="grid-dissolve-sub">
            PRODUCTION ARCHIVE
          </span>
        </div>

        <div className="grid-dissolve-title-mask">
          <h2 className="grid-dissolve-title">
            <span ref={titleTextRef}>Selected Work</span>
            <span className="grid-dissolve-period">.</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
