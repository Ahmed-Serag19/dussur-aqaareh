import React, { createContext, useContext, useMemo } from "react";
import type { Property } from "@/types/property";

interface PropertyListContextValue {
  properties: Property[];
}

const PropertyListContext = createContext<PropertyListContextValue | undefined>(
  undefined
);

export function PropertyListProvider({
  properties,
  children,
}: {
  properties: Property[];
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ properties }), [properties]);
  return (
    <PropertyListContext.Provider value={value}>
      {children}
    </PropertyListContext.Provider>
  );
}

export function usePropertyFromContext(id: number): Property | undefined {
  const ctx = useContext(PropertyListContext);
  if (!ctx) return undefined;
  return ctx.properties.find((p) => p.id === id);
}
