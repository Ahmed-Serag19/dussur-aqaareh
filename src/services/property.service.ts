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

    const response = await httpClient.get<PropertiesResponse>(url);

    return response;
  }

  static async getPropertyById(id: number): Promise<Property> {
    return httpClient.get<Property>(`${API_ENDPOINTS.PROPERTY_DETAIL}/${id}`);
  }

  private static appendFiltersToParams(
    params: URLSearchParams,
    filters: PropertyFilters
  ): void {
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
            params.append(paramKey, value.toString());
          } else if (key === "listingType" && value === "all") {
            // Skip "all" values - don't add to params
            return;
          } else {
            params.append(paramKey, value.toString());
          }
        }
      }
    });
  }
}
