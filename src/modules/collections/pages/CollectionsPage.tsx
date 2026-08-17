import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CollectionsHero } from "../components/CollectionsHero";
import { CollectionsFilterSidebar } from "../components/CollectionsFilterSidebar";
import { CollectionsProductGrid } from "../components/CollectionsProductGrid";
import { CollectionsCtaSection } from "../components/CollectionsCtaSection";
import {
  useActiveProductsWithImages,
  useActiveCardTypes,
  useActiveCategories,
  useActiveOccasions,
  filterProducts,
} from "../hooks";
import { DEFAULT_PRODUCT_FILTERS } from "../types";
import type { ProductFilters, FilterOption } from "../types";

export function CollectionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQueryParam = searchParams.get("search") || "";

  const {
    products,
    isLoading: isLoadingProducts,
    isError: isProductsError,
    error: productsError,
    refetch: refetchProducts,
  } = useActiveProductsWithImages();
  const { data: cardTypesData } = useActiveCardTypes();
  const { data: categoriesData } = useActiveCategories();
  const { data: occasionsData } = useActiveOccasions();

  const [filters, setFilters] = useState<ProductFilters>({
    ...DEFAULT_PRODUCT_FILTERS,
    searchQuery: searchQueryParam,
  });

  // Keep search filter in sync with URL search params
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: searchQueryParam,
    }));
  }, [searchQueryParam]);

  const cardTypeOptions: FilterOption[] = useMemo(() => {
    return cardTypesData?.data.map((ct) => ({ id: ct.id, label: ct.card_types })) ?? [];
  }, [cardTypesData]);

  const occasionOptions: FilterOption[] = useMemo(() => {
    return occasionsData?.data.map((occ) => ({ id: occ.id, label: occ.occasions })) ?? [];
  }, [occasionsData]);

  const categoryOptions: FilterOption[] = useMemo(() => {
    return categoriesData?.data.map((cat) => ({ id: cat.id, label: cat.categories })) ?? [];
  }, [categoriesData]);

  const toggleTypeId = (id: number) => {
    setFilters((prev) => ({
      ...prev,
      cardTypeIds: prev.cardTypeIds.includes(id)
        ? prev.cardTypeIds.filter((t) => t !== id)
        : [...prev.cardTypeIds, id],
    }));
  };

  const toggleOccasionId = (id: number) => {
    setFilters((prev) => ({
      ...prev,
      occasionIds: prev.occasionIds.includes(id)
        ? prev.occasionIds.filter((o) => o !== id)
        : [...prev.occasionIds, id],
    }));
  };

  const toggleCategoryId = (id: number) => {
    setFilters((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(id)
        ? prev.categoryIds.filter((c) => c !== id)
        : [...prev.categoryIds, id],
    }));
  };

  const clearSearch = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("search");
    setSearchParams(newParams);
    setFilters((prev) => ({ ...prev, searchQuery: "" }));
  };

  const resetFilters = () => {
    setSearchParams({});
    setFilters(DEFAULT_PRODUCT_FILTERS);
  };

  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [products, filters],
  );

  return (
    <main className="bg-surface min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 pt-12 pb-24">
        {/* Hero & Breadcrumbs */}
        <CollectionsHero />

        {/* Active Search Filter Chip */}
        {filters.searchQuery && (
          <div className="mb-8 flex items-center justify-between bg-surface-container-low dark:bg-surface-container-high px-5 py-3 rounded-sm border border-outline-variant/20">
            <div className="flex items-center gap-2 text-sm text-on-surface">
              <span className="material-symbols-outlined text-[20px] text-primary">search</span>
              <span>
                Showing results for: <strong className="text-primary font-bold">"{filters.searchQuery}"</strong> ({filteredProducts.length} items found)
              </span>
            </div>
            <button
              onClick={clearSearch}
              className="inline-flex items-center gap-1 text-xs font-label uppercase tracking-wider text-secondary dark:text-primary hover:underline font-semibold cursor-pointer"
            >
              <span>Clear Search</span>
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        )}

        {/* Sidebar Filter + Product Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          <CollectionsFilterSidebar
            cardTypes={cardTypeOptions}
            occasions={occasionOptions}
            categories={categoryOptions}
            selectedTypeIds={filters.cardTypeIds}
            selectedOccasionIds={filters.occasionIds}
            selectedCategoryIds={filters.categoryIds}
            onToggleTypeId={toggleTypeId}
            onToggleOccasionId={toggleOccasionId}
            onToggleCategoryId={toggleCategoryId}
            onResetFilters={resetFilters}
          />

          {isProductsError ? (
            <div className="flex-1 py-16 text-center space-y-4 bg-surface-container-low/50 dark:bg-surface-container-low/30 rounded-sm border border-outline-variant/10 dark:border-outline-variant/20">
              <span className="material-symbols-outlined text-[48px] text-error/70">
                cloud_off
              </span>
              <h3 className="font-serif text-xl text-primary dark:text-on-surface font-medium">
                Could not load the collection.
              </h3>
              <p className="font-body text-sm text-on-surface-variant max-w-md mx-auto font-light">
                {productsError?.message ?? "Something went wrong. Please try again."}
              </p>
              <button
                onClick={() => refetchProducts()}
                className="mt-2 inline-flex items-center gap-2 text-secondary dark:text-primary hover:underline font-label text-xs uppercase tracking-widest font-semibold cursor-pointer"
              >
                Retry
              </button>
            </div>
          ) : (
            <CollectionsProductGrid
              products={filteredProducts}
              isLoading={isLoadingProducts}
            />
          )}
        </div>
      </div>

      {/* Made Entirely Yours CTA Section */}
      <CollectionsCtaSection />
    </main>
  );
}