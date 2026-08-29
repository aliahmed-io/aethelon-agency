"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { Project } from "../../../../shared/projects";

type FilterCategory = "all" | "fullstack" | "design" | "interactive" | "ai";

interface FilterTab {
  id: FilterCategory;
  label: string;
  count: number;
}

export default function WorkArchiveIsland({
  projects,
}: {
  projects: readonly Project[];
}) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const filterTabs: readonly FilterTab[] = useMemo(() => {
    return [
      { id: "all", label: "All Works", count: projects.length },
      {
        id: "fullstack",
        label: "Full-Stack Platforms",
        count: projects.filter((p) => p.tier === "flagship" || p.tier === "fullstack").length,
      },
      {
        id: "design",
        label: "Design Studies",
        count: projects.filter((p) => p.tier === "design").length,
      },
      {
        id: "interactive",
        label: "3D & Interactive",
        count: projects.filter(
          (p) =>
            p.service.includes("3D") ||
            p.stack.includes("Three.js") ||
            p.stack.includes("WebGL") ||
            p.slug === "in-your-space"
        ).length,
      },
      {
        id: "ai",
        label: "AI & Discovery",
        count: projects.filter(
          (p) =>
            p.service.includes("AI") ||
            p.stack.includes("Gemini") ||
            p.slug === "novexa-product-commerce" ||
            p.slug === "oakwell-furniture-commerce"
        ).length,
      },
    ];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "fullstack") {
        return project.tier === "flagship" || project.tier === "fullstack";
      }
      if (activeFilter === "design") {
        return project.tier === "design";
      }
      if (activeFilter === "interactive") {
        return (
          project.service.includes("3D") ||
          project.stack.includes("Three.js") ||
          project.stack.includes("WebGL") ||
          project.slug === "in-your-space"
        );
      }
      if (activeFilter === "ai") {
        return (
          project.service.includes("AI") ||
          project.stack.includes("Gemini") ||
          project.slug === "novexa-product-commerce" ||
          project.slug === "oakwell-furniture-commerce"
        );
      }
      return true;
    });
  }, [projects, activeFilter]);

  return (
    <div className="unified-archive-wrapper">
      {/* Single Unified Filter Rail */}
      <div className="unified-filter-rail" role="tablist" aria-label="Filter portfolio by category">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeFilter === tab.id}
            className={`unified-filter-pill ${activeFilter === tab.id ? "active" : ""}`}
            onClick={() => setActiveFilter(tab.id)}
          >
            {tab.label}
            <span className="pill-count">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Result Status Note */}
      <div className="archive-results-status">
        <span>
          Showing <strong>{filteredProjects.length}</strong> of {projects.length} projects
          {activeFilter !== "all" && " · filtered view"}
        </span>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="empty-filter">
          <span className="signal-dot" />
          <h2>No projects found in this category.</h2>
          <p>Reset the filter to view the complete collection.</p>
          <button
            type="button"
            className="text-link"
            onClick={() => setActiveFilter("all")}
          >
            Reset filter <ArrowDownRight size={16} aria-hidden="true" />
          </button>
        </div>
      ) : (
        /* Unified Projects Grid */
        <div className="portfolio-archive-grid">
          {filteredProjects.map((project) => {
            const isFullstack = project.tier === "flagship" || project.tier === "fullstack";

            return (
              <Link
                key={project.slug}
                prefetch={false}
                href={`/work/${project.slug}`}
                className={`portfolio-card ${isFullstack ? "fullstack-type" : "design-type"}`}
              >
                <div className="portfolio-card-media">
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${project.subtitle}`}
                    fill
                    unoptimized
                    sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="cover-image"
                  />
                  <span className="portfolio-card-badge">{project.industry}</span>
                  <span className="portfolio-card-hover-arrow">
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </div>

                <div className="portfolio-card-body">
                  <div className="portfolio-card-header">
                    <span className="project-number">{project.number}</span>
                    <div>
                      <h3>{project.title}</h3>
                      <p className="portfolio-card-subtitle">{project.subtitle}</p>
                    </div>
                  </div>

                  <p className="portfolio-card-description">{project.description}</p>

                  <div className="portfolio-card-footer">
                    <span className="portfolio-card-stack">{project.stack}</span>
                    {project.focus && (
                      <span className="portfolio-card-focus">{project.focus}</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
