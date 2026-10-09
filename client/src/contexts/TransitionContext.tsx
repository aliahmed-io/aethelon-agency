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
import { useRouter } from "next/navigation";
import InkVeilOverlay, {
  GRID_COLS,
  GRID_ROWS,
  TOTAL_TILES,
  WIPE_SPEED_MS,
  HOLD_DURATION_MS,
  JITTER_RATIO,
  generateRadialWaveIndices,
} from "../components/InkVeilOverlay";

export interface RouteMeta {
  label: string;
  subtitle: string;
  index: string;
}

export const ROUTE_METADATA: Record<string, RouteMeta> = {
  "/": { label: "Aethelon", subtitle: "BESPOKE COMMERCE STUDIO", index: "00" },
  "/work": { label: "Portfolio", subtitle: "PRODUCTION ARCHIVE", index: "01" },
  "/services": { label: "Services", subtitle: "PACKAGES & PRICING", index: "02" },
  "/about": { label: "About", subtitle: "DIRECT PRINCIPAL ENGINEER", index: "03" },
  "/insights": { label: "Insights", subtitle: "COMMERCE RESEARCH", index: "04" },
  "/contact": { label: "Contact", subtitle: "$400 MILESTONE ONBOARDING", index: "05" },
  "/privacy-policy": { label: "Privacy", subtitle: "LEGAL & DATA GOVERNANCE", index: "06" },
  "/privacy": { label: "Privacy", index: "06", subtitle: "LEGAL & DATA GOVERNANCE" },
  "/cookie-policy": { label: "Cookies", subtitle: "STORAGE PREFERENCES", index: "07" },
  "/cookies": { label: "Cookies", subtitle: "STORAGE PREFERENCES", index: "07" },
  "/terms-and-conditions": { label: "Terms", subtitle: "STUDIO ENGAGEMENT TERMS", index: "08" },
  "/terms": { label: "Terms", subtitle: "STUDIO ENGAGEMENT TERMS", index: "08" },
};

const CASE_STUDY_TITLES: Record<string, RouteMeta> = {
  "aethelon-furniture-commerce": {
    label: "Aethelon",
    subtitle: "SPATIAL FURNITURE FLAGSHIP",
    index: "01",
  },
  "oakwell-furniture-commerce": {
    label: "Oakwell",
    subtitle: "HEIRLOOM TIMBER COMMERCE",
    index: "02",
  },
  "velorum-watch-commerce": {
    label: "Velorum",
    subtitle: "SWISS HOROLOGY FLAGSHIP",
    index: "03",
  },
  "novexa-product-commerce": {
    label: "Novexa",
    subtitle: "PERFORMANCE FOOTWEAR",
    index: "04",
  },
  "atelier-lumiere": {
    label: "Atelier Lumière",
    subtitle: "ARCHITECTURAL LIGHTING",
    index: "05",
  },
  "the-monolith": {
    label: "The Monolith",
    subtitle: "BAUHAUS SPATIAL SHOWCASE",
    index: "06",
  },
  "maison-lumiere": {
    label: "Maison Lumière",
    subtitle: "BOTANICAL HAUTE PARFUMS",
    index: "07",
  },
  "vantiq-menswear": {
    label: "Vantiq",
    subtitle: "BESPOKE TAILORING ENGINE",
    index: "08",
  },
  "vonex-eyewear": {
    label: "Vonex",
    subtitle: "TITANIUM OPTICS STUDIO",
    index: "09",
  },
  "artura-galleries": {
    label: "Artura",
    subtitle: "CURATED DESIGN COLLECTIVE",
    index: "10",
  },
};

export function getRouteMeta(pathname: string): RouteMeta {
  if (ROUTE_METADATA[pathname]) {
    return ROUTE_METADATA[pathname]!;
  }
  if (pathname.startsWith("/work/")) {
    const slug = pathname.replace("/work/", "").split("/")[0] || "";
    if (CASE_STUDY_TITLES[slug]) {
      return CASE_STUDY_TITLES[slug]!;
    }
    const formatted = slug
      .replace(/-commerce$/, "")
      .split("-")
      .slice(0, 2)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      label: formatted || "Case Study",
      subtitle: "CASE STUDY SPECIMEN",
      index: "01",
    };
  }
  if (pathname.startsWith("/insights/")) {
    return {
      label: "Field Note",
      subtitle: "TECHNICAL MONOGRAPH",
      index: "04",
    };
  }
  return { label: "Aethelon", subtitle: "BESPOKE COMMERCE STUDIO", index: "00" };
}

export type TransitionStage = "idle" | "cover" | "hold" | "reveal";

interface DestinationState {
  href: string;
  label: string;
  subtitle: string;
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
  const [stage, setStage] = useState<TransitionStage>("idle");
  const [destination, setDestination] = useState<DestinationState | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const tileRefs = useRef<Array<HTMLDivElement | null>>([]);
  const hudRef = useRef<HTMLDivElement | null>(null);
  const indexTextRef = useRef<HTMLSpanElement | null>(null);
  const subtitleTextRef = useRef<HTMLSpanElement | null>(null);
  const titleTextRef = useRef<HTMLSpanElement | null>(null);

  const timersRef = useRef<number[]>([]);
  const isNavigating = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const clearAllTimers = useCallback(() => {
    for (const id of timersRef.current) {
      window.clearTimeout(id);
    }
    timersRef.current = [];
  }, []);

  // Exact Web Audio synthesized shutter click from Inkfish reference
  const playShutterClick = useCallback((pitch = 380, volume = 0.05) => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      const audioCtx = audioCtxRef.current;
      if (!audioCtx) return;
      if (audioCtx.state === "suspended") {
        void audioCtx.resume().catch(() => {});
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(volume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch {
      // Safe fail for browser audio policies
    }
  }, []);

  // Direct single-timeline Inkfish Grid Dissolve + Editorial HUD + Next.js route swap
  const navigate = useCallback(
    (href: string, customLabel?: string, customIndex?: string) => {
      if (isNavigating.current) return;

      const url = new URL(href, window.location.href);
      const targetPath = url.pathname;
      const fullTarget = url.pathname + url.search + url.hash;

      if (targetPath === window.location.pathname && url.search === window.location.search) {
        return;
      }

      const meta = getRouteMeta(targetPath);
      const dest: DestinationState = {
        href: fullTarget,
        label: customLabel || meta.label,
        subtitle: meta.subtitle,
        index: customIndex || meta.index,
      };

      // Prefetch target route immediately so midpoint swap is instantaneous
      try {
        router.prefetch(fullTarget);
      } catch {
        // Ignore prefetch error
      }

      const container = containerRef.current;
      const tiles = tileRefs.current;
      const hud = hudRef.current;

      // Fallback if container isn't available or reduced motion is preferred
      if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(fullTarget);
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        return;
      }

      clearAllTimers();
      isNavigating.current = true;
      setDestination(dest);
      setStage("cover");
      document.documentElement.dataset.routeLoading = "true";

      // Update Editorial HUD text directly in DOM before showing
      if (indexTextRef.current) indexTextRef.current.textContent = `[${dest.index}]`;
      if (subtitleTextRef.current) subtitleTextRef.current.textContent = dest.subtitle;
      if (titleTextRef.current) titleTextRef.current.textContent = dest.label;

      // Reset tiles & HUD state, then activate overlay
      for (let i = 0; i < TOTAL_TILES; i++) {
        tiles[i]?.classList.remove("revealed");
      }
      if (hud) {
        hud.classList.remove("is-visible", "is-exiting");
      }
      container.classList.add("active");

      const coverDuration = WIPE_SPEED_MS; // 340ms
      const stepDelay = coverDuration / TOTAL_TILES;
      const coverSequence = generateRadialWaveIndices(
        GRID_COLS,
        GRID_ROWS,
        "center-out",
        JITTER_RATIO
      );

      playShutterClick(420, 0.06);

      // PHASE 1: Center blocks fill first, perimeter blocks stagger in (0 -> 340ms)
      coverSequence.forEach((tileIdx, step) => {
        const t = window.setTimeout(() => {
          tiles[tileIdx]?.classList.add("revealed");
          if (step % Math.floor(TOTAL_TILES / 6) === 0) {
            playShutterClick(280 + step * 2.2, 0.018);
          }
        }, step * stepDelay);
        timersRef.current.push(t);
      });

      // PHASE 1B: Reveal centered Editorial HUD as soon as center iris consolidates (~85ms)
      const hudShowTimer = window.setTimeout(() => {
        if (hud) {
          hud.classList.add("is-visible");
        }
      }, 85);
      timersRef.current.push(hudShowTimer);

      // PHASE 2: Route Swap at 370ms while screen is 100% covered
      const swapWait = coverDuration + 30;
      const swapTimer = window.setTimeout(() => {
        setStage("hold");
        router.push(fullTarget);
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }, swapWait);
      timersRef.current.push(swapTimer);

      // PHASE 3: Hold HUD on screen so the title is clearly legible, then dissolve out at 750ms
      const revealStartWait = swapWait + HOLD_DURATION_MS; // 370 + 380 = 750ms

      const revealTimer = window.setTimeout(() => {
        setStage("reveal");
        if (hud) {
          hud.classList.remove("is-visible");
          hud.classList.add("is-exiting");
        }

        const uncoverSequence = generateRadialWaveIndices(
          GRID_COLS,
          GRID_ROWS,
          "center-out",
          JITTER_RATIO
        );
        const uncoverDuration = Math.round(coverDuration * 0.9); // 306ms
        const uncoverStepDelay = uncoverDuration / TOTAL_TILES;

        uncoverSequence.forEach((tileIdx, step) => {
          const t = window.setTimeout(() => {
            tiles[tileIdx]?.classList.remove("revealed");
            if (step % Math.floor(TOTAL_TILES / 6) === 0) {
              playShutterClick(480 - step * 2.2, 0.018);
            }
          }, 25 + step * uncoverStepDelay);
          timersRef.current.push(t);
        });

        // PHASE 4: Clean up after uncover finishes
        const endTimer = window.setTimeout(() => {
          container.classList.remove("active");
          if (hud) {
            hud.classList.remove("is-visible", "is-exiting");
          }
          for (let i = 0; i < TOTAL_TILES; i++) {
            tiles[i]?.classList.remove("revealed");
          }
          isNavigating.current = false;
          setStage("idle");
          setDestination(null);
          setAnnouncement(`Navigated to ${dest.label}`);
          document.documentElement.dataset.routeLoading = "false";
        }, 25 + uncoverDuration + 100);
        timersRef.current.push(endTimer);
      }, revealStartWait);

      timersRef.current.push(revealTimer);
    },
    [clearAllTimers, playShutterClick, router]
  );

  // Clean up timers on unmount
  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  // Global Progressive Enhancement: intercept internal <a> clicks across the entire site
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

        event.preventDefault();
        navigate(href);
      } catch {
        // Fall back to default browser navigation
      }
    };

    document.addEventListener("click", handleGlobalClick, true);
    return () => document.removeEventListener("click", handleGlobalClick, true);
  }, [navigate]);

  const noop = useCallback(() => {}, []);

  return (
    <TransitionContext.Provider
      value={{
        stage,
        destination,
        navigate,
        onCoverComplete: noop,
        onRevealComplete: noop,
        isCovered: stage !== "idle",
      }}
    >
      <InkVeilOverlay
        containerRef={containerRef}
        tileRefs={tileRefs}
        hudRef={hudRef}
        indexTextRef={indexTextRef}
        subtitleTextRef={subtitleTextRef}
        titleTextRef={titleTextRef}
      />
      {children}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
    </TransitionContext.Provider>
  );
}
