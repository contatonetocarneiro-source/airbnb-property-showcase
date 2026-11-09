import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Amenities() {
  const { t, l } = useI18n();
  return (
    <section id="amenities" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading eyebrow={t.amenities.eyebrow} title={t.amenities.title} />
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {siteConfig.amenities.map((a, i) => {
          const Icon = a.icon;
          return (
            <Reveal
              as="li"
              key={i}
              delay={i * 50}
              className="flex items-center gap-3 rounded-xl border border-border/70 bg-card px-4 py-4"
            >
              <Icon className="size-5 shrink-0 text-secondary" aria-hidden="true" />
              <span className="text-sm font-medium">{l(a.label)}</span>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
