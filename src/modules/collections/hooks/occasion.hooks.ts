import { useQuery } from "@tanstack/react-query";
import { getActiveOccasions } from "../api";

export const occasionQueryKeys = {
  all: ["occasions"] as const,
  active: () => [...occasionQueryKeys.all, "active"] as const,
};

export function useActiveOccasions() {
  return useQuery({
    queryKey: occasionQueryKeys.active(),
    queryFn: getActiveOccasions,
  });
}
