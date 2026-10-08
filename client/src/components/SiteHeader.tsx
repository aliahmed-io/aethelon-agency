"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Moon, Sun, ArrowRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "../contexts/ThemeContext";
import TransitionLink from "./TransitionLink";
import BrandLogo from "./ui/BrandLogo";

const NAV_LINKS = [
  { label: "Portfolio", href: "/work", index: "01" },
  { label: "Services", href: "/services", index: "02" },
  { label: "About", href: "/about", index: "03" },
  { label: "Insights", href: "/insights", index: "04" },
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
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen, closeMobile]);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        {/* 1. Left: Brand Lockup */}
        <div className="header-brand-wrap">
          <TransitionLink
            href="/"
            transitionLabel="Home"
            transitionIndex="00"
            className="brand header-brand"
            onClick={closeMobile}
          >
            <BrandLogo />
          </TransitionLink>
        </div>

        {/* 2. Center: Direct Studio Ribbon */}
        <nav className="site-nav-ribbon" aria-label="Primary navigation">
          {NAV_LINKS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <TransitionLink
                key={item.href}
                href={item.href}
                transitionLabel={item.label}
                transitionIndex={item.index}
                prefetch
                onPointerEnter={() => warmRoute(item.href)}
                onFocus={() => warmRoute(item.href)}
                className={`ribbon-item ${isActive ? "is-active" : ""}`}
              >
                {isActive && <span className="ribbon-active-pill" aria-hidden="true" />}
                <span>{item.label}</span>
              </TransitionLink>
            );
          })}
        </nav>

        {/* 3. Right: Studio Actions */}
        <div className="header-actions">
          <ThemeToggle />

          <TransitionLink
            href="/contact"
            transitionLabel="Contact"
            transitionIndex="05"
            prefetch
            onPointerEnter={() => warmRoute("/contact")}
            onFocus={() => warmRoute("/contact")}
            className="nav-cta"
          >
            Start a project <ArrowUpRight size={14} aria-hidden="true" />
          </TransitionLink>

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
            <TransitionLink
              href="/"
              transitionLabel="Home"
              transitionIndex="00"
              onClick={closeMobile}
              className="mobile-nav-link"
            >
              <span>Home</span>
              <ArrowRight size={15} aria-hidden="true" />
            </TransitionLink>
            {NAV_LINKS.map((item) => (
              <TransitionLink
                key={item.href}
                href={item.href}
                transitionLabel={item.label}
                transitionIndex={item.index}
                onClick={closeMobile}
                className="mobile-nav-link"
              >
                <span>{item.label}</span>
                <ArrowRight size={15} aria-hidden="true" />
              </TransitionLink>
            ))}
            <TransitionLink
              href="/contact"
              transitionLabel="Contact"
              transitionIndex="05"
              onClick={closeMobile}
              className="mobile-nav-link mobile-nav-cta"
            >
              <span>Start a project</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </TransitionLink>
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
