import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { PropertyImage } from "./property-image";
import { PropertyHeader } from "./property-header";
import { PropertyDescription } from "./property-description";
import { PropertyFeatures } from "./property-features";
import { PropertyFooter } from "./property-footer";
import type { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`} className="block h-full">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300  pt-0 cursor-pointer group h-full flex flex-col">
        <PropertyImage property={property} />
        <CardContent className="p-4 pt-0 flex-1 flex flex-col">
          <PropertyHeader property={property} />
          <PropertyDescription property={property} />
          <PropertyFeatures property={property} />
          <PropertyFooter property={property} />
        </CardContent>
      </Card>
    </Link>
  );
}
