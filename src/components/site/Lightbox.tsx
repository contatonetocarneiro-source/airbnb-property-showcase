import { useCallback, useEffect, useRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { GalleryImage } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";

export function Lightbox({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: GalleryImage[];
  index: number | null;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const { t, l } = useI18n();
  const touchX = useRef<number | null>(null);
  const open = index !== null;
  const current = index ?? 0;
  const image = images[current];

  const go = useCallback(
    (delta: number) => onIndexChange((current + delta + images.length) % images.length),
    [current, images.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/95 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex flex-col text-background outline-none"
          onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
          onTouchEnd={(e) => {
            const start = touchX.current;
            const end = e.changedTouches[0]?.clientX;
            if (start == null || end == null) return;
            if (Math.abs(end - start) > 50) go(end < start ? 1 : -1);
            touchX.current = null;
          }}
        >
          <DialogPrimitive.Title className="sr-only">{image ? l(image.alt) : ""}</DialogPrimitive.Title>
          <div className="flex items-center justify-between px-4 py-3 text-sm">
            <span className="tabular-nums text-background/80">
              {current + 1} {t.gallery.of} {images.length}
            </span>
            <DialogPrimitive.Close
              aria-label={t.gallery.close}
              className="inline-flex size-10 items-center justify-center rounded-full hover:bg-background/10"
            >
              <X className="size-5" />
            </DialogPrimitive.Close>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-2 sm:px-16">
            {image ? (
              <img
                key={image.src}
                src={image.src}
                alt={l(image.alt)}
                width={image.width}
                height={image.height}
                className="max-h-[78svh] w-auto max-w-full rounded-xl object-contain animate-in fade-in-0"
              />
            ) : null}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t.gallery.prev}
              className="absolute left-2 hidden size-12 items-center justify-center rounded-full bg-background/10 hover:bg-background/20 sm:inline-flex"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t.gallery.next}
              className="absolute right-2 hidden size-12 items-center justify-center rounded-full bg-background/10 hover:bg-background/20 sm:inline-flex"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

          <p className="mx-auto max-w-2xl px-6 pt-3 pb-6 text-center text-sm text-background/75">
            {image ? l(image.alt) : ""}
          </p>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
