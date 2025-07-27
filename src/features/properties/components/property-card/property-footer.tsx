"use client";

import { Calendar } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { formatNumber } from "@/lib/utils";
import type { Property } from "@/types/property";

interface PropertyFooterProps {
  property: Property;
}

export function PropertyFooter({ property }: PropertyFooterProps) {
  const { t, isRTL, currentLanguage } = useLanguage();

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-lg font-bold text-blue-600">
            {formatNumber(
              property.price,
              currentLanguage === "ar" ? "ar-SA" : "en-US"
            )}
          </span>
          <span className="text-gray-600 text-xs mr-1 rtl:mr-0 rtl:ml-1">
            {" "}
            {t("common.currency")}
          </span>
        </div>

        {property.buildingAge && (
          <div className="flex items-center text-gray-500 text-xs">
            <Calendar className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
            <span>
              {property.buildingAge} {t("common.years")}
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          {isRTL ? property.streetAr : property.streetEn}
        </p>
      </div>
    </>
  );
}
