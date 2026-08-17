import { useMutation } from "@tanstack/react-query";
import { createEnquiry } from "../api";
import type { CreateEnquiryPayload, CreateEnquiryResult } from "../types";
import type { ApiError } from "../../../lib/api";

export function useCreateEnquiry() {
  return useMutation<CreateEnquiryResult, ApiError, CreateEnquiryPayload>({
    mutationFn: createEnquiry,
  });
}
