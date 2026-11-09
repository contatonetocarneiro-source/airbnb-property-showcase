import { describe, expect, it } from "vitest";

import { MAX_GUESTS } from "@/config/site";
import { detectLang } from "@/i18n/I18nProvider";
import { bookingRequestSchema, countNights, estimateTotal } from "@/lib/booking";

const valid = {
  name: "Ana",
  email: "ana@example.com",
  phone: "+34 600 123 456",
  checkIn: "2027-05-10",
  checkOut: "2027-05-13",
  guests: 4,
  language: "en" as const,
};

describe("booking rules", () => {
  it("allows at most 6 guests", () => {
    expect(MAX_GUESTS).toBe(6);
    expect(bookingRequestSchema.safeParse({ ...valid, guests: 6 }).success).toBe(true);
    expect(bookingRequestSchema.safeParse({ ...valid, guests: 7 }).success).toBe(false);
  });

  it("requires check-out after check-in", () => {
    expect(bookingRequestSchema.safeParse({ ...valid, checkOut: "2027-05-10" }).success).toBe(false);
  });

  it("estimates nights × nightly price + one cleaning fee", () => {
    expect(countNights("2027-05-10", "2027-05-13")).toBe(3);
    expect(estimateTotal(3, { pricePerNight: 140, cleaningFee: 60 })).toBe(480);
  });

  it("defaults to English and detects Spanish and Portuguese browsers", () => {
    expect(detectLang(["fr-FR"])).toBe("en");
    expect(detectLang(["es-ES", "en"])).toBe("es");
    expect(detectLang(["pt-BR"])).toBe("pt");
  });
});
