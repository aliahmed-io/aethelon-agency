"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

  return (
    <>
      <section className="topic-index" aria-labelledby="topic-heading">
        <div className="topic-index-head">
          <div className="section-label">
            <span>05—A</span>
            <span>Browse the archive</span>
            <span className="label-line" />
          </div>
          <span id="topic-heading">Choose a subject</span>
        </div>
        <div className="topic-pills">
          {insightTopics.map((item) => (
            <button
              key={item}
              type="button"
              className={topic === item ? "active" : ""}
              aria-pressed={topic === item}
              onClick={() => setTopic(item)}
            >
              <span>{String(topicCounts[item] ?? 0).padStart(2, "0")}</span>
              {item}
            </button>
          ))}
        </div>
      </section>

      <div className="knowledge-result">
        <span>
          Showing {filtered.length} of {insightIndex.length} notes
        </span>
        <span>{topic === "All" ? "Full archive" : `Filtered by / ${topic}`}</span>
      </div>

      <div className="article-list knowledge-list">
        {filtered.map((article) => (
          <Link
            prefetch={false}
            href={`/insights/${article.slug}`}
            className="article-card"
            key={article.slug}
          >
            <div className="article-card-top">
              <span>
                {article.index} / {article.date}
              </span>
              <span>{article.readTime}</span>
            </div>
            <div className="article-card-main">
              <div>
                <span className="article-category">{article.category}</span>
                <h2>{article.title}</h2>
                <p>{article.excerpt}</p>
              </div>
              <div className="article-card-stat">
                <strong>{article.stat}</strong>
                <span>{article.statLabel}</span>
              </div>
            </div>
            <div className="article-card-bottom">
              <span>{article.tags.join(" · ")}</span>
              <span>
                Read note <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
