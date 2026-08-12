"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type TransitionPhase = "idle" | "prepare" | "covering" | "revealing";
type TransitionVariant = "arrival" | "archive" | "blueprint" | "editorial" | "index" | "stamp" | "gallery" | "misprint";

type TransitionProfile = {
  label: string;
  variant: TransitionVariant;
};

function getTransitionProfile(pathname: string): TransitionProfile {
  if (pathname === "/") return { label: "Aethelon / home", variant: "arrival" };
  if (pathname === "/work") return { label: "Selected work / archive", variant: "archive" };
  if (pathname.startsWith("/work/")) return { label: "Selected work / case study", variant: "gallery" };
  if (pathname === "/services") return { label: "Services / architecture", variant: "blueprint" };
  if (pathname === "/about") return { label: "About / editorial", variant: "editorial" };
  if (pathname === "/insights") return { label: "Insights / index", variant: "index" };
  if (pathname.startsWith("/insights/")) return { label: "Insights / note", variant: "index" };
  if (pathname === "/contact") return { label: "Start a project / contact", variant: "stamp" };
  return { label: "Aethelon / signal", variant: "misprint" };
}

function isInternalNavigation(anchor: HTMLAnchorElement) {
  if (anchor.target === "_blank" || anchor.hasAttribute("download")) return false;
  if (anchor.getAttribute("rel") === "external") return false;

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;

  const url = new URL(href, window.location.href);
  return url.origin === window.location.origin && url.pathname !== window.location.pathname;
}

export default function RouteTransition() {
  const pathname = usePathname() || "/";
  const [transition, setTransition] = useState(() => ({
    phase: "idle" as TransitionPhase,
    profile: getTransitionProfile(pathname),
  }));
  const initialPathname = useRef(true);
  const fallbackTimer = useRef<number | null>(null);
  const settleTimer = useRef<number | null>(null);

  const clearTimers = () => {
    if (fallbackTimer.current !== null) window.clearTimeout(fallbackTimer.current);
    if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
    fallbackTimer.current = null;
    settleTimer.current = null;
  };

  const resetTransition = () => {
    clearTimers();
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

    if (fallbackTimer.current !== null) window.clearTimeout(fallbackTimer.current);
    fallbackTimer.current = null;
    setTransition((current) => ({
      phase: "revealing",
      profile: current.phase === "idle" ? profile : current.profile,
    }));
    settleTimer.current = window.setTimeout(() => {
      setTransition({ phase: "idle", profile });
      settleTimer.current = null;
    }, 180);

    return () => {
      if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
    };
  }, [pathname]);

  useEffect(() => {
    // Click is deliberately used instead of pointerdown. On touch screens a
    // pointerdown often starts a scroll gesture, which must never launch a
    // full-viewport navigation overlay.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target instanceof Element ? event.target.closest("a") : null;
      if (!(target instanceof HTMLAnchorElement) || !isInternalNavigation(target)) return;

      const destination = new URL(target.href, window.location.href);
      const profile = getTransitionProfile(destination.pathname);
      clearTimers();
      setTransition({ phase: "prepare", profile });
      window.requestAnimationFrame(() => setTransition({ phase: "covering", profile }));
      document.documentElement.dataset.routeLoading = "true";
      fallbackTimer.current = window.setTimeout(resetTransition, 650);
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
        <span className="route-transition__paper" />
        <span className="route-transition__signal" />
        <span className="route-transition__label">{transition.profile.label}</span>
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
