import { httpClient } from "@/lib/http-client";
import { API_ENDPOINTS, API_CONFIG } from "@/constants/api";
import type {
  Property,
  PropertiesResponse,
  PropertyFilters,
} from "@/types/property";

export class PropertyService {
  static async getProperties(
    page = 0,
    size = API_CONFIG.DEFAULT_PAGE_SIZE,
    filters?: PropertyFilters
  ): Promise<PropertiesResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    if (filters) {
      this.appendFiltersToParams(params, filters);
    }

    const url = `${API_ENDPOINTS.PROPERTIES}?${params.toString()}`;
    console.log("🌐 Property API URL:", url);
    console.log("🔍 Filters being sent:", filters);
    console.log("📋 URL Parameters:", params.toString());

    const response = await httpClient.get<PropertiesResponse>(url);
    console.log("📦 API Response:", {
      totalElements: response.totalElements,
      totalPages: response.totalPages,
      contentLength: response.content?.length,
      firstProperty: response.content?.[0]
        ? {
            id: response.content[0].id,
            title: response.content[0].title,
            regionId: response.content[0].regionId,
            cityId: response.content[0].cityId,
            listingTypeId: response.content[0].listingTypeId,
            propertyTypeId: response.content[0].propertyTypeId,
          }
        : null,
    });

    return response;
  }

  static async getPropertyById(id: number): Promise<Property> {
    return httpClient.get<Property>(`${API_ENDPOINTS.PROPERTY_DETAIL}/${id}`);
  }

  private static appendFiltersToParams(
    params: URLSearchParams,
    filters: PropertyFilters
  ): void {
    console.log("🔧 Processing filters for API:", filters);

    const filterMap: Record<keyof PropertyFilters, string> = {
      regionId: "regionId",
      cityId: "cityId",
      neighborhoodId: "neighborhoodId",
      propertyType: "propertyTypeId",
      minPrice: "minPrice",
      maxPrice: "maxPrice",
      minArea: "minArea",
      maxArea: "maxArea",
      roomsCount: "roomsCount",
      bathroomsCount: "bathroomsCount",
      listingType: "listingTypeId",
      search: "search",
    };

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        const paramKey = filterMap[key as keyof PropertyFilters];
        if (paramKey) {
          if (key === "listingType" && value !== "all") {
            // Use the actual ID directly (1 for Sale, 2 for Rent)
            console.log(`📋 Adding listingType filter: ${paramKey}=${value}`);
            params.append(paramKey, value.toString());
          } else if (key === "listingType" && value === "all") {
            // Skip "all" values - don't add to params
            console.log("⏭️ Skipping 'all' listingType filter");
            return;
          } else {
            console.log(`📋 Adding filter: ${paramKey}=${value}`);
            params.append(paramKey, value.toString());
          }
        }
      }
    });

    console.log("🔧 Final URL params:", params.toString());
  }
}
