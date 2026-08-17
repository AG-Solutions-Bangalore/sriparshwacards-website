import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RevealSection } from "../../../components/common/RevealSection";
import { useActiveProductsWithImages } from "../../collections";
import { COMPANY_INFO } from "../../../constants";

export function NewArrivalsSection() {
  const { products, isLoading, isError } = useActiveProductsWithImages();

  const newArrivals = useMemo(() => {
    if (!products.length) return [];
    const arrivals = products.filter((p) =>
      p.placements?.some((pl) =>
        pl.placements.toLowerCase().includes("new arrival"),
      ),
    );
    return (arrivals.length > 0 ? arrivals : products).slice(0, 4);
  }, [products]);

  if (!isLoading && !isError && newArrivals.length === 0) {
    return null;
  }

  return (
    <section className="py-24 max-w-[1280px] mx-auto px-6 md:px-16 overflow-hidden">
      <RevealSection>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-outline-variant/20 pb-4 gap-4">
          <div>
            <span className="font-label text-xs text-secondary dark:text-primary tracking-[0.2em] uppercase font-semibold block mb-2">
              FRESH SEASONAL DESIGNS
            </span>
            <h2 className="font-NeuMachina text-3xl md:text-4xl text-primary font-semibold">
              New Arrivals
            </h2>
            <p className="font-HelveticaNow text-base text-on-surface-variant font-normal mt-1">
              Explore the latest bespoke creations, intricate die-cuts, and modern metallic palettes.
            </p>
          </div>
          <Link
            className="group relative inline-flex flex-col font-label text-xs text-primary dark:text-on-surface hover:text-secondary dark:hover:text-primary transition-colors uppercase tracking-widest font-semibold"
            to="/collections"
          >
            <span className="relative inline-block overflow-hidden h-[18px] leading-[18px] whitespace-nowrap border-b border-primary dark:border-on-surface">
              <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full whitespace-nowrap">
                View All New Arrivals
              </span>
              <span className="block absolute top-0 left-0 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 text-secondary dark:text-primary font-bold whitespace-nowrap">
                View All New Arrivals
              </span>
            </span>
          </Link>
        </div>
      </RevealSection>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-surface-container border border-outline-variant/20 rounded-sm p-4 animate-pulse space-y-4"
            >
              <div className="aspect-square bg-surface-container-high rounded-xs" />
              <div className="h-3 w-1/2 bg-surface-container-high rounded-sm" />
              <div className="h-5 w-3/4 bg-surface-container-high rounded-sm" />
              <div className="h-4 w-1/3 bg-surface-container-high rounded-sm pt-2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product, idx) => (
            <RevealSection key={product.id} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="group bg-surface-container border border-outline-variant/20 hover:border-primary/50 transition-colors duration-300 flex flex-col h-full rounded-sm overflow-hidden shadow-xs hover:shadow-lg relative"
              >
                {/* New Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-secondary dark:bg-primary text-on-secondary dark:text-on-primary font-label text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-semibold shadow-xs">
                    New
                  </span>
                </div>

                <div className="relative aspect-square overflow-hidden bg-surface p-4 flex items-center justify-center">
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

                <div className="p-5 flex font-HelveticaNow flex-col justify-between flex-1">
                  <div>
                    <span className="font-label text-[10px] text-on-surface-variant block tracking-widest uppercase font-semibold">
                      {product.card_type_names || product.product_made_of || "Wedding Card"}
                    </span>
                    <h3 className="text-base text-on-surface mb-2 font-medium line-clamp-2 mt-1">
                      {product.product_name}
                    </h3>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-outline-variant/10">
                    <span className="text-xs text-secondary dark:text-primary font-semibold">
                      {product.category_names || "Standard Tier"}
                    </span>
                    <a
                      href={`${COMPANY_INFO.contact.whatsappUrl}&text=Hello%20Sri%20Parshwa%20Cards%2C%20I%20am%20interested%20in%20the%20New%20Arrival%20${encodeURIComponent(
                        product.product_name,
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-container transition-colors p-1"
                      aria-label={`Enquire about ${product.product_name}`}
                    >
                      <span className="material-symbols-outlined text-[20px] inline-block transition-transform duration-300 group-hover:-rotate-[35deg]">
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
    </section>
  );
}
