import { createFileRoute } from "@tanstack/react-router";

import { langSearch } from "@/i18n/lang";
import { LegalPage, legalHead } from "@/components/site/LegalPage";

export const Route = createFileRoute("/cookies")({
  validateSearch: langSearch,
  head: () => legalHead("cookies", "/cookies"),
  component: () => <LegalPage kind="cookies" />,
});
