interface CategoryCard {
  id: number;
  title: string;
  image: string | undefined;
  alt: string;
}

interface CollectionsCategoryGridProps {
  categories: CategoryCard[];
  selectedTypeId: number | null;
  onSelectTypeId: (typeId: number | null) => void;
}

export function CollectionsCategoryGrid({
  categories,
  selectedTypeId,
  onSelectTypeId,
}: CollectionsCategoryGridProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="mb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((cat) => {
        const isSelected = selectedTypeId === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectTypeId(isSelected ? null : cat.id)}
            className={`group relative aspect-[3/4] overflow-hidden bg-surface-container-low dark:bg-surface-container-high flex items-end p-6 rounded-sm cursor-pointer text-left transition-all duration-300 border border-outline-variant/20 ${
              isSelected
                ? "ring-2 ring-secondary dark:ring-primary shadow-lg scale-[1.02]"
                : "hover:border-primary/40 dark:hover:border-primary/60"
            }`}
          >
            {cat.image ? (
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 dark:opacity-80 mix-blend-multiply dark:mix-blend-normal"
                alt={cat.alt}
                src={cat.image}
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 via-surface-container-high to-primary/30 dark:from-primary/30 dark:via-surface-container-high dark:to-secondary/40" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <h3 className="font-serif text-xl text-primary dark:text-on-surface relative z-10 bg-surface/90 dark:bg-surface-container-highest/90 px-4 py-2 backdrop-blur-md rounded-xs font-semibold shadow-sm transition-colors group-hover:bg-primary group-hover:text-on-primary dark:group-hover:bg-primary dark:group-hover:text-on-primary">
              {cat.title}
            </h3>
          </button>
        );
      })}
    </section>
  );
}