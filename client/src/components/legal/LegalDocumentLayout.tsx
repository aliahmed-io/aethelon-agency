import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LegalSection {
  id: string;
  title: string;
  kicker?: string;
  content: React.ReactNode;
}

interface LegalDocumentLayoutProps {
  kicker: string;
  title: string;
  deck: string;
  effectiveDate: string;
  version: string;
  sections: readonly LegalSection[];
  className?: string;
}

export function LegalDocumentLayout({
  kicker,
  title,
  deck,
  effectiveDate,
  version,
  sections,
  className,
}: LegalDocumentLayoutProps) {
  return (
    <article className={cn("legal-page-wrap", className)}>
      <div className="legal-container">
        
        {/* Navigation Breadcrumb */}
        <div className="legal-breadcrumb-row">
          <Link href="/" className="legal-back-link">
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Return to Studio</span>
          </Link>
        </div>

        {/* Hero Section */}
        <header className="legal-header">
          <div className="legal-kicker-row">
            <span className="legal-kicker-badge">{kicker}</span>
            <span className="legal-version-badge">v{version}</span>
          </div>

          <h1 className="legal-title">
            {title}
            <span className="legal-accent-dot">.</span>
          </h1>

          <p className="legal-deck">{deck}</p>

          {/* Document Metadata Bar */}
          <div className="legal-meta-strip">
            <div className="legal-meta-col">
              <span className="legal-meta-label">Effective Date</span>
              <span className="legal-meta-val">{effectiveDate}</span>
            </div>
            <div className="legal-meta-col">
              <span className="legal-meta-label">Applicability</span>
              <span className="legal-meta-val">Global Client Engagements</span>
            </div>
            <div className="legal-meta-col">
              <span className="legal-meta-label">Controller / Entity</span>
              <span className="legal-meta-val">Aethelon Commerce Studio</span>
            </div>
            <div className="legal-meta-col">
              <span className="legal-meta-label">Direct Contact</span>
              <a href="mailto:legal@aethelon.com" className="legal-meta-val legal-email-link">
                legal@aethelon.com
              </a>
            </div>
          </div>
        </header>

        {/* Main Content Layout with Sticky Table of Contents */}
        <div className="legal-body-grid">
          
          {/* Aside: Sticky TOC on Desktop */}
          <aside className="legal-sidebar" aria-label="Table of contents">
            <div className="legal-toc-card">
              <div className="legal-toc-header">
                <ShieldCheck size={16} className="text-orange" aria-hidden="true" />
                <span>Document Contents</span>
              </div>
              <nav className="legal-toc-nav">
                <ol className="legal-toc-list">
                  {sections.map((section, idx) => (
                    <li key={section.id} className="legal-toc-item">
                      <a href={`#${section.id}`} className="legal-toc-link">
                        <span className="legal-toc-num">{String(idx + 1).padStart(2, "0")}</span>
                        <span className="legal-toc-title">{section.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="legal-toc-contact">
                <p>Need clarification on specific clauses?</p>
                <Link href="/contact" className="legal-toc-btn">
                  <span>Speak with technical lead</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Sections Stream */}
          <main className="legal-content-stream">
            {sections.map((section, idx) => (
              <section
                key={section.id}
                id={section.id}
                className="legal-section-block"
              >
                <div className="legal-section-header">
                  <span className="legal-section-kicker">
                    Article {String(idx + 1).padStart(2, "0")} {section.kicker ? `// ${section.kicker}` : ""}
                  </span>
                  <h2 className="legal-section-title">{section.title}</h2>
                </div>
                <div className="legal-section-body">
                  {section.content}
                </div>
              </section>
            ))}

            {/* Bottom Support Callout */}
            <div className="legal-support-card">
              <div className="legal-support-copy">
                <h3>Committed to Transparency &amp; Mutual Trust.</h3>
                <p>
                  Every engagement at Aethelon is governed by written, milestone-based specifications.
                  If you require custom enterprise terms, data processing addenda (DPA), or NDA review prior
                  to discovery, reach out directly.
                </p>
              </div>
              <Link href="/contact" className="button button-dark">
                <span>Contact legal &amp; studio team</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </main>

        </div>

      </div>
    </article>
  );
}

export default LegalDocumentLayout;
