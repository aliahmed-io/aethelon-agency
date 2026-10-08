"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { useTransitionContext } from "../contexts/TransitionContext";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
  baseAlpha: number;
  color: string;
}

const GOLD_PALETTE = ["#e5b842", "#d4af37", "#f5be47", "#ffe082", "#ff9e2c"];

export default function InkVeilOverlay() {
  const { stage, destination, onCoverComplete, onRevealComplete } = useTransitionContext();

  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const topPathRef = useRef<SVGPathElement>(null);
  const bottomPathRef = useRef<SVGPathElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleMaskRef = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLHeadingElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const isReducedMotion = useRef(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotion.current = media.matches;
    const listener = (e: MediaQueryListEvent) => {
      isReducedMotion.current = e.matches;
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // -------------------------------------------------------------
  // GOLD DUST PARTICLE CANVAS ENGINE
  // -------------------------------------------------------------
  const initParticles = useCallback((width: number, height: number) => {
    const isMobile = width < 768;
    const count = isMobile ? 80 : 250;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const baseAlpha = Math.random() * 0.75 + 0.25;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.95 + height * 0.05,
        size: Math.random() * 2.2 + 0.8,
        speedY: -(Math.random() * 1.8 + 0.8),
        speedX: (Math.random() - 0.5) * 0.7,
        alpha: baseAlpha,
        baseAlpha,
        color: GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)]!,
      });
    }
    particlesRef.current = particles;
  }, []);

  const startParticleLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isReducedMotion.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    initParticles(width, height);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        p.y += p.speedY;
        p.x += p.speedX;

        // Wrap around bottom if floated above top
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = "#e5b842";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
    }
    animFrameRef.current = requestAnimationFrame(render);
  }, [initParticles]);

  const stopParticleLoop = useCallback(() => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  // -------------------------------------------------------------
  // GSAP STAGE CHOREOGRAPHY
  // -------------------------------------------------------------
  useEffect(() => {
    const container = containerRef.current;
    const panel = panelRef.current;
    const topPath = topPathRef.current;
    const bottomPath = bottomPathRef.current;
    const label = labelRef.current;
    const titleText = titleTextRef.current;
    const dot = dotRef.current;
    const canvas = canvasRef.current;
    const routePage = document.querySelector(".route-page") as HTMLElement | null;

    if (!container || !panel) return;

    // 1. COVER STAGE (0 to 0.6s)
    if (stage === "cover") {
      gsap.killTweensOf([panel, topPath, bottomPath, label, titleText, dot, routePage]);

      container.style.pointerEvents = "all";
      container.style.visibility = "visible";

      if (isReducedMotion.current) {
        // Reduced motion: instantaneous fade
        gsap.to(container, {
          opacity: 1,
          duration: 0.2,
          onComplete: () => onCoverComplete(),
        });
        return;
      }

      // Initial state
      gsap.set(panel, { yPercent: 100 });
      gsap.set(label, { opacity: 0, y: 12 });
      gsap.set(titleText, { yPercent: 100 });
      gsap.set(dot, { scale: 0, opacity: 0 });
      if (canvas) gsap.set(canvas, { opacity: 0 });

      // Curve initial: curved leading edge
      if (topPath) {
        gsap.set(topPath, {
          attr: { d: "M 0,24 Q 50,0 100,24 L 100,24 L 0,24 Z" },
        });
      }

      // Nudge up and dim current page content
      if (routePage) {
        gsap.to(routePage, {
          y: -18,
          opacity: 0.85,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      const coverTl = gsap.timeline({
        onComplete: () => {
          onCoverComplete();
        },
      });

      // Panel rises from bottom (0 to 0.6s) with strong ease cubic-bezier(0.76, 0, 0.24, 1)
      coverTl.to(
        panel,
        {
          yPercent: 0,
          duration: 0.6,
          ease: "cubic-bezier(0.76, 0, 0.24, 1)",
        },
        0
      );

      // Curve flattens as panel hits full coverage
      if (topPath) {
        coverTl.to(
          topPath,
          {
            attr: { d: "M 0,24 Q 50,24 100,24 L 100,24 L 0,24 Z" },
            duration: 0.45,
            ease: "power2.inOut",
          },
          0.15
        );
      }
    }

    // 2. HOLD STAGE (0.6 to 0.9s)
    if (stage === "hold") {
      if (isReducedMotion.current) return;

      // Start gold dust particles
      startParticleLoop();
      if (canvas) {
        gsap.to(canvas, { opacity: 1, duration: 0.25 });
      }

      const holdTl = gsap.timeline();

      // Mono label fades in
      if (label) {
        holdTl.to(
          label,
          {
            opacity: 1,
            y: 0,
            duration: 0.22,
            ease: "power2.out",
          },
          0
        );
      }

      // Big tight headline rises out of line mask
      if (titleText) {
        holdTl.to(
          titleText,
          {
            yPercent: 0,
            duration: 0.28,
            ease: "power3.out",
          },
          0.04
        );
      }

      // Orange dot pops in last with spring scale
      if (dot) {
        holdTl.to(
          dot,
          {
            scale: 1,
            opacity: 1,
            duration: 0.22,
            ease: "back.out(2)",
          },
          0.16
        );
      }
    }

    // 3. REVEAL STAGE (0.9 to 1.3s)
    if (stage === "reveal") {
      if (isReducedMotion.current) {
        gsap.to(container, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            container.style.visibility = "hidden";
            container.style.pointerEvents = "none";
            onRevealComplete();
          },
        });
        return;
      }

      // Reset page position for new destination
      if (routePage) {
        gsap.set(routePage, { y: 16, opacity: 0.92 });
      }

      // Prepare curved trailing edge at bottom
      if (bottomPath) {
        gsap.set(bottomPath, {
          attr: { d: "M 0,0 Q 50,0 100,0 L 100,0 L 0,0 Z" },
        });
      }

      const revealTl = gsap.timeline({
        onComplete: () => {
          stopParticleLoop();
          container.style.visibility = "hidden";
          container.style.pointerEvents = "none";
          gsap.set(panel, { yPercent: 100 });
          onRevealComplete();
        },
      });

      // Destination text fades out quickly as sweep continues upward
      if (label) {
        revealTl.to(label, { opacity: 0, y: -10, duration: 0.16, ease: "power2.in" }, 0);
      }
      if (titleText) {
        revealTl.to(titleText, { yPercent: -80, opacity: 0.3, duration: 0.18, ease: "power2.in" }, 0.02);
      }
      if (canvas) {
        revealTl.to(canvas, { opacity: 0, duration: 0.22 }, 0.08);
      }

      // Panel sweeps upward in the same direction off top (-100%)
      revealTl.to(
        panel,
        {
          yPercent: -100,
          duration: 0.42,
          ease: "cubic-bezier(0.76, 0, 0.24, 1)",
        },
        0.04
      );

      // Trailing curve arcs upward as it exits
      if (bottomPath) {
        revealTl.to(
          bottomPath,
          {
            attr: { d: "M 0,0 Q 50,22 100,0 L 100,0 L 0,0 Z" },
            duration: 0.32,
            ease: "power2.inOut",
          },
          0.04
        );
      }

      // New page smoothly lands in
      if (routePage) {
        revealTl.to(
          routePage,
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
          },
          0.12
        );
      }
    }

    // 4. IDLE
    if (stage === "idle") {
      container.style.visibility = "hidden";
      container.style.pointerEvents = "none";
      stopParticleLoop();
    }
  }, [stage, onCoverComplete, onRevealComplete, startParticleLoop, stopParticleLoop]);

  const displayIndex = destination?.index || "00";
  const displayLabel = destination?.label || "Aethelon";

  return (
    <div
      ref={containerRef}
      className={`ink-veil-container route-transition route-transition--${stage}`}
      data-variant={destination?.label?.toLowerCase() || "arrival"}
      aria-hidden={stage === "idle"}
      style={{ visibility: "hidden", pointerEvents: "none" }}
    >
      {/* The Continuous Sweep Panel */}
      <div ref={panelRef} className="ink-veil-panel">
        {/* Leading Top Curve */}
        <svg
          className="ink-veil-cap ink-veil-cap--top"
          viewBox="0 0 100 24"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={topPathRef}
            d="M 0,24 Q 50,24 100,24 L 100,24 L 0,24 Z"
            fill="currentColor"
          />
        </svg>

        {/* Content Box */}
        <div className="ink-veil-content">
          {/* Mono Micro-Label (Echoes "BESPOKE COMMERCE" style) */}
          <div ref={labelRef} className="ink-veil-mono">
            <span className="ink-veil-badge-idx">{displayIndex}</span>
            <span className="ink-veil-badge-sep">/</span>
            <span className="ink-veil-badge-text">{displayLabel.toUpperCase()}</span>
          </div>

          {/* Big Tight Headline with Line Mask */}
          <div ref={titleMaskRef} className="ink-veil-headline-mask">
            <h2 ref={titleTextRef} className="ink-veil-headline">
              {displayLabel}
              <span ref={dotRef} className="ink-veil-dot">
                .
              </span>
            </h2>
          </div>
        </div>

        {/* Gold Dust Particles Canvas */}
        <canvas ref={canvasRef} className="ink-veil-canvas" aria-hidden="true" />

        {/* Trailing Bottom Curve */}
        <svg
          className="ink-veil-cap ink-veil-cap--bottom"
          viewBox="0 0 100 24"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={bottomPathRef}
            d="M 0,0 Q 50,0 100,0 L 100,0 L 0,0 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
