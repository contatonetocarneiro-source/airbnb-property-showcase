import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "./Reveal";

export function Highlights() {
  const { t, l } = useI18n();
  return (
    <section aria-label={t.highlights.eyebrow} className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="eyebrow">{t.highlights.eyebrow}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3 md:gap-6">
        {siteConfig.highlights.map((h, i) => {
          const Icon = h.icon;
          return (
            <Reveal
              key={i}
              delay={i * 90}
              className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{l(h.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l(h.text)}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
