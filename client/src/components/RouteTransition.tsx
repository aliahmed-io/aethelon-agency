"use client";

// Paper Signal style: navigation feedback is a single precise signal, never a blocking overlay or a decorative loading screen.
import { useEffect } from "react";
import { usePathname } from "next/navigation";

function isInternalNavigation(anchor: HTMLAnchorElement) {
  if (anchor.target === "_blank" || anchor.hasAttribute("download")) return false;
  if (anchor.getAttribute("rel") === "external") return false;
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  const url = new URL(href, window.location.href);
  return url.origin === window.location.origin && url.pathname !== window.location.pathname;
}

export default function RouteTransition() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.dataset.routeLoading = "false";
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a") : null;
      if (target instanceof HTMLAnchorElement && isInternalNavigation(target)) {
        document.documentElement.dataset.routeLoading = "true";
      }
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [pathname]);

  return <div className="route-progress" role="status" aria-live="polite" aria-label="Loading next page" />;
}
