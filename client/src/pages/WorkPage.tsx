import { projects, getFlagshipProject } from "../../../shared/projects";
import PortfolioHeroIsland from "../components/islands/PortfolioHeroIsland";
import FlagshipShowcaseIsland from "../components/islands/FlagshipShowcaseIsland";
import WorkArchiveIsland from "../components/islands/WorkArchiveIsland";

const flagship = getFlagshipProject();

function SectionLabel({ children, index }: { children: React.ReactNode; index?: string }) {
  return (
    <div className="section-label">
      <span>{index || ""}</span>
      <span>{children}</span>
      <span className="label-line" />
    </div>
  );
}

export default function WorkPage() {
  return (
    <main className="inner-page portfolio-page">
      {/* 1. Art-Directed Interactive Hero Section with Floating Orbit Cards */}
      <PortfolioHeroIsland />

      {/* 2. Flagship Showcase with Seamless Editorial Transition */}
      <section className="portfolio-highlight-section section-pad" id="flagship">
        <div className="flagship-editorial-header">
          <SectionLabel index="01">Flagship Platform</SectionLabel>
          <div className="flagship-title-group">
            <h2>
              Aethelon Modern<br />
              <em>Furniture Commerce.</em>
            </h2>
            <p>
              An end-to-end headless commerce system engineered with interactive canvas room staging, persistent cart drawer, optimistic item state, and custom administrative management.
            </p>
          </div>
        </div>

        <FlagshipShowcaseIsland project={flagship} />
      </section>

      {/* 3. Archive Section with Unified Single-Tier Filters */}
      <section className="portfolio-archive-section section-pad" id="archive">
        <div className="section-intro">
          <SectionLabel index="02">Curated archive</SectionLabel>
          <h2>
            Explore by<br />
            <em>project category.</em>
          </h2>
          <p>
            Filter the complete project collection by system architecture, interactive focus, or design study.
          </p>
        </div>

        <WorkArchiveIsland projects={projects} />
      </section>
    </main>
  );
}
