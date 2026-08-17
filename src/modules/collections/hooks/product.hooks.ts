import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getActiveProducts } from "../api";
import {
  PRODUCT_IMAGE_FOR,
  type Product,
  type ProductsResponse,
  type ProductWithImage,
  type ProductFilters,
} from "../types";
import { getImageBase } from "../../../lib/api";

export const productQueryKeys = {
  all: ["products"] as const,
  active: () => [...productQueryKeys.all, "active"] as const,
};

export function useActiveProducts() {
  return useQuery({
    queryKey: productQueryKeys.active(),
    queryFn: getActiveProducts,
  });
}

/** Resolves primary/sorted product image to fully-qualified URL */
export function resolveProductImageUrl(
  response: ProductsResponse | undefined,
  product: Product,
): string | undefined {
  if (!response || !product.images || product.images.length === 0) {
    return undefined;
  }
  const base = getImageBase(response, PRODUCT_IMAGE_FOR);
  if (!base) return undefined;

  const sorted = [...product.images].sort(
    (a, b) => a.product_images_sort_order - b.product_images_sort_order,
  );
  const primary = sorted[0];
  return primary ? `${base}${primary.product_images}` : undefined;
}

/** Resolves all images for a product to fully qualified URLs */
export function resolveAllProductImages(
  response: ProductsResponse | undefined,
  product: Product,
): string[] {
  if (!response || !product.images || product.images.length === 0) {
    return [];
  }
  const base = getImageBase(response, PRODUCT_IMAGE_FOR);
  if (!base) return [];

  return [...product.images]
    .sort((a, b) => a.product_images_sort_order - b.product_images_sort_order)
    .map((img) => `${base}${img.product_images}`);
}

/** Convenience hook returning products enhanced with precomputed image URLs */
export function useActiveProductsWithImages() {
  const query = useActiveProducts();

  const productsWithImages: ProductWithImage[] = useMemo(() => {
    if (!query.data?.data) return [];
    return query.data.data.map((product) => ({
      ...product,
      imageUrl: resolveProductImageUrl(query.data, product),
      imageUrls: resolveAllProductImages(query.data, product),
    }));
  }, [query.data]);

  return {
    products: productsWithImages,
    imageBaseUrl: query.data ? getImageBase(query.data, PRODUCT_IMAGE_FOR) : undefined,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

/** Splits comma-separated strings returned by the API into trimmed lowercase arrays */
export function splitNames(names: string | undefined | null): string[] {
  if (!names) return [];
  return names
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

/** Pure filter/sort function for products based on multi-select criteria and search */
export function filterProducts(
  products: ProductWithImage[],
  filters: ProductFilters,
): ProductWithImage[] {
  return products
    .filter((product) => {
      // 1. Search Query filter (matches product name or materials)
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = product.product_name?.toLowerCase().includes(q);
        const matchesMaterial = product.product_made_of?.toLowerCase().includes(q);
        const matchesOccasion = product.occasion_names?.toLowerCase().includes(q);
        const matchesCardType = product.card_type_names?.toLowerCase().includes(q);
        if (!matchesName && !matchesMaterial && !matchesOccasion && !matchesCardType) {
          return false;
        }
      }

      // 2. Card Types multi-select
      if (filters.cardTypes.length > 0) {
        const types = splitNames(product.card_type_names);
        const hasCardType = filters.cardTypes.some((t) => types.includes(t.toLowerCase()));
        if (!hasCardType) return false;
      }

      // 3. Occasions multi-select
      if (filters.occasions.length > 0) {
        const occs = splitNames(product.occasion_names);
        const hasOccasion = filters.occasions.some((o) => occs.includes(o.toLowerCase()));
        if (!hasOccasion) return false;
      }

      // 4. Categories multi-select & tier filter
      if (filters.category) {
        const cats = splitNames(product.category_names);
        const hasCategory = cats.includes(filters.category.toLowerCase());
        if (!hasCategory) return false;
      }
      if (filters.categories.length > 0) {
        const cats = splitNames(product.category_names);
        const hasCategory = filters.categories.some((c) => cats.includes(c.toLowerCase()));
        if (!hasCategory) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === "name_asc") {
        return a.product_name.localeCompare(b.product_name);
      }
      if (filters.sortBy === "name_desc") {
        return b.product_name.localeCompare(a.product_name);
      }
      return 0; // "featured" maintains API placement order
    });
}
