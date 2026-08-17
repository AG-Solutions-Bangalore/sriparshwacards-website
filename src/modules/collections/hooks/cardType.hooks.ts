import { useQuery } from "@tanstack/react-query";
import { getActiveCardTypes } from "../api";

export const cardTypeQueryKeys = {
  all: ["cardTypes"] as const,
  active: () => [...cardTypeQueryKeys.all, "active"] as const,
};

export function useActiveCardTypes() {
  return useQuery({
    queryKey: cardTypeQueryKeys.active(),
    queryFn: getActiveCardTypes,
  });
}
