"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "../contexts/ThemeContext";

const PRIMARY_LINKS = [
  ["Home", "/", "01"],
  ["Portfolio", "/work", "02"],
  ["Services", "/services", "03"],
  ["About", "/about", "04"],
  ["Insights", "/insights", "05"],
  ["Contact", "/contact", "06"],
] as const;

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={theme === "dark"}
    >
      {theme === "light" ? <Moon size={15} aria-hidden="true" /> : <Sun size={15} aria-hidden="true" />}
    </button>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";
  const router = useRouter();

  const closeMenu = useCallback(() => setOpen(false), []);
  const warmRoute = useCallback((href: string) => {
    void router.prefetch(href);
  }, [router]);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [closeMenu]);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        {/* 1. Left: Condensed Studio Menu Capsule */}
        <button
          type="button"
          className={`studio-menu-toggle ${open ? "is-active" : ""}`}
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="studio-dock-menu"
          aria-label={open ? "Close navigation menu" : "Open studio menu"}
        >
          <span className="menu-icon-bars" aria-hidden="true">
            <span className="bar line-1" />
            <span className="bar line-2" />
          </span>
          <span className="menu-label">{open ? "Close" : "Menu"}</span>
        </button>

        {/* 2. Center: Centered Brand Mark */}
        <Link href="/" className="brand brand-center" onClick={closeMenu}>
          <span className="mark-lockup" aria-hidden="true">
            <b>AE/</b>
          </span>
          <span className="brand-name">Aethelon</span>
        </Link>

        {/* 3. Right: Action Cluster */}
        <div className="header-actions">
          <ThemeToggle />
          <Link
            href="/contact"
            prefetch
            onPointerEnter={() => warmRoute("/contact")}
            onFocus={() => warmRoute("/contact")}
            onClick={closeMenu}
            className="nav-cta"
          >
            Start a project <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Floating Studio Dock (Ask Phill inspired condensed dock) */}
      <div
        id="studio-dock-menu"
        className={`studio-dock ${open ? "is-visible" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Studio navigation menu"
      >
        <div className="dock-backdrop" onClick={closeMenu} aria-hidden="true" />
        <div className="dock-card">
          <div className="dock-header">
            <span className="dock-eyebrow">Navigation</span>
            <span className="dock-esc-hint">Esc to close</span>
          </div>

          <nav className="dock-nav" aria-label="Studio primary navigation">
            {PRIMARY_LINKS.map(([label, href, num]) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  prefetch
                  onPointerEnter={() => warmRoute(href)}
                  onFocus={() => warmRoute(href)}
                  onClick={closeMenu}
                  className={`dock-link ${isActive ? "is-active" : ""}`}
                >
                  <span className="dock-num">{num}</span>
                  <span className="dock-label">{label}</span>
                  {isActive && <span className="dock-active-pill">Current</span>}
                </Link>
              );
            })}
          </nav>

          <div className="dock-footer">
            <div className="dock-status">
              <span>Available for bespoke builds</span>
            </div>
            <Link href="/contact" onClick={closeMenu} className="dock-contact-btn">
              Start a project <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
