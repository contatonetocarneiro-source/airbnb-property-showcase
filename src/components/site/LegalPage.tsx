import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { useI18n } from "@/i18n/I18nProvider";
import { legal, type LegalKind } from "@/i18n/legal";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { WhatsAppFloat } from "./whatsapp";

export function LegalPage({ kind }: { kind: LegalKind }) {
  const { t, lang } = useI18n();
  const doc = legal[kind][lang];
  return (
    <>
      <Header variant="page" />
      <main className="mx-auto max-w-3xl px-4 pt-28 pb-20 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t.footer.backHome}
        </Link>
        <h1 className="mt-6 text-4xl font-semibold sm:text-5xl">{doc.title}</h1>
        <div className="mt-10 space-y-8">
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-xl font-semibold">{s.heading}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.body}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

/** Shared head() for legal routes. */
export function legalHead(kind: LegalKind, path: string) {
  const doc = legal[kind].en;
  const title = `${doc.title} | Sunshine Mezquita`;
  const description = `${doc.title} for Sunshine Mezquita, a holiday apartment in Córdoba's Jewish Quarter.`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}
