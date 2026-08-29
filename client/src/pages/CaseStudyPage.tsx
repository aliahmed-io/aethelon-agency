import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { getProject, projects, type Project } from "../../../shared/projects";
import CaseStudySpecsModal from "../components/islands/CaseStudySpecsModal";
import CaseStatsCards from "../components/islands/CaseStatsCards";
import CaseNarrativeVisualizer from "../components/islands/CaseNarrativeVisualizer";

export default function CaseStudyPage({ slug }: { slug: string }) {
  const project = getProject(slug);

  if (!project) return null;

  // Find next project in circular sequence
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length] ?? projects[0]!;
  
  const relatedProjects = projects
    .filter((p) => p.slug !== slug && (p.tier === project.tier || p.industry === project.industry || p.service === project.service))
    .slice(0, 2);

  const fallbackRelated = relatedProjects.length >= 2 
    ? relatedProjects 
    : projects.filter((p) => p.slug !== slug).slice(0, 2);

  const devNote = project.developerNote || {
    note: "Our primary mission on this build was engineering a seamless commerce layer that eliminated the friction between bespoke high-ticket craft and automated checkout, delivering measurable revenue velocity with zero drop-off.",
    author: "Lead Systems Architect & Product Engineer",
    role: "Commerce Studio",
  };

  return (
    <main className="case-study-root">
      {/* =========================================================================
          SECTION 1: CLEAN EDITORIAL HERO WITH DIGITAL FLAGSHIP SHOWCASE IMAGE
         ========================================================================= */}
      <section className="case-hero-clean-section section-pad" id="hero">
        <div className="case-hero-nav-row">
          <Link href="/work" className="case-back-link">
            ← Back to portfolio
          </Link>
          <span className="case-client-brand">{project.client} · {project.year}</span>
        </div>

        <div className="case-hero-heading-block">
          <h1 className="case-hero-title">{project.title}</h1>
          <p className="case-hero-subtitle">{project.subtitle}</p>
        </div>

        {/* Large Cinematic Digital Flagship Hero Image */}
        <div className="case-hero-cinematic-frame">
          <Image
            src={project.image}
            alt={`${project.title} digital flagship interface`}
            fill
            sizes="(max-width: 1200px) 100vw, 92vw"
            priority
            unoptimized
            className="cover-image"
          />
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: EDITORIAL DESCRIPTION & "READ MORE" SPECIFICATIONS MODAL
         ========================================================================= */}
      <section className="case-summary-clean-section section-pad" id="overview">
        <div className="summary-clean-grid">
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
            </div>
          </div>

          <div className="summary-body-col">
            <p className="summary-context-paragraph">{project.context}</p>
            <p className="summary-desc-paragraph">{project.description}</p>
            
            {/* Read More Detailed Specifications Trigger */}
            <div className="summary-readmore-wrapper">
              <CaseStudySpecsModal project={project} />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: MAIN WINS & STATS IN ANIMATED TILTED CARD DECK (IMAGE 1)
         ========================================================================= */}
      <section className="case-stats-section section-pad" id="wins">
        <CaseStatsCards metrics={project.metrics} title={project.title} />
      </section>

      {/* =========================================================================
          SECTION 4: DEVELOPER & STUDIO ARCHITECTURAL COMMENTARY
         ========================================================================= */}
      <section className="case-architect-note-section section-pad" id="commentary">
        <div className="architect-note-container">
          <span className="note-eyebrow">Studio Commentary &amp; Architectural Reflection</span>
          
          <blockquote className="architect-quote-text">
            “{devNote.note}”
          </blockquote>

          <div className="architect-signature-row">
            <div className="architect-profile">
              <strong>{devNote.author}</strong>
              <span>{devNote.role} · Execution Lead</span>
            </div>
            <div className="architect-stamp">
              <span>Verified Production Architecture</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: ARCHITECTURE, ENGINEERING & ROLLOUT (IMAGE 2 ANNOTATIONS)
         ========================================================================= */}
      <section className="case-visualizer-section section-pad" id="architecture">
        <CaseNarrativeVisualizer project={project} />
      </section>

      {/* =========================================================================
          SECTION 6: NEXT CASE STUDY & RELATED PLATFORMS
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
              unoptimized
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
                    unoptimized
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

      {/* Direct Discovery Call Banner */}
      <section className="case-conversion-banner section-pad">
        <div className="case-conversion-box">
          <div className="conversion-copy">
            <span className="conversion-kicker">Direct Senior Execution</span>
            <h2>Ready to engineer your next digital flagship?</h2>
            <p>
              Let&apos;s discuss your commercial architecture, custom 3D configurator, or full-stack migration. Fixed-scope sprint delivery with zero agency bloat.
            </p>
          </div>
          <div className="conversion-actions">
            <Link href="/contact" className="button button-dark conversion-btn">
              Start a Discovery Call <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/services" className="text-link conversion-link">
              Explore capabilities &amp; pricing <ArrowDownRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
