"use client";

import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "./useLanguage";
import { lookupApi } from "@/lib/api/lookup";
import type { LookupItem } from "@/types/property";

export function useLookupData() {
  const { currentLanguage } = useLanguage();

  // Fetch all regions - no fallback, will be empty array if API fails
  const {
    data: regions = [],
    error: regionsError,
    isLoading: regionsLoading,
  } = useQuery({
    queryKey: ["regions"],
    queryFn: lookupApi.getRegions,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 3,
    retryDelay: 2000,
  });

  // Fetch property types - no fallback
  const {
    data: propertyTypes = [],
    error: propertyTypesError,
    isLoading: propertyTypesLoading,
  } = useQuery({
    queryKey: ["propertyTypes"],
    queryFn: lookupApi.getPropertyTypes,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 3,
    retryDelay: 2000,
  });

  // Fetch listing types - no fallback
  const {
    data: listingTypes = [],
    error: listingTypesError,
    isLoading: listingTypesLoading,
  } = useQuery({
    queryKey: ["listingTypes"],
    queryFn: lookupApi.getListingTypes,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 3,
    retryDelay: 2000,
  });

  // Fetch property features - no fallback
  const {
    data: features = [],
    error: featuresError,
    isLoading: featuresLoading,
  } = useQuery({
    queryKey: ["features"],
    queryFn: lookupApi.getPropertyFeatures,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 3,
    retryDelay: 2000,
  });

  // Fetch property conditions - no fallback
  const {
    data: conditions = [],
    error: conditionsError,
    isLoading: conditionsLoading,
  } = useQuery({
    queryKey: ["conditions"],
    queryFn: lookupApi.getPropertyConditions,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 3,
    retryDelay: 2000,
  });

  // Fetch finishing types - no fallback
  const {
    data: finishingTypes = [],
    error: finishingTypesError,
    isLoading: finishingTypesLoading,
  } = useQuery({
    queryKey: ["finishingTypes"],
    queryFn: lookupApi.getFinishingTypes,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 3,
    retryDelay: 2000,
  });

  // Fetch property status values - no fallback
  const {
    data: statusValues = [],
    error: statusValuesError,
    isLoading: statusValuesLoading,
  } = useQuery({
    queryKey: ["statusValues"],
    queryFn: lookupApi.getPropertyStatusValues,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 3,
    retryDelay: 2000,
  });

  // Fetch all cities - no fallback
  const {
    data: cities = [],
    error: citiesError,
    isLoading: citiesLoading,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: lookupApi.getCities,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 3,
    retryDelay: 2000,
  });

  // Fetch all neighborhoods - no fallback
  const {
    data: neighborhoods = [],
    error: neighborhoodsError,
    isLoading: neighborhoodsLoading,
  } = useQuery({
    queryKey: ["neighborhoods"],
    queryFn: lookupApi.getNeighborhoods,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 3,
    retryDelay: 2000,
  });

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
