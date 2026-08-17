import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RevealSection } from "../../../components/common/RevealSection";
import { useActiveProductsWithImages } from "../../collections";
import { COMPANY_INFO } from "../../../constants";

export function FeaturedSection() {
  const { products, isLoading, isError } = useActiveProductsWithImages();

  const featuredProducts = useMemo(() => {
    if (!products.length) return [];
    const featured = products.filter((p) =>
      p.placements?.some((pl) =>
        pl.placements.toLowerCase().includes("featured"),
      ),
    );
    return (featured.length > 0 ? featured : products).slice(0, 3);
  }, [products]);

  if (!isLoading && !isError && featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-surface-container-low/50 dark:bg-surface-container-low/30 border-t border-outline-variant/15 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        <RevealSection>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-outline-variant/20 pb-4 gap-4">
            <div>
              <span className="font-label text-xs text-secondary dark:text-primary tracking-[0.2em] uppercase font-semibold block mb-2">
                EXQUISITE SPOTLIGHT
              </span>
              <h2 className="font-NeuMachina text-3xl md:text-4xl text-primary font-semibold">
                Featured Masterpieces
              </h2>
              <p className="font-HelveticaNow text-base text-on-surface-variant font-normal mt-1">
                Distinguished invitation suites chosen for supreme craftsmanship and luxury materials.
              </p>
            </div>
            <Link
              className="group relative inline-flex flex-col font-label text-xs text-primary dark:text-on-surface hover:text-secondary dark:hover:text-primary transition-colors uppercase tracking-widest font-semibold"
              to="/collections"
            >
              <span className="relative inline-block overflow-hidden h-[18px] leading-[18px] whitespace-nowrap border-b border-primary dark:border-on-surface">
                <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full whitespace-nowrap">
                  Explore Full Suite
                </span>
                <span className="block absolute top-0 left-0 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 text-secondary dark:text-primary font-bold whitespace-nowrap">
                  Explore Full Suite
                </span>
              </span>
            </Link>
          </div>
        </RevealSection>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-surface border border-outline-variant/20 rounded-sm p-6 animate-pulse space-y-4 shadow-sm"
              >
                <div className="aspect-[4/3] bg-surface-container-high rounded-xs" />
                <div className="h-3 w-1/3 bg-surface-container-high rounded-sm" />
                <div className="h-6 w-3/4 bg-surface-container-high rounded-sm" />
                <div className="h-4 w-1/2 bg-surface-container-high rounded-sm" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product, idx) => (
              <RevealSection key={product.id} delay={idx * 0.12}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="group bg-surface dark:bg-surface-container border border-outline-variant/20 hover:border-primary/50 transition-all duration-300 flex flex-col h-full rounded-sm overflow-hidden shadow-xs hover:shadow-xl relative"
                >
                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-primary text-on-primary font-label text-[9px] uppercase tracking-widest px-3 py-1 rounded-full font-semibold shadow-sm">
                      Featured
                    </span>
                  </div>

                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-lowest p-6 flex items-center justify-center">
                    {product.imageUrl ? (
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt={product.product_name}
                        src={product.imageUrl}
                        loading="lazy"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-[48px] text-on-surface-variant/30">
                        image_not_supported
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                    <div>
                      <span className="font-label text-[10px] text-on-surface-variant block tracking-widest uppercase font-semibold">
                        {product.product_made_of || product.card_type_names || "Luxury Card"}
                      </span>
                      <h3 className="font-NeuMachina text-xl text-on-surface font-semibold line-clamp-2 mt-1">
                        {product.product_name}
                      </h3>
                      <p className="font-body text-xs text-on-surface-variant font-light mt-1">
                        {product.occasion_names ? `Occasions: ${product.occasion_names}` : "Wedding & Occasion"}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-outline-variant/15">
                      <span className="font-label text-xs text-secondary dark:text-primary font-semibold uppercase tracking-wider">
                        {product.category_names || "Exclusive Tier"}
                      </span>
                      <a
                        href={`${COMPANY_INFO.contact.whatsappUrl}&text=Hello%20Sri%20Parshwa%20Cards%2C%20I%20am%20interested%20in%20the%20Featured%20design%20${encodeURIComponent(
                          product.product_name,
                        )}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-primary hover:text-secondary dark:hover:text-primary transition-colors text-xs font-label uppercase font-semibold tracking-wider"
                        aria-label={`Enquire about ${product.product_name}`}
                      >
                        <span>Enquire</span>
                        <span className="material-symbols-outlined text-[16px] inline-block transition-transform duration-300 group-hover:translate-x-1">
                          arrow_forward
                        </span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
