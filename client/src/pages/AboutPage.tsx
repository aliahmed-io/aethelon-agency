'use client';

// Paper Signal style: editorial studio narrative, warm paper, charcoal ink, signal orange, asymmetrical proof-led layouts.
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function SectionLabel({ children, index }: { children: ReactNode; index?: string }) {
  return <div className="section-label"><span>{index || ""}</span><span>{children}</span><span className="label-line" /></div>;
}

function CTA() {
  return <section className="closing-cta"><div className="eyebrow"><span className="signal-dot" /> The next useful thing</div><h2>Bring the hard part.<br /><em>I’ll bring the system.</em></h2><Link href="/contact" className="button button-paper">Start a project <ArrowUpRight size={16} /></Link></section>;
}

export default function AboutPage() {
  return <main className="inner-page about-page"><div className="inner-hero"><SectionLabel index="03">About the studio</SectionLabel><h1>Small by design.<br /><em>Serious by default.</em></h1><p>Commerce Studio is an independent practice for brands that need senior thinking, modern engineering, and a direct line to the person doing the work.</p></div><div className="about-story"><div><span className="story-year">01 / The premise</span><h2>Good commerce<br />makes complexity<br /><em>feel simple.</em></h2></div><div><p>I work across strategy, design, and development because the seams between them are where most storefronts lose their edge.</p><p>No invented team. No layers of account management. Just a focused practice with the right tools, a bias toward clarity, and a preference for shipping useful things.</p><p>The studio is intentionally lean, which keeps the work close, the feedback loop short, and the budget sensible without making the result feel reduced.</p></div></div><div className="studio-rhythm"><SectionLabel index="03—A">Studio rhythm</SectionLabel>{[["01", "See the problem", "A short, direct discovery phase that separates the real constraint from the loudest request."], ["02", "Shape the system", "Architecture, UX, and priorities become one practical direction before the build starts."], ["03", "Ship the useful", "A focused release, measured honestly, with the next improvement visible." ]].map(([n, t, d]) => <div key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div><div className="principles"><SectionLabel index="04">What to expect</SectionLabel>{["Direct communication", "Technical curiosity", "Clear scope", "Useful motion", "Honest proof"].map((x, i) => <div key={x}><span>0{i + 1}</span><strong>{x}</strong><ArrowUpRight size={17} /></div>)}</div><CTA /></main>;
}
