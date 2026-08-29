import { describe, expect, it } from "vitest";
import { getProject, projects, getFlagshipProject, getFullstackProjects, getDesignProjects } from "../../shared/projects";

describe("curated portfolio projects", () => {
  it("includes all 7 structured portfolio projects across the 3 tiers", () => {
    expect(projects).toHaveLength(8);

    const flagship = getFlagshipProject();
    expect(flagship.slug).toBe("aethelon-furniture-commerce");
    expect(flagship.tier).toBe("flagship");

    const fullstack = getFullstackProjects();
    expect(fullstack).toHaveLength(3);
    expect(fullstack.map((p) => p.slug)).toEqual([
      "novexa-product-commerce",
      "velorum-watch-commerce",
      "oakwell-furniture-commerce",
    ]);

    const design = getDesignProjects();
    expect(design).toHaveLength(4);
    expect(design.map((p) => p.slug)).toEqual([
      "lundev-furniture-experience",
      "in-your-space",
      "afterlight",
      "monolith-audio",
    ]);
  });

  it("ensures all projects have verified local image assets and valid metadata", () => {
    for (const project of projects) {
      expect(project.title).toBeTruthy();
      expect(project.subtitle).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.stack).toBeTruthy();
      expect(project.image.startsWith("/images/")).toBe(true);
      expect(project.gallery.length).toBeGreaterThanOrEqual(2);
      expect(project.gallery.every((img) => img.startsWith("/images/"))).toBe(true);
    }
  });

  it("ensures full-stack builds have structured capabilities and engineering challenges", () => {
    const fullstackAndFlagship = projects.filter(
      (p) => p.tier === "flagship" || p.tier === "fullstack"
    );

    expect(fullstackAndFlagship).toHaveLength(4);
    for (const project of fullstackAndFlagship) {
      expect(project.capabilities).toBeDefined();
      expect(project.capabilities?.storefront).toBeTruthy();
      expect(project.capabilities?.commerce).toBeTruthy();
      expect(project.capabilities?.admin).toBeTruthy();
      expect(project.capabilities?.highlight).toBeTruthy();
      expect(project.engineeringChallenge).toBeTruthy();
    }
  });
});
