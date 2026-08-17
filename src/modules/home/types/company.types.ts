import type { ApiResponse } from "../../../lib/api";

export interface Company {
  id: number;
  company_name: string;
  company_email: string;
  company_short: string;
  company_gst: string | null;
  company_pan_no: string | null;
  company_mobile_no: string | null;
  company_address: string | null;
  company_address_map_url: string | null;
  company_website: string;
  company_logo: string;
  company_banner: string | null;
  company_support_email: string;
  company_status: string;
  created_by: string | null;
  updated_by: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export type CompanyResponse = ApiResponse<Company>;

export const COMPANY_IMAGE_FOR = "Company";
