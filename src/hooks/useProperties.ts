"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getPublicProperties } from "@/lib/api/properties";
import type { PropertyFilters } from "@/features/properties/types";

export function useProperties(filters?: PropertyFilters) {
  return useInfiniteQuery({
    queryKey: ["properties", filters],
    queryFn: ({ pageParam = 0 }) => getPublicProperties(pageParam, 10, filters),
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.number + 1;
    },
    initialPageParam: 0,
  });
}
