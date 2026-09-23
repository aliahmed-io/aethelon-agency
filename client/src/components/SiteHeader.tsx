"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Moon, Sun, ArrowRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "../contexts/ThemeContext";

const NAV_LINKS = [
  { label: "Portfolio", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() || "/";
  const router = useRouter();

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const warmRoute = useCallback((href: string) => {
    void router.prefetch(href);
  }, [router]);

  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [closeMobile]);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        {/* 1. Left: Brand Lockup */}
        <div className="header-brand-wrap">
          <Link href="/" className="brand header-brand" onClick={closeMobile}>
            <span className="mark-lockup" aria-hidden="true">
              <b>AE/</b>
            </span>
            <span className="brand-name">Aethelon</span>
          </Link>
          <span className="header-tagline">Bespoke Commerce</span>
        </div>

        {/* 2. Center: Direct Studio Ribbon (Desktop) */}
        <nav className="site-nav-ribbon" aria-label="Primary navigation">
          {NAV_LINKS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                onPointerEnter={() => warmRoute(item.href)}
                onFocus={() => warmRoute(item.href)}
                className={`ribbon-item ${isActive ? "is-active" : ""}`}
              >
                <span>{item.label}</span>
                {isActive && <span className="ribbon-active-pill" />}
              </Link>
            );
          })}
        </nav>

        {/* 3. Right: Studio Availability & Actions */}
        <div className="header-actions">
          <div className="header-availability-badge" title="Accepting bespoke commissions for Q2/Q3 2026">
            <span className="avail-text">Q2/Q3 Commissions</span>
          </div>

          <ThemeToggle />

          <Link
            href="/contact"
            prefetch
            onPointerEnter={() => warmRoute("/contact")}
            onFocus={() => warmRoute("/contact")}
            className="nav-cta"
          >
            Start a project <ArrowUpRight size={14} aria-hidden="true" />
          </Link>

          {/* Minimal Mobile Trigger */}
          <button
            type="button"
            className="site-mobile-toggle"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          >
            <span>{mobileOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      {/* Clean Architectural Mobile Sheet */}
      {mobileOpen && (
        <div className="site-mobile-drawer" role="dialog" aria-modal="true">
          <nav className="mobile-drawer-nav" aria-label="Mobile navigation">
            <Link href="/" onClick={closeMobile} className="mobile-nav-link">
              <span>Home</span>
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                className="mobile-nav-link"
              >
                <span>{item.label}</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            ))}
            <Link href="/contact" onClick={closeMobile} className="mobile-nav-link mobile-nav-cta">
              <span>Start a project</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </nav>
          <div className="mobile-drawer-footer">
            <span className="mobile-avail-note">Accepting Q2/Q3 bespoke builds</span>
            <span className="mobile-copy-note">© 2026 Aethelon</span>
          </div>
        </div>
      )}
    </header>
  );
}
