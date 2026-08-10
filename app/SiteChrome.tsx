"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "../client/src/contexts/ThemeContext";
import { Footer, Header } from "../client/src/pages/Site";

export default function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" switchable>
      <div className="app-shell">
        <Header />
        <div className="route-page">{children}</div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
