'use client';

// Paper Signal style: editorial case-study detail, warm paper, charcoal ink, signal orange, proof-led galleries.
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { IMG } from "../lib/site-assets";

const gallerySets: Record<string, string[]> = {
  "form-and-function": [IMG.work1, IMG.hero, IMG.work2],
  "signal-search": [IMG.work2, IMG.hero, IMG.work1],
  "in-your-space": [IMG.work3, IMG.hero, IMG.work2],
  "quiet-kitchen": [IMG.hero, IMG.work3, IMG.work1],
  "field-notes": [IMG.work2, IMG.work3, IMG.hero],
  "afterlight": [IMG.work1, IMG.work2, IMG.work3],
};

const projects = [
  { slug: "form-and-function", number: "01", title: "Form & Function", category: "Furniture", description: "A modular furniture storefront concept built around browsing by room, material, and intent.", stack: "Next.js · Shopify · TypeScript", scope: "Selected experiment", image: IMG.work1 },
  { slug: "signal-search", number: "02", title: "Signal Search", category: "Beauty", description: "A product discovery system that turns natural language into a shorter path to the right routine.", stack: "Next.js · AI · Semantic search", scope: "Selected experiment", image: IMG.work2 },
  { slug: "in-your-space", number: "03", title: "In Your Space", category: "Product", description: "An immersive product page concept where configuration and context do the selling.", stack: "React · Three.js · WebGL", scope: "Selected experiment", image: IMG.work3 },
  { slug: "quiet-kitchen", number: "04", title: "Quiet Kitchen", category: "Food & Beverage", description: "A calmer direct-to-consumer experience for pantry staples, built around repeat purchase and useful discovery.", stack: "Next.js · Shopify · Technical SEO", scope: "Selected experiment", image: IMG.hero },
  { slug: "field-notes", number: "05", title: "Field Notes", category: "Outdoor", description: "A commerce recovery concept that turns product education into a more confident return visit.", stack: "React · Shopify · Analytics", scope: "Selected experiment", image: IMG.work2 },
  { slug: "afterlight", number: "06", title: "Afterlight", category: "Home & Living", description: "A modular release system for a growing home brand that needs every launch to feel considered.", stack: "Next.js · CMS · Design systems", scope: "Selected experiment", image: IMG.work1 },
] as const;

function SectionLabel({ children, index }: { children: React.ReactNode; index?: string }) {
  return <div className="section-label"><span>{index || ""}</span><span>{children}</span><span className="label-line" /></div>;
}

function CTA() {
  return <section className="closing-cta"><div className="eyebrow"><span className="signal-dot" /> The next useful thing</div><h2>Bring the hard part.<br /><em>I’ll bring the system.</em></h2><Link href="/contact" className="button button-paper">Start a project <ArrowUpRight size={16} /></Link></section>;
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const onScroll = () => setVisible(window.scrollY > 620); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  if (!visible) return null;
  return <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><ArrowUp size={15} /><span>Top</span></button>;
}

export default function CaseStudyPage({ slug }: { slug: string }) {
  const project = projects.find(p => p.slug === slug) || projects[0];
  const gallery = gallerySets[project.slug] || [project.image];
  const [active, setActive] = useState(0);

  return <main className="case-page"><div className="case-hero"><Link href="/work" className="back-link">← Back to work</Link><div><span className="project-number">{project.number}</span><h1>{project.title}<br /><em>{project.category.split(" / ")[0]}</em></h1><p>{project.description}</p></div></div><div className="case-gallery"><div className="case-gallery-main"><Image src={gallery[active]} alt={`${project.title} gallery view ${active + 1}`} fill sizes="(max-width: 760px) 100vw, 92vw" className="cover-image" priority={active === 0} /><span>{String(active + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span></div><div className="case-thumbs">{gallery.map((image, i) => <button className={active === i ? "active" : ""} key={image + i} onClick={() => setActive(i)} aria-label={`View gallery image ${i + 1}`}><Image src={image} alt="" fill sizes="96px" className="cover-image" /></button>)}</div></div><div className="case-meta"><div><span>Project type</span><strong>{project.scope}</strong></div><div><span>Stack</span><strong>{project.stack}</strong></div><div><span>Focus</span><strong>UX · Systems · Motion</strong></div></div><div className="case-body"><SectionLabel index="01">The build</SectionLabel><h2>Make the product<br /><em>easier to choose.</em></h2><div><p>This selected experiment explores how a commerce experience can create confidence before checkout. The product story is structured around intent, useful filters, and a clear visual rhythm that keeps the interface feeling premium without getting in the way.</p><p>It is presented as a concept, not a client case study. The outcome is the working interaction, the system thinking, and the performance-minded direction—not an invented business result.</p></div></div><div className="metric-placeholders"><SectionLabel index="02">Metrics to plug in</SectionLabel><div>{[["—", "Conversion lift", "Placeholder until a live business result is available."], ["—", "Lighthouse performance", "Add a verified score from the shipped build."], ["—", "Workflow change", "Describe the measurable operational improvement." ]].map(([value, label, note]) => <article key={label}><strong>{value}</strong><span>{label}</span><p>{note}</p></article>)}</div></div><CTA /><BackToTop /></main>;
}
