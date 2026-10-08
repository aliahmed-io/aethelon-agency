import type { Metadata } from "next";
import SiteChrome from "../SiteChrome";
import TermsPage from "../../client/src/pages/TermsPage";

export const metadata: Metadata = {
  title: "Terms & Conditions — Aethelon",
  description: "General Terms and Conditions governing Aethelon commerce engineering: fixed-scope milestone delivery, 100% client code ownership, guaranteed timelines, and transparent studio practices.",
  alternates: { canonical: "/terms-and-conditions" },
  openGraph: {
    title: "Terms & Conditions — Aethelon",
    description: "Our commercial standard: fixed milestone delivery, 100% code ownership, and transparent practices.",
  },
};

export default function TermsRoute() {
  return (
    <SiteChrome>
      <TermsPage />
    </SiteChrome>
  );
}
