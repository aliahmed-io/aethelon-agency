"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useRevealOnEnter() {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const runReveal = () => {
      const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const root = containerRef.current ?? document;

      // 1. Headline reveals
      const headlines = root.querySelectorAll<HTMLElement>('[data-reveal="headline"]');
      if (headlines.length > 0) {
        if (isReducedMotion) {
          gsap.set(headlines, { opacity: 1, y: 0 });
        } else {
          gsap.fromTo(
            headlines,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.07,
              ease: "power3.out",
              clearProps: "transform,opacity",
            }
          );
        }
      }

      // 2. Card deck / section staggers
      const cards = root.querySelectorAll<HTMLElement>('[data-reveal="cards"]');
      if (cards.length > 0) {
        if (isReducedMotion) {
          gsap.set(cards, { opacity: 1, scale: 1 });
        } else {
          gsap.fromTo(
            cards,
            { scale: 0.96, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.45,
              stagger: 0.08,
              ease: "power2.out",
              clearProps: "transform,opacity",
            }
          );
        }
      }
    };

    // Fire immediately on direct/hard load so text is never invisible
    // Use a short rAF delay so the DOM is fully painted first
    const rafId = requestAnimationFrame(() => {
      runReveal();
    });

    // Also listen for the post-transition reveal event (subsequent navigations)
    window.addEventListener("aethelon:page-reveal", runReveal);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("aethelon:page-reveal", runReveal);
    };
  }, []);

  return containerRef;
}

export default useRevealOnEnter;
