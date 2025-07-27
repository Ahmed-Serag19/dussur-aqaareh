import { Dialog } from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const Map = dynamic(() => import("./property-map-view"), { ssr: false });

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
    if (!open) return;
    setAddress("");
    setError("");
    setLoading(true);
    const lang = currentLanguage === "ar" ? "ar" : "en";
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=${lang}`
    )
      .then((res) => res.json())
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
      .catch(() => {
        setError(
          lang === "ar" ? "حدث خطأ أثناء جلب العنوان" : "Error fetching address"
        );
      })
      .finally(() => setLoading(false));
  }, [open, lat, lng, currentLanguage]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-900"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold mb-4 text-blue-950 text-center">
            {title}
          </h2>
          <div className="w-full h-64 rounded-lg overflow-hidden mb-4">
            <Map lat={lat} lng={lng} />
          </div>
          <div className="text-center text-lg min-h-[2.5em]">
            {loading
              ? currentLanguage === "ar"
                ? "جاري جلب العنوان..."
                : "Loading address..."
              : error
              ? error
              : address}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
