import { useId } from "react";

import { cn } from "@/lib/utils";

/**
 * A quiet row of Mezquita-style horseshoe arches with alternating voussoirs.
 * Purely decorative.
 */
export function ArchDivider({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const arc = "M9.34 19 A10 10 0 1 1 26.66 19";
  return (
    <div className={cn("pointer-events-none select-none", className)} aria-hidden="true">
      <svg width="100%" height="30" className="block">
        <defs>
          <pattern id={`arch-${id}`} width="36" height="30" patternUnits="userSpaceOnUse">
            <path d="M9.34 30 V19" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
            <path d="M26.66 30 V19" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
            <path d={arc} stroke="var(--accent)" strokeWidth="3.5" fill="none" />
            <path
              d={arc}
              stroke="var(--primary)"
              strokeOpacity="0.55"
              strokeWidth="3.5"
              strokeDasharray="2.7 2.7"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="30" fill={`url(#arch-${id})`} />
      </svg>
    </div>
  );
}
