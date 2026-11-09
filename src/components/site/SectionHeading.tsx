import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
  className,
  tone = "default",
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
  tone?: "default" | "inverse";
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("eyebrow", tone === "inverse" && "text-accent")}>{eyebrow}</p>
      <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance sm:text-4xl">{title}</h2>
      {children ? (
        <div
          className={cn(
            "mt-4 text-base leading-relaxed",
            tone === "inverse" ? "text-secondary-foreground/80" : "text-muted-foreground",
          )}
        >
          {children}
        </div>
      ) : null}
    </Reveal>
  );
}
