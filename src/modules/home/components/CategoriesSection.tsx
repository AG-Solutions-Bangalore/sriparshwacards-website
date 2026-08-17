import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  useActiveCardTypes,
  resolveCardTypeImageUrl,
  useActiveProductsWithImages,
  splitNames,
} from "../../collections";

// Luxury curated fallback images per category if no specific image is provided
const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  christian:
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  hindu:
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
  muslim:
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  sikh:
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  default:
    "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
};

export function CategoriesSection() {
  const { data: cardTypesData } = useActiveCardTypes();
  const { products } = useActiveProductsWithImages();

  const cardTypes = useMemo(() => {
    const list = cardTypesData?.data ?? [];
    return list.map((ct) => {
      // 1. Direct card_types_images from API
      const directImage = resolveCardTypeImageUrl(cardTypesData, ct);

      // 2. Product matching fallback
      const lowerName = ct.card_types.toLowerCase();
      const match = products.find((p) => {
        const types = splitNames(p.card_type_names);
        const occs = splitNames(p.occasion_names);
        const cats = splitNames(p.category_names);
        return (
          types.includes(lowerName) ||
          occs.includes(lowerName) ||
          cats.includes(lowerName) ||
          p.product_name.toLowerCase().includes(lowerName)
        );
      });

      // 3. Curated luxury fallback
      const fallback =
        CATEGORY_FALLBACK_IMAGES[lowerName] ||
        (lowerName.includes("hindu") ? CATEGORY_FALLBACK_IMAGES.hindu : undefined) ||
        (lowerName.includes("christian") ? CATEGORY_FALLBACK_IMAGES.christian : undefined) ||
        (lowerName.includes("muslim") ? CATEGORY_FALLBACK_IMAGES.muslim : undefined) ||
        CATEGORY_FALLBACK_IMAGES.default;

      return {
        id: ct.id,
        name: ct.card_types,
        imageUrl: directImage || match?.imageUrl || fallback,
      };
    });
  }, [cardTypesData, products]);

  if (cardTypes.length === 0) {
    return null;
  }

  const primaryCategory = cardTypes[0];
  const otherCategories = cardTypes.slice(1, 3);

  return (
    <section
      id="collections"
      className="py-24 bg-surface-container-low border-y border-outline-variant/20"
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-[1280px] mx-auto px-6 md:px-16"
      >
        <div className="text-center mb-16">
          <span className="font-label text-xs text-secondary dark:text-primary tracking-[0.2em] uppercase font-semibold block mb-2">
            TRADITIONS & STYLES
          </span>
          <h2 className="font-NeuMachina text-3xl md:text-4xl text-primary mb-4 font-semibold">
            Explore by Category
          </h2>
          <p className="font-HelveticaNow text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto font-normal">
            Discover collections tailored to distinct traditions and contemporary aesthetics.
          </p>
        </div>

        {/* Bento Grid Layout: 1 Large Left Card + 2 Stacked Right Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
          {/* Large Feature Card */}
          {primaryCategory && (
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="group relative md:col-span-2 md:row-span-2 overflow-hidden bg-surface block rounded-sm border border-outline-variant/15 shadow-sm"
            >
              <Link to="/collections" className="block w-full h-full">
                {primaryCategory.imageUrl ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-75"
                    style={{ backgroundImage: `url('${primaryCategory.imageUrl}')` }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-surface-container-high" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="font-HelveticaNow text-3xl sm:text-4xl text-white font-bold drop-shadow-sm">
                    {primaryCategory.name}
                  </h3>
                  <span className="mt-4 font-label text-xs uppercase tracking-widest text-secondary dark:text-primary border-b border-secondary dark:border-primary w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">
                    Explore Collection →
                  </span>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Stacked Standard Feature Cards */}
          {otherCategories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ scale: 1.01 }}
              className="group relative overflow-hidden bg-surface block rounded-sm border border-outline-variant/15 shadow-sm"
            >
              <Link to="/collections" className="block w-full h-full">
                {cat.imageUrl ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-75"
                    style={{ backgroundImage: `url('${cat.imageUrl}')` }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-surface-container-high" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="font-HelveticaNow text-2xl text-white font-semibold drop-shadow-sm">
                    {cat.name}
                  </h3>
                  <span className="mt-2 font-label text-xs uppercase tracking-widest text-secondary dark:text-primary border-b border-secondary dark:border-primary w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">
                    Explore Collection →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
