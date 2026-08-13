"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type TransitionPhase = "idle" | "prepare" | "covering" | "revealing";
type TransitionVariant = "arrival" | "archive" | "blueprint" | "editorial" | "index" | "stamp" | "gallery" | "misprint";

type TransitionProfile = {
  label: string;
  variant: TransitionVariant;
  number: string;
};

// The cover and reveal phases were deliberately extended by 200 ms, while
// navigation itself remains immediate: the click is never prevented or delayed.
const COVER_DURATION = 360;
const REVEAL_DURATION = 460;
const FALLBACK_DURATION = 2200;

function getTransitionProfile(pathname: string): TransitionProfile {
  if (pathname === "/") return { label: "Aethelon / home", variant: "arrival", number: "00" };
  if (pathname === "/work") return { label: "Selected work / archive", variant: "archive", number: "01" };
  if (pathname.startsWith("/work/")) return { label: "Selected work / case study", variant: "gallery", number: "02" };
  if (pathname === "/services") return { label: "Services / architecture", variant: "blueprint", number: "03" };
  if (pathname === "/about") return { label: "About / editorial", variant: "editorial", number: "04" };
  if (pathname === "/insights") return { label: "Insights / index", variant: "index", number: "05" };
  if (pathname.startsWith("/insights/")) return { label: "Insights / note", variant: "index", number: "06" };
  if (pathname === "/contact") return { label: "Start a project / contact", variant: "stamp", number: "07" };
  return { label: "Aethelon / signal", variant: "misprint", number: "08" };
}

function isInternalNavigation(anchor: HTMLAnchorElement) {
  if (anchor.target === "_blank" || anchor.hasAttribute("download")) return false;
  if (anchor.getAttribute("rel") === "external") return false;

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;

  const url = new URL(href, window.location.href);
  const current = new URL(window.location.href);
  return url.origin === current.origin && (url.pathname !== current.pathname || url.search !== current.search);
}

export default function RouteTransition() {
  const pathname = usePathname() || "/";
  const [transition, setTransition] = useState(() => ({
    phase: "idle" as TransitionPhase,
    profile: getTransitionProfile(pathname),
  }));
  const initialPathname = useRef(true);
  const navigationTimer = useRef<number | null>(null);
  const fallbackTimer = useRef<number | null>(null);
  const settleTimer = useRef<number | null>(null);
  const isNavigating = useRef(false);

  const clearTimers = () => {
    if (navigationTimer.current !== null) window.clearTimeout(navigationTimer.current);
    if (fallbackTimer.current !== null) window.clearTimeout(fallbackTimer.current);
    if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
    navigationTimer.current = null;
    fallbackTimer.current = null;
    settleTimer.current = null;
  };

  const resetTransition = () => {
    clearTimers();
    isNavigating.current = false;
    document.documentElement.dataset.routeLoading = "false";
    setTransition((current) => ({ ...current, phase: "idle" }));
  };

  useEffect(() => {
    const profile = getTransitionProfile(pathname);
    document.documentElement.dataset.routeLoading = "false";

    if (initialPathname.current) {
      initialPathname.current = false;
      setTransition({ phase: "idle", profile });
      return;
    }

    if (!isNavigating.current) {
      setTransition({ phase: "idle", profile });
      return;
    }

    if (fallbackTimer.current !== null) window.clearTimeout(fallbackTimer.current);
    fallbackTimer.current = null;
    navigationTimer.current = null;
    setTransition((current) => ({ phase: "revealing", profile: current.profile }));
    settleTimer.current = window.setTimeout(() => {
      isNavigating.current = false;
      setTransition({ phase: "idle", profile });
      settleTimer.current = null;
    }, REVEAL_DURATION);

    return () => {
      if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
    };
  }, [pathname]);

  useEffect(() => {
    // Capture the confirmed click before Next Link handles it, but never prevent
    // default navigation. This lets the destination begin loading immediately.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target instanceof Element ? event.target.closest("a") : null;
      if (!(target instanceof HTMLAnchorElement) || !isInternalNavigation(target) || isNavigating.current) return;

      const destination = new URL(target.href, window.location.href);
      const profile = getTransitionProfile(destination.pathname);
      clearTimers();
      isNavigating.current = true;
      document.documentElement.dataset.routeLoading = "true";
      setTransition({ phase: "prepare", profile });
      window.requestAnimationFrame(() => setTransition({ phase: "covering", profile }));
      fallbackTimer.current = window.setTimeout(resetTransition, FALLBACK_DURATION);
    };

    const onPageHide = () => resetTransition();
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") resetTransition();
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("pagehide", onPageHide);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("pagehide", onPageHide);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      clearTimers();
    };
  }, []);

  const isMoving = transition.phase !== "idle";

  return (
    <>
      <div
        className={`route-transition route-transition--${transition.phase}`}
        data-variant={transition.profile.variant}
        aria-hidden="true"
      >
        <span className="route-transition__shadow" />
        <span className="route-transition__paper" />
        <span className="route-transition__grid" />
        <span className="route-transition__signal" />
        <span className="route-transition__label">
          <span>AET / {transition.profile.number}</span>
          <strong>{transition.profile.label}</strong>
        </span>
        <span className="route-transition__count">{transition.profile.number}</span>
      </div>
      <div
        className="route-progress"
        role="status"
        aria-live="polite"
        aria-label={isMoving ? `Opening ${transition.profile.label}` : undefined}
      />
    </>
  );
}
