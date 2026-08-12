import type { Metadata } from "next";
import "../client/src/index.css";
import localFont from "next/font/local";

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
  title: "Commerce Studio — Next-generation commerce systems",
  description: "Custom storefronts, useful AI, and immersive product experiences.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://commerce-studio.manus.space"),
  applicationName: "Commerce Studio",
  authors: [{ name: "Commerce Studio" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Commerce Studio — Next-generation commerce systems",
    description: "Custom storefronts, useful AI, and immersive product experiences.",
    type: "website",
    siteName: "Commerce Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commerce Studio — Next-generation commerce systems",
    description: "Custom storefronts, useful AI, and immersive product experiences.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${bodyFont.variable} ${displayFont.variable}`}>{children}</body></html>;
}
