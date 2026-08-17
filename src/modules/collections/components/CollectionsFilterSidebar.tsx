interface CollectionsFilterSidebarProps {
  cardTypes: string[];
  occasions: string[];
  categories: string[];
  selectedTypes: string[];
  selectedOccasions: string[];
  selectedTier: string | null;
  onToggleType: (type: string) => void;
  onToggleOccasion: (occasion: string) => void;
  onSelectTier: (tier: string | null) => void;
  onResetFilters: () => void;
}

export function CollectionsFilterSidebar({
  cardTypes,
  occasions,
  categories,
  selectedTypes,
  selectedOccasions,
  selectedTier,
  onToggleType,
  onToggleOccasion,
  onSelectTier,
  onResetFilters,
}: CollectionsFilterSidebarProps) {
  const hasActiveFilters =
    selectedTypes.length > 0 || selectedOccasions.length > 0 || selectedTier !== null;

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
            Reset
          </button>
        )}
      </div>

      {/* Wedding Type Filter Group */}
      {cardTypes.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-HelveticaNow text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
            Wedding Type
          </h3>
          <div className="space-y-2.5 font-HelveticaNow text-sm text-on-surface">
            {cardTypes.map((type) => {
              const isChecked = selectedTypes.includes(type);
              return (
                <label
                  key={type}
                  className="flex items-center gap-3 cursor-pointer group select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleType(type)}
                    className="accent-secondary dark:accent-primary border-outline-variant rounded-xs w-4 h-4 cursor-pointer"
                  />
                  <span className="group-hover:text-secondary dark:group-hover:text-primary transition-colors font-light">
                    {type}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Occasion Filter Group */}
      {occasions.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-HelveticaNow text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
            Occasion
          </h3>
          <div className="space-y-2.5 font-HelveticaNow text-sm text-on-surface">
            {occasions.map((occ) => {
              const isChecked = selectedOccasions.includes(occ);
              return (
                <label
                  key={occ}
                  className="flex items-center gap-3 cursor-pointer group select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleOccasion(occ)}
                    className="accent-secondary dark:accent-primary border-outline-variant rounded-xs w-4 h-4 cursor-pointer"
                  />
                  <span className="group-hover:text-secondary dark:group-hover:text-primary transition-colors font-light text-xs sm:text-sm">
                    {occ}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Category Tiers Filter Group */}
      {categories.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-HelveticaNow text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
            Category Tiers
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((tier) => {
              const isSelected = selectedTier === tier;
              return (
                <button
                  key={tier}
                  onClick={() => onSelectTier(isSelected ? null : tier)}
                  className={`px-3 py-1.5 border text-xs font-HelveticaNow uppercase tracking-wider transition-colors cursor-pointer rounded-xs ${
                    isSelected
                      ? "border-secondary text-secondary bg-secondary/10 dark:border-primary dark:text-primary dark:bg-primary/10 font-bold"
                      : "border-outline-variant/30 text-on-surface-variant hover:border-secondary hover:text-secondary dark:hover:border-primary dark:hover:text-primary"
                  }`}
                >
                  {tier}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}