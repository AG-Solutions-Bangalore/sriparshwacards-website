import type { ApiResponse } from "../../../lib/api";

export interface ProductImage {
  id: number;
  product_id: number;
  product_images: string;
  product_images_sort_order: number;
  product_images_status: string;
  product_status: string | null;
}

export interface ProductPlacement {
  id: number;
  product_id: number;
  placements_id: number;
  placements: string;
}

export interface Product {
  id: number;
  product_name: string;
  occasions_ids: string;
  occasion_names: string;
  categories_ids: string;
  category_names: string;
  card_types_ids: string;
  card_type_names: string;
  product_made_of: string;
  images: ProductImage[];
  placements: ProductPlacement[];
}

export type ProductsResponse = ApiResponse<Product[]>;

export const PRODUCT_IMAGE_FOR = "Product";

export interface ProductWithImage extends Product {
  imageUrl?: string;
  imageUrls: string[];
}

export type ProductWithImages = ProductWithImage;

export interface ProductFilters {
  cardTypes: string[];
  occasions: string[];
  categories: string[];
  category: string | null;
  searchQuery: string;
  sortBy: "featured" | "name_asc" | "name_desc";
}

export const DEFAULT_PRODUCT_FILTERS: ProductFilters = {
  cardTypes: [],
  occasions: [],
  categories: [],
  category: null,
  searchQuery: "",
  sortBy: "featured",
};
