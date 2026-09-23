import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

export interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon?: React.ElementType;
  description: string;
  href?: string;
  cta?: string;
  metric?: ReactNode;
  tag?: string;
}

export function BentoGrid({ children, className, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[20rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta = "Explore specification",
  metric,
  tag,
  ...props
}: BentoCardProps) {
  return (
    <div
      key={name}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[rgba(23,23,23,0.1)] dark:border-[rgba(255,255,255,0.08)] bg-[rgba(243,240,232,0.6)] dark:bg-[rgba(18,19,26,0.7)] backdrop-blur-md p-6 transition-all duration-300 hover:border-orange-500/50 hover:shadow-lg",
        className
      )}
      {...props}
    >
      {background && <div className="absolute inset-0 pointer-events-none opacity-40">{background}</div>}
      
      <div className="z-10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          {tag && (
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground border border-neutral-300/60 dark:border-neutral-700/60 px-2 py-0.5 rounded">
              {tag}
            </span>
          )}
          {Icon && (
            <Icon className="h-5 w-5 text-neutral-600 dark:text-neutral-400 group-hover:text-orange-500 transition-colors" />
          )}
        </div>

        {metric && (
          <div className="mt-2 text-3xl md:text-4xl font-bold font-display tracking-tight text-neutral-900 dark:text-neutral-100 flex items-baseline gap-1">
            {metric}
          </div>
        )}

        <div>
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            {name}
          </h3>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {href && (
        <div className="z-10 mt-4 flex items-center gap-1.5 text-xs font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
          <span>{cta}</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

export default BentoGrid;
