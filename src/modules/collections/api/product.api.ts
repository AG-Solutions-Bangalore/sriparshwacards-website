import { httpClient } from "../../../lib/api";
import type { ProductsResponse } from "../types";

export async function getActiveProducts(): Promise<ProductsResponse> {
  const { data } = await httpClient.get<ProductsResponse>("/activeProducts");
  return data;
}