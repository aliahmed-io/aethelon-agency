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
    <div className={cn("bento-grid", className)} {...props}>
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
    <div className={cn("bento-card", className)} {...props}>
      {background && <div className="bento-bg-layer">{background}</div>}

      <div>
        <div className="bento-card-top">
          {tag && <span className="bento-tag">{tag}</span>}
          {Icon && <Icon className="bento-icon" />}
        </div>

        {metric && <div className="bento-metric-wrap">{metric}</div>}

        <h3 className="bento-title">{name}</h3>
        <p className="bento-desc">{description}</p>
      </div>

      {href && (
        <a href={href} className="bento-cta-row">
          <span>{cta}</span>
          <ArrowUpRight size={14} />
        </a>
      )}
    </div>
  );
}

export default BentoGrid;
