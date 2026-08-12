import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function SiteFooter() {
  return <footer className="footer"><div className="footer-top"><div><div className="eyebrow"><span className="signal-dot" /> Independent commerce engineering</div><h2>Make the next<br /><em>move</em> useful.</h2></div><Link href="/contact" className="circle-cta">Start<br />a project <ArrowUpRight /></Link></div><div className="footer-bottom"><div className="brand footer-brand"><span className="mark-lockup" aria-hidden="true"><b>AE/</b></span><span>Aethelon</span></div><div className="footer-links"><Link href="/work">Work</Link><Link href="/services">Services</Link><Link href="/about">About</Link><Link href="/insights">Insights</Link><Link href="/contact">Contact</Link></div><div className="footer-meta"><Link href="/contact">Start a project</Link><span>© 2026 Aethelon</span></div></div></footer>;
}
