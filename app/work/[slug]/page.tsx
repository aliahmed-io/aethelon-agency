import SiteChrome from "../../SiteChrome";
import { CaseStudy } from "../../../client/src/pages/Site";

type CaseStudyRouteProps = {
  params: Promise<{ slug: string }>;
};

export default async function CaseStudyRoute({ params }: CaseStudyRouteProps) {
  const { slug } = await params;
  return <SiteChrome><CaseStudy slug={slug} /></SiteChrome>;
}
