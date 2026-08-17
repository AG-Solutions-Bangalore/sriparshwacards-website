import { httpClient } from "../../../lib/api";
import type { CompanyResponse } from "../types";

export async function getCompany(): Promise<CompanyResponse> {
  const { data } = await httpClient.get<CompanyResponse>("/getCompany");
  return data;
}