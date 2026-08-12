import type { Metadata } from "next";
import "../client/src/index.css";

export const dynamic = "force-dynamic";

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
  return <html lang="en"><body>{children}</body></html>;
}
