import type { Metadata } from "next";
import "../client/src/index.css";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { siteUrl } from "../shared/site-config";

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "optional",
  preload: true,
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "optional",
  preload: true,
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
