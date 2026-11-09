import { z } from "zod";
import { differenceInCalendarDays, parseISO } from "date-fns";

import { LANGS, MAX_GUESTS, siteConfig } from "@/config/site";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date");

/** Shared by the booking form (client) and the server function. */
export const bookingRequestSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().email().max(255),
    phone: z
      .string()
      .trim()
      .min(6)
      .max(30)
      .regex(/^[+\d\s().-]+$/, "Invalid phone"),
    checkIn: isoDate,
    checkOut: isoDate,
    guests: z.number().int().min(1).max(MAX_GUESTS),
    message: z.string().trim().max(1000).optional().default(""),
    language: z.enum(LANGS),
    /** Honeypot: real visitors never fill this. */
    company: z.string().max(0).optional().default(""),
  })
  .refine((d) => countNights(d.checkIn, d.checkOut) >= 1, {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  });

export type BookingRequestInput = z.input<typeof bookingRequestSchema>;

export function countNights(checkIn: string, checkOut: string): number {
  return differenceInCalendarDays(parseISO(checkOut), parseISO(checkIn));
}

/** Estimated total in euros: nights × starting price + one cleaning fee. */
export function estimateTotal(
  nights: number,
  pricing: { pricePerNight: number; cleaningFee: number } = siteConfig.pricing,
): number {
  if (nights < 1) return 0;
  return nights * pricing.pricePerNight + pricing.cleaningFee;
}

export function formatEuro(amount: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: siteConfig.pricing.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
