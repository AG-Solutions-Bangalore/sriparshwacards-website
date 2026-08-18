import type { ApiResponse } from "../../../lib/api";

export interface CardType {
  id: number;
  card_types: string;
  card_types_images?: string;
}

export const CARD_TYPE_IMAGE_FOR = "CardType";

export type CardTypeResponse = ApiResponse<CardType[]>;
