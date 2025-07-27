import { PropertyCard } from "./property-card/property-card";
import type { Property } from "@/types/property";

interface PropertiesGridProps {
  properties: Property[];
}

export function PropertiesGrid({ properties }: PropertiesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
