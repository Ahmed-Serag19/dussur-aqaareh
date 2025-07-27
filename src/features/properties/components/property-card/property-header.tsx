import { MapPin } from "lucide-react";
import { useLookupData } from "@/hooks/useLookupData";
import type { Property } from "@/features/properties/types";

interface PropertyHeaderProps {
  property: Property;
}

export function PropertyHeader({ property }: PropertyHeaderProps) {
  const { getCityName, getNeighborhoodName } = useLookupData();

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
