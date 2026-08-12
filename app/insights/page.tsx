import SiteChrome from "../SiteChrome";
import InsightsPage from "../../client/src/pages/InsightsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knowledge — Commerce Studio",
  description: "Evidence-backed notes on ecommerce systems, AI commerce, product experience, growth, and technical SEO.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Knowledge — Commerce Studio",
    description: "Evidence-backed notes on ecommerce systems, AI commerce, product experience, growth, and technical SEO.",
    type: "website",
  },
};

export default function InsightsRoute() {
  return <SiteChrome><InsightsPage /></SiteChrome>;
}
