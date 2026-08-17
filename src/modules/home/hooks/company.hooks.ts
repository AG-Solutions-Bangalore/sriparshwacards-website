import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getCompany } from "../api";
import { COMPANY_IMAGE_FOR, type Company, type CompanyResponse } from "../types";
import { getImageBase } from "../../../lib/api";

export const companyQueryKeys = {
  all: ["company"] as const,
  detail: () => [...companyQueryKeys.all, "detail"] as const,
};

export function useGetCompany() {
  return useQuery({
    queryKey: companyQueryKeys.detail(),
    queryFn: getCompany,
  });
}

/** Resolves the company logo to a fully qualified URL using the API's asset base. */
export function resolveCompanyLogo(
  response: CompanyResponse | undefined,
  company: Company | undefined,
): string | undefined {
  if (!response || !company || !company.company_logo) {
    return undefined;
  }
  const base = getImageBase(response, COMPANY_IMAGE_FOR);
  return base ? `${base}${company.company_logo}` : undefined;
}

/** Convenience hook exposing the company profile plus its resolved logo URL. */
export function useCompanyProfile() {
  const query = useGetCompany();
  const logoUrl = useMemo(
    () => resolveCompanyLogo(query.data, query.data?.data),
    [query.data],
  );
  return {
    company: query.data?.data,
    logoUrl,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
