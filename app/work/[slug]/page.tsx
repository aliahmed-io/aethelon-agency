import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteChrome from "../../SiteChrome";
import CaseStudyPage from "../../../client/src/pages/CaseStudyPage";
import { getProject, projects } from "../../../shared/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

type CaseStudyRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CaseStudyRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work not found — Aethelon" };

  return {
    title: `${project.title} — Aethelon work`,
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — Aethelon`,
      description: project.description,
      type: "article",
      images: [{ url: project.image, alt: `${project.title} visual` }],
    },
  };
}

export default async function CaseStudyRoute({ params }: CaseStudyRouteProps) {
  const { slug } = await params;
  if (!getProject(slug)) notFound();

  return <SiteChrome><CaseStudyPage slug={slug} /></SiteChrome>;
}
