"use client";
import { useEffect, useState } from "react";
import { usePropertyFromContext } from "@/features/properties/components/property-list-context";
import { getPublicProperties } from "@/lib/api/properties";
import { ImageCarousel } from "@/features/properties/components/property-card/image-carousel";
import { useLanguage } from "@/hooks/useLanguage";
import { Badge } from "@/components/ui/badge";
import { useLookupData } from "@/hooks/useLookupData";
import { formatNumber } from "@/lib/utils";
import {
  MapPin,
  Home,
  Layers,
  BedDouble,
  Bath,
  Ruler,
  Calendar,
  MessageCircle,
} from "lucide-react";
import dynamic from "next/dynamic";

const MapModal = dynamic(() => import("./property-map-modal"), { ssr: false });

export function PropertyDetailContent({ propertyId }: { propertyId: number }) {
  const { t, currentLanguage } = useLanguage();
  const {
    getFeatureName,
    getCityName,
    getRegionName,
    getPropertyTypeName,
    getNeighborhoodName,
    getListingTypeName,
  } = useLookupData();
  const propertyFromContext = usePropertyFromContext(propertyId);
  const [property, setProperty] = useState(propertyFromContext);
  const [loading, setLoading] = useState(!propertyFromContext);
  const [error, setError] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (!propertyFromContext) {
      setLoading(true);
      const fetchProperty = async () => {
        let found = null;
        let page = 0;
        const maxPages = 10;
        while (!found && page < maxPages) {
          const data = await getPublicProperties(page, 10);
          found = data.content.find((p) => p.id === propertyId);
          if (found) break;
          if (data.last) break;
          page++;
        }
        if (found) {
          setProperty(found);
          setError(null);
        } else {
          setError(t("property.notFound") || "Property not found.");
        }
        setLoading(false);
      };
      fetchProperty().catch(() => {
        setError(t("property.notFound") || "Property not found.");
        setLoading(false);
      });
    } else {
      setProperty(propertyFromContext);
      setLoading(false);
    }
  }, [propertyId, propertyFromContext, t]);

  // Shake animation every 5 seconds
  useEffect(() => {
    const shakeInterval = setInterval(() => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600); // Stop shaking after 0.6s
    }, 5000); // Shake every 5 seconds

    return () => clearInterval(shakeInterval);
  }, []);

  if (loading)
    return (
      <div className="py-20 text-center text-2xl">{t("common.loading")}</div>
    );
  if (error || !property)
    return (
      <div className="py-20 text-center text-red-500 text-2xl">{error}</div>
    );

  // Feature grid icons
  const featureIcons = {
    roomsCount: <BedDouble className="w-6 h-6" />,
    bathroomsCount: <Bath className="w-6 h-6" />,
    livingroomsCount: <Home className="w-6 h-6" />,
    area: <Ruler className="w-6 h-6" />,
    floorsCount: <Layers className="w-6 h-6" />,
    buildingAge: <Calendar className="w-6 h-6" />,
  };

  const handleWhatsAppContact = () => {
    const propertyUrl = `https://aqaar.dussur.sa/properties/${propertyId}`;
    const message =
      currentLanguage === "ar"
        ? `مرحباً، أنا مهتم بالعقار التالي:

${property.title}
${t("common.price")}: ${formatNumber(property.price, "ar-SA")} ${t(
            "common.currency"
          )}
${t("property.city")}: ${getCityName(property.cityId)}
${t("property.region")}: ${getRegionName(property.regionId)}
${t("property.neighborhood")}: ${getNeighborhoodName(property.neighborhoodId)}

${t("property.propertyLink")}: ${propertyUrl}

${t("property.contactMessage")}`
        : `Hello, I'm interested in the following property:

${property.title}
${t("common.price")}: ${formatNumber(property.price, "en-US")} ${t(
            "common.currency"
          )}
${t("property.city")}: ${getCityName(property.cityId)}
${t("property.region")}: ${getRegionName(property.regionId)}
${t("property.neighborhood")}: ${getNeighborhoodName(property.neighborhoodId)}

${t("property.propertyLink")}: ${propertyUrl}

${t("property.contactMessage")}`;

    const whatsappUrl = `https://wa.me/966582906777?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Images and main info */}
        <div className="md:w-2/3 w-full flex flex-col gap-8">
          <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
            <ImageCarousel
              images={property.imageUrls || []}
              altPrefix={property.title}
              className="w-full h-full object-cover aspect-video"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-blue-950 mb-2">
              {property.title}
            </h1>
            <div className="flex flex-wrap gap-3 items-center mb-2 text-lg">
              <Badge
                variant="default"
                className="bg-blue-600 text-white text-lg px-4 py-2"
              >
                {getPropertyTypeName(property.propertyTypeId)}
              </Badge>
              <Badge
                variant="outline"
                className="bg-white text-blue-950 border-blue-600 text-lg px-4 py-2"
              >
                {getListingTypeName(property.listingTypeId)}
              </Badge>
              <Badge
                variant="outline"
                className="bg-white text-blue-950 border-blue-600 text-lg px-4 py-2"
              >
                {getCityName(property.cityId)},{" "}
                {getRegionName(property.regionId)}
              </Badge>
              <Badge
                variant="outline"
                className="bg-white text-blue-950 border-blue-600 text-lg px-4 py-2"
              >
                {t("common.price")}:{" "}
                {formatNumber(
                  property.price,
                  currentLanguage === "ar" ? "ar-SA" : "en-US"
                )}{" "}
                {t("common.currency")}
              </Badge>
              <Badge
                variant="outline"
                className="bg-white text-blue-950 border-blue-600 text-lg px-4 py-2"
              >
                {t("property.area")}:{" "}
                {formatNumber(
                  property.area,
                  currentLanguage === "ar" ? "ar-SA" : "en-US"
                )}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-3 mb-4 text-lg">
              <Badge
                variant="secondary"
                className="bg-blue-50 text-blue-900 border-blue-200 text-lg px-4 py-2"
              >
                {t("property.neighborhood")}:{" "}
                {getNeighborhoodName(property.neighborhoodId)}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-blue-50 text-blue-900 border-blue-200 text-lg px-4 py-2"
              >
                {t("property.street")}:{" "}
                {currentLanguage === "ar"
                  ? property.streetAr
                  : property.streetEn}
              </Badge>
              <button
                className="flex items-center gap-2 text-blue-700 underline text-lg px-4 py-2"
                onClick={() => setShowMap(true)}
              >
                <MapPin className="w-6 h-6" /> {t("property.viewOnMap")}
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-4 text-xl">
              <div className="flex items-center gap-3">
                {featureIcons.roomsCount}
                <span>
                  {t("property.rooms")}: {property.roomsCount}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {featureIcons.bathroomsCount}
                <span>
                  {t("property.bathrooms")}: {property.bathroomsCount}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {featureIcons.livingroomsCount}
                <span>
                  {t("property.livingRooms")}: {property.livingroomsCount}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {featureIcons.area}
                <span>
                  {t("property.area")}:{" "}
                  {formatNumber(
                    property.area,
                    currentLanguage === "ar" ? "ar-SA" : "en-US"
                  )}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {featureIcons.floorsCount}
                <span>
                  {t("property.floors")}: {property.floorsCount}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {featureIcons.buildingAge}
                <span>
                  {t("property.age")}: {property.buildingAge}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mb-4 text-lg">
              {Array.isArray(property.features) &&
                property.features.map((featureId: number) => (
                  <Badge
                    key={featureId}
                    variant="secondary"
                    className="bg-blue-100 text-blue-900 border-blue-200 text-lg px-4 py-2"
                  >
                    {getFeatureName(featureId)}
                  </Badge>
                ))}
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">
                {t("property.description")}
              </h2>
              <p className="text-xl text-gray-700">
                {currentLanguage === "ar"
                  ? property.descriptionAr || property.description
                  : property.descriptionEn || property.description}
              </p>
            </div>
          </div>
        </div>
        {/* Right: Booking/Contact sidebar */}
        <div className="md:w-1/3 w-full flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-md p-8 sticky top-24">
            <div className="text-3xl font-bold text-blue-950 mb-4">
              {t("common.price")}:{" "}
              {formatNumber(
                property.price,
                currentLanguage === "ar" ? "ar-SA" : "en-US"
              )}{" "}
              {t("common.currency")}
            </div>
            <button
              onClick={handleWhatsAppContact}
              className={`w-full bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-xl flex items-center justify-center gap-2 ${
                isShaking ? "animate-shake" : ""
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              {t("property.contactOwner")}
            </button>
          </div>
        </div>
      </div>
      {showMap && (
        <MapModal
          open={showMap}
          onClose={() => setShowMap(false)}
          lat={property.latitude}
          lng={property.longitude}
          title={property.title}
        />
      )}
    </section>
  );
}
