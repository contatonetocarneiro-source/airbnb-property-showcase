import { createServerFn } from "@tanstack/react-start";

import { siteConfig } from "@/config/site";
import { bookingRequestSchema, countNights, estimateTotal } from "./booking";

/**
 * Stores a direct booking request.
 * Phase 2 hooks: check availability against the iCal feed (see ./availability.ts)
 * and create a Stripe Checkout session in EUR before/after this insert.
 */
export const submitBookingRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => bookingRequestSchema.parse(input))
  .handler(async ({ data }) => {
    // Silently accept bot submissions without storing them.
    if (data.company) return { ok: true as const };

    const nights = countNights(data.checkIn, data.checkOut);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("booking_requests").insert({
      property_slug: siteConfig.slug,
      name: data.name,
      email: data.email,
      phone: data.phone,
      check_in: data.checkIn,
      check_out: data.checkOut,
      guests: data.guests,
      message: data.message || null,
      language: data.language,
      nights,
      estimated_total_eur: estimateTotal(nights),
    });

    if (error) {
      console.error("booking_requests insert failed", error);
      return { ok: false as const };
    }
    return { ok: true as const };
  });
