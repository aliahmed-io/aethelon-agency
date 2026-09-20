import type { Metadata } from "next";
import "../client/src/index.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { siteUrl } from "../shared/site-config";

const displayFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
  preload: true,
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
