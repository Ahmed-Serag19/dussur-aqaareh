"use client";

import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "./useLanguage";
import { lookupApi } from "@/lib/api/lookup";
import type { LookupItem } from "@/types/property";

// Separate hooks for different lookup data to enable lazy loading
export function useRegions() {
  return useQuery({
    queryKey: ["regions"],
    queryFn: lookupApi.getRegions,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 3,
    retryDelay: 2000,
  });
}

export function usePropertyTypes() {
  return useQuery({
    queryKey: ["propertyTypes"],
    queryFn: lookupApi.getPropertyTypes,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 3,
    retryDelay: 2000,
  });
}

export function useListingTypes() {
  return useQuery({
    queryKey: ["listingTypes"],
    queryFn: lookupApi.getListingTypes,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 3,
    retryDelay: 2000,
  });
}

export function useFeatures() {
  return useQuery({
    queryKey: ["features"],
    queryFn: lookupApi.getPropertyFeatures,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 3,
    retryDelay: 2000,
  });
}

export function useConditions() {
  return useQuery({
    queryKey: ["conditions"],
    queryFn: lookupApi.getPropertyConditions,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 3,
    retryDelay: 2000,
  });
}

export function useFinishingTypes() {
  return useQuery({
    queryKey: ["finishingTypes"],
    queryFn: lookupApi.getFinishingTypes,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 3,
    retryDelay: 2000,
  });
}

export function useStatusValues() {
  return useQuery({
    queryKey: ["statusValues"],
    queryFn: lookupApi.getPropertyStatusValues,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 3,
    retryDelay: 2000,
  });
}

export function useCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: lookupApi.getCities,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 3,
    retryDelay: 2000,
  });
}

export function useNeighborhoods() {
  return useQuery({
    queryKey: ["neighborhoods"],
    queryFn: lookupApi.getNeighborhoods,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 3,
    retryDelay: 2000,
  });
}

// Hook for preloading critical data that's commonly used
export function useCriticalLookupData() {
  const { currentLanguage } = useLanguage();

  // Only load the most critical data that's used across the app
  const {
    data: regions = [],
    error: regionsError,
    isLoading: regionsLoading,
  } = useRegions();

  const {
    data: cities = [],
    error: citiesError,
    isLoading: citiesLoading,
  } = useCities();

  const {
    data: propertyTypes = [],
    error: propertyTypesError,
    isLoading: propertyTypesLoading,
  } = usePropertyTypes();

  const {
    data: listingTypes = [],
    error: listingTypesError,
    isLoading: listingTypesLoading,
  } = useListingTypes();

  // Helper function to get name based on current language
  const getName = (item: LookupItem | undefined) => {
    if (!item) return "";
    return currentLanguage === "ar" ? item.nameAr : item.nameEn;
  };

  // Helper functions for getting names by ID
  const getListingTypeName = (id: number) => {
    const item = listingTypes.find((item) => item.id === id);
    return getName(item);
  };

  const getPropertyTypeName = (id: number) => {
    const item = propertyTypes.find((item) => item.id === id);
    return getName(item);
  };

  const getCityName = (id: number) => {
    const item = cities.find((item) => item.id === id);
    return getName(item);
  };

  const getRegionName = (id: number) => {
    const item = regions.find((item) => item.id === id);
    return getName(item);
  };

  return {
    // Critical data arrays
    regions,
    cities,
    propertyTypes,
    listingTypes,

    // Loading states
    regionsLoading,
    citiesLoading,
    propertyTypesLoading,
    listingTypesLoading,

    // Error states
    regionsError,
    citiesError,
    propertyTypesError,
    listingTypesError,

    // Helper functions
    getListingTypeName,
    getPropertyTypeName,
    getCityName,
    getRegionName,
  };
}

// Main hook that provides all data (for backward compatibility)
export function useLookupData() {
  const { currentLanguage } = useLanguage();

  // Fetch all regions - no fallback, will be empty array if API fails
  const {
    data: regions = [],
    error: regionsError,
    isLoading: regionsLoading,
  } = useRegions();

  // Fetch property types - no fallback
  const {
    data: propertyTypes = [],
    error: propertyTypesError,
    isLoading: propertyTypesLoading,
  } = usePropertyTypes();

  // Fetch listing types - no fallback
  const {
    data: listingTypes = [],
    error: listingTypesError,
    isLoading: listingTypesLoading,
  } = useListingTypes();

  // Fetch property features - no fallback
  const {
    data: features = [],
    error: featuresError,
    isLoading: featuresLoading,
  } = useFeatures();

  // Fetch property conditions - no fallback
  const {
    data: conditions = [],
    error: conditionsError,
    isLoading: conditionsLoading,
  } = useConditions();

  // Fetch finishing types - no fallback
  const {
    data: finishingTypes = [],
    error: finishingTypesError,
    isLoading: finishingTypesLoading,
  } = useFinishingTypes();

  // Fetch property status values - no fallback
  const {
    data: statusValues = [],
    error: statusValuesError,
    isLoading: statusValuesLoading,
  } = useStatusValues();

  // Fetch all cities - no fallback
  const {
    data: cities = [],
    error: citiesError,
    isLoading: citiesLoading,
  } = useCities();

  // Fetch all neighborhoods - no fallback
  const {
    data: neighborhoods = [],
    error: neighborhoodsError,
    isLoading: neighborhoodsLoading,
  } = useNeighborhoods();

  // Helper function to get name based on current language
  const getName = (item: LookupItem | undefined) => {
    if (!item) return "";
    return currentLanguage === "ar" ? item.nameAr : item.nameEn;
  };

  // Helper functions for getting names by ID (using real API data)
  const getListingTypeName = (id: number) => {
    const item = listingTypes.find((item) => item.id === id);
    return getName(item);
  };

  const getPropertyTypeName = (id: number) => {
    const item = propertyTypes.find((item) => item.id === id);
    return getName(item);
  };

  const getCityName = (id: number) => {
    const item = cities.find((item) => item.id === id);
    return getName(item);
  };

  const getNeighborhoodName = (id: number) => {
    const item = neighborhoods.find((item) => item.id === id);
    return getName(item);
  };

  const getRegionName = (id: number) => {
    const item = regions.find((item) => item.id === id);
    return getName(item);
  };

  const getFeatureName = (id: number) => {
    const item = features.find((item) => item.id === id);
    return getName(item);
  };

  const getConditionName = (id: number) => {
    const item = conditions.find((item) => item.id === id);
    return getName(item);
  };

  const getFinishingTypeName = (id: number) => {
    const item = finishingTypes.find((item) => item.id === id);
    return getName(item);
  };

  const getStatusValueName = (id: number) => {
    const item = statusValues.find((item) => item.id === id);
    return getName(item);
  };

  // Functions to fetch cascading data for filters
  const fetchCitiesByRegion = async (regionId: number) => {
    try {
      const citiesData = await lookupApi.getCitiesByRegion(regionId);
      return citiesData;
    } catch (error) {
      console.error("❌ Error fetching cities:", error);
      return [];
    }
  };

  const fetchNeighborhoodsByCity = async (cityId: number) => {
    try {
      const neighborhoodsData = await lookupApi.getNeighborhoodsByCity(cityId);
      return neighborhoodsData;
    } catch (error) {
      console.error("❌ Error fetching neighborhoods:", error);
      return [];
    }
  };

  return {
    // Data arrays (real API data only, no fallback)
    regions,
    cities,
    neighborhoods,
    propertyTypes,
    listingTypes,
    features,
    conditions,
    finishingTypes,
    statusValues,

    // Loading states
    regionsLoading,
    propertyTypesLoading,
    listingTypesLoading,
    citiesLoading,
    neighborhoodsLoading,
    featuresLoading,
    conditionsLoading,
    finishingTypesLoading,
    statusValuesLoading,

    // Error states
    regionsError,
    propertyTypesError,
    listingTypesError,
    citiesError,
    neighborhoodsError,
    featuresError,
    conditionsError,
    finishingTypesError,
    statusValuesError,

    // Helper functions (using real API data)
    getListingTypeName,
    getPropertyTypeName,
    getCityName,
    getNeighborhoodName,
    getRegionName,
    getFeatureName,
    getConditionName,
    getFinishingTypeName,
    getStatusValueName,

    // Cascading fetch functions for filters
    fetchCitiesByRegion,
    fetchNeighborhoodsByCity,
  };
}
