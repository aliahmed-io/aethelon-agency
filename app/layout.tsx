import type { Metadata } from "next";
import "../client/src/index.css";
import localFont from "next/font/local";
import { siteUrl } from "../shared/site-config";

const bodyFont = localFont({
  src: [
    { path: "./fonts/dm-sans-400.ttf", weight: "400", style: "normal" },
    { path: "./fonts/dm-sans-500.ttf", weight: "500", style: "normal" },
    { path: "./fonts/dm-sans-600.ttf", weight: "600", style: "normal" },
    { path: "./fonts/dm-sans-700.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

const displayFont = localFont({
  src: [
    { path: "./fonts/space-grotesk-400.ttf", weight: "400", style: "normal" },
    { path: "./fonts/space-grotesk-500.ttf", weight: "500", style: "normal" },
    { path: "./fonts/space-grotesk-600.ttf", weight: "600", style: "normal" },
    { path: "./fonts/space-grotesk-700.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aethelon — Next-generation commerce systems",
  description: "Custom storefronts, useful AI, and immersive product experiences.",
  metadataBase: new URL(siteUrl),
  applicationName: "Aethelon",
  authors: [{ name: "Aethelon" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Aethelon — Next-generation commerce systems",
    description: "Custom storefronts, useful AI, and immersive product experiences.",
    type: "website",
    siteName: "Aethelon",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aethelon — Next-generation commerce systems",
    description: "Custom storefronts, useful AI, and immersive product experiences.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${bodyFont.variable} ${displayFont.variable}`}>{children}</body></html>;
}
