import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:35s] [--gap:1.5rem] w-full",
        {
          "flex-row flex-nowrap items-center": !vertical,
          "flex-col": vertical,
        },
        className
      )}
      style={{
        display: "flex",
        flexDirection: vertical ? "column" : "row",
        flexWrap: "nowrap",
        alignItems: "center",
        overflow: "hidden",
        whiteSpace: "nowrap",
        gap: "var(--gap)",
        ...props.style,
      }}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around", {
              "animate-marquee flex-row flex-nowrap items-center": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
            })}
            style={{
              display: "inline-flex",
              flexDirection: vertical ? "column" : "row",
              flexWrap: "nowrap",
              alignItems: "center",
              flexShrink: 0,
              gap: "var(--gap)",
              animationDirection: reverse ? "reverse" : "normal",
            }}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

export default Marquee;

