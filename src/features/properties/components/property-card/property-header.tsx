import { MapPin } from "lucide-react";
import { useCities, useNeighborhoods } from "@/hooks/useLookupData";
import { useLanguage } from "@/hooks/useLanguage";
import type { Property } from "@/types/property";

interface PropertyHeaderProps {
  property: Property;
}

export function PropertyHeader({ property }: PropertyHeaderProps) {
  const { currentLanguage } = useLanguage();
  const { data: cities = [] } = useCities();
  const { data: neighborhoods = [] } = useNeighborhoods();

  // Helper function to get name based on current language
  const getName = (item: any) => {
    if (!item) return "";
    return currentLanguage === "ar" ? item.nameAr : item.nameEn;
  };

  const getCityName = (id: number) => {
    const item = cities.find((item) => item.id === id);
    return getName(item);
  };

  const getNeighborhoodName = (id: number) => {
    const item = neighborhoods.find((item) => item.id === id);
    return getName(item);
  };

  return (
    <div className="mb-3">
      <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
        {property.title}
      </h3>
      <div className="flex items-center text-gray-600 text-sm">
        <MapPin className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
        <span>
          {getCityName(property.cityId)} -{" "}
          {getNeighborhoodName(property.neighborhoodId)}
        </span>
      </div>
    </div>
  );
}
