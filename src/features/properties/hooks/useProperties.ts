import { useInfiniteQuery } from "@tanstack/react-query";
import { PropertyService } from "@/services/property.service";
import type { PropertyFilters } from "@/types/property";

export function useProperties(filters?: PropertyFilters) {
  console.log("🔍 useProperties called with filters:", filters);
  return useInfiniteQuery({
    queryKey: ["properties"], // Remove filters from query key - always fetch all properties
    queryFn: ({ pageParam = 0 }) => {
      console.log(
        "📡 Fetching ALL properties (no backend filtering), page:",
        pageParam
      );
      return PropertyService.getProperties(pageParam, 10); // No filters sent to backend
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.number + 1;
    },
    initialPageParam: 0,
  });
}
