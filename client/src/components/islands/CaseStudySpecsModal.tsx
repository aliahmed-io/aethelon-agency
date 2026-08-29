"use client";

import { useState, useEffect } from "react";
import { X, ArrowUpRight, Check, Sparkles, Layers, Cpu, Database, Zap, Terminal } from "lucide-react";
import type { Project } from "../../../../shared/projects";

export default function CaseStudySpecsModal({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="read-more-specs-btn"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span>Read Full Specifications &amp; Architecture</span>
        <span className="btn-arrow">→</span>
      </button>

      {/* Overlay Modal Backdrop */}
      {isOpen && (
        <div
          className="specs-modal-backdrop"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} Detailed Specifications`}
        >
          <div
            className="specs-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="specs-modal-header">
              <div className="modal-title-group">
                <span className="modal-eyebrow">Project Blueprint &amp; System Specifications</span>
                <h2>{project.title}</h2>
                <p className="modal-subtitle">{project.subtitle}</p>
              </div>
              <button
                type="button"
                className="specs-modal-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close specifications dialog"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="specs-modal-body">
              {/* 01: Core Context & Thesis */}
              <div className="modal-section">
                <h3>Executive Summary &amp; Scope</h3>
                <p className="modal-lead-text">{project.thesis}</p>
                <p className="modal-context-text">{project.context}</p>
              </div>

              {/* 02: Metadata Grid */}
              <div className="modal-meta-grid">
                <div className="modal-meta-card">
                  <span className="meta-label">Client</span>
                  <strong>{project.client}</strong>
                </div>
                <div className="modal-meta-card">
                  <span className="meta-label">Industry</span>
                  <strong>{project.industry}</strong>
                </div>
                <div className="modal-meta-card">
                  <span className="meta-label">Timeline</span>
                  <strong>{project.timeline} ({project.year})</strong>
                </div>
                <div className="modal-meta-card">
                  <span className="meta-label">Role</span>
                  <strong>{project.role}</strong>
                </div>
              </div>

              {/* 03: Full Technology Stack */}
              <div className="modal-section">
                <h3>Core Technology Stack</h3>
                <div className="modal-stack-tags">
                  {project.stack.split(" · ").map((tech) => (
                    <span key={tech} className="modal-stack-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 04: Architectural Capabilities Breakdown */}
              {project.capabilities && (
                <div className="modal-section">
                  <h3>Engineered Subsystems</h3>
                  <div className="modal-subsystems-grid">
                    <div className="subsystem-card">
                      <div className="subsystem-title">
                        <Layers size={15} aria-hidden="true" />
                        <strong>Storefront Experience</strong>
                      </div>
                      <p>{project.capabilities.storefront}</p>
                    </div>

                    <div className="subsystem-card">
                      <div className="subsystem-title">
                        <Zap size={15} aria-hidden="true" />
                        <strong>Commerce &amp; Transactions</strong>
                      </div>
                      <p>{project.capabilities.commerce}</p>
                    </div>

                    <div className="subsystem-card">
                      <div className="subsystem-title">
                        <Terminal size={15} aria-hidden="true" />
                        <strong>Operations &amp; Admin Studio</strong>
                      </div>
                      <p>{project.capabilities.admin}</p>
                    </div>

                    <div className="subsystem-card">
                      <div className="subsystem-title">
                        <Sparkles size={15} aria-hidden="true" />
                        <strong>Performance Benchmark</strong>
                      </div>
                      <p>{project.capabilities.highlight}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 05: Critical Engineering Bottleneck */}
              {project.engineeringChallenge && (
                <div className="modal-challenge-box">
                  <span className="challenge-label">Core Technical Bottleneck Solved</span>
                  <p>{project.engineeringChallenge}</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="specs-modal-footer">
              <span className="modal-footer-note">Commerce Studio · Production-Grade Architecture</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="button button-dark modal-done-btn"
              >
                Close Specifications
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
