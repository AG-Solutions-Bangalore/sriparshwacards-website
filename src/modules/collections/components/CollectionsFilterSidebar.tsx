import type { FilterOption } from "../types";

interface CollectionsFilterSidebarProps {
  cardTypes: FilterOption[];
  occasions: FilterOption[];
  categories: FilterOption[];
  selectedTypeIds: number[];
  selectedOccasionIds: number[];
  selectedCategoryIds: number[];
  onToggleTypeId: (id: number) => void;
  onToggleOccasionId: (id: number) => void;
  onToggleCategoryId: (id: number) => void;
  onResetFilters: () => void;
}

export function CollectionsFilterSidebar({
  cardTypes,
  occasions,
  categories,
  selectedTypeIds,
  selectedOccasionIds,
  selectedCategoryIds,
  onToggleTypeId,
  onToggleOccasionId,
  onToggleCategoryId,
  onResetFilters,
}: CollectionsFilterSidebarProps) {
  const hasActiveFilters =
    selectedTypeIds.length > 0 ||
    selectedOccasionIds.length > 0 ||
    selectedCategoryIds.length > 0;

  return (
    <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-24 self-start z-30 space-y-8 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar pr-2 py-1">
      {/* Header & Reset Button */}
      <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
        <h2 className="font-HelveticaNow text-xs uppercase tracking-widest text-primary dark:text-on-surface font-bold">
          Refine By
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="text-xs text-secondary dark:text-primary hover:underline cursor-pointer font-HelveticaNow uppercase tracking-wider font-semibold"
          >
            Reset All
          </button>
        )}
      </div>

      {/* Wedding Type Filter Group (by ID) */}
      {cardTypes.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-HelveticaNow text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
            Wedding Type
          </h3>
          <div className="space-y-2.5 font-HelveticaNow text-sm text-on-surface">
            {cardTypes.map((type) => {
              const isChecked = selectedTypeIds.includes(type.id);
              return (
                <label
                  key={type.id}
                  className="flex items-center gap-3 cursor-pointer group select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleTypeId(type.id)}
                    className="accent-secondary dark:accent-primary border-outline-variant rounded-xs w-4 h-4 cursor-pointer"
                  />
                  <span className="group-hover:text-secondary dark:group-hover:text-primary transition-colors font-light">
                    {type.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Occasion Filter Group (by ID) */}
      {occasions.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-HelveticaNow text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
            Occasion
          </h3>
          <div className="space-y-2.5 font-HelveticaNow text-sm text-on-surface">
            {occasions.map((occ) => {
              const isChecked = selectedOccasionIds.includes(occ.id);
              return (
                <label
                  key={occ.id}
                  className="flex items-center gap-3 cursor-pointer group select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleOccasionId(occ.id)}
                    className="accent-secondary dark:accent-primary border-outline-variant rounded-xs w-4 h-4 cursor-pointer"
                  />
                  <span className="group-hover:text-secondary dark:group-hover:text-primary transition-colors font-light text-xs sm:text-sm">
                    {occ.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Category Tiers Multi-Select Filter Group (by ID) */}
      {categories.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-HelveticaNow text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
              Category Tiers
            </h3>
            {selectedCategoryIds.length > 0 && (
              <span className="text-[10px] font-label text-secondary dark:text-primary font-semibold uppercase">
                {selectedCategoryIds.length} selected
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((tier) => {
              const isSelected = selectedCategoryIds.includes(tier.id);
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => onToggleCategoryId(tier.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 border text-xs font-HelveticaNow uppercase tracking-wider transition-all duration-200 cursor-pointer rounded-xs ${
                    isSelected
                      ? "border-secondary text-secondary bg-secondary/10 dark:border-primary dark:text-primary dark:bg-primary/10 font-bold shadow-xs scale-[1.02]"
                      : "border-outline-variant/30 text-on-surface-variant hover:border-secondary hover:text-secondary dark:hover:border-primary dark:hover:text-primary"
                  }`}
                >
                  {isSelected && (
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  )}
                  <span>{tier.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}