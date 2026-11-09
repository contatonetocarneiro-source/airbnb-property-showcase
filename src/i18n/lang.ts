import { LANGS, type Lang } from "@/config/site";

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}

/** Route search validator: keeps an optional ?lang=en|es|pt. */
export function langSearch(search: Record<string, unknown>): { lang?: Lang } {
  return isLang(search["lang"]) ? { lang: search["lang"] } : {};
}

export const htmlLocale: Record<Lang, string> = { en: "en-GB", es: "es-ES", pt: "pt-BR" };
