import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteChrome from "../../SiteChrome";
import { InsightArticlePage } from "../../../client/src/pages/Site";
import { getInsight, insightArticles } from "../../../client/src/lib/insights";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://commerce-studio.manus.space";

export function generateStaticParams() {
  return insightArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) return { title: "Knowledge note not found — Commerce Studio" };
  return {
    title: `${article.title} — Commerce Studio`,
    description: article.excerpt,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: `2026-${article.index.padStart(2, "0")}-01`,
      section: article.category,
      tags: article.tags,
    },
  };
}

export default async function InsightArticleRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) notFound();
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: `2026-${article.index.padStart(2, "0")}-01`,
    dateModified: `2026-${article.index.padStart(2, "0")}-01`,
    author: { "@type": "Organization", name: "Commerce Studio", url: siteUrl },
    publisher: { "@type": "Organization", name: "Commerce Studio", url: siteUrl },
    mainEntityOfPage: `${siteUrl}/insights/${article.slug}`,
    keywords: article.tags.join(", "),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Knowledge", item: `${siteUrl}/insights` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${siteUrl}/insights/${article.slug}` },
    ],
  };
  return <SiteChrome><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} /><InsightArticlePage slug={article.slug} /></SiteChrome>;
}
