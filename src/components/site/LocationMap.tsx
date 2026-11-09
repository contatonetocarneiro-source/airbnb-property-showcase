import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

/** OpenStreetMap view of an approximate area (a soft circle, no exact pin). Client-only. */
export function LocationMap({
  lat,
  lng,
  radius,
  zoom,
  label,
}: {
  lat: number;
  lng: number;
  radius: number;
  zoom: number;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let map: import("leaflet").Map | null = null;
    let cancelled = false;

    const init = async () => {
      const L = await import("leaflet");
      if (cancelled || !ref.current) return;
      const css = getComputedStyle(document.documentElement);
      const primary = css.getPropertyValue("--primary").trim();
      map = L.map(ref.current, {
        center: [lat, lng],
        zoom,
        scrollWheelZoom: false,
        attributionControl: true,
      });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      L.circle([lat, lng], {
        radius,
        color: primary,
        weight: 2,
        fillColor: primary,
        fillOpacity: 0.18,
      })
        .addTo(map)
        .bindTooltip(label, { direction: "top", permanent: false });
    };

    // Load the map only when it scrolls near the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          void init();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      map?.remove();
    };
  }, [lat, lng, radius, zoom, label]);

  return <div ref={ref} className="size-full" role="img" aria-label={label} />;
}
