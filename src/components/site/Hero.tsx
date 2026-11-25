import { Award } from "lucide-react";

import { heroImage, siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";

export function Hero() {
  const { t, l, lang } = useI18n();
  const hero = heroImage;
  const { trust, guestScore: score } = siteConfig;
  const fmt = (n: number) => n.toLocaleString(lang === "en" ? "en-GB" : lang, { minimumFractionDigits: 1 });

  return (
    <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden">
      <img
        src="https://i.imgur.com/1GiJeru.jpg"
        alt={l(hero.alt)}
        width={hero.width}
        height={hero.height}
        fetchPriority="high"
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/50" />

      <div className="mx-auto w-full max-w-6xl px-4 pt-28 pb-10 sm:px-6 sm:pb-16">
        <div className="max-w-2xl text-primary-foreground">
          <p className="animate-float-in text-xs font-semibold tracking-[0.2em] text-primary-foreground/85 uppercase">
            {l(siteConfig.location.area)}
          </p>
          <h1
            className="animate-float-in mt-3 text-4xl leading-[1.05] font-semibold text-balance sm:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            {l(siteConfig.hero.headline)}
          </h1>
          <p
            className="animate-float-in mt-4 text-base text-primary-foreground/90 sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {l(siteConfig.hero.subline)}
          </p>

        </div>

        <div
          className="animate-float-in mt-6 inline-flex flex-col gap-1.5 rounded-xl bg-white/95 p-3 text-neutral-900 shadow-lifted"
          style={{ animationDelay: "240ms" }}
        >
          <div className="flex items-center gap-3">
            <div className="text-right leading-tight">
              <p className="text-sm font-semibold">{l(score.label)}</p>
              <p className="text-xs text-neutral-600">
                {score.reviewCount} {l(score.reviews)}
              </p>
            </div>
            <span className="flex size-10 items-center justify-center rounded-lg rounded-bl-none bg-[#003b95] text-base font-bold text-white">
              {fmt(score.score)}
            </span>
          </div>
          <p className="text-right text-xs text-neutral-700">
            {l(score.location)} <span className="font-semibold">{fmt(score.locationScore)}</span>
          </p>
        </div>

        <ul
          className="animate-float-in mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-primary-foreground/25 pt-5 text-sm text-primary-foreground"
          style={{ animationDelay: "320ms" }}
        >
          {trust.superhost ? (
            <li className="flex items-center gap-1.5">
              <Award className="size-4" aria-hidden="true" />
              {t.superhost}
            </li>
          ) : null}
          <li>
            {trust.yearsHosting} {t.yearsHosting}
          </li>
        </ul>
      </div>
    </section>
  );
}
