"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  showMark?: boolean;
}

export function BrandLogo({
  className,
  showMark = false,
}: BrandLogoProps) {
  return (
    <span className={cn("brand-lockup", className)}>
      {showMark && (
        <svg
          width={28}
          height={28}
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="brand-logo-mark"
          aria-hidden="true"
        >
          <rect width="28" height="28" rx="7" className="brand-logo-bg" />
          <path
            d="M6 20.5L10.5 7.5H12.5L17 20.5H14.8L13.7 17.2H9.3L8.2 20.5H6ZM10 14.8H13L11.5 10.4L10 14.8Z"
            className="brand-logo-glyph"
          />
          <path
            d="M17.5 7.5H21.5V9.4H19.3V13H21.2V14.8H19.3V18.6H21.5V20.5H17.5V7.5Z"
            className="brand-logo-glyph"
          />
          <line
            x1="22.5"
            y1="20.5"
            x2="25"
            y2="7.5"
            stroke="var(--orange-contrast, #bd3b05)"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="brand-logo-slash"
          />
        </svg>
      )}

      {/* Primary Brand Wordmark: Capital 'A', Display weight, with signature orange accent dot */}
      <span className="brand-wordmark">
        Aethelon
        <span className="brand-accent-dot">.</span>
      </span>
    </span>
  );
}

export default BrandLogo;
