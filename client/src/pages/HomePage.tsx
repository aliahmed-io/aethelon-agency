import Link from "next/link";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { getFlagshipProject, getFullstackProjects, getDesignProjects, projects } from "../../../shared/projects";
import ServicesAccordion from "../components/islands/ServicesAccordion";
import ProductDemo from "../components/islands/ProductDemo";
import FaqAccordion from "../components/islands/FaqAccordion";
import HeroCommerceEcosystem from "../components/islands/HeroCommerceEcosystem";
import FlagshipShowcaseIsland from "../components/islands/FlagshipShowcaseIsland";
import WorkArchiveIsland from "../components/islands/WorkArchiveIsland";

const flagship = getFlagshipProject();
const fullstackProjects = getFullstackProjects();
const designProjects = getDesignProjects();

const capabilities = [
  [
    "01",
    "Ecommerce Development",
    "Custom storefronts, catalog architecture, cart drawers, checkout integration, and inventory flows.",
    [
      "Custom Next.js & headless storefronts",
      "Cart drawers & instant checkout flows",
      "Product variant matrices & stock sync",
      "Stripe & merchant payment integrations",
    ],
  ],
  [
    "02",
    "Full-Stack Web Applications",
    "Custom web applications, databases, APIs, authentication, dashboards, and internal business tools.",
    [
      "Admin portals & inventory dashboards",
      "PostgreSQL & Prisma database schemas",
      "Secure authentication & session flows",
      "Custom REST & Server Action APIs",
    ],
  ],
  [
    "03",
    "AI & Search Integrations",
    "Natural language product search, intelligent filtering, and automated routine builders.",
    [
      "Semantic product discovery",
      "Guided recommendation step-flows",
      "Automated catalog categorization",
      "Customer decision-support flows",
    ],
  ],
  [
    "04",
    "Interactive & 3D Experiences",
    "Product configurators, 3D viewers, and interactive storytelling where it genuinely helps the sale.",
    [
      "Interactive 3D product inspection",
      "Material finish & color customizers",
      "Lightweight WebGL product moments",
      "Responsive canvas visualization",
    ],
  ],
] as const;

const faqItems = [
  {
    question: "How do you structure projects and pricing?",
    answer:
      "Projects are scoped around the exact deliverable—whether a complete full-stack storefront, a targeted customizer, or an admin system. Pricing and milestones are established upfront with transparent fixed-scope agreements.",
  },
  {
    question: "Do you work with headless platforms or custom backends?",
    answer:
      "Yes. I build custom Next.js storefronts connected to headless commerce engines (Shopify, Stripe, Medusa) as well as bespoke full-stack applications with PostgreSQL, Prisma, and custom admin portals.",
  },
  {
    question: "Can you improve or rebuild an existing storefront?",
    answer:
      "Yes. If an existing store suffers from slow load times, rigid templates, or high cart drop-off, I can redesign and rebuild the frontend while keeping your existing product and order records intact.",
  },
  {
    question: "What does the handoff and post-launch process look like?",
    answer:
      "Every build includes clean TypeScript code, administrative training, and structured deployment on modern infrastructure. Post-launch support and ongoing feature development are available as your business scales.",
  },
] as const;

function SectionLabel({ children, index }: { children: React.ReactNode; index?: string }) {
  return (
    <div className="section-label">
      <span>{index || ""}</span>
      <span>{children}</span>
      <span className="label-line" />
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="signal-dot" /> Freelance Full-Stack Developer
        </div>
        <h1>
          I build custom ecommerce experiences and full-stack web applications.
        </h1>
        <p>
          From high-speed storefronts and interactive configurators to database schemas, checkout endpoints, and custom admin portals. Direct senior execution.
        </p>
        <div className="hero-actions">
          <Link className="button button-dark" href="/contact">
            Start a project <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <a className="text-link" href="#flagship">
            Explore flagship <ArrowDownRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="hero-visual-wrapper">
        <HeroCommerceEcosystem />
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <div className="trust-strip">
      {[
        "Custom Storefronts",
        "Full-Stack Systems",
        "Admin & CMS",
        "Checkout & Payments",
        "Interactive 3D / AI",
        "Direct Communication",
      ].map((item, index) => (
        <span key={item}>
          <b>{String(index + 1).padStart(2, "0")}</b>
          {item}
        </span>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* 01: Arrival & Living Commerce Identity */}
      <Hero />
      <TrustStrip />

      <main>
        {/* 02: Flagship Cinematic Experience */}
        <section className="flagship-section section-pad" id="flagship">
          <div className="section-intro row-intro">
            <SectionLabel index="01">Flagship build</SectionLabel>
            <div>
              <h2>
                Aethelon Modern<br />
                <em>Furniture Platform.</em>
              </h2>
              <p>
                An end-to-end furniture commerce platform engineered with room staging, persistent cart drawer, optimistic item updates, and dedicated administrative management.
              </p>
            </div>
            <Link href="/work" className="text-link">
              View full portfolio <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <FlagshipShowcaseIsland project={flagship} />
        </section>

        {/* 03: Tactile Commerce Interaction Slice */}
        <section className="demo-section">
          <div className="demo-copy">
            <SectionLabel index="02">Tactile commerce standard</SectionLabel>
            <h2>
              Interactive commerce<br />
              <em>architecture.</em>
            </h2>
            <p>
              A live commerce slice demonstrating real-time finish switching, dynamic subtotal calculations, and optimistic cart updates without layout shift.
            </p>
            <span className="demo-note">
              <span className="signal-dot" /> Live interaction slice · Optimistic state handling
            </span>
          </div>
          <ProductDemo />
        </section>

        {/* 04: Scannable Curated Project Archive */}
        <section className="homepage-archive-section section-pad" id="archive">
          <div className="section-intro row-intro">
            <SectionLabel index="03">Curated project archive</SectionLabel>
            <div>
              <h2>
                Selected platforms &<br />
                <em>interface studies.</em>
              </h2>
              <p>
                Compact, dense project archive highlighting full-stack systems, 3D customizers, and editorial conversion flows.
              </p>
            </div>
          </div>

          <WorkArchiveIsland projects={projects} />
        </section>

        {/* 05: Asymmetrical Visual Exhibition (Design Studies) */}
        <section className="design-exhibition-section section-pad">
          <div className="section-intro">
            <SectionLabel index="04">Visual art direction</SectionLabel>
            <h2>
              Commerce lookbooks &<br />
              <em>spatial interfaces.</em>
            </h2>
            <p>
              Focused design studies demonstrating editorial layout hierarchy, ambient day/night modes, and tactile scale visualization.
            </p>
          </div>

          <div className="exhibition-asymmetric-grid">
            <div className="exhibition-item-large">
              <Link href="/work/monolith-audio" className="exhibition-card">
                <div className="exhibition-image-wrap">
                  <Image
                    src="/images/projects/vantiq.png"
                    alt="Vantiq Hypercar 3D Visualization and Sonic Gallery"
                    fill
                    unoptimized
                    sizes="(max-width: 900px) 100vw, 60vw"
                    className="cover-image"
                  />
                  <span className="exhibition-badge">3D & Web Audio · Hypercar</span>
                </div>
                <div className="exhibition-meta">
                  <h3>Vantiq</h3>
                  <p>Hypercar 3D Anatomy Deconstruction & Real-Time Sonic Waveform Visualizer</p>
                </div>
              </Link>
            </div>

            <div className="exhibition-col-pair">
              <Link href="/work/in-your-space" className="exhibition-card">
                <div className="exhibition-image-wrap">
                  <Image
                    src="/images/projects/vonex.png"
                    alt="Vonex Brutalist Techwear Luxury"
                    fill
                    unoptimized
                    sizes="(max-width: 900px) 100vw, 35vw"
                    className="cover-image"
                  />
                  <span className="exhibition-badge">Techwear · Minimalist UI</span>
                </div>
                <div className="exhibition-meta">
                  <h3>Vonex</h3>
                  <p>Brutalist Luxury Streetwear Flagship & Hero Slider</p>
                </div>
              </Link>

              <Link href="/work/afterlight" className="exhibition-card">
                <div className="exhibition-image-wrap">
                  <Image
                    src="/images/projects/maison-lumiere.png"
                    alt="Maison Lumiere High-Jewelry 3D Showroom"
                    fill
                    unoptimized
                    sizes="(max-width: 900px) 100vw, 35vw"
                    className="cover-image"
                  />
                  <span className="exhibition-badge">3D Carousel · Fine Jewelry</span>
                </div>
                <div className="exhibition-meta">
                  <h3>Maison Lumière</h3>
                  <p>High-Jewelry Digital Showroom & 3D Rotating Carousel</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 06: Capabilities Breakdown */}
        <section className="services-preview section-pad">
          <div className="section-intro">
            <SectionLabel index="05">Capabilities</SectionLabel>
            <h2>
              What I build for<br />
              <em>modern brands.</em>
            </h2>
            <p>
              Direct full-stack engineering across the entire commerce journey—from initial customer impression to administrative fulfillment.
            </p>
            <Link href="/services" className="text-link">
              Explore detailed services <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <ServicesAccordion services={capabilities} />
        </section>

        {/* 07: Philosophy & Senior Execution */}
        <section className="split-statement">
          <div className="split-image">
            <Image
              src="/images/aethelon-portfolio-chair.webp"
              alt="Design and development studio space"
              fill
              unoptimized
              sizes="(max-width: 760px) 100vw, 50vw"
              className="cover-image"
            />
          </div>
          <div className="split-copy">
            <SectionLabel index="06">How I work</SectionLabel>
            <h2>
              Direct collaboration.<br />
              <em>Senior execution.</em>
            </h2>
            <p>
              You work directly with the person designing the interface, writing the full-stack code, and shipping the system. No account managers, no junior handoffs, and zero diluted context.
            </p>
            <p>
              This direct model ensures faster iterations, deeper technical context, and a commercially sensible budget.
            </p>
            <Link href="/about" className="text-link">
              Learn about the practice <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* 08: FAQ */}
        <section className="faq section-pad">
          <div className="faq-heading">
            <SectionLabel index="07">Common questions</SectionLabel>
            <h2>
              Before we<br />
              <em>begin.</em>
            </h2>
          </div>
          <FaqAccordion items={faqItems} />
        </section>
      </main>
    </>
  );
}
