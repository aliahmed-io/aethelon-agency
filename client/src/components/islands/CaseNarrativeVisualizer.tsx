"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Check, AlertTriangle, ShieldCheck } from "lucide-react";
import type { Project } from "../../../../shared/projects";

export default function CaseNarrativeVisualizer({ project }: { project: Project }) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  const showcaseImage =
    project.gallery && project.gallery.length > 1
      ? project.gallery[1]!
      : project.image;

  return (
    <section className="narrative-visualizer-section" aria-label="Architecture, engineering and rollout">
      <div className="narrative-section-header">
        <span className="narrative-eyebrow">Strategic Architecture &amp; Execution</span>
        <h2>Architecture, engineering &amp; rollout</h2>
        <p className="narrative-header-lead">
          How we navigated legacy constraints, engineered bespoke commerce layers, and delivered verified outcomes.
        </p>
      </div>

      <div className="visualizer-stage-wrapper">
        {/* Central Visual Anchor Image */}
        <div className="visualizer-image-frame">
          <Image
            src={showcaseImage}
            alt={`${project.title} digital storefront architecture preview`}
            fill
            sizes="(max-width: 1024px) 100vw, 85vw"
            unoptimized
            className="cover-image"
          />
          <div className="visualizer-image-tint" />
        </div>

        {/* 01: Top-Left Floating Card (The Bottleneck) */}
        <div
          className={`floating-annotation-card card-top-left aethelon-paper-card ${
            expandedCard === "bottleneck" ? "expanded" : ""
          }`}
          onClick={() => toggleCard("bottleneck")}
          role="button"
          tabIndex={0}
          aria-expanded={expandedCard === "bottleneck"}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") toggleCard("bottleneck");
          }}
        >
          <div className="annotation-card-top">
            <span className="annotation-eyebrow">When the platform is the bottleneck</span>
            <button
              type="button"
              className="annotation-toggle-btn"
              onClick={(e) => {
                e.stopPropagation();
                toggleCard("bottleneck");
              }}
              aria-label="Toggle bottleneck details"
            >
              {expandedCard === "bottleneck" ? <Minus size={14} /> : <Plus size={14} />}
            </button>
          </div>

          <p className="annotation-body-text">
            {project.narrative.bottleneck.summary}
          </p>

          {expandedCard === "bottleneck" && project.narrative.bottleneck.points && (
            <div className="annotation-expanded-points">
              {project.narrative.bottleneck.points.map((pt, idx) => (
                <div key={idx} className="expanded-point-item">
                  <AlertTriangle size={13} className="point-icon text-signal" aria-hidden="true" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 02: Middle-Right Floating Card (The Architectural Decision) */}
        <div
          className={`floating-annotation-card card-mid-right aethelon-ink-card ${
            expandedCard === "decision" ? "expanded" : ""
          }`}
          onClick={() => toggleCard("decision")}
          role="button"
          tabIndex={0}
          aria-expanded={expandedCard === "decision"}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") toggleCard("decision");
          }}
        >
          <div className="annotation-card-top">
            <span className="annotation-eyebrow">The Architectural Decision</span>
            <button
              type="button"
              className="annotation-toggle-btn"
              onClick={(e) => {
                e.stopPropagation();
                toggleCard("decision");
              }}
              aria-label="Toggle decision details"
            >
              {expandedCard === "decision" ? <Minus size={14} /> : <Plus size={14} />}
            </button>
          </div>

          <p className="annotation-body-text">
            {project.narrative.decision.summary}
          </p>

          {expandedCard === "decision" && project.narrative.decision.points && (
            <div className="annotation-expanded-points">
              {project.narrative.decision.points.map((pt, idx) => (
                <div key={idx} className="expanded-point-item">
                  <Check size={13} className="point-icon text-signal" aria-hidden="true" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 03: Bottom-Left Floating Card (Execution & Telemetry) */}
        <div
          className={`floating-annotation-card card-bottom-left aethelon-paper-card ${
            expandedCard === "rollout" ? "expanded" : ""
          }`}
          onClick={() => toggleCard("rollout")}
          role="button"
          tabIndex={0}
          aria-expanded={expandedCard === "rollout"}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") toggleCard("rollout");
          }}
        >
          <div className="annotation-card-top">
            <span className="annotation-eyebrow">Execution &amp; Production Telemetry</span>
            <button
              type="button"
              className="annotation-toggle-btn"
              onClick={(e) => {
                e.stopPropagation();
                toggleCard("rollout");
              }}
              aria-label="Toggle rollout details"
            >
              {expandedCard === "rollout" ? <Minus size={14} /> : <Plus size={14} />}
            </button>
          </div>

          <p className="annotation-body-text">
            {project.narrative.rollout.summary}
          </p>

          {expandedCard === "rollout" && project.narrative.rollout.stats && (
            <div className="annotation-expanded-points">
              {project.narrative.rollout.stats.map((st, idx) => (
                <div key={idx} className="expanded-point-item">
                  <ShieldCheck size={13} className="point-icon text-signal" aria-hidden="true" />
                  <span>{st}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
