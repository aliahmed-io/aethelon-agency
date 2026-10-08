import type { Metadata } from "next";
import SiteChrome from "../SiteChrome";
import CookiePolicyPage from "../../client/src/pages/CookiePolicyPage";

export const metadata: Metadata = {
  title: "Cookie Policy — Aethelon",
  description: "How Aethelon utilizes essential storage, rejects invasive third-party ad pixels, and ensures transparent digital hygiene across our storefront architecture.",
  alternates: { canonical: "/cookie-policy" },
  openGraph: {
    title: "Cookie Policy — Aethelon",
    description: "Our privacy-first cookie policy: zero ad tracking pixels, minimal essential storage, and transparent telemetry.",
  },
};

export default function CookiePolicyRoute() {
  return (
    <SiteChrome>
      <CookiePolicyPage />
    </SiteChrome>
  );
}
