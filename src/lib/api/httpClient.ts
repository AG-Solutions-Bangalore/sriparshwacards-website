import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { ApiError } from "./types";
import { getErrorMessage } from "./utils";

/**
 * Single shared Axios instance used by every API module.
 *
 * Override the base URL per environment with `VITE_API_BASE_URL`.
 */
export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  "https://sriparshwacards.in/crmapi/public/api";

export const httpClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 20_000,
});

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Attach auth tokens / per-request headers here once authentication is ready.
    return config;
  },
  (error) => Promise.reject(error),
);

httpClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const status =
      axios.isAxiosError(error) && error.response ? error.response.status : undefined;
    return Promise.reject(new ApiError(getErrorMessage(error), status, error));
  },
);