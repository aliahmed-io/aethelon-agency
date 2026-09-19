import type { Metadata } from "next";
import { ThemeProvider } from "../../client/src/contexts/ThemeContext";
import SiteHeader from "../../client/src/components/SiteHeader";
import RouteTransition from "../../client/src/components/RouteTransition";
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
      <div className="app-shell temp-shell">
        <RouteTransition />
        <SiteHeader />
        <main className="route-page">
          <TempComparisonPage />
        </main>
      </div>
    </ThemeProvider>
  );
}
