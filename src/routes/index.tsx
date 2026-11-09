import { createFileRoute } from "@tanstack/react-router";

import { DEFAULT_LANG, MAX_GUESTS, gallery, heroImage, siteConfig } from "@/config/site";
import { langSearch } from "@/i18n/lang";
import { getRequestOrigin } from "@/lib/origin.functions";
import { langLinks, ogLocale } from "@/lib/seo";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Highlights } from "@/components/site/Highlights";
import { About } from "@/components/site/About";
import { Sleeping } from "@/components/site/Sleeping";
import { Amenities } from "@/components/site/Amenities";
import { Location } from "@/components/site/Location";
import { Reviews } from "@/components/site/Reviews";
import { GoodToKnow } from "@/components/site/GoodToKnow";
import { Host } from "@/components/site/Host";
import { Booking } from "@/components/site/Booking";
import { Footer } from "@/components/site/Footer";
import { ArchDivider } from "@/components/site/ArchDivider";
import { WhatsAppFloat } from "@/components/site/whatsapp";

export const Route = createFileRoute("/")({
  validateSearch: langSearch,
  loaderDeps: ({ search }) => ({ lang: search.lang }),
  loader: async ({ deps }) => ({
    origin: await getRequestOrigin(),
    lang: deps.lang ?? DEFAULT_LANG,
  }),
  head: ({ loaderData }) => {
    const lang = loaderData?.lang ?? DEFAULT_LANG;
    const origin = loaderData?.origin ?? "";
    const title = siteConfig.seo.title[lang];
    const description = siteConfig.seo.description[lang];
    const image = origin ? `${origin}${heroImage.src}` : undefined;
    const c = siteConfig;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "VacationRental",
      name: c.name,
      description,
      url: origin ? `${origin}/` : undefined,
      identifier: c.legal.regional,
      image: origin ? gallery.map((g) => `${origin}${g.src}`) : undefined,
      checkinTime: "15:00",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Córdoba",
        addressRegion: c.location.region,
        addressCountry: c.location.country,
      },
      latitude: c.location.lat,
      longitude: c.location.lng,
      containsPlace: {
        "@type": "Accommodation",
        additionalType: "EntirePlace",
        numberOfBedrooms: c.facts.bedrooms,
        numberOfBathroomsTotal: c.facts.bathrooms,
        occupancy: { "@type": "QuantitativeValue", value: MAX_GUESTS },
        bed: [
          { "@type": "BedDetails", numberOfBeds: 6, typeOfBed: "Single" },
          { "@type": "BedDetails", numberOfBeds: 1, typeOfBed: "SofaBed" },
        ],
        amenityFeature: c.amenities.map((a) => ({
          "@type": "LocationFeatureSpecification",
          name: a.label.en,
          value: true,
        })),
      },
    };

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: ogLocale[lang] },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
      links: origin ? langLinks(origin, "/", lang) : [],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  },
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Highlights />
        <ArchDivider className="mx-auto max-w-6xl px-4 opacity-80 sm:px-6" />
        <About />
        <Sleeping />
        <Amenities />
        <Location />
        <Reviews />
        <GoodToKnow />
        <Host />
        <Booking />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
