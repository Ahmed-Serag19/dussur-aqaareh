"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

interface PropertyMapModalProps {
  open: boolean;
  onClose: () => void;
  lat: number;
  lng: number;
  title: string;
}

export default function PropertyMapModal({
  open,
  onClose,
  lat,
  lng,
  title,
}: PropertyMapModalProps) {
  const { currentLanguage } = useLanguage();
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || !lat || !lng) return;

    setAddress("");
    setError("");
    setLoading(true);

    const lang = currentLanguage === "ar" ? "ar" : "en";

    // Add a small delay to ensure the modal is fully rendered
    const timer = setTimeout(() => {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=${lang}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          if (data.display_name) {
            setAddress(data.display_name);
          } else {
            setAddress("");
            setError(
              lang === "ar" ? "لا يوجد عنوان متاح" : "No address available"
            );
          }
        })
        .catch((err) => {
          console.error("Address fetch error:", err);
          setError(
            lang === "ar"
              ? "حدث خطأ أثناء جلب العنوان"
              : "Error fetching address"
          );
        })
        .finally(() => setLoading(false));
    }, 100);

    return () => clearTimeout(timer);
  }, [open, lat, lng, currentLanguage]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full max-h-[90vh] p-0 bg-white shadow-xl rounded-2xl">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-bold text-blue-950 text-center pr-8">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6">
          {/* Map Container */}
          <div className="w-full h-80 rounded-lg overflow-hidden mb-4 bg-gray-200 border border-gray-300 shadow-md">
            {open && lat && lng ? (
              <iframe
                src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 12, minHeight: 320 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="خريطة الموقع"
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                {currentLanguage === "ar"
                  ? "لا يمكن عرض الخريطة"
                  : "Map cannot be displayed"}
              </div>
            )}
          </div>

          {/* Address Display */}
          <div className="text-center text-lg min-h-[2.5em] p-4 bg-gray-50 rounded-lg">
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                {currentLanguage === "ar"
                  ? "جاري جلب العنوان..."
                  : "Loading address..."}
              </div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <div className="text-gray-700">
                {address ||
                  (currentLanguage === "ar" ? "لا يوجد عنوان" : "No address")}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
