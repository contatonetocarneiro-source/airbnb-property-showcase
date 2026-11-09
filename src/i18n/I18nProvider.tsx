import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

import { DEFAULT_LANG, type Lang, type Localized } from "@/config/site";
import { isLang } from "./lang";
import { ui, type UIStrings } from "./ui";

const STORAGE_KEY = "lang";

/** Picks the best supported language from a list like navigator.languages. */
export function detectLang(candidates: readonly string[]): Lang {
  for (const c of candidates) {
    const short = c.toLowerCase().slice(0, 2);
    if (isLang(short)) return short;
  }
  return DEFAULT_LANG;
}

type I18nValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: UIStrings;
  /** Resolve a localized config string. */
  l: (value: Localized) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const urlLang = useRouterState({
    select: (s) => (s.location.search as Record<string, unknown>)["lang"],
  });
  const [lang, setLangState] = useState<Lang>(isLang(urlLang) ? urlLang : DEFAULT_LANG);

  // Auto-detect only when the URL doesn't pin a language.
  useEffect(() => {
    if (isLang(urlLang)) {
      setLangState(urlLang);
      return;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) {
      setLangState(stored);
      return;
    }
    setLangState(detectLang(window.navigator.languages ?? [window.navigator.language]));
  }, [urlLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    setLangState(next);
    const url = new URL(window.location.href);
    if (url.searchParams.has("lang")) {
      url.searchParams.set("lang", next);
      window.history.replaceState(window.history.state, "", url);
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({ lang, setLang, t: ui[lang], l: (v) => v[lang] ?? v[DEFAULT_LANG] }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
