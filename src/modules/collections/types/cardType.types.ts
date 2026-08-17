import type { ApiResponse } from "../../../lib/api";

export interface CardType {
  id: number;
  card_types: string;
}

export type CardTypeResponse = ApiResponse<CardType[]>;
