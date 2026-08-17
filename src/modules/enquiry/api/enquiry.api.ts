import { httpClient } from "../../../lib/api";
import type { CreateEnquiryPayload, CreateEnquiryResult } from "../types";

export async function createEnquiry(
  payload: CreateEnquiryPayload,
): Promise<CreateEnquiryResult> {
  const { data } = await httpClient.post<CreateEnquiryResult>("/createEnquiry", payload);
  return data;
}