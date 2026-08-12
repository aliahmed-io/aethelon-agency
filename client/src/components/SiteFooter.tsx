// Paper Signal style: the footer closes with the same restrained editorial rhythm and no client-side page graph.
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IMG } from "../lib/site-assets";

export default function SiteFooter() {
  return <footer className="footer"><div className="footer-top"><div><div className="eyebrow"><span className="signal-dot" /> Independent commerce engineering</div><h2>Make the next<br /><em>move</em> useful.</h2></div><Link href="/contact" className="circle-cta">Start<br />a project <ArrowUpRight /></Link></div><div className="footer-bottom"><div className="brand footer-brand"><span className="mark-lockup"><Image src={IMG.mark} alt="" width={34} height={34} className="brand-mark" /><b>CS/</b></span><span>commerce<br />studio</span></div><div className="footer-links"><Link href="/work">Work</Link><Link href="/services">Services</Link><Link href="/about">About</Link><Link href="/insights">Insights</Link><Link href="/contact">Contact</Link></div><div className="footer-meta"><a href="mailto:hello@commercestudio.dev">hello@commercestudio.dev</a><span>© 2026 Commerce Studio</span></div></div></footer>;
}
