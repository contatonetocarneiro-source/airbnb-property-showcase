import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { format } from "date-fns";
import { enGB, es, ptBR } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { CalendarDays, CheckCircle2, Loader2, Minus, Plus, ShieldCheck } from "lucide-react";

import { MAX_GUESTS, siteConfig, type Lang } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";
import { htmlLocale } from "@/i18n/lang";
import { bookingRequestSchema, countNights, estimateTotal, formatEuro } from "@/lib/booking";
import { submitBookingRequest } from "@/lib/booking.functions";
import { getBlockedRanges } from "@/lib/availability";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ArchDivider } from "./ArchDivider";
import { Reveal } from "./Reveal";
import { WhatsAppIcon, useWhatsAppLink } from "./whatsapp";

const dateLocales: Record<Lang, typeof enGB> = { en: enGB, es, pt: ptBR };
type FieldKey = "name" | "email" | "phone" | "dates" | "guests";

const toISO = (d: Date) => format(d, "yyyy-MM-dd");

export function Booking() {
  const { t, lang } = useI18n();
  const isMobile = useIsMobile();
  const wa = useWhatsAppLink();
  const submit = useServerFn(submitBookingRequest);
  const locale = htmlLocale[lang];
  const { pricePerNight, cleaningFee } = siteConfig.pricing;

  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(2);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", company: "" });
  const [errors, setErrors] = useState<Partial<Record<FieldKey | "generic", string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const disabled = useMemo(() => [{ before: today }, ...getBlockedRanges()], [today]);

  const nights = range?.from && range?.to ? countNights(toISO(range.from), toISO(range.to)) : 0;
  const total = estimateTotal(nights);

  const dateLabel =
    range?.from && range?.to
      ? `${format(range.from, "d MMM", { locale: dateLocales[lang] })} – ${format(range.to, "d MMM yyyy", { locale: dateLocales[lang] })}`
      : range?.from
        ? `${format(range.from, "d MMM yyyy", { locale: dateLocales[lang] })} – …`
        : t.book.selectDates;

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const payload = {
      ...form,
      checkIn: range?.from ? toISO(range.from) : "",
      checkOut: range?.to ? toISO(range.to) : "",
      guests,
      language: lang,
    };
    const parsed = bookingRequestSchema.safeParse(payload);
    if (!parsed.success) {
      const next: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0]);
        if (field === "checkIn" || field === "checkOut") next.dates = t.book.errors.dates;
        else if (field === "name" || field === "email" || field === "phone" || field === "guests")
          next[field] = t.book.errors[field];
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await submit({ data: parsed.data });
      if (!res.ok) throw new Error("not ok");
      setStatus("done");
    } catch {
      setErrors({ generic: t.book.errors.generic });
      setStatus("idle");
    }
  }

  function reset() {
    setRange(undefined);
    setGuests(2);
    setForm({ name: "", email: "", phone: "", message: "", company: "" });
    setStatus("idle");
  }

  return (
    <section id="book" className="relative bg-sand">
      <ArchDivider className="opacity-70" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        {/* Summary */}
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow">{t.book.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{t.book.title}</h2>
          <p className="mt-3 flex items-center gap-2 text-sm font-medium text-secondary">
            <ShieldCheck className="size-4" aria-hidden="true" />
            {t.book.perks}
          </p>

          <div className="mt-8 rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
            <p className="text-sm text-muted-foreground">
              {t.book.from}{" "}
              <span className="font-display text-4xl font-semibold text-foreground">
                {formatEuro(pricePerNight, locale)}
              </span>{" "}
              {t.book.perNight}
            </p>
            <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              {nights > 0 ? (
                <div className="flex justify-between">
                  <dt>
                    {formatEuro(pricePerNight, locale)} × {nights} {nights === 1 ? t.book.night : t.book.nights}
                  </dt>
                  <dd className="tabular-nums">{formatEuro(pricePerNight * nights, locale)}</dd>
                </div>
              ) : null}
              <div className="flex justify-between">
                <dt>{t.book.cleaningFee}</dt>
                <dd className="tabular-nums">{formatEuro(cleaningFee, locale)}</dd>
              </div>
              {nights > 0 ? (
                <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
                  <dt>{t.book.estimate}</dt>
                  <dd className="tabular-nums">{formatEuro(total, locale)}</dd>
                </div>
              ) : null}
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{t.book.estimateNote}</p>
          </div>

          <Button asChild variant="soft" className="mt-4 w-full sm:w-auto">
            <a href={wa} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="text-whatsapp" />
              {t.whatsapp}
            </a>
          </Button>
        </Reveal>

        {/* Form */}
        <Reveal delay={100}>
          {status === "done" ? (
            <div
              role="status"
              className="flex h-full flex-col items-start justify-center rounded-2xl border border-border/70 bg-card p-8 shadow-lifted"
            >
              <CheckCircle2 className="size-10 text-secondary" aria-hidden="true" />
              <h3 className="mt-4 text-2xl font-semibold">{t.book.successTitle}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{t.book.successBody}</p>
              <Button variant="soft" className="mt-6" onClick={reset}>
                {t.book.another}
              </Button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              className="space-y-5 rounded-2xl border border-border/70 bg-card p-6 shadow-lifted sm:p-8"
            >
              {/* Dates */}
              <div className="space-y-2">
                <Label htmlFor="dates">{t.book.dates}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      id="dates"
                      type="button"
                      aria-invalid={!!errors.dates}
                      className={cn(
                        "flex h-12 w-full items-center gap-3 rounded-xl border border-input bg-background px-4 text-left text-sm transition-colors hover:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                        !range?.from && "text-muted-foreground",
                        errors.dates && "border-destructive",
                      )}
                    >
                      <CalendarDays className="size-4 text-primary" aria-hidden="true" />
                      <span className="flex-1">{dateLabel}</span>
                      {nights > 0 ? (
                        <span className="text-xs text-muted-foreground">
                          {nights} {nights === 1 ? t.book.night : t.book.nights}
                        </span>
                      ) : null}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto rounded-2xl p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={range}
                      onSelect={setRange}
                      numberOfMonths={isMobile ? 1 : 2}
                      disabled={disabled}
                      locale={dateLocales[lang]}
                      weekStartsOn={1}
                      defaultMonth={range?.from ?? today}
                    />
                  </PopoverContent>
                </Popover>
                {errors.dates ? <p className="text-sm text-destructive">{errors.dates}</p> : null}
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <Label id="guests-label">{t.book.guests}</Label>
                <div
                  role="group"
                  aria-labelledby="guests-label"
                  className="flex h-12 items-center justify-between rounded-xl border border-input bg-background px-2"
                >
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    disabled={guests <= 1}
                    aria-label="−"
                    className="inline-flex size-9 items-center justify-center rounded-full hover:bg-muted disabled:opacity-40"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="text-sm font-medium tabular-nums" aria-live="polite">
                    {guests} {guests === 1 ? t.book.guest : t.book.guestsPlural}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
                    disabled={guests >= MAX_GUESTS}
                    aria-label="+"
                    className="inline-flex size-9 items-center justify-center rounded-full hover:bg-muted disabled:opacity-40"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t.sleep.upTo} {MAX_GUESTS} {t.sleep.guests}
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label={t.book.name} error={errors.name}>
                  <Input
                    id="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={set("name")}
                    maxLength={100}
                    className="h-12 rounded-xl"
                  />
                </Field>
                <Field id="phone" label={t.book.phone} error={errors.phone}>
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    maxLength={30}
                    className="h-12 rounded-xl"
                  />
                </Field>
              </div>

              <Field id="email" label={t.book.email} error={errors.email}>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={set("email")}
                  maxLength={255}
                  className="h-12 rounded-xl"
                />
              </Field>

              <Field id="message" label={t.book.message}>
                <Textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={set("message")}
                  maxLength={1000}
                  placeholder={t.book.messagePlaceholder}
                  className="rounded-xl"
                />
              </Field>

              {/* Honeypot */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Company
                  <input tabIndex={-1} autoComplete="off" value={form.company} onChange={set("company")} />
                </label>
              </div>

              {errors.generic ? (
                <p role="alert" className="text-sm text-destructive">
                  {errors.generic}
                </p>
              ) : null}

              <Button type="submit" variant="hero" size="xl" className="w-full" disabled={status === "sending"}>
                {status === "sending" ? <Loader2 className="animate-spin" /> : null}
                {status === "sending" ? t.book.sending : t.book.submit}
              </Button>
              <p className="text-center text-xs text-muted-foreground">{t.book.noCharge}</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
