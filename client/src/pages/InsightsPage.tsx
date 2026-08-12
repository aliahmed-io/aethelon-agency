"use client";

// Paper Signal style: editorial knowledge archive, warm paper, charcoal ink, signal orange, proof-led layouts.
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { subscribeNewsletter } from "../lib/submissionApi";
import { insightIndex, insightTopics } from "../lib/insight-index";

function SectionLabel({ children, index }: { children: React.ReactNode; index?: string }) {
  return <div className="section-label"><span>{index || ""}</span><span>{children}</span><span className="label-line" /></div>;
}

export default function InsightsPage() {
  const [topic, setTopic] = useState<(typeof insightTopics)[number]>("All");
  const [subscribing, setSubscribing] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [newsletterError, setNewsletterError] = useState(false);
  const topicCounts = useMemo(() => Object.fromEntries(insightTopics.map((item) => [item, item === "All" ? insightIndex.length : insightIndex.filter((article) => article.category === item || article.tags.includes(item)).length])) as Record<(typeof insightTopics)[number], number>, []);
  const filtered = useMemo(() => topic === "All" ? insightIndex : insightIndex.filter((article) => article.category === topic || article.tags.includes(topic)), [topic]);

  async function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (subscribing) return;
    setSubscribing(true);
    setNewsletterMessage("");
    setNewsletterError(false);
    const form = event.currentTarget;
    const email = new FormData(form).get("email")?.toString() || "";
    const middleName = new FormData(form).get("middleName")?.toString() || "";
    try {
      const result = await subscribeNewsletter({ email, middleName });
      form.reset();
      setNewsletterMessage(result.created ? "You’re on the list." : "You’re already on the list.");
    } catch (error) {
      setNewsletterError(true);
      setNewsletterMessage(error instanceof Error ? error.message : "Could not subscribe.");
    } finally {
      setSubscribing(false);
    }
  }

  return <main className="inner-page insights-page">
    <div className="inner-hero knowledge-hero"><SectionLabel index="05">Knowledge / field notes</SectionLabel><h1>Useful notes<br />for <em>better commerce.</em></h1><p>Evidence-backed thinking on the systems that make an ecommerce business easier to choose, easier to run, and easier to grow.</p><div className="knowledge-hero-meta"><span><b>{insightIndex.length}</b> notes in the archive</span><span><b>2026</b> editorial series</span><span><b>01</b> honest source rule</span></div></div>
    <section className="topic-index" aria-labelledby="topic-heading"><div className="topic-index-head"><SectionLabel index="05—A">Browse the archive</SectionLabel><span id="topic-heading">Choose a subject</span></div><div className="topic-pills">{insightTopics.map((item) => <button key={item} className={topic === item ? "active" : ""} aria-pressed={topic === item} onClick={() => setTopic(item)}><span>{String(topicCounts[item]).padStart(2, "0")}</span>{item}</button>)}</div></section>
    <div className="knowledge-result"><span>Showing {filtered.length} of {insightIndex.length} notes</span><span>{topic === "All" ? "Full archive" : `Filtered by / ${topic}`}</span></div>
    <div className="article-list knowledge-list">{filtered.map((article) => <Link prefetch={false} href={`/insights/${article.slug}`} className="article-card" key={article.slug}><div className="article-card-top"><span>{article.index} / {article.date}</span><span>{article.readTime}</span></div><div className="article-card-main"><div><span className="article-category">{article.category}</span><h2>{article.title}</h2><p>{article.excerpt}</p></div><div className="article-card-stat"><strong>{article.stat}</strong><span>{article.statLabel}</span></div></div><div className="article-card-bottom"><span>{article.tags.join(" · ")}</span><span>Read note <ArrowUpRight size={16} /></span></div></Link>)}</div>
    <section className="seo-plan-preview"><div><SectionLabel index="05—B">The growth layer</SectionLabel><h2>SEO is the system<br /><em>behind the signal.</em></h2></div><div><p>A practical plan for turning the knowledge hub, commerce routes, and product data into a clearer search surface—without promising rankings we have not measured.</p><Link href="/insights/seo-for-commerce-that-compounds" className="text-link">Read the SEO note <ArrowUpRight size={16} /></Link></div></section>
    <div className="newsletter"><div><span className="eyebrow"><span className="signal-dot" /> One useful note, occasionally</span><h2>No noise.<br /><em>Just signal.</em></h2></div><div><p>Join the small list for practical commerce thinking, not a weekly content treadmill.</p><form onSubmit={handleSubscribe}><input className="form-honeypot" name="middleName" tabIndex={-1} autoComplete="off" aria-hidden="true" /><input name="email" required type="email" placeholder="Your email address" aria-label="Your email address" /><button type="submit" disabled={subscribing} aria-label="Subscribe to newsletter">{subscribing ? "…" : <ArrowUpRight />}</button></form>{newsletterMessage && <p className={`form-feedback${newsletterError ? " is-error" : ""}`} role={newsletterError ? "alert" : "status"}>{newsletterMessage}</p>}</div></div>
  </main>;
}
