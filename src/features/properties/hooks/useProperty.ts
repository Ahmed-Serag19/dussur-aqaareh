"use client"

import { useQuery } from "@tanstack/react-query"
import { PropertyService } from "@/services/property.service"

export function useProperty(id: number) {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => PropertyService.getPropertyById(id),
    enabled: !!id,
  })
}
