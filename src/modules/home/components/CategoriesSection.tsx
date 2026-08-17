import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useActiveCardTypes, useActiveProductsWithImages, splitNames } from "../../collections";

export function CategoriesSection() {
  const { data: cardTypesData } = useActiveCardTypes();
  const { products } = useActiveProductsWithImages();

  const cardTypes = useMemo(() => {
    const list = cardTypesData?.data ?? [];
    return list.map((ct) => {
      const match = products.find((p) =>
        splitNames(p.card_type_names).includes(ct.card_types),
      );
      return {
        id: ct.id,
        name: ct.card_types,
        imageUrl: match?.imageUrl,
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
          <h2 className="font-NeuMachina text-3xl md:text-4xl text-primary mb-4 font-semibold">
            Explore by Category
          </h2>
          <p className="font-HelveticaNow text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto font-normal">
            Discover collections tailored to distinct traditions and contemporary aesthetics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
          {/* Large Feature Card */}
          {primaryCategory && (
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="group relative md:col-span-2 md:row-span-2 overflow-hidden bg-surface block rounded-sm border border-outline-variant/15"
            >
              <Link to="/collections" className="block w-full h-full">
                {primaryCategory.imageUrl ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-60"
                    style={{ backgroundImage: `url('${primaryCategory.imageUrl}')` }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-surface-container-high" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="font-HelveticaNow text-3xl sm:text-4xl text-primary mb-2 font-bold">
                    {primaryCategory.name} Weddings
                  </h3>
                  <p className="font-body text-base text-on-surface max-w-md font-light">
                    Rich traditions embodied in vibrant colors and sacred motifs.
                  </p>
                  <span className="mt-4 font-label text-xs uppercase tracking-widest text-primary border-b border-primary w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">
                    Explore Collection
                  </span>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Standard Feature Cards */}
          {otherCategories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ scale: 1.01 }}
              className="group relative overflow-hidden bg-surface block rounded-sm border border-outline-variant/15"
            >
              <Link to="/collections" className="block w-full h-full">
                {cat.imageUrl ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-60"
                    style={{ backgroundImage: `url('${cat.imageUrl}')` }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-surface-container-high" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="font-HelveticaNow text-2xl text-primary mb-1 font-semibold">
                    {cat.name} Weddings
                  </h3>
                  <p className="font-body text-xs text-on-surface font-light">
                    Exquisite craftsmanship and bespoke finishing.
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

