import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function GoodToKnow() {
  const { t, l } = useI18n();
  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading eyebrow={t.goodToKnow.eyebrow} title={t.goodToKnow.title} tone="inverse" />
        <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.goodToKnow.map((g, i) => {
            const Icon = g.icon;
            return (
              <Reveal as="li" key={i} delay={i * 60} className="flex gap-4">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary-foreground/10 text-accent">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-sans text-base font-semibold">{l(g.title)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-secondary-foreground/75">{l(g.text)}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
