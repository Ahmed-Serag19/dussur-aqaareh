import { ImageCarousel } from "@/features/properties/components/property-card/image-carousel";
import type { Property } from "@/types/property";

interface PropertyImageProps {
  property: Property;
}

export function PropertyImage({ property }: PropertyImageProps) {
  return (
    <ImageCarousel
      images={
        property.imageUrls && property.imageUrls.length > 0
          ? property.imageUrls
          : []
      }
      altPrefix={property.title}
      className="w-full"
    />
  );
}
