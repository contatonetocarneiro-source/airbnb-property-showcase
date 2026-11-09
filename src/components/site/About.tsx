import { useState } from "react";
import { Images } from "lucide-react";

import { gallery, heroImage, siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Lightbox } from "./Lightbox";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  const { t, l } = useI18n();
  const [index, setIndex] = useState<number | null>(null);
  // Gallery order after the hero image.
  const photos = [...gallery.filter((g) => g !== heroImage), heroImage];

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
        <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title}>
          {siteConfig.about.paragraphs.map((p, i) => (
            <p key={i} className={cn(i > 0 && "mt-4")}>
              {l(p)}
            </p>
          ))}
        </SectionHeading>
        <Reveal className="hidden lg:block">
          <p className="eyebrow">{t.gallery.eyebrow}</p>
          <p className="mt-3 font-display text-2xl text-foreground">{t.gallery.title}</p>
        </Reveal>
      </div>

      {/* Mobile: swipeable strip. Desktop: mosaic. */}
      <Reveal className="mt-10">
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-4 sm:grid-rows-2 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0">
          {photos.slice(0, 5).map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "group relative w-[82%] shrink-0 snap-center overflow-hidden rounded-2xl bg-muted sm:w-auto",
                i === 0 ? "aspect-[4/3] sm:col-span-2 sm:row-span-2 sm:aspect-auto" : "aspect-[4/3]",
              )}
            >
              <img
                src={img.src}
                alt={l(img.alt)}
                width={img.width}
                height={img.height}
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="soft" onClick={() => setIndex(0)}>
            <Images />
            {t.gallery.viewAll} ({photos.length})
          </Button>
        </div>
      </Reveal>

      <Lightbox images={photos} index={index} onIndexChange={setIndex} onClose={() => setIndex(null)} />
    </section>
  );
}
