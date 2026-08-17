import { httpClient } from "../../../lib/api";
import type { CategoryResponse } from "../types";

export async function getActiveCategories(): Promise<CategoryResponse> {
  const { data } = await httpClient.get<CategoryResponse>("/activeCategorys");
  return data;
}