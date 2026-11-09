import { BedSingle, Sofa, Users } from "lucide-react";

import { MAX_GUESTS, siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Sleeping() {
  const { t, l } = useI18n();
  const { facts } = siteConfig;
  return (
    <section id="rooms" className="bg-sand">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading eyebrow={t.sleep.eyebrow} title={t.sleep.title}>
          <p>{l(siteConfig.sleepingNote)}</p>
        </SectionHeading>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {siteConfig.rooms.map((room, i) => {
            const Icon = room.kind === "sofa" ? Sofa : BedSingle;
            return (
              <Reveal
                key={i}
                delay={i * 70}
                className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft"
              >
                <div className="flex gap-1 text-primary">
                  <Icon className="size-6" aria-hidden="true" />
                  {room.kind === "bed" ? <Icon className="size-6" aria-hidden="true" /> : null}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{l(room.name)}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{l(room.beds)}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span>
            <strong className="text-foreground">{facts.beds}</strong> {t.sleep.beds}
          </span>
          <span>
            <strong className="text-foreground">{facts.bedrooms}</strong> {t.sleep.bedrooms}
          </span>
          <span>
            <strong className="text-foreground">{facts.bathrooms}</strong> {t.sleep.bathrooms}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-4 text-primary" aria-hidden="true" />
            {t.sleep.upTo} <strong className="text-foreground">{MAX_GUESTS}</strong> {t.sleep.guests}
          </span>
        </Reveal>
      </div>
    </section>
  );
}
