import type { BaseEntity, PaginatedResponse } from "@/types/common";

export interface Property extends BaseEntity {
  title: string;
  description: string;
  price: number;
  cityId: number;
  conditionId: number;
  finishTypeId: number;
  ownerId: number;
  propertyTypeId: number;
  regionId: number;
  neighborhoodId: number;
  listingTypeId: number;
  streetAr: string;
  streetEn: string;
  descriptionAr: string;
  descriptionEn: string;
  area: number;
  roomsCount: number;
  bathroomsCount: number;
  livingroomsCount: number;
  floorsCount: number;
  buildingAge: number;
  images?: PropertyImage[];
}

export interface PropertyImage extends BaseEntity {
  url: string;
  alt?: string;
  isPrimary: boolean;
}

export interface PropertyFilters {
  listingType?: "rent" | "buy" | "all";
  propertyType?: number;
  regionId?: number;
  cityId?: number;
  neighborhoodId?: number;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  roomsCount?: number;
  bathroomsCount?: number;
  search?: string;
}

export type PropertiesResponse = PaginatedResponse<Property>;

export interface LookupItem extends BaseEntity {
  nameAr: string;
  nameEn: string;
}

export type Region = LookupItem;
export type City = LookupItem;
export type Neighborhood = LookupItem;
export type PropertyType = LookupItem;
export type ListingType = LookupItem;
