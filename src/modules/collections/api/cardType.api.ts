import { httpClient } from "../../../lib/api";
import type { CardTypeResponse } from "../types";

export async function getActiveCardTypes(): Promise<CardTypeResponse> {
  const { data } = await httpClient.get<CardTypeResponse>("/activeCardTypes");
  return data;
}