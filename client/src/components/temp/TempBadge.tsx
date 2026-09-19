import React from "react";

interface TempBadgeProps {
  readonly label: string;
  readonly description?: string;
}

export default function TempBadge({ label, description }: TempBadgeProps) {
  return (
    <aside aria-label={`Section variant identifier: ${label}`} className="temp-badge-container">
      <div className="temp-badge-tag">
        <span className="temp-badge-dot" />
        <span className="temp-badge-label">{label}</span>
        {description ? <span className="temp-badge-desc">· {description}</span> : null}
      </div>
    </aside>
  );
}
