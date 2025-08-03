"use client";

import { useLanguage } from "@/hooks/useLanguage";
import {
  useRegions,
  usePropertyTypes,
  useListingTypes,
} from "@/hooks/useLookupData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Filter, X } from "lucide-react";
import type { PropertyFilters, LookupItem } from "@/types/property";

interface PropertyFiltersProps {
  filters: PropertyFilters;
  onFiltersChange: (filters: PropertyFilters) => void;
}

export function PropertyFiltersComponent({
  filters,
  onFiltersChange,
}: PropertyFiltersProps) {
  const { t, currentLanguage } = useLanguage();

  // Only load the specific data needed for filters
  const {
    data: regions = [],
    isLoading: regionsLoading,
    error: regionsError,
  } = useRegions();

  const {
    data: listingTypes = [],
    isLoading: listingTypesLoading,
    error: listingTypesError,
  } = useListingTypes();

  const {
    data: propertyTypes = [],
    isLoading: propertyTypesLoading,
    error: propertyTypesError,
  } = usePropertyTypes();

  const handleFilterChange = (
    key: keyof PropertyFilters,
    value: string | number | undefined
  ) => {
    const newFilters = { ...filters };
    if (key === "regionId") {
      if (value === "all" || value === "" || !value) {
        delete newFilters.regionId;
      } else {
        newFilters.regionId = Number.parseInt(value as string);
      }
    } else if (key === "listingType") {
      if (value === "all" || value === "" || !value) {
        delete newFilters.listingType;
      } else {
        newFilters.listingType = value as string; // Keep as string ID
      }
    } else if (key === "propertyType") {
      if (value === "all" || value === "" || !value) {
        delete newFilters.propertyType;
      } else {
        newFilters.propertyType = Number.parseInt(value as string);
      }
    } else if (key === "minPrice" || key === "maxPrice") {
      if (value === "" || value === null || value === undefined) {
        delete newFilters[key];
      } else {
        newFilters[key] = Number.parseInt(value as string);
      }
    } else {
      if (value === "" || value === null || value === undefined) {
        delete newFilters[key];
      } else {
        // Type-safe assignment for other filter properties
        (newFilters as Record<string, unknown>)[key] = value;
      }
    }

    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  // Helper function to filter out invalid items
  const filterValidItems = (items: LookupItem[]) => {
    return items.filter(
      (item) =>
        item &&
        item.id &&
        item.id.toString() !== "" &&
        item.id.toString() !== "undefined" &&
        item.id.toString() !== "null" &&
        ((currentLanguage === "ar" && item.nameAr) ||
          (currentLanguage === "en" && item.nameEn) ||
          item.nameAr ||
          item.nameEn)
    );
  };

  // Check if any data is still loading
  const isLoading =
    regionsLoading || listingTypesLoading || propertyTypesLoading;

  // Check if any data has errors
  const hasErrors = regionsError || listingTypesError || propertyTypesError;

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {t("property.filters")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-950"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (hasErrors) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {t("property.filters")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-red-600">
            {t("property.errorLoadingFilters") || "حدث خطأ في تحميل الفلاتر"}
          </div>
        </CardContent>
      </Card>
    );
  }

  const validRegions = filterValidItems(regions);
  const validListingTypes = filterValidItems(listingTypes);
  const validPropertyTypes = filterValidItems(propertyTypes);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {t("property.filters")}
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              {t("property.clearFilters")}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Region Filter */}
        <div className="space-y-2">
          <Label htmlFor="region-filter">{t("property.region")}</Label>
          <Select
            value={filters.regionId?.toString() || "all"}
            onValueChange={(value) => handleFilterChange("regionId", value)}
          >
            <SelectTrigger id="region-filter">
              <SelectValue placeholder={t("property.selectRegion")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("property.allRegions")}</SelectItem>
              {validRegions.map((region) => (
                <SelectItem key={region.id} value={region.id.toString()}>
                  {currentLanguage === "ar" ? region.nameAr : region.nameEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Listing Type Filter */}
        <div className="space-y-2">
          <Label htmlFor="listing-type-filter">
            {t("property.listingType")}
          </Label>
          <Select
            value={filters.listingType || "all"}
            onValueChange={(value) => handleFilterChange("listingType", value)}
          >
            <SelectTrigger id="listing-type-filter">
              <SelectValue placeholder={t("property.selectListingType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {t("property.allListingTypes")}
              </SelectItem>
              {validListingTypes.map((listingType) => (
                <SelectItem
                  key={listingType.id}
                  value={listingType.id.toString()}
                >
                  {currentLanguage === "ar"
                    ? listingType.nameAr
                    : listingType.nameEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Property Type Filter */}
        <div className="space-y-2">
          <Label htmlFor="property-type-filter">
            {t("property.propertyType")}
          </Label>
          <Select
            value={filters.propertyType?.toString() || "all"}
            onValueChange={(value) => handleFilterChange("propertyType", value)}
          >
            <SelectTrigger id="property-type-filter">
              <SelectValue placeholder={t("property.selectPropertyType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {t("property.allPropertyTypes")}
              </SelectItem>
              {validPropertyTypes.map((propertyType) => (
                <SelectItem
                  key={propertyType.id}
                  value={propertyType.id.toString()}
                >
                  {currentLanguage === "ar"
                    ? propertyType.nameAr
                    : propertyType.nameEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Price Range Filters */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="min-price">{t("property.minPrice")}</Label>
            <Input
              id="min-price"
              type="number"
              placeholder={t("property.minPricePlaceholder")}
              value={filters.minPrice?.toString() || ""}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-price">{t("property.maxPrice")}</Label>
            <Input
              id="max-price"
              type="number"
              placeholder={t("property.maxPricePlaceholder")}
              value={filters.maxPrice?.toString() || ""}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
