import type { CSSProperties } from "react";
import type { ProjectMetric } from "../../../../shared/projects";

const tiltAngles = ["-3.5deg", "0deg", "3.5deg", "-1.5deg"];

export default function CaseStatsCards({
  metrics,
}: {
  metrics: readonly ProjectMetric[];
  title: string;
}) {
  return (
    <section className="stats-card-deck-section" aria-label="Main wins and quantitative performance">
      <div className="stats-deck-header">
        <span className="stats-deck-eyebrow">Main Outcomes &amp; Performance</span>
        <h2>Quantitative business impact</h2>
      </div>

      <div className="stats-card-deck-container">
        {metrics.slice(0, 4).map((metric, idx) => {
          const defaultTilt = tiltAngles[idx % tiltAngles.length] || "0deg";

          return (
            <div
              key={metric.label + idx}
              className="tilted-stat-card"
              style={
                {
                  transform: `translateY(0px) scale(1) rotate(${defaultTilt})`,
                  zIndex: idx === 1 ? 5 : 2,
                } as CSSProperties
              }
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
