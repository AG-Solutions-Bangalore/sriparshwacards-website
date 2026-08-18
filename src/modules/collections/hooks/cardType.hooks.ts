import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getActiveCardTypes } from "../api";
import {
  CARD_TYPE_IMAGE_FOR,
  type CardType,
  type CardTypeResponse,
} from "../types";
import { getImageBase } from "../../../lib/api";

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

/** Resolves card type image to fully-qualified URL using image_url from API response */
export function resolveCardTypeImageUrl(
  response: CardTypeResponse | undefined,
  cardType: CardType,
): string | undefined {
  if (!response || !cardType.card_types_images) {
    return undefined;
  }
  const base = getImageBase(response, CARD_TYPE_IMAGE_FOR);
  if (!base) return undefined;
  return `${base}${cardType.card_types_images}`;
}

export function useActiveCardTypesWithImages() {
  const query = useActiveCardTypes();

  const cardTypesWithImages = useMemo(() => {
    if (!query.data?.data) return [];
    return query.data.data.map((cardType) => ({
      ...cardType,
      imageUrl: resolveCardTypeImageUrl(query.data, cardType),
    }));
  }, [query.data]);

  return {
    cardTypes: cardTypesWithImages,
    imageBaseUrl: query.data ? getImageBase(query.data, CARD_TYPE_IMAGE_FOR) : undefined,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
