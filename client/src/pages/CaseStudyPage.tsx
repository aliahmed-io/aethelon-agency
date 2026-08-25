"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { getProject } from "../../../shared/projects";

function SectionLabel({ children, index }: { children: React.ReactNode; index?: string }) {
  return <div className="section-label"><span>{index || ""}</span><span>{children}</span><span className="label-line" /></div>;
}

function CTA() {
  return <section className="closing-cta"><div className="eyebrow"><span className="signal-dot" /> The next useful thing</div><h2>Bring the hard part.<br /><em>I’ll bring the system.</em></h2><Link href="/contact" className="button button-paper">Start a project <ArrowUpRight size={16} /></Link></section>;
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;
  return <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><ArrowUp size={15} /><span>Top</span></button>;
}

export default function CaseStudyPage({ slug }: { slug: string }) {
  const project = getProject(slug);
  const [active, setActive] = useState(0);

  if (!project) return null;

  const projectBuild = "build" in project
    ? project.build
    : "This selected experiment explores how a commerce experience can create confidence before checkout. The product story is structured around intent, useful filters, and a clear visual rhythm that keeps the interface feeling premium without getting in the way.";
  const projectFocus = "focus" in project ? project.focus : "UX · Systems · Motion";

  return (
    <main className="case-page">
      <div className="case-hero"><Link href="/work" className="back-link">← Back to work</Link><div><span className="project-number">{project.number}</span><h1>{project.title}<br /><em>{project.category.split(" / ")[0]}</em></h1><p>{project.description}</p></div></div>
      <div className="case-gallery"><div className="case-gallery-main"><Image src={project.gallery[active]} alt={`${project.title} gallery view ${active + 1}`} fill sizes="(max-width: 760px) 100vw, 92vw" className="cover-image" priority={active === 0} /><span>{String(active + 1).padStart(2, "0")} / {String(project.gallery.length).padStart(2, "0")}</span></div><div className="case-thumbs">{project.gallery.map((image, index) => <button className={active === index ? "active" : ""} key={image + index} onClick={() => setActive(index)} aria-label={`View gallery image ${index + 1}`}><Image src={image} alt="" fill sizes="96px" className="cover-image" /></button>)}</div></div>
      <div className="case-meta"><div><span>Project type</span><strong>{project.scope}</strong></div><div><span>Stack</span><strong>{project.stack}</strong></div><div><span>Focus</span><strong>{projectFocus}</strong></div></div>
      <div className="case-body"><SectionLabel index="01">The build</SectionLabel><h2>Make the product<br /><em>easier to choose.</em></h2><div><p>{projectBuild}</p><p>It is presented as a concept, not a client case study. The outcome is the working interaction, the system thinking, and the performance-minded direction—not an invented business result.</p></div></div>
      <div className="metric-placeholders"><SectionLabel index="02">Metrics to plug in</SectionLabel><div>{[["—", "Conversion lift", "Placeholder until a live business result is available."], ["—", "Lighthouse performance", "Add a verified score from the shipped build."], ["—", "Workflow change", "Describe the measurable operational improvement."]].map(([value, label, note]) => <article key={label}><strong>{value}</strong><span>{label}</span><p>{note}</p></article>)}</div></div>
      <CTA />
      <BackToTop />
    </main>
  );
}
