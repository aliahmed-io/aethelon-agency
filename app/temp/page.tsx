import type { Metadata } from "next";
import { ThemeProvider } from "../../client/src/contexts/ThemeContext";
import { TransitionProvider } from "../../client/src/contexts/TransitionContext";
import SiteHeader from "../../client/src/components/SiteHeader";
import InkVeilOverlay from "../../client/src/components/InkVeilOverlay";
import TempComparisonPage from "../../client/src/pages/TempComparisonPage";

export const metadata: Metadata = {
  title: "Homepage Evolution Lab | Aethelon",
  description: "Internal design comparison board for the Aethelon homepage redesign.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TempPage() {
  return (
    <ThemeProvider defaultTheme="light" switchable>
      <TransitionProvider>
        <div className="app-shell temp-shell">
          <InkVeilOverlay />
          <SiteHeader />
          <main className="route-page">
            <TempComparisonPage />
          </main>
        </div>
      </TransitionProvider>
    </ThemeProvider>
  );
}
