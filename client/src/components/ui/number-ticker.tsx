"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number;
  startValue?: number;
  direction?: "up" | "down";
  delay?: number;
  decimalPlaces?: number;
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = formatter.format(
        Number((direction === "down" ? startValue : value).toFixed(decimalPlaces))
      );
      return;
    }

    let rafId: number | null = null;
    let delayTimer: ReturnType<typeof setTimeout> | null = null;

    const from = direction === "down" ? value : startValue;
    const to = direction === "down" ? startValue : value;
    const duration = 900;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || !entry.isIntersecting) return;
        observer.disconnect();

        const startAnim = () => {
          const startTime = performance.now();
          const tick = (now: number) => {
            const progress = Math.min(1, (now - startTime) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = from + (to - from) * eased;
            if (ref.current) {
              ref.current.textContent = formatter.format(
                Number(current.toFixed(decimalPlaces))
              );
            }
            if (progress < 1) {
              rafId = requestAnimationFrame(tick);
            }
          };
          rafId = requestAnimationFrame(tick);
        };

        if (delay > 0) {
          delayTimer = setTimeout(startAnim, delay * 1000);
        } else {
          startAnim();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (delayTimer !== null) clearTimeout(delayTimer);
    };
  }, [value, startValue, direction, delay, decimalPlaces]);

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block tracking-tight tabular-nums font-mono",
        className
      )}
      {...props}
    >
      {value}
    </span>
  );
}

export default NumberTicker;
