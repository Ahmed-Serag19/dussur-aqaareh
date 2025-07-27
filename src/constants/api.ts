export const API_ENDPOINTS = {
  PROPERTIES: "/consumer/GetAllProperty",
  PROPERTY_DETAIL: "/consumer/GetPropertyById",
  // Lookup endpoints
  LOOKUP: {
    REGIONS: "/lookup/regions",
    CITIES: "/lookup/cities",
    NEIGHBORHOODS: "/lookup/neighborhoods",
    PROPERTY_TYPES: "/lookup/property-types",
    LISTING_TYPES: "/lookup/listing-types",
    PROPERTY_FEATURES: "/lookup/property-features",
    PROPERTY_CONDITIONS: "/lookup/property-conditions",
    FINISHING_TYPES: "/lookup/finishing-types",
    PROPERTY_STATUS_VALUES: "/lookup/property-status-values",
  },
  // Legacy endpoints (keeping for backward compatibility)
  REGIONS: "/consumer/GetAllRegions",
  CITIES: "/consumer/GetAllCities",
  NEIGHBORHOODS: "/consumer/GetAllNeighborhoods",
  PROPERTY_TYPES: "/consumer/GetAllPropertyTypes",
} as const;

export const API_CONFIG = {
  BASE_URL: "https://backend.aqaar.dussur.sa/api",
  TIMEOUT: 10000,
  DEFAULT_PAGE_SIZE: 10,
} as const;
