import { Metadata } from "next";
import { PropertyDetailContent } from "@/features/properties/components/property-detail-content";
import { getPublicProperties } from "@/lib/api/properties";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    // Try to get property data for metadata
    let property = null;
    let page = 0;
    const maxPages = 5; // Limit search to avoid too many API calls

    while (!property && page < maxPages) {
      const data = await getPublicProperties(page, 10);
      property = data.content.find((p) => p.id === Number.parseInt(id));
      if (property) break;
      if (data.last) break;
      page++;
    }

    if (property) {
      return {
        title: `${property.title} | دُسر العقارية`,
        description: `${property.title} - ${
          property.price
        } ريال. ${property.description?.substring(0, 150)}...`,
        keywords: `عقار للإيجار, ${property.title}, عقارات السعودية, دُسر العقارية`,
        openGraph: {
          title: `${property.title} | دُسر العقارية`,
          description: `${property.title} - ${
            property.price
          } ريال. ${property.description?.substring(0, 150)}...`,
          url: `https://aqaar.dussur.sa/properties/${id}`,
          images: property.imageUrls?.[0] ? [property.imageUrls[0]] : undefined,
        },
        twitter: {
          card: "summary_large_image",
          title: `${property.title} | دُسر العقارية`,
          description: `${property.title} - ${property.price} ريال`,
          images: property.imageUrls?.[0] ? [property.imageUrls[0]] : undefined,
        },
        alternates: {
          canonical: `https://aqaar.dussur.sa/properties/${id}`,
        },
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  // Fallback metadata
  return {
    title: "عقار للإيجار | دُسر العقارية",
    description:
      "عقار مميز للإيجار في المملكة العربية السعودية مع دُسر العقارية",
    alternates: {
      canonical: `https://aqaar.dussur.sa/properties/${id}`,
    },
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  return <PropertyDetailContent propertyId={Number.parseInt(id)} />;
}
