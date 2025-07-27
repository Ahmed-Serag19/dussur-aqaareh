"use client";

import { useState } from "react";
import { useProperties } from "../hooks/useProperties";
import { PropertiesSection } from "@/features/properties/components/properties-section";
import { PropertyFiltersComponent } from "./property-filters";
import type { PropertyFilters as PropertyFiltersType } from "@/types/property";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

export function PropertiesPageContent() {
  const [filters, setFilters] = useState<PropertyFiltersType>({});
  const [showFilters, setShowFilters] = useState(false);
  const { t } = useLanguage();

  // Debug: Log filters to console
  console.log("Applied filters:", filters);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useProperties(filters);

  const allProperties =
    data?.pages.flatMap((page: { content: any }) => page.content) ?? [];

  const currentPage = data?.pages.length ? data.pages.length - 1 : 0;

  // Check if we have active filters
  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== "" && value !== null
  );

  // Client-side filtering only (backend filtering disabled)
  const filteredProperties = allProperties.filter((property) => {
    if (!hasActiveFilters) return true;

    // Region filter
    if (filters.regionId && property.regionId !== filters.regionId) {
      return false;
    }

    // Listing type filter
    if (
      filters.listingType &&
      property.listingTypeId !== parseInt(filters.listingType)
    ) {
      return false;
    }

    // Property type filter
    if (
      filters.propertyType &&
      property.propertyTypeId !== filters.propertyType
    ) {
      return false;
    }

    // Price range filter
    if (filters.minPrice && property.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && property.price > filters.maxPrice) {
      return false;
    }

    return true;
  });

  const hasNoResults =
    hasActiveFilters && filteredProperties.length === 0 && !isFetching;

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const mockPropertiesResponse = data?.pages[0]
    ? {
        ...data.pages[0],
        content: filteredProperties,
        totalElements: hasActiveFilters
          ? filteredProperties.length
          : data.pages[0].totalElements,
      }
    : undefined;

  const handleFiltersChange = (newFilters: PropertyFiltersType) => {
    console.log("🎯 Client-side filters changed:", newFilters);
    console.log("🔍 Client-side filtering active:", hasActiveFilters);
    console.log("📊 Total cached properties:", allProperties.length);
    console.log(
      "📊 Properties after client-side filtering:",
      filteredProperties.length
    );
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-950 mb-4">
            {t("property.availableProperties")}
          </h1>
          <p className="text-xl text-gray-600">
            {t("property.availablePropertiesDescription")}
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            {showFilters ? (
              <>
                <X className="w-4 h-4" />
                {t("filters.hideFilters")}
              </>
            ) : (
              <>
                <Filter className="w-4 h-4" />
                {t("filters.showFilters")}
                {hasActiveFilters && (
                  <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {
                      Object.values(filters).filter(
                        (v) => v !== undefined && v !== "" && v !== null
                      ).length
                    }
                  </span>
                )}
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:col-span-1 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <PropertyFiltersComponent
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            {hasNoResults ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-4">
                  🏠 {t("property.noMatchingProperties")}
                </div>
                <div className="text-gray-400 text-sm">
                  {t("property.tryChangingFilters")}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setFilters({})}
                  className="mt-4"
                >
                  {t("filters.clearAllFilters")}
                </Button>
              </div>
            ) : (
              <PropertiesSection
                data={mockPropertiesResponse}
                isLoading={isFetching}
                error={error}
                currentPage={currentPage}
                onLoadMore={handleLoadMore}
                showViewMore={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
