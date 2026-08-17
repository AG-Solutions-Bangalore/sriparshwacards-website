import { AxiosError } from "axios";
import type { ApiErrorBody, ImageUrlMeta } from "./types";

/** Extracts a human readable message from any error thrown by the HTTP client. */
export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const body = error.response?.data as ApiErrorBody | undefined;
    const message = body?.message ?? body?.error ?? error.message;
    if (message) {
      return message;
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Something went wrong. Please try again.";
}

/**
 * Resolves the asset base URL for a given `image_for` label
 * from the `image_url` metadata array returned by the API.
 */
export function getImageBase(
  response: { image_url?: ImageUrlMeta[] },
  imageFor: string,
): string | undefined {
  return response.image_url?.find((entry) => entry.image_for === imageFor)?.image_url;
}