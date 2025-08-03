"use client";

import { useEffect } from "react";
import { useCriticalLookupData } from "@/hooks/useLookupData";

/**
 * Component that preloads critical lookup data to improve performance
 * This component doesn't render anything, it just triggers the data loading
 */
export function LookupPreloader() {
  // This will trigger the loading of critical lookup data
  const {
    regionsLoading,
    citiesLoading,
    propertyTypesLoading,
    listingTypesLoading,
  } = useCriticalLookupData();

  // Log loading state for debugging (remove in production)
  useEffect(() => {
    if (
      regionsLoading ||
      citiesLoading ||
      propertyTypesLoading ||
      listingTypesLoading
    ) {
      console.log("🔄 Loading critical lookup data...");
    } else {
      console.log("✅ Critical lookup data loaded");
    }
  }, [
    regionsLoading,
    citiesLoading,
    propertyTypesLoading,
    listingTypesLoading,
  ]);

  // This component doesn't render anything
  return null;
}
