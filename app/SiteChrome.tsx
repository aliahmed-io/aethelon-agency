"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "../client/src/contexts/ThemeContext";
import SiteFooter from "../client/src/components/SiteFooter";
import SiteHeader from "../client/src/components/SiteHeader";

export default function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" switchable>
      <div className="app-shell">
        <SiteHeader />
        <div className="route-page">{children}</div>
        <SiteFooter />
      </div>
    </ThemeProvider>
  );
}
