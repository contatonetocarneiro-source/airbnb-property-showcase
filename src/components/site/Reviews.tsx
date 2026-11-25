import { Quote } from "lucide-react";

import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Reviews() {
  const { t, l, lang } = useI18n();
  const r = siteConfig.reviews;
  const fmt = (n: number, digits = 1) =>
    n.toLocaleString(lang === "en" ? "en-GB" : lang, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });

  return (
    <section id="reviews" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading eyebrow={t.reviews.eyebrow} title={t.reviews.title} />

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft sm:p-8">
          <div className="flex items-end gap-3">
            <span className="font-display text-6xl leading-none font-semibold">{fmt(r.overall, 1)}</span>
            <span className="pb-1 text-sm text-muted-foreground">{t.reviews.outOf}</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {r.count} {t.guestReviews}
          </p>

          <dl className="mt-8 space-y-3.5">
            {r.categories.map((c, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5">
                <dt className="text-sm">{l(c.label)}</dt>
                <dd className="text-sm font-semibold tabular-nums">{fmt(c.score)}</dd>
                <div className="col-span-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-secondary"
                    style={{ width: `${(c.score / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="flex flex-col gap-4">
          {r.quotes.map((q, i) => (
            <Reveal
              as="figure"
              key={i}
              delay={i * 100}
              className="relative rounded-2xl bg-secondary p-6 text-secondary-foreground shadow-soft sm:p-8"
            >
              <Quote className="size-7 text-accent opacity-70" aria-hidden="true" />
              <blockquote className="mt-3 font-display text-2xl leading-snug text-balance sm:text-3xl">
                “{l(q.text)}”
              </blockquote>
              <figcaption className="mt-4 text-sm text-secondary-foreground/80">— {q.author}</figcaption>
            </Reveal>
          ))}
          <p className="text-xs text-muted-foreground">{t.reviews.source}</p>
        </div>
      </div>
    </section>
  );
}
