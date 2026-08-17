import type { ApiResponse } from "../../../lib/api";

export interface Category {
  id: number;
  categories: string;
}

export type CategoryResponse = ApiResponse<Category[]>;
