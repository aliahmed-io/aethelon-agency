"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

const PRIMARY_LINKS = [["Work", "/work"], ["Services", "/services"], ["About", "/about"], ["Insights", "/insights"]] as const;

function ThemeToggle({ mobile = false }: { mobile?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      className={`theme-toggle${mobile ? " mobile-theme" : ""}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={theme === "dark"}
    >
      {theme === "light" ? <Moon size={15} aria-hidden="true" /> : <Sun size={15} aria-hidden="true" />}
      {mobile && <span>{nextTheme === "dark" ? "Dark mode" : "Light mode"}</span>}
    </button>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";
  const router = useRouter();
  const closeMenu = () => setOpen(false);
  const warmRoute = (href: string) => { void router.prefetch(href); };

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="site-header">
      <Link href="/" className="brand" onClick={closeMenu} aria-label="Aethelon home">
        <span className="mark-lockup" aria-hidden="true"><b>AE/</b></span>
        <span>Aethelon</span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {PRIMARY_LINKS.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            prefetch
            onPointerEnter={() => warmRoute(href)}
            onFocus={() => warmRoute(href)}
            className={pathname.startsWith(href) ? "active" : ""}
          >
            {label}
          </Link>
        ))}
        <ThemeToggle />
        <Link href="/contact" prefetch onPointerEnter={() => warmRoute("/contact")} onFocus={() => warmRoute("/contact")} className="nav-cta">
          Start a project <ArrowUpRight size={15} />
        </Link>
      </nav>
      <button
        type="button"
        className="mobile-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-controls="mobile-primary-navigation"
        aria-expanded={open}
        onClick={() => setOpen((currentOpen) => !currentOpen)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {open && (
        <nav id="mobile-primary-navigation" className="mobile-nav" aria-label="Mobile primary navigation">
          {PRIMARY_LINKS.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              prefetch
              onPointerEnter={() => warmRoute(href)}
              onFocus={() => warmRoute(href)}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
          <ThemeToggle mobile />
          <Link href="/contact" prefetch onPointerEnter={() => warmRoute("/contact")} onFocus={() => warmRoute("/contact")} onClick={closeMenu} className="nav-cta">
            Start a project <ArrowUpRight size={15} />
          </Link>
        </nav>
      )}
    </header>
  );
}
