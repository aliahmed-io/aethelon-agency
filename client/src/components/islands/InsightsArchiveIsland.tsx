"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Sparkles } from "lucide-react";
import type { InsightIndexItem } from "../../lib/insight-index";

export default function InsightsArchiveIsland({
  insightIndex,
  insightTopics,
}: {
  insightIndex: readonly InsightIndexItem[];
  insightTopics: readonly string[];
}) {
  const [topic, setTopic] = useState<string>("All");

  const topicCounts = useMemo(
    () =>
      Object.fromEntries(
        insightTopics.map((item) => [
          item,
          item === "All"
            ? insightIndex.length
            : insightIndex.filter(
                (article) => article.category === item || article.tags.includes(item)
              ).length,
        ])
      ) as Record<string, number>,
    [insightIndex, insightTopics]
  );

  const filtered = useMemo(
    () =>
      topic === "All"
        ? insightIndex
        : insightIndex.filter(
            (article) => article.category === topic || article.tags.includes(topic)
          ),
    [topic, insightIndex]
  );

  const leadArticle = filtered[0];
  const gridArticles = filtered.slice(1);

  return (
    <section className="insights-modern-section" aria-labelledby="topic-heading">
      {/* 1. TOPIC FILTER BAR WITH MODERN PILL CONTROLS */}
      <div className="insights-modern-filter-bar">
        <div className="filter-bar-head">
          <span className="modern-kicker">Research Archive</span>
          <span id="topic-heading" className="filter-heading-text">Explore by Discipline</span>
        </div>
        <div className="modern-topic-pills">
          {insightTopics.map((item) => (
            <button
              key={item}
              type="button"
              className={`modern-topic-pill ${topic === item ? "active" : ""}`}
              aria-pressed={topic === item}
              onClick={() => setTopic(item)}
            >
              <span>{item}</span>
              <span className="pill-counter">{topicCounts[item] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. ARCHIVE STATUS */}
      <div className="insights-modern-status-row">
        <span>
          Showing <strong>{filtered.length}</strong> of {insightIndex.length} publications
        </span>
        <span className="active-discipline-indicator">
          {topic === "All" ? "Complete Archive" : `Discipline: ${topic}`}
        </span>
      </div>

      {/* 3. MODERN EDITORIAL GRID & FEATURED LEAD */}
      <div className="insights-modern-grid-wrap">
        {filtered.length === 0 ? (
          <div className="insights-empty-state">
            <p>No field notes found under this discipline.</p>
            <button type="button" onClick={() => setTopic("All")} className="button button-dark">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="insights-modern-grid">
            {/* FEATURED LEAD ARTICLE (HORIZONTAL SPOTLIGHT) */}
            {leadArticle && (
              <Link
                prefetch={false}
                href={`/insights/${leadArticle.slug}`}
                className="modern-lead-card"
                key={leadArticle.slug}
              >
                <div className="modern-lead-media">
                  <Image
                    src={leadArticle.image}
                    alt={leadArticle.title}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 55vw"
                    className="cover-image modern-card-img"
                  />
                  <div className="modern-lead-badge-row">
                    <span className="modern-spotlight-chip">
                      <Sparkles size={11} aria-hidden="true" />
                      Featured Analysis
                    </span>
                    <span className="modern-time-chip">
                      <Clock size={11} aria-hidden="true" />
                      {leadArticle.readTime} read
                    </span>
                  </div>
                </div>

                <div className="modern-lead-content">
                  <div className="modern-card-meta-top">
                    <span className="modern-category-tag">{leadArticle.category}</span>
                    <span className="modern-date-tag">{leadArticle.date}</span>
                  </div>

                  <h2 className="modern-lead-title">{leadArticle.title}</h2>
                  <p className="modern-lead-excerpt">{leadArticle.excerpt}</p>

                  <div className="modern-takeaway-card">
                    <span className="takeaway-label">Key Research Finding</span>
                    <strong className="takeaway-stat">{leadArticle.stat}</strong>
                    <p className="takeaway-desc">{leadArticle.statLabel}</p>
                  </div>

                  <div className="modern-card-footer">
                    <span className="modern-tag-list">{leadArticle.tags.slice(0, 2).join(" · ")}</span>
                    <span className="modern-read-cta">
                      Read full study <ArrowUpRight size={15} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* COMPANION ARTICLES IN MODERN 2-COLUMN CARDS */}
            {gridArticles.map((article) => (
              <Link
                prefetch={false}
                href={`/insights/${article.slug}`}
                className="modern-article-card"
                key={article.slug}
              >
                <div className="modern-card-media">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="cover-image modern-card-img"
                  />
                  <span className="modern-card-time-badge">
                    <Clock size={11} aria-hidden="true" />
                    {article.readTime}
                  </span>
                </div>

                <div className="modern-card-body">
                  <div className="modern-card-meta-top">
                    <span className="modern-category-tag">{article.category}</span>
                    <span className="modern-date-tag">{article.date}</span>
                  </div>

                  <h3 className="modern-card-title">{article.title}</h3>
                  <p className="modern-card-excerpt">{article.excerpt}</p>

                  <div className="modern-takeaway-card mini">
                    <strong className="takeaway-stat">{article.stat}</strong>
                    <p className="takeaway-desc">{article.statLabel}</p>
                  </div>

                  <div className="modern-card-footer">
                    <span className="modern-tag-list">{article.tags.slice(0, 2).join(" · ")}</span>
                    <span className="modern-read-cta">
                      Read note <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
