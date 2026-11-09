import { LANGS } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";
import { langNames } from "@/i18n/ui";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  tone = "default",
  className,
}: {
  tone?: "default" | "inverse" | "overlay";
  className?: string;
}) {
  const { lang, setLang, t } = useI18n();
  return (
    <div
      role="group"
      aria-label={t.language}
      className={cn(
        "inline-flex items-center rounded-full border p-0.5 text-xs font-semibold",
        tone === "default" && "border-border bg-card",
        tone === "inverse" && "border-background/25",
        tone === "overlay" && "border-primary-foreground/40 bg-primary-foreground/10 backdrop-blur-md",
        className,
      )}
    >
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          title={langNames[code]}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase transition-colors",
            lang === code
              ? "bg-primary text-primary-foreground"
              : tone === "default"
                ? "text-muted-foreground hover:text-foreground"
                : tone === "inverse"
                  ? "text-background/70 hover:text-background"
                  : "text-primary-foreground/85 hover:text-primary-foreground",
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
