"use client";

import { useState } from "react";
import type { ProjectMetric } from "../../../../shared/projects";

const tiltAngles = ["-3.5deg", "0deg", "3.5deg", "-1.5deg"];

export default function CaseStatsCards({
  metrics,
  title,
}: {
  metrics: readonly ProjectMetric[];
  title: string;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="stats-card-deck-section" aria-label="Main wins and quantitative performance">
      <div className="stats-deck-header">
        <span className="stats-deck-eyebrow">Main Outcomes &amp; Performance</span>
        <h2>Quantitative business impact</h2>
      </div>

      <div className="stats-card-deck-container">
        {metrics.slice(0, 4).map((metric, idx) => {
          const defaultTilt = tiltAngles[idx % tiltAngles.length] || "0deg";
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={metric.label + idx}
              className={`tilted-stat-card ${isHovered ? "hovered" : ""}`}
              style={{
                transform: isHovered
                  ? "translateY(-12px) scale(1.03) rotate(0deg)"
                  : `translateY(0px) scale(1) rotate(${defaultTilt})`,
                zIndex: isHovered ? 10 : idx === 1 ? 5 : 2,
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Giant Top Display Number */}
              <div className="stat-card-top">
                <span className="stat-giant-num">{metric.value}</span>
              </div>

              {/* Bottom Label & Detail */}
              <div className="stat-card-bottom">
                <strong className="stat-primary-label">{metric.label}</strong>
                {metric.detail && <p className="stat-detail-text">{metric.detail}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
