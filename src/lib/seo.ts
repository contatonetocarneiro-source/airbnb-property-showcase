import { DEFAULT_LANG, LANGS, type Lang } from "@/config/site";

/** hreflang alternates + canonical for a path, using ?lang=xx for non-default languages. */
export function langLinks(origin: string, path: string, lang: Lang) {
  const href = (l: Lang) => `${origin}${path}${l === DEFAULT_LANG ? "" : `?lang=${l}`}`;
  return [
    { rel: "canonical", href: href(lang) },
    ...LANGS.map((l) => ({ rel: "alternate", hrefLang: l, href: href(l) })),
    { rel: "alternate", hrefLang: "x-default", href: `${origin}${path}` },
  ];
}

export const ogLocale: Record<Lang, string> = { en: "en_GB", es: "es_ES", pt: "pt_BR" };
