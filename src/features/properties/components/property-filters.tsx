"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { useLookupData } from "@/hooks/useLookupData";
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
  const {
    regions,
    listingTypes,
    propertyTypes,
    regionsLoading,
    regionsError,
    listingTypesLoading,
    listingTypesError,
    propertyTypesLoading,
    propertyTypesError,
  } = useLookupData();

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

  // Filter valid data arrays
  const validRegions = filterValidItems(regions);
  const validListingTypes = filterValidItems(listingTypes);
  const validPropertyTypes = filterValidItems(propertyTypes);

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-blue-950 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            {t("filters.title")}
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Region Filter */}
        <div className="space-y-2">
          <Label htmlFor="region" className="text-sm font-medium text-gray-700">
            {t("filters.region")}
          </Label>
          <Select
            value={filters.regionId?.toString() || "all"}
            onValueChange={(value) => handleFilterChange("regionId", value)}
            disabled={regionsLoading}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  regionsLoading
                    ? "جاري التحميل..."
                    : regionsError
                    ? "خطأ في التحميل"
                    : validRegions.length === 0
                    ? "لا توجد بيانات"
                    : t("filters.selectRegion")
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filters.allRegions")}</SelectItem>
              {validRegions.map((region) => (
                <SelectItem key={region.id} value={region.id.toString()}>
                  {currentLanguage === "ar" ? region.nameAr : region.nameEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {regionsError && (
            <p className="text-xs text-red-500">خطأ في تحميل المناطق</p>
          )}
          {regionsLoading && (
            <p className="text-xs text-blue-500">جاري تحميل المناطق...</p>
          )}
        </div>

        <Separator />

        {/* Listing Type Filter */}
        <div className="space-y-2">
          <Label
            htmlFor="listingType"
            className="text-sm font-medium text-gray-700"
          >
            {t("filters.listingType")}
          </Label>
          <Select
            value={filters.listingType || "all"}
            onValueChange={(value) => handleFilterChange("listingType", value)}
            disabled={listingTypesLoading}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  listingTypesLoading
                    ? "جاري التحميل..."
                    : listingTypesError
                    ? "خطأ في التحميل"
                    : validListingTypes.length === 0
                    ? "لا توجد بيانات"
                    : t("filters.selectListingType")
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filters.allTypes")}</SelectItem>
              {validListingTypes.map((type) => (
                <SelectItem key={type.id} value={type.id.toString()}>
                  {currentLanguage === "ar" ? type.nameAr : type.nameEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {listingTypesError && (
            <p className="text-xs text-red-500">خطأ في تحميل أنواع الإعلانات</p>
          )}
          {listingTypesLoading && (
            <p className="text-xs text-blue-500">
              جاري تحميل أنواع الإعلانات...
            </p>
          )}
        </div>

        <Separator />

        {/* Property Type Filter */}
        <div className="space-y-2">
          <Label
            htmlFor="propertyType"
            className="text-sm font-medium text-gray-700"
          >
            {t("filters.propertyType")}
          </Label>
          <Select
            value={filters.propertyType?.toString() || "all"}
            onValueChange={(value) => handleFilterChange("propertyType", value)}
            disabled={propertyTypesLoading}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  propertyTypesLoading
                    ? "جاري التحميل..."
                    : propertyTypesError
                    ? "خطأ في التحميل"
                    : validPropertyTypes.length === 0
                    ? "لا توجد بيانات"
                    : t("filters.selectPropertyType")
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {t("filters.allPropertyTypes")}
              </SelectItem>
              {validPropertyTypes.map((type) => (
                <SelectItem key={type.id} value={type.id.toString()}>
                  {currentLanguage === "ar" ? type.nameAr : type.nameEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {propertyTypesError && (
            <p className="text-xs text-red-500">
              {t("filters.errorLoadingPropertyTypes")}
            </p>
          )}
          {propertyTypesLoading && (
            <p className="text-xs text-blue-500">
              {t("filters.loadingPropertyTypes")}
            </p>
          )}
        </div>

        <Separator />

        {/* Price Range Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">
            {t("filters.priceRange")}
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="minPrice" className="text-xs text-gray-500">
                {t("filters.minPrice")}
              </Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="0"
                value={filters.minPrice || ""}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                className="text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="maxPrice" className="text-xs text-gray-500">
                {t("filters.maxPrice")}
              </Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="∞"
                value={filters.maxPrice || ""}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className="text-sm"
              />
            </div>
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="pt-4">
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="w-full bg-transparent"
              size="sm"
            >
              {t("filters.clearFilters")}
            </Button>
          </div>
        )}

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              {t("filters.activeFilters")}:
            </h4>
            <div className="space-y-1">
              {filters.regionId && (
                <div className="text-xs text-gray-600">
                  {t("filters.region")}:{" "}
                  {
                    validRegions.find((r) => r.id === filters.regionId)?.[
                      currentLanguage === "ar" ? "nameAr" : "nameEn"
                    ]
                  }
                </div>
              )}
              {filters.listingType && filters.listingType !== "all" && (
                <div className="text-xs text-gray-600">
                  {t("filters.listingType")}:{" "}
                  {(() => {
                    const listingTypeId = Number.parseInt(filters.listingType);
                    const listingType = validListingTypes.find(
                      (t) => t.id === listingTypeId
                    );
                    return (
                      listingType?.[
                        currentLanguage === "ar" ? "nameAr" : "nameEn"
                      ] || filters.listingType
                    );
                  })()}
                </div>
              )}
              {filters.propertyType && (
                <div className="text-xs text-gray-600">
                  {t("filters.propertyType")}:{" "}
                  {
                    validPropertyTypes.find(
                      (t) => t.id === filters.propertyType
                    )?.[currentLanguage === "ar" ? "nameAr" : "nameEn"]
                  }
                </div>
              )}
              {(filters.minPrice || filters.maxPrice) && (
                <div className="text-xs text-gray-600">
                  {t("filters.priceRange")}: {filters.minPrice || 0} -{" "}
                  {filters.maxPrice || "∞"} {t("common.currency")}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
