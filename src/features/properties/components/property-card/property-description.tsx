"use client";

import { useLanguage } from "@/hooks/useLanguage";
import type { Property } from "@/features/properties/types";

interface PropertyDescriptionProps {
  property: Property;
}

export function PropertyDescription({ property }: PropertyDescriptionProps) {
  const { isRTL } = useLanguage();

  return (
    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
      {isRTL ? property.descriptionAr : property.descriptionEn}
    </p>
  );
}
