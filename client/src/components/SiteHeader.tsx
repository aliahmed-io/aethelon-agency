"use client";

// Paper Signal style: the global shell stays quiet, editorial, and lightweight so route content can load independently.
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { IMG } from "../lib/site-assets";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const loc = usePathname() || "/";
  const links = [["Work", "/work"], ["Services", "/services"], ["About", "/about"], ["Insights", "/insights"]] as const;
  const closeMenu = () => setOpen(false);

  return <header className="site-header">
    <Link href="/" className="brand" onClick={closeMenu}><span className="mark-lockup"><Image src={IMG.mark} alt="" width={34} height={34} className="brand-mark" loading="eager" /><b>CS/</b></span><span>commerce<br />studio</span></Link>
    <nav className="desktop-nav">{links.map(([label, href]) => <Link key={href} href={href} className={loc.startsWith(href) ? "active" : ""}>{label}</Link>)}<button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`} aria-pressed={theme === "dark"}>{theme === "light" ? <Moon size={15} /> : <Sun size={15} />}</button><Link href="/contact" className="nav-cta">Start a project <ArrowUpRight size={15} /></Link></nav>
    <button className="mobile-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    {open && <div className="mobile-nav">{links.map(([label, href]) => <Link key={href} href={href} onClick={closeMenu}>{label}</Link>)}<button className="theme-toggle mobile-theme" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`} aria-pressed={theme === "dark"}>{theme === "light" ? <Moon size={15} /> : <Sun size={15} />} {theme === "light" ? "Dark mode" : "Light mode"}</button><Link href="/contact" onClick={closeMenu} className="nav-cta">Start a project <ArrowUpRight size={15} /></Link></div>}
  </header>;
}
