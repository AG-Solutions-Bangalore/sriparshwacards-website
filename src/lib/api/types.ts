/**
 * Shared API response types.
 *
 * Every endpoint of the CRM API wraps its payload in a `data` key and,
 * for resources that reference on-disk assets, provides an `image_url`
 * metadata array that contains the base URLs of the asset folders.
 */
export interface ImageUrlMeta {
  image_for: string;
  image_url: string;
}

export interface ApiResponse<T> {
  data: T;
  image_url?: ImageUrlMeta[];
}

export interface ApiErrorBody {
  message?: string;
  error?: string;
}

/** Normalized error thrown by the shared HTTP client for every failed request. */
export class ApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number, cause?: unknown) {
    super(message, cause !== undefined ? { cause } : undefined);
    this.name = "ApiError";
    this.status = status;
  }
}