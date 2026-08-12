import type { MetadataRoute } from "next";
import { insightArticles } from "../client/src/lib/insights";
import { projects } from "../shared/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aethelon.manus.space";

export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes = ["", "/work", "/services", "/about", "/insights", "/contact"];
  const workRoutes = projects.map((project) => `/work/${project.slug}`);
  const articleRoutes = insightArticles.map((article) => `/insights/${article.slug}`);
  return [...coreRoutes, ...workRoutes, ...articleRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route.startsWith("/insights") ? "monthly" : "weekly",
    priority: route === "" ? 1 : route.startsWith("/insights/") ? 0.7 : 0.8,
  }));
}
