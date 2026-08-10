"use client";

import dynamic from "next/dynamic";
import { ThemeProvider } from "../client/src/contexts/ThemeContext";

const Site = dynamic(() => import("../client/src/pages/Site"), { ssr: false });

export default function SiteClient() {
  return (
    <ThemeProvider defaultTheme="light" switchable>
      <Site />
    </ThemeProvider>
  );
}
