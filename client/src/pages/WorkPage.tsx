"use client";

// Paper Signal style: editorial archive, warm paper, charcoal ink, signal orange, proof-led layouts.
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { IMG } from "../lib/site-assets";

const projects = [
  { slug: "form-and-function", number: "01", title: "Form & Function", category: "Furniture", industry: "Furniture", service: "Custom E-commerce", description: "A modular furniture storefront concept built around browsing by room, material, and intent.", stack: "Next.js · Shopify · TypeScript", scope: "Selected experiment", image: IMG.work1 },
  { slug: "signal-search", number: "02", title: "Signal Search", category: "Beauty", industry: "Beauty", service: "AI Commerce", description: "A product discovery system that turns natural language into a shorter path to the right routine.", stack: "Next.js · AI · Semantic search", scope: "Selected experiment", image: IMG.work2 },
  { slug: "in-your-space", number: "03", title: "In Your Space", category: "Product", industry: "Product", service: "3D & AR Experiences", description: "An immersive product page concept where configuration and context do the selling.", stack: "React · Three.js · WebGL", scope: "Selected experiment", image: IMG.work3 },
  { slug: "quiet-kitchen", number: "04", title: "Quiet Kitchen", category: "Food & Beverage", industry: "Food & Beverage", service: "Performance & SEO", description: "A calmer direct-to-consumer experience for pantry staples, built around repeat purchase and useful discovery.", stack: "Next.js · Shopify · Technical SEO", scope: "Selected experiment", image: IMG.hero },
  { slug: "field-notes", number: "05", title: "Field Notes", category: "Outdoor", industry: "Outdoor", service: "Conversion & Recovery", description: "A commerce recovery concept that turns product education into a more confident return visit.", stack: "React · Shopify · Analytics", scope: "Selected experiment", image: IMG.work2 },
  { slug: "afterlight", number: "06", title: "Afterlight", category: "Home & Living", industry: "Home & Living", service: "Ongoing Development", description: "A modular release system for a growing home brand that needs every launch to feel considered.", stack: "Next.js · CMS · Design systems", scope: "Selected experiment", image: IMG.work1 },
] as const;

const industries = ["All", ...Array.from(new Set(projects.map((project) => project.industry)))];
const serviceTypes = ["All", ...Array.from(new Set(projects.map((project) => project.service)))];

function SectionLabel({ children, index }: { children: React.ReactNode; index?: string }) {
  return <div className="section-label"><span>{index || ""}</span><span>{children}</span><span className="label-line" /></div>;
}

function WorkCard({ project, priority = false }: { project: typeof projects[number]; priority?: boolean }) {
  return <Link prefetch={false} href={`/work/${project.slug}`} className="work-card featured">
    <div className="work-image">
      <Image src={project.image} alt={`${project.title} visual`} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" quality={68} preload={priority} className="cover-image" />
      <span className="work-arrow"><ArrowUpRight /></span>
    </div>
    <div className="work-card-meta"><div><span className="project-number">{project.number}</span><h3>{project.title}</h3><p>{project.category}</p></div><div className="work-detail"><span>{project.stack}</span><span>{project.scope}</span></div></div>
  </Link>;
}

function CTA() {
  return <section className="closing-cta"><div className="eyebrow"><span className="signal-dot" /> The next useful thing</div><h2>Bring the hard part.<br /><em>I’ll bring the system.</em></h2><Link href="/contact" className="button button-paper">Start a project <ArrowUpRight size={16} /></Link></section>;
}

export default function WorkPage() {
  const [industry, setIndustry] = useState("All");
  const [service, setService] = useState("All");
  const filtered = useMemo(() => projects.filter((project) => (industry === "All" || project.industry === industry) && (service === "All" || project.service === service)), [industry, service]);

  return <main className="inner-page">
    <div className="inner-hero"><SectionLabel index="01">Selected work</SectionLabel><h1>Proof, not<br /><em>promises.</em></h1><p>Self-initiated concepts and selected builds. Every project here is labeled honestly, with the technology and scope in plain sight.</p></div>
    <div className="archive-note"><span>Archive note / 2026</span><strong>Three experiments. Three different ways to make a product easier to choose.</strong><span>Filter by system</span></div>
    <div className="work-filters"><div><span>Industry</span><div className="filter-row">{industries.map((filter) => <button className={industry === filter ? "active" : ""} key={filter} onClick={() => setIndustry(filter)}>{filter}</button>)}</div></div><div><span>Service type</span><div className="filter-row">{serviceTypes.map((filter) => <button className={service === filter ? "active" : ""} key={filter} onClick={() => setService(filter)}>{filter}</button>)}</div></div></div>
    <div className="filter-result-note">Showing {filtered.length} of {projects.length} projects{industry !== "All" || service !== "All" ? " · filters active" : ""}</div>
    <div className="work-page-grid">{filtered.length ? filtered.map((project, index) => <WorkCard key={project.slug} project={project} priority={index < 2} />) : <div className="empty-filter"><span className="signal-dot" /><h2>Nothing in this slice yet.</h2><p>Reset one filter to see the full archive.</p><button className="text-link" onClick={() => { setIndustry("All"); setService("All"); }}>Reset filters <ArrowDownRight size={16} /></button></div>}</div>
    <CTA />
  </main>;
}
