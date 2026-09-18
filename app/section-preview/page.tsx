import type { Metadata } from "next";
import SiteChrome from "../SiteChrome";
import SectionPreviewPage from "../../client/src/pages/SectionPreviewPage";

export const metadata: Metadata = {
  title: "Section 02 Concepts Evaluation — Aethelon Design Lab",
  description: "Temporary evaluation sandbox comparing 4 interactive proposals to replace the Section 02 interaction slice.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SectionPreviewRoute() {
  return (
    <SiteChrome>
      <SectionPreviewPage />
    </SiteChrome>
  );
}
