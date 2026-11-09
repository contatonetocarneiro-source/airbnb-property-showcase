import { createFileRoute } from "@tanstack/react-router";

import { langSearch } from "@/i18n/lang";
import { LegalPage, legalHead } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy")({
  validateSearch: langSearch,
  head: () => legalHead("privacy", "/privacy"),
  component: () => <LegalPage kind="privacy" />,
});
