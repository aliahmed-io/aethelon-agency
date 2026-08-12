import type { MetadataRoute } from "next";
import { insightArticles } from "../client/src/lib/insights";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://commerce-studio.manus.space";

export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes = ["", "/work", "/services", "/about", "/insights", "/contact"];
  const workRoutes = ["form-and-function", "signal-search", "in-your-space", "quiet-kitchen", "field-notes", "afterlight"].map((slug) => `/work/${slug}`);
  const articleRoutes = insightArticles.map((article) => `/insights/${article.slug}`);
  return [...coreRoutes, ...workRoutes, ...articleRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date("2026-08-12"),
    changeFrequency: route.startsWith("/insights") ? "monthly" : "weekly",
    priority: route === "" ? 1 : route.startsWith("/insights/") ? 0.7 : 0.8,
  }));
}
