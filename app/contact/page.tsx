import type { Metadata } from "next";
import SiteChrome from "../SiteChrome";
import ContactPage from "../../client/src/pages/ContactPage";

export const metadata: Metadata = {
  title: "Start a project — Aethelon",
  description: "Tell Aethelon about your commerce, AI, performance, or product-experience challenge and get a clear next step.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Start a project — Aethelon",
    description: "Start a conversation about a clearer, faster, more useful commerce system.",
  },
};

export default function ContactRoute() {
  return <SiteChrome><ContactPage /></SiteChrome>;
}
