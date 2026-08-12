import type { Metadata } from "next";
import SiteChrome from "../SiteChrome";
import WorkPage from "../../client/src/pages/WorkPage";

export const metadata: Metadata = {
  title: "Selected ecommerce work — Aethelon",
  description: "Explore selected Aethelon commerce experiments spanning custom storefronts, AI discovery, 3D product experiences, conversion, and performance.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Selected ecommerce work — Aethelon",
    description: "Selected commerce experiments where design and engineering begin in the same room.",
  },
};

export default function WorkRoute() {
  return <SiteChrome><WorkPage /></SiteChrome>;
}
