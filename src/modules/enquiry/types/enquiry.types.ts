export interface CreateEnquiryPayload {
  enquiryFullName: string;
  enquiryMobile: string;
  enquiryEmail: string;
  enquiryOccassion: string;
  enquiryWeddingDate?: string;
  enquiryMessage?: string;
}

export interface CreateEnquiryResult {
  message?: string;
  success?: boolean;
  data?: unknown;
}
