import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ variant = "home" }: { variant?: "home" | "page" }) {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(variant === "page");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (variant === "page") return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#rooms", label: t.nav.rooms },
    { href: "#amenities", label: t.nav.amenities },
    { href: "#location", label: t.nav.location },
    { href: "#reviews", label: t.nav.reviews },
    { href: "#host", label: t.nav.host },
  ];

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-border/70 bg-background/90 shadow-soft backdrop-blur-lg"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className={cn(
            "font-display text-lg font-semibold tracking-tight transition-colors sm:text-xl",
            solid ? "text-foreground" : "text-primary-foreground",
          )}
        >
          {siteConfig.name}
        </Link>

        {variant === "home" ? (
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  solid
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-primary-foreground/85 hover:text-primary-foreground",
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
        ) : null}

        <div className="flex items-center gap-2">
          <LanguageSwitcher tone={solid ? "default" : "overlay"} className="hidden sm:inline-flex" />
          {variant === "home" ? (
            <>
              <Button asChild variant="hero" size="sm" className="h-9 px-4">
                <a href="#book">{t.checkAvailability}</a>
              </Button>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-label={open ? t.nav.close : t.nav.menu}
                className={cn(
                  "inline-flex size-9 items-center justify-center rounded-full lg:hidden",
                  solid ? "text-foreground hover:bg-muted" : "text-primary-foreground",
                )}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </>
          ) : (
            <LanguageSwitcher className="sm:hidden" />
          )}
        </div>
      </div>

      {variant === "home" && open ? (
        <div className="border-t border-border/70 bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3" aria-label="Mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 font-display text-lg text-foreground hover:bg-muted"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">{t.language}</span>
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
