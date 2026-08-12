import type { MetadataRoute } from "next";
import { insightArticles } from "../client/src/lib/insights";
import { projects } from "../shared/projects";
import { siteUrl } from "../shared/site-config";

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
