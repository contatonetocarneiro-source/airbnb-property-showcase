import { Award } from "lucide-react";

import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { WhatsAppIcon, useWhatsAppLink } from "./whatsapp";

export function Host() {
  const { t, l, lang } = useI18n();
  const h = siteConfig.host;
  const wa = useWhatsAppLink();
  const rating = h.rating.toLocaleString(lang === "en" ? "en-GB" : lang, { minimumFractionDigits: 2 });

  const stats = [
    { value: h.reviewCount.toLocaleString(), label: t.host.reviews },
    { value: rating, label: t.host.rating },
    { value: `${h.responseRate}%`, label: t.host.responseRate },
    { value: h.yearsHosting, label: t.host.years },
  ];

  return (
    <section id="host" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <Reveal className="grid gap-8 rounded-3xl border border-border/70 bg-card p-6 shadow-soft sm:p-10 lg:grid-cols-[auto_1fr] lg:gap-12">
        <div className="flex items-center gap-5 lg:flex-col lg:items-start">
          <div className="relative">
            <span className="inline-flex size-24 items-center justify-center rounded-full bg-secondary font-display text-4xl text-secondary-foreground sm:size-28">
              {h.name.charAt(0)}
            </span>
            {h.superhost ? (
              <span className="absolute -right-1 -bottom-1 inline-flex size-9 items-center justify-center rounded-full border-4 border-card bg-primary text-primary-foreground">
                <Award className="size-4" aria-hidden="true" />
              </span>
            ) : null}
          </div>
          <div>
            <p className="eyebrow">{t.host.eyebrow}</p>
            <h2 className="mt-1 text-3xl font-semibold">
              {t.host.title} {h.name}
            </h2>
            {h.superhost ? <p className="mt-1 text-sm text-muted-foreground">{t.superhost}</p> : null}
          </div>
        </div>

        <div>
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div key={i} className="rounded-xl bg-muted px-4 py-3">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-semibold">{s.value}</span>
                  <span className="block text-xs text-muted-foreground">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 leading-relaxed text-muted-foreground">{l(h.bio)}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm">
              {t.host.replies} <strong>{l(h.responseTime)}</strong>
            </p>
            <Button asChild variant="whatsapp" size="xl">
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                {t.host.message}
              </a>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
