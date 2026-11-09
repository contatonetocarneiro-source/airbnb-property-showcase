import { lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const LocationMap = lazy(() =>
  import("./LocationMap").then((m) => ({ default: m.LocationMap })),
);

export function Location() {
  const { t, l } = useI18n();
  const loc = siteConfig.location;
  const fallback = <div className="size-full animate-pulse bg-muted" />;

  return (
    <section id="location" className="bg-sand">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div>
          <SectionHeading eyebrow={t.location.eyebrow} title={t.location.title}>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              {t.location.note}
            </p>
          </SectionHeading>

          <Reveal className="mt-8">
            <h3 className="eyebrow">{t.location.nearby}</h3>
            <ul className="mt-4 space-y-3">
              {loc.nearby.map((n, i) => {
                const Icon = n.icon;
                return (
                  <li key={i} className="flex items-center gap-3">
                    <span className="inline-flex size-9 items-center justify-center rounded-lg bg-card text-secondary shadow-soft">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-medium">{l(n.label)}</span>
                      <span className="block text-sm text-muted-foreground">{l(n.detail)}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal className="relative z-0 aspect-[4/3] overflow-hidden rounded-2xl border border-border/70 shadow-lifted lg:aspect-[5/4]">
          <ClientOnly fallback={fallback}>
            <Suspense fallback={fallback}>
              <LocationMap
                lat={loc.lat}
                lng={loc.lng}
                radius={loc.radiusMeters}
                zoom={loc.zoom}
                label={l(loc.area)}
              />
            </Suspense>
          </ClientOnly>
        </Reveal>
      </div>
    </section>
  );
}
