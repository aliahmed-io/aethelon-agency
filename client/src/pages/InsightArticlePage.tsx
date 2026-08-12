// Paper Signal style: long-form evidence is server-rendered with generous editorial rhythm and no client-side hydration cost.
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { InsightArticle } from "../lib/insights";

function SectionLabel({ children, index }: { children: React.ReactNode; index?: string }) {
  return <div className="section-label"><span>{index || ""}</span><span>{children}</span><span className="label-line" /></div>;
}

export default function InsightArticlePage({ article }: { article: InsightArticle }) {
  return <main className="article-page">
    <div className="article-hero"><Link href="/insights" className="back-link">← Back to knowledge</Link><div className="article-hero-grid"><div><span className="article-category">{article.category}</span><h1>{article.title}</h1><p>{article.deck}</p></div><aside><span>{article.index} / {article.date}</span><strong>{article.readTime}</strong><small>{article.statLabel}</small><b>{article.stat}</b></aside></div></div>
    <div className="article-content"><div className="article-content-main">{article.sections.map((section, index) => <div key={section.heading}><section><span className="article-kicker"><span className="signal-dot" /> {article.index} / chapter {String(index + 1).padStart(2, "0")}</span><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>{index === 0 && <aside className="article-pull"><span className="article-kicker"><span className="signal-dot" /> Studio signal</span><strong>{article.deck}</strong></aside>}</div>)}<section className="article-proof"><span className="article-kicker"><span className="signal-dot" /> Implementation lens</span><h2>What this looks like in a real build.</h2><ul>{article.proof.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></section></div><aside className="article-sidebar"><div><span>At a glance</span><strong>{article.stat}</strong><p>{article.statLabel}</p><small>{article.statSource}</small></div><div><span>Topics</span><div className="article-tags">{article.tags.map((tag) => <b key={tag}>{tag}</b>)}</div></div><div className="article-references"><span>Sources / evidence</span>{article.sources.map((source, index) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>[{index + 1}] {source.label} <ArrowUpRight size={13} /></a>)}</div></aside></div>
    <section className="article-next"><SectionLabel index="Next note">Keep going</SectionLabel><Link href="/insights" className="text-link">Back to all knowledge <ArrowUpRight size={16} /></Link></section>
  </main>;
}
