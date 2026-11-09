import { createFileRoute } from "@tanstack/react-router";

import { langSearch } from "@/i18n/lang";
import { LegalPage, legalHead } from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms")({
  validateSearch: langSearch,
  head: () => legalHead("terms", "/terms"),
  component: () => <LegalPage kind="terms" />,
});
