import type { Metadata } from "next";
import SiteChrome from "../SiteChrome";
import PrivacyPolicyPage from "../../client/src/pages/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Aethelon",
  description: "How Aethelon protects your personal information, upholds strict data minimization, and delivers transparent, privacy-first commerce engineering.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy — Aethelon",
    description: "Transparent, privacy-first data handling standards for Aethelon commerce engineering studio.",
  },
};

export default function PrivacyPolicyRoute() {
  return (
    <SiteChrome>
      <PrivacyPolicyPage />
    </SiteChrome>
  );
}
