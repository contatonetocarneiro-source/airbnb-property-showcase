<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- All property content (texts in en/es/pt, prices, MAX_GUESTS, contact, legal numbers, gallery) lives in `src/config/site.ts`; generic UI strings live in `src/i18n/ui.ts`. Why: the site must be reusable for other properties by editing one file.
- Language comes from `?lang=` (SSR, hreflang) else localStorage/browser detection via `I18nProvider`. Why: crawlable per-language pages without separate routes.
- Booking requests are inserted server-side by `submitBookingRequest` (service role); the `booking_requests` table has RLS on with no public policies. Why: visitors can submit but never read submissions.
- Phase 2 hooks: iCal blocked dates go in `src/lib/availability.ts`; Stripe Checkout (EUR) attaches to `submitBookingRequest`. Why: keep future payment/sync additions isolated.
