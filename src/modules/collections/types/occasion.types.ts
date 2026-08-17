import type { ApiResponse } from "../../../lib/api";

export interface Occasion {
  id: number;
  occasions: string;
}

export type OccasionResponse = ApiResponse<Occasion[]>;
