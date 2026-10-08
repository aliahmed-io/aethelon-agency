import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowDownRight, Layers, Clock, ShieldCheck, Zap } from "lucide-react";
import { getProject, projects, type Project } from "../../../shared/projects";
import CaseStatsCards from "../components/islands/CaseStatsCards";
import FlagshipConversionSection from "../components/islands/FlagshipConversionSection";

export default function CaseStudyPage({ slug }: { slug: string }) {
  const project = getProject(slug);

  if (!project) return null;

  // Find next project in circular sequence
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length] ?? projects[0]!;

  const relatedProjects = projects
    .filter(
      (p) =>
        p.slug !== slug &&
        (p.tier === project.tier || p.industry === project.industry || p.service === project.service)
    )
    .slice(0, 2);

  const fallbackRelated =
    relatedProjects.length >= 2
      ? relatedProjects
      : projects.filter((p) => p.slug !== slug).slice(0, 2);

  const galleryImages =
    project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];

  const primaryShowcase = galleryImages[0] ?? project.image;
  const secondaryGallery = galleryImages.slice(1, 5);

  return (
    <main className="case-study-root">
      {/* =========================================================================
          1. EDITORIAL HERO
         ========================================================================= */}
      <section className="case-hero-clean-section section-pad" id="hero">
        <div className="case-hero-nav-row">
          <Link href="/work" className="case-back-link">
            ← Back to portfolio
          </Link>
          <span className="case-client-brand">
            {project.number ? `${project.number} · ` : ""}{project.client} · {project.year}
          </span>
        </div>

        <div className="case-hero-heading-block">
          <h1 className="case-hero-title">{project.title}</h1>
          <p className="case-hero-subtitle">{project.subtitle}</p>
        </div>

        {/* Cinematic Main Interface Mockup */}
        <div className="case-hero-cinematic-frame">
          <Image
            src={primaryShowcase}
            alt={`${project.title} digital flagship interface`}
            fill
            sizes="(max-width: 1200px) 100vw, 92vw"
            priority
            className="cover-image"
          />
        </div>
      </section>

      {/* =========================================================================
          2. CLEAN PROJECT BRIEF (NO JARGON / NO UNNECESSARY MODALS)
         ========================================================================= */}
      <section className="case-summary-clean-section section-pad" id="overview">
        <div className="summary-clean-grid">
          {/* Metadata Column */}
          <div className="summary-meta-col">
            <span className="summary-eyebrow">Project Overview</span>
            <h2 className="summary-lead-heading">{project.thesis}</h2>

            <div className="summary-quick-facts">
              <div>
                <span className="fact-label">Industry</span>
                <strong className="fact-val">{project.industry}</strong>
              </div>
              <div>
                <span className="fact-label">Scope</span>
                <strong className="fact-val">{project.scope}</strong>
              </div>
              <div>
                <span className="fact-label">Timeline</span>
                <strong className="fact-val">{project.timeline}</strong>
              </div>
              <div>
                <span className="fact-label">Tech Stack</span>
                <strong className="fact-val fact-stack">{project.stack}</strong>
              </div>
            </div>
          </div>

          {/* Narrative Column: Clean Context & Solution */}
          <div className="summary-body-col">
            <div className="summary-narrative-block">
              <span className="narrative-kicker">The Challenge</span>
              <p className="summary-context-paragraph">{project.context}</p>
            </div>

            <div className="summary-narrative-block">
              <span className="narrative-kicker">The Execution</span>
              <p className="summary-desc-paragraph">{project.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. KEY QUANTITATIVE OUTCOMES & PERFORMANCE
         ========================================================================= */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="case-stats-section section-pad" id="wins">
          <CaseStatsCards metrics={project.metrics} title={project.title} />
        </section>
      )}

      {/* =========================================================================
          4. VISUAL CRAFT & ARCHITECTURAL SHOWCASE GALLERY
         ========================================================================= */}
      {secondaryGallery.length > 0 && (
        <section className="case-gallery-section section-pad" id="gallery">
          <div className="gallery-section-header">
            <span className="gallery-eyebrow">Visual Craft &amp; Interaction</span>
            <h2>Interface &amp; systems gallery</h2>
            <p>Every detail engineered for performance, precision typography, and intuitive customer feel.</p>
          </div>

          <div className="case-gallery-grid">
            {secondaryGallery.map((imgSrc, idx) => (
              <div
                key={imgSrc + idx}
                className={`case-gallery-item ${
                  idx === 0 && secondaryGallery.length % 2 !== 0 ? "item-full-width" : ""
                }`}
              >
                <div className="gallery-image-wrapper">
                  <Image
                    src={imgSrc}
                    alt={`${project.title} design showcase ${idx + 1}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 48vw"
                    className="cover-image"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          5. AUTHENTIC CLIENT OUTCOME / TESTIMONIAL QUOTE
         ========================================================================= */}
      {project.quote && project.quote.quote && (
        <section className="case-quote-section section-pad" id="quote">
          <div className="case-quote-container">
            <span className="quote-eyebrow">Client Reflection</span>
            <blockquote className="case-quote-text">
              “{project.quote.quote}”
            </blockquote>
            <div className="case-quote-author">
              <strong>{project.quote.author}</strong>
              <span>
                {project.quote.role} · {project.quote.company}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          6. NEXT CASE STUDY TRANSITION
         ========================================================================= */}
      <section className="case-next-project-section section-pad" id="next">
        <div className="next-project-intro">
          <span className="next-eyebrow">Continue Exploring</span>
          <h2>Next case study</h2>
        </div>

        <Link href={`/work/${nextProject.slug}`} className="next-project-card">
          <div className="next-project-media">
            <Image
              src={nextProject.image}
              alt={`${nextProject.title} — ${nextProject.subtitle}`}
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              className="cover-image"
            />
          </div>
          <div className="next-project-info">
            <span className="next-industry">{nextProject.industry}</span>
            <h3>{nextProject.title}</h3>
            <p className="next-subtitle">{nextProject.subtitle}</p>
            <p className="next-description">{nextProject.description}</p>
            <div className="next-cta-row">
              <span className="button button-dark">
                View Case Study <ArrowUpRight size={15} aria-hidden="true" />
              </span>
              <span className="next-stack-text">{nextProject.stack}</span>
            </div>
          </div>
        </Link>

        {/* Related Case Studies Grid */}
        <div className="related-projects-container">
          <div className="related-grid-header">
            <h3>Related Digital Flagships</h3>
            <Link href="/work" className="text-link">
              View All Projects <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="related-projects-grid">
            {fallbackRelated.map((rel) => (
              <Link key={rel.slug} href={`/work/${rel.slug}`} className="related-card">
                <div className="related-card-media">
                  <Image
                    src={rel.image}
                    alt={rel.title}
                    fill
                    sizes="(max-width: 760px) 100vw, 45vw"
                    className="cover-image"
                  />
                  <span className="related-badge">{rel.industry}</span>
                </div>
                <div className="related-card-content">
                  <div className="related-top-row">
                    <span className="project-number">{rel.number}</span>
                    <h4>{rel.title}</h4>
                  </div>
                  <p>{rel.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. DIRECT ENGAGEMENT & EMAIL INTAKE CARD
         ========================================================================= */}
      <FlagshipConversionSection />
    </main>
  );
}
