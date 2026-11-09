import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";

import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";
import { ArchDivider } from "./ArchDivider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { WhatsAppIcon, useWhatsAppLink } from "./whatsapp";

export function Footer() {
  const { t, l } = useI18n();
  const wa = useWhatsAppLink();
  const c = siteConfig.contact;

  return (
    <footer className="bg-foreground text-background">
      <ArchDivider className="opacity-40" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-background/70">{l(siteConfig.location.area)}</p>
          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-background/60 uppercase">
              {t.footer.language}
            </p>
            <LanguageSwitcher tone="inverse" />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-background/60 uppercase">
            {t.footer.contact}
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`mailto:${c.email}`} className="inline-flex items-center gap-2 hover:underline">
                <Mail className="size-4" aria-hidden="true" />
                {c.email}
              </a>
            </li>
            <li>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:underline"
              >
                <WhatsAppIcon className="size-4" />
                {c.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-background/60 uppercase">
            {t.footer.legal}
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link to="/privacy" className="hover:underline">
                {t.footer.privacy}
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="hover:underline">
                {t.footer.cookies}
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:underline">
                {t.footer.terms}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/15">
        <div className="mx-auto max-w-6xl space-y-1.5 px-4 py-6 text-xs text-background/60 sm:px-6">
          <p>
            {t.footer.regional}: <span className="font-mono text-background/80">{siteConfig.legal.regional}</span>
          </p>
          <p className="break-all">
            {t.footer.national}: <span className="font-mono text-background/80">{siteConfig.legal.national}</span>
          </p>
          <p className="pt-2">
            © {new Date().getFullYear()} {siteConfig.name}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
