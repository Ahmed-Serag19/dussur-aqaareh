import { useEffect, useRef } from "react";

// Type declaration for Leaflet
declare global {
  interface Window {
    L: any;
  }
}

interface PropertyMapViewProps {
  lat: number;
  lng: number;
}

export default function PropertyMapView({ lat, lng }: PropertyMapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.L &&
      mapRef.current &&
      !mapInstanceRef.current
    ) {
      const L = window.L;
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [lat, lng],
        zoom: 15,
        scrollWheelZoom: false,
      });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);
      L.marker([lat, lng]).addTo(mapInstanceRef.current);
    }
    return () => {
      if (
        mapInstanceRef.current &&
        typeof mapInstanceRef.current === "object" &&
        mapInstanceRef.current !== null &&
        "remove" in mapInstanceRef.current
      ) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng]);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: 240, borderRadius: 12 }}
    />
  );
}
