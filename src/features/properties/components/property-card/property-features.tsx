"use client";

import { Home, Bath, Maximize } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { formatNumber } from "@/lib/utils";
import type { Property } from "@/types/property";

interface PropertyFeaturesProps {
  property: Property;
}

export function PropertyFeatures({ property }: PropertyFeaturesProps) {
  const { t, currentLanguage } = useLanguage();

  const features = [
    {
      icon: Home,
      value: property.roomsCount,
      label: t("property.rooms"),
    },
    {
      icon: Bath,
      value: property.bathroomsCount,
      label: t("property.bathrooms"),
    },
    {
      icon: Maximize,
      value: formatNumber(
        property.area,
        currentLanguage === "ar" ? "ar-SA" : "en-US"
      ),
      label: t("common.area"),
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center">
          <feature.icon className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
          <span>
            {feature.value} {feature.label}
          </span>
        </div>
      ))}
    </div>
  );
}
