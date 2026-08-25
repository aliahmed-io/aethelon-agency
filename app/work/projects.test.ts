import { describe, expect, it } from "vitest";
import { getProject, projects } from "../../shared/projects";

describe("curated portfolio projects", () => {
  it("includes the three user-selected self-directed builds", () => {
    const slugs = ["aethelon-furniture-commerce", "novexa-product-commerce", "velorum-watch-commerce"];

    for (const slug of slugs) {
      expect(getProject(slug)?.scope).toBe("Self-directed product build");
    }
  });

  it("assigns each curated build a complete, unique gallery of durable project CDN URLs", () => {
    const curated = projects.filter((project) => project.scope === "Self-directed product build");

    expect(curated).toHaveLength(3);
    for (const project of curated) {
      expect(project.gallery).toHaveLength(3);
      expect(new Set(project.gallery).size).toBe(3);
      expect(project.gallery.every((asset) => asset.startsWith("https://files.manuscdn.com/"))).toBe(true);
    }
  });
});
