import { useInfiniteQuery } from "@tanstack/react-query";
import { PropertyService } from "@/services/property.service";

export function useProperties() {
  return useInfiniteQuery({
    queryKey: ["properties"], // Remove filters from query key - always fetch all properties
    queryFn: ({ pageParam = 0 }) => {
      return PropertyService.getProperties(pageParam, 10); // No filters sent to backend
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.number + 1;
    },
    initialPageParam: 0,
  });
}
