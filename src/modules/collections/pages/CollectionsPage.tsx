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
  const occasionQueryParam = searchParams.get("occasion") || searchParams.get("occasionId") || "";

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

  const [filters, setFilters] = useState<ProductFilters>(() => {
    return {
      ...DEFAULT_PRODUCT_FILTERS,
      searchQuery: searchQueryParam,
    };
  });

  const cardTypeOptions: FilterOption[] = useMemo(() => {
    return cardTypesData?.data.map((ct) => ({ id: ct.id, label: ct.card_types })) ?? [];
  }, [cardTypesData]);

  const occasionOptions: FilterOption[] = useMemo(() => {
    return occasionsData?.data.map((occ) => ({ id: occ.id, label: occ.occasions })) ?? [];
  }, [occasionsData]);

  const categoryOptions: FilterOption[] = useMemo(() => {
    return categoriesData?.data.map((cat) => ({ id: cat.id, label: cat.categories })) ?? [];
  }, [categoriesData]);

  // Keep search and occasion filters in sync with URL search params
  useEffect(() => {
    let targetOccasionIds: number[] = [];
    if (occasionQueryParam) {
      const num = parseInt(occasionQueryParam, 10);
      if (!isNaN(num)) {
        targetOccasionIds = [num];
      } else if (occasionsData?.data) {
        const found = occasionsData.data.find(
          (o) => o.occasions.toLowerCase() === occasionQueryParam.toLowerCase(),
        );
        if (found) {
          targetOccasionIds = [found.id];
        }
      }
    }

    setFilters((prev) => ({
      ...prev,
      searchQuery: searchQueryParam,
      occasionIds: occasionQueryParam ? targetOccasionIds : prev.occasionIds,
    }));
  }, [searchQueryParam, occasionQueryParam, occasionsData]);

  const toggleTypeId = (id: number) => {
    setFilters((prev) => ({
      ...prev,
      cardTypeIds: prev.cardTypeIds.includes(id)
        ? prev.cardTypeIds.filter((t) => t !== id)
        : [...prev.cardTypeIds, id],
    }));
  };

  const toggleOccasionId = (id: number) => {
    setFilters((prev) => {
      const nextIds = prev.occasionIds.includes(id)
        ? prev.occasionIds.filter((o) => o !== id)
        : [...prev.occasionIds, id];
      
      // Keep URL params aligned
      const newParams = new URLSearchParams(searchParams);
      if (nextIds.length === 1) {
        newParams.set("occasion", String(nextIds[0]));
      } else {
        newParams.delete("occasion");
        newParams.delete("occasionId");
      }
      setSearchParams(newParams, { replace: true });

      return {
        ...prev,
        occasionIds: nextIds,
      };
    });
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

  const clearOccasions = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("occasion");
    newParams.delete("occasionId");
    setSearchParams(newParams);
    setFilters((prev) => ({ ...prev, occasionIds: [] }));
  };

  const resetFilters = () => {
    setSearchParams({});
    setFilters(DEFAULT_PRODUCT_FILTERS);
  };

  const selectedOccasionNames = useMemo(() => {
    if (!occasionsData?.data || filters.occasionIds.length === 0) return [];
    return occasionsData.data
      .filter((o) => filters.occasionIds.includes(o.id))
      .map((o) => o.occasions);
  }, [filters.occasionIds, occasionsData]);

  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [products, filters],
  );

  const hasActiveFilters =
    filters.searchQuery ||
    filters.cardTypeIds.length > 0 ||
    filters.occasionIds.length > 0 ||
    filters.categoryIds.length > 0;

  return (
    <main className="bg-surface min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 pt-12 pb-24">
        {/* Hero & Breadcrumbs */}
        <CollectionsHero />

        {/* Active Filter Chips Bar */}
        {(filters.searchQuery || filters.occasionIds.length > 0) && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 bg-surface-container-low dark:bg-surface-container-high px-5 py-3.5 rounded-sm border border-outline-variant/20 shadow-2xs">
            <div className="flex flex-wrap items-center gap-2.5 text-sm text-on-surface">
              <span className="font-label text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
                Active Filter:
              </span>

              {filters.searchQuery && (
                <span className="inline-flex items-center gap-1.5 bg-surface dark:bg-surface-container-highest px-3 py-1 rounded-full text-xs font-HelveticaNow border border-outline-variant/30 text-on-surface">
                  <span className="material-symbols-outlined text-[15px] text-primary">search</span>
                  <span>"{filters.searchQuery}"</span>
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="hover:text-primary transition-colors cursor-pointer ml-0.5"
                    aria-label="Remove search filter"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              )}

              {selectedOccasionNames.length > 0 && (
                <span className="inline-flex items-center gap-1.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-on-surface px-3 py-1 rounded-full text-xs font-HelveticaNow font-medium border border-primary/20">
                  <span className="material-symbols-outlined text-[15px]">event</span>
                  <span>Occasion: {selectedOccasionNames.join(", ")}</span>
                  <button
                    type="button"
                    onClick={clearOccasions}
                    className="hover:text-secondary dark:hover:text-primary transition-colors cursor-pointer ml-0.5"
                    aria-label="Remove occasion filter"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              )}

              <span className="text-xs text-on-surface-variant/80 ml-1">
                ({filteredProducts.length} items found)
              </span>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs font-label uppercase tracking-wider text-secondary dark:text-primary hover:underline font-semibold cursor-pointer"
              >
                <span>Reset All Filters</span>
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              </button>
            )}
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