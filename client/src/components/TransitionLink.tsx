"use client";

import React, { forwardRef, type ComponentPropsWithoutRef, type MouseEvent } from "react";
import Link from "next/link";
import { useTransitionContext } from "../contexts/TransitionContext";

export interface TransitionLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  transitionLabel?: string;
  transitionIndex?: string;
}

export const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  function TransitionLink(
    { href, transitionLabel, transitionIndex, onClick, children, ...props },
    ref
  ) {
    const { navigate } = useTransitionContext();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      // Call custom onClick if provided
      if (onClick) onClick(e);

      // Check if prevented or modified click
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const hrefString = typeof href === "object" ? href.pathname || "" : href;

      // Check for external or anchor links
      if (!hrefString || hrefString.startsWith("#") || hrefString.startsWith("mailto:") || hrefString.startsWith("tel:")) {
        return;
      }

      if (props.target === "_blank" || props.rel === "external" || props.download) {
        return;
      }

      try {
        const url = new URL(hrefString, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname && url.search === window.location.search) {
          return;
        }

        e.preventDefault();
        navigate(hrefString, transitionLabel, transitionIndex);
      } catch {
        // Allow default link behavior for parse errors
      }
    };

    return (
      <Link ref={ref} href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }
);

export default TransitionLink;
