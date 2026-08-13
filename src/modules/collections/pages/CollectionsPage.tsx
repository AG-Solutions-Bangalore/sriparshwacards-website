import { useState, useMemo } from "react";
import { CollectionsHero } from "../components/CollectionsHero";
import { CollectionsCategoryGrid } from "../components/CollectionsCategoryGrid";
import { CollectionsFilterSidebar } from "../components/CollectionsFilterSidebar";
import { CollectionsProductGrid } from "../components/CollectionsProductGrid";
import { CollectionsCtaSection } from "../components/CollectionsCtaSection";
import { PRODUCTS_DATA } from "../data/collectionsData";

export function CollectionsPage() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleOccasion = (occasion: string) => {
    setSelectedOccasions((prev) =>
      prev.includes(occasion) ? prev.filter((o) => o !== occasion) : [...prev, occasion]
    );
  };

  const handleCategoryGridSelect = (type: string | null) => {
    if (type) {
      setSelectedTypes([type]);
    } else {
      setSelectedTypes([]);
    }
  };

  const resetFilters = () => {
    setSelectedTypes([]);
    setSelectedOccasions([]);
    setSelectedTier(null);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => {
      if (selectedTypes.length > 0 && !selectedTypes.includes(p.type)) {
        return false;
      }
      if (selectedOccasions.length > 0 && !selectedOccasions.includes(p.occasion)) {
        return false;
      }
      if (selectedTier && p.tier !== selectedTier) {
        return false;
      }
      return true;
    });
  }, [selectedTypes, selectedOccasions, selectedTier]);

  return (
    <main className="bg-surface min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 pt-12 pb-24">
        {/* Hero & Breadcrumbs */}
        <CollectionsHero />

        {/* Top 4 Category Cards */}
        <CollectionsCategoryGrid
          selectedType={selectedTypes.length === 1 ? selectedTypes[0] : null}
          onSelectType={handleCategoryGridSelect}
        />

        {/* Sidebar Filter + Product Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          <CollectionsFilterSidebar
            selectedTypes={selectedTypes}
            selectedOccasions={selectedOccasions}
            selectedTier={selectedTier}
            onToggleType={toggleType}
            onToggleOccasion={toggleOccasion}
            onSelectTier={setSelectedTier}
            onResetFilters={resetFilters}
          />

          <CollectionsProductGrid products={filteredProducts} />
        </div>
      </div>

      {/* Made Entirely Yours CTA Section */}
      <CollectionsCtaSection />
    </main>
  );
}
