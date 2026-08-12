import type { Metadata } from "next";
import SiteChrome from "../SiteChrome";
import ServicesPage from "../../client/src/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Commerce, AI and performance services — Aethelon",
  description: "Explore Aethelon services for custom ecommerce, AI commerce, 3D product experiences, conversion, performance, and technical SEO.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Commerce, AI and performance services — Aethelon",
    description: "Custom commerce systems that make products easier to choose, buy, and return to.",
  },
};

export default function ServicesRoute() {
  return <SiteChrome><ServicesPage /></SiteChrome>;
}
