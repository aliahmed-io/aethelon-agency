import type { Metadata } from "next";
import SiteChrome from "../SiteChrome";
import AboutPage from "../../client/src/pages/AboutPage";

export const metadata: Metadata = {
  title: "About Aethelon — Independent commerce engineering",
  description: "Meet Aethelon: an independent studio building considered, high-performance commerce systems for ambitious brands.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Aethelon — Independent commerce engineering",
    description: "An independent studio for considered, high-performance commerce systems.",
  },
};

export default function AboutRoute() {
  return <SiteChrome><AboutPage /></SiteChrome>;
}
