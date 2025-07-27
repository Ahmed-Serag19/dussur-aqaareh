import { httpClient } from "@/lib/http-client";
import { API_ENDPOINTS } from "@/constants/api";
import type { LookupItem } from "@/types/property";

export const lookupApi = {
  // Get all regions
  getRegions: () => httpClient.get<LookupItem[]>(API_ENDPOINTS.LOOKUP.REGIONS),

  // Get cities by region ID
  getCitiesByRegion: (regionId: number) =>
    httpClient.get<LookupItem[]>(
      `${API_ENDPOINTS.LOOKUP.CITIES}?regionId=${regionId}`
    ),

  // Get all cities (if needed)
  getCities: () => httpClient.get<LookupItem[]>(API_ENDPOINTS.LOOKUP.CITIES),

  // Get neighborhoods by city ID
  getNeighborhoodsByCity: (cityId: number) =>
    httpClient.get<LookupItem[]>(
      `${API_ENDPOINTS.LOOKUP.NEIGHBORHOODS}?cityId=${cityId}`
    ),

  // Get all neighborhoods (if needed)
  getNeighborhoods: () =>
    httpClient.get<LookupItem[]>(API_ENDPOINTS.LOOKUP.NEIGHBORHOODS),

  // Get property types
  getPropertyTypes: () =>
    httpClient.get<LookupItem[]>(API_ENDPOINTS.LOOKUP.PROPERTY_TYPES),

  // Get listing types
  getListingTypes: () =>
    httpClient.get<LookupItem[]>(API_ENDPOINTS.LOOKUP.LISTING_TYPES),

  // Get property features
  getPropertyFeatures: () =>
    httpClient.get<LookupItem[]>(API_ENDPOINTS.LOOKUP.PROPERTY_FEATURES),

  // Get property conditions
  getPropertyConditions: () =>
    httpClient.get<LookupItem[]>(API_ENDPOINTS.LOOKUP.PROPERTY_CONDITIONS),

  // Get finishing types
  getFinishingTypes: () =>
    httpClient.get<LookupItem[]>(API_ENDPOINTS.LOOKUP.FINISHING_TYPES),

  // Get property status values
  getPropertyStatusValues: () =>
    httpClient.get<LookupItem[]>(API_ENDPOINTS.LOOKUP.PROPERTY_STATUS_VALUES),
};
