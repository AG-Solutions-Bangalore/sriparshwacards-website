import { httpClient } from "../../../lib/api";
import type { OccasionResponse } from "../types";

export async function getActiveOccasions(): Promise<OccasionResponse> {
  const { data } = await httpClient.get<OccasionResponse>("/activeOccasions");
  return data;
}