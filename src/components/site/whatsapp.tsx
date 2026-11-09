import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

export function useWhatsAppLink() {
  const { l } = useI18n();
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    l(siteConfig.contact.whatsappMessage),
  )}`;
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={cn("size-5", className)}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.23-9.43 9.44-9.43a9.37 9.37 0 0 1 6.67 2.77 9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.43 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.79.72.69 5.81.69 12.08c0 2 .52 3.96 1.52 5.68L.6 23.64l6.02-1.58a11.33 11.33 0 0 0 5.42 1.38h.01c6.26 0 11.36-5.1 11.36-11.36 0-3.03-1.18-5.89-3.33-8.03" />
    </svg>
  );
}

/** Floating WhatsApp button with a prefilled message. */
export function WhatsAppFloat() {
  const href = useWhatsAppLink();
  const { t } = useI18n();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp}
      className="fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lifted transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
