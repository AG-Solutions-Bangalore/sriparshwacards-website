import { useState, useMemo } from "react";
import { CollectionsHero } from "../components/CollectionsHero";
import { CollectionsCategoryGrid } from "../components/CollectionsCategoryGrid";
import { CollectionsFilterSidebar } from "../components/CollectionsFilterSidebar";
import { CollectionsProductGrid } from "../components/CollectionsProductGrid";
import { CollectionsCtaSection } from "../components/CollectionsCtaSection";
import {
  useActiveProductsWithImages,
  useActiveCardTypes,
  useActiveCategories,
  useActiveOccasions,
  filterProducts,
  splitNames,
} from "../hooks";
import { DEFAULT_PRODUCT_FILTERS } from "../types";
import type { ProductFilters } from "../types";

export function CollectionsPage() {
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

  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_PRODUCT_FILTERS);

  const toggleType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      cardTypes: prev.cardTypes.includes(type)
        ? prev.cardTypes.filter((t) => t !== type)
        : [...prev.cardTypes, type],
    }));
  };

  const toggleOccasion = (occasion: string) => {
    setFilters((prev) => ({
      ...prev,
      occasions: prev.occasions.includes(occasion)
        ? prev.occasions.filter((o) => o !== occasion)
        : [...prev.occasions, occasion],
    }));
  };

  const handleCategoryGridSelect = (type: string | null) => {
    setFilters((prev) => ({
      ...prev,
      cardTypes: type ? [type] : [],
    }));
  };

  const handleSelectTier = (tier: string | null) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === tier ? null : tier,
    }));
  };

  const resetFilters = () => setFilters(DEFAULT_PRODUCT_FILTERS);

  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [products, filters],
  );

  const categoryCards = useMemo(() => {
    const types = cardTypesData?.data ?? [];
    return types.map((cardType) => {
      const matchingProduct = products.find((p) => {
        const names = splitNames(p.card_type_names);
        return names.includes(cardType.card_types);
      });
      return {
        id: String(cardType.id),
        title: cardType.card_types,
        image: matchingProduct?.imageUrl,
        alt: `${cardType.card_types} wedding invitation collection`,
      };
    });
  }, [cardTypesData, products]);

  return (
    <main className="bg-surface min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 pt-12 pb-24">
        {/* Hero & Breadcrumbs */}
        <CollectionsHero />

        {/* Top Category Cards */}
        <CollectionsCategoryGrid
          categories={categoryCards}
          selectedType={filters.cardTypes.length === 1 ? filters.cardTypes[0] : null}
          onSelectType={handleCategoryGridSelect}
        />

        {/* Sidebar Filter + Product Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          <CollectionsFilterSidebar
            cardTypes={cardTypesData?.data.map((cardType) => cardType.card_types) ?? []}
            occasions={occasionsData?.data.map((occasion) => occasion.occasions) ?? []}
            categories={categoriesData?.data.map((category) => category.categories) ?? []}
            selectedTypes={filters.cardTypes}
            selectedOccasions={filters.occasions}
            selectedTier={filters.category}
            onToggleType={toggleType}
            onToggleOccasion={toggleOccasion}
            onSelectTier={handleSelectTier}
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