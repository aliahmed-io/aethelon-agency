import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { insightIndex, insightTopics } from "../lib/insight-index";
import InsightsArchiveIsland from "../components/islands/InsightsArchiveIsland";
import NewsletterForm from "../components/islands/NewsletterForm";

function SectionLabel({ children, index }: { children: React.ReactNode; index?: string }) {
  return (
    <div className="section-label">
      <span>{index || ""}</span>
      <span>{children}</span>
      <span className="label-line" />
    </div>
  );
}

export default function InsightsPage() {
  return (
    <main className="inner-page insights-page">
      <div className="inner-hero knowledge-hero">
        <SectionLabel index="05">Knowledge / field notes</SectionLabel>
        <h1>
          Useful notes<br />
          for <em>better commerce.</em>
        </h1>
        <p>
          Evidence-backed thinking on the systems that make an ecommerce business easier to choose, easier to run, and
          easier to grow.
        </p>
        <div className="knowledge-hero-meta">
          <span>
            <b>{insightIndex.length}</b> notes in the archive
          </span>
          <span>
            <b>2026</b> editorial series
          </span>
          <span>
            <b>01</b> honest source rule
          </span>
        </div>
      </div>

      <InsightsArchiveIsland insightIndex={insightIndex} insightTopics={insightTopics} />

      <section className="seo-plan-preview">
        <div>
          <SectionLabel index="05—B">The growth layer</SectionLabel>
          <h2>
            SEO is the system<br />
            <em>behind the signal.</em>
          </h2>
        </div>
        <div>
          <p>
            A practical plan for turning the knowledge hub, commerce routes, and product data into a clearer search
            surface—without promising rankings we have not measured.
          </p>
          <Link href="/insights/seo-for-commerce-that-compounds" className="text-link">
            Read the SEO note <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="newsletter">
        <div>
          <span className="eyebrow">
            <span className="signal-dot" /> One useful note, occasionally
          </span>
          <h2>
            No noise.<br />
            <em>Just signal.</em>
          </h2>
        </div>
        <div>
          <p>Join the small list for practical commerce thinking, not a weekly content treadmill.</p>
          <NewsletterForm />
        </div>
      </div>
    </main>
  );
}
