import { useQuery } from "@tanstack/react-query";
import { getActiveCategories } from "../api";

export const categoryQueryKeys = {
  all: ["categories"] as const,
  active: () => [...categoryQueryKeys.all, "active"] as const,
};

export function useActiveCategories() {
  return useQuery({
    queryKey: categoryQueryKeys.active(),
    queryFn: getActiveCategories,
  });
}
