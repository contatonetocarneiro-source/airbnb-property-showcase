import { Award, CalendarDays, Star } from "lucide-react";

import { heroImage, siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t, l } = useI18n();
  const hero = heroImage;
  const { trust } = siteConfig;

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

          <div
            className="animate-float-in mt-7 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <Button asChild variant="hero" size="xl">
              <a href="#book">
                <CalendarDays />
                {t.checkAvailability}
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="#book">{t.bookDirect}</a>
            </Button>
          </div>
        </div>

        <ul
          className="animate-float-in mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-primary-foreground/25 pt-5 text-sm text-primary-foreground"
          style={{ animationDelay: "320ms" }}
        >
          <li className="flex items-center gap-1.5 font-semibold">
            <Star className="size-4 fill-current" aria-hidden="true" />
            {trust.rating.toFixed(2)}
          </li>
          <li>
            {trust.reviewCount} {t.guestReviews}
          </li>
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
