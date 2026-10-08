"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";

const LazyInkVeilOverlay = dynamic(() => import("../components/InkVeilOverlay"), {
  ssr: false,
});

export interface RouteMeta {
  label: string;
  index: string;
}

export const ROUTE_METADATA: Record<string, RouteMeta> = {
  "/": { label: "Home", index: "00" },
  "/work": { label: "Portfolio", index: "01" },
  "/services": { label: "Services", index: "02" },
  "/about": { label: "About", index: "03" },
  "/insights": { label: "Insights", index: "04" },
  "/contact": { label: "Contact", index: "05" },
  "/privacy-policy": { label: "Privacy Policy", index: "06" },
  "/cookie-policy": { label: "Cookie Policy", index: "07" },
  "/terms-and-conditions": { label: "Terms & Conditions", index: "08" },
};

export function getRouteMeta(pathname: string): RouteMeta {
  if (ROUTE_METADATA[pathname]) {
    return ROUTE_METADATA[pathname]!;
  }
  if (pathname.startsWith("/work/")) {
    return { label: "Case Study", index: "01" };
  }
  if (pathname.startsWith("/insights/")) {
    return { label: "Journal", index: "04" };
  }
  return { label: "Aethelon", index: "00" };
}

export type TransitionStage = "idle" | "cover" | "hold" | "reveal";

interface DestinationState {
  href: string;
  label: string;
  index: string;
}

interface TransitionContextValue {
  stage: TransitionStage;
  destination: DestinationState | null;
  navigate: (href: string, customLabel?: string, customIndex?: string) => void;
  onCoverComplete: () => void;
  onRevealComplete: () => void;
  isCovered: boolean;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useTransitionContext() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("useTransitionContext must be used within a TransitionProvider");
  }
  return ctx;
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const [stage, setStage] = useState<TransitionStage>("idle");
  const [destination, setDestination] = useState<DestinationState | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [overlayReady, setOverlayReady] = useState(false);

  const isNavigating = useRef(false);
  const targetHref = useRef<string | null>(null);
  const fallbackTimer = useRef<number | null>(null);
  const currentPathname = useRef(pathname);

  currentPathname.current = pathname;

  // Warm the InkVeilOverlay chunk only on first user interaction (pointer/touch/key)
  useEffect(() => {
    const activateOverlay = () => {
      setOverlayReady(true);
    };
    window.addEventListener("pointermove", activateOverlay, { once: true, passive: true });
    window.addEventListener("pointerdown", activateOverlay, { once: true, passive: true });
    window.addEventListener("touchstart", activateOverlay, { once: true, passive: true });
    window.addEventListener("keydown", activateOverlay, { once: true, passive: true });
    return () => {
      window.removeEventListener("pointermove", activateOverlay);
      window.removeEventListener("pointerdown", activateOverlay);
      window.removeEventListener("touchstart", activateOverlay);
      window.removeEventListener("keydown", activateOverlay);
    };
  }, []);

  const cleanupFallback = useCallback(() => {
    if (fallbackTimer.current !== null) {
      window.clearTimeout(fallbackTimer.current);
      fallbackTimer.current = null;
    }
  }, []);

  const resetTransition = useCallback(() => {
    cleanupFallback();
    isNavigating.current = false;
    targetHref.current = null;
    setStage("idle");
    setDestination(null);
    document.documentElement.dataset.routeLoading = "false";
  }, [cleanupFallback]);

  // Navigate function triggered by TransitionLink or programmatic calls
  const navigate = useCallback(
    (href: string, customLabel?: string, customIndex?: string) => {
      if (isNavigating.current) return;

      const url = new URL(href, window.location.href);
      const targetPath = url.pathname;

      // Don't navigate to the same exact path and query
      if (targetPath === window.location.pathname && url.search === window.location.search) {
        return;
      }

      const meta = getRouteMeta(targetPath);
      const dest: DestinationState = {
        href,
        label: customLabel || meta.label,
        index: customIndex || meta.index,
      };

      setOverlayReady(true);
      isNavigating.current = true;
      targetHref.current = targetPath;
      setDestination(dest);
      setStage("cover");
      document.documentElement.dataset.routeLoading = "true";

      // 1.5s fail-safe fallback so UI never gets stuck
      cleanupFallback();
      fallbackTimer.current = window.setTimeout(() => {
        resetTransition();
      }, 1500);
    },
    [cleanupFallback, resetTransition]
  );

  // Called when the Cover animation finishes and reaches the Hold stage
  const onCoverComplete = useCallback(() => {
    setStage("hold");

    // Execute route push while covered
    if (destination) {
      router.push(destination.href);
    }

    // Reset scroll to top while screen is completely covered
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [destination, router]);

  // When pathname changes, we transition from Hold to Reveal
  useEffect(() => {
    if (!isNavigating.current) return;

    if (stage === "hold" || stage === "cover") {
      setStage("reveal");

      // Accessibility: Focus the new page's h1
      window.requestAnimationFrame(() => {
        const h1 = document.querySelector("h1");
        if (h1) {
          h1.tabIndex = -1;
          h1.focus({ preventScroll: true });
        }
      });
    }
  }, [pathname, stage]);

  // Called when the Reveal animation finishes
  const onRevealComplete = useCallback(() => {
    if (destination) {
      setAnnouncement(`Navigated to ${destination.label}`);
    }

    // Dispatch page-reveal event for content hooks
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("aethelon:page-reveal"));
    }

    resetTransition();
  }, [destination, resetTransition]);

  // Browser back/forward navigation (popstate)
  useEffect(() => {
    const onPopState = () => {
      // Trigger a rapid reveal crossfade for history navigation
      const meta = getRouteMeta(window.location.pathname);
      setOverlayReady(true);
      setDestination({
        href: window.location.pathname,
        label: meta.label,
        index: meta.index,
      });
      setStage("reveal");
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Global Progressive Enhancement: intercept standard internal <a> clicks
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target instanceof Element ? event.target.closest("a") : null;
      if (!(target instanceof HTMLAnchorElement)) return;

      if (target.target === "_blank" || target.hasAttribute("download")) return;
      if (target.getAttribute("rel") === "external") return;

      const href = target.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname && url.search === window.location.search) {
          return;
        }

        // Intercept and run Ink Veil transition
        event.preventDefault();
        navigate(href);
      } catch {
        // Fall back to default behavior for invalid URLs
      }
    };

    document.addEventListener("click", handleGlobalClick, true);
    return () => document.removeEventListener("click", handleGlobalClick, true);
  }, [navigate]);

  return (
    <TransitionContext.Provider
      value={{
        stage,
        destination,
        navigate,
        onCoverComplete,
        onRevealComplete,
        isCovered: stage === "hold" || stage === "reveal",
      }}
    >
      {(overlayReady || stage !== "idle") && <LazyInkVeilOverlay />}
      {children}
      {/* Screen reader live announcement */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
    </TransitionContext.Provider>
  );
}
