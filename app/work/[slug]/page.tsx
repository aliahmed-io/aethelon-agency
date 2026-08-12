import SiteChrome from "../../SiteChrome";
import CaseStudyPage from "../../../client/src/pages/CaseStudyPage";

const caseStudySlugs = [
  "form-and-function",
  "signal-search",
  "in-your-space",
  "quiet-kitchen",
  "field-notes",
  "afterlight",
] as const;

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

type CaseStudyRouteProps = {
  params: Promise<{ slug: string }>;
};

export default async function CaseStudyRoute({ params }: CaseStudyRouteProps) {
  const { slug } = await params;
  return <SiteChrome><CaseStudyPage slug={slug} /></SiteChrome>;
}
