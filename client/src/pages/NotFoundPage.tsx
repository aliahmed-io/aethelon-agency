'use client';

// Paper Signal style: editorial fallback, warm paper, charcoal ink, signal orange, clear escape route.
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function SectionLabel({ children, index }: { children: ReactNode; index?: string }) {
  return <div className="section-label"><span>{index || ""}</span><span>{children}</span><span className="label-line" /></div>;
}

export default function NotFoundPage() {
  return <main className="not-found-page"><div className="not-found-mark"><span>404</span><i /></div><div className="not-found-copy"><SectionLabel index="—">Wrong turn</SectionLabel><h1>This page took<br /><em>a different route.</em></h1><p>The address may have changed, or the page was never part of the system. Either way, there is a useful way back.</p><Link href="/" className="button button-dark">Back to homepage <ArrowUpRight size={16} /></Link></div></main>;
}
