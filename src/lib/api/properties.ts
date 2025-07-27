import { axiosInstance } from "@/lib/axios";
import type { PropertyFilters, PropertiesResponse } from "@/types/property";

export const getPublicProperties = async (
  page = 0,
  size = 10,
  filters?: PropertyFilters
): Promise<PropertiesResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  // Add filters to params if they exist
  if (filters) {
    if (filters.regionId)
      params.append("regionId", filters.regionId.toString());
    if (filters.cityId) params.append("cityId", filters.cityId.toString());
    if (filters.neighborhoodId)
      params.append("neighborhoodId", filters.neighborhoodId.toString());
    if (filters.propertyType)
      params.append("propertyTypeId", filters.propertyType.toString());
    if (filters.listingType && filters.listingType !== "all") {
      // Map 'rent' to 2 and 'buy' to 1 based on your API
      const listingTypeId = filters.listingType === "rent" ? 2 : 1;
      params.append("listingTypeId", listingTypeId.toString());
    }
    if (filters.minPrice)
      params.append("minPrice", filters.minPrice.toString());
    if (filters.maxPrice)
      params.append("maxPrice", filters.maxPrice.toString());
    if (filters.minArea) params.append("minArea", filters.minArea.toString());
    if (filters.maxArea) params.append("maxArea", filters.maxArea.toString());
    if (filters.roomsCount)
      params.append("roomsCount", filters.roomsCount.toString());
    if (filters.bathroomsCount)
      params.append("bathroomsCount", filters.bathroomsCount.toString());
  }

  const response = await axiosInstance.get<PropertiesResponse>(
    `/consumer/GetAllProperty?${params.toString()}`
  );
  return response.data;
};
