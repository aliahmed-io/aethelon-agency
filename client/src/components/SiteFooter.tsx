import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BrandLogo from "./ui/BrandLogo";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <div className="eyebrow">
            Independent commerce engineering
          </div>
          <h2>
            Make the next<br />
            <em>move</em> useful.
          </h2>
        </div>
        <Link href="/contact" className="circle-cta">
          Start<br />a project <ArrowUpRight />
        </Link>
      </div>
      <div className="footer-bottom">
        <div className="brand footer-brand">
          <BrandLogo />
        </div>
        <div className="footer-links">
          <Link href="/work">Portfolio</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-meta">
          <div className="footer-legal-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
            <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
          </div>
          <span>© 2026 Aethelon. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
