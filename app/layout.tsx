import type { Metadata } from "next";
import "../client/src/index.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Commerce Studio — Next-generation commerce systems",
  description: "Custom storefronts, useful AI, and immersive product experiences.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
