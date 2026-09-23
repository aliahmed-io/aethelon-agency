"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FocusCardItem {
  title: string;
  category: string;
  src: string;
  href: string;
  techStack: string[];
  metrics: string;
  description: string;
}

export const FocusCards = ({ cards }: { cards: FocusCardItem[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
      {cards.map((card, index) => (
        <Link
          key={card.title}
          href={card.href}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className={cn(
            "group relative rounded-2xl overflow-hidden bg-neutral-950 aspect-[4/5] md:aspect-[3/4] transition-all duration-500 ease-out border border-neutral-800/80 block",
            hovered !== null && hovered !== index && "blur-[2px] scale-[0.98] opacity-70"
          )}
        >
          <Image
            src={card.src}
            alt={card.title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

          {/* Top metadata tags */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
              {card.category}
            </span>
            <span className="text-[11px] font-mono text-orange-400 bg-orange-950/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-orange-500/20">
              {card.metrics}
            </span>
          </div>

          {/* Bottom content info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white tracking-tight font-display">
                {card.title}
              </h3>
              <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-orange-600 transition-colors">
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <p className="mt-2 text-xs text-neutral-300 line-clamp-2 leading-relaxed">
              {card.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
              {card.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FocusCards;
