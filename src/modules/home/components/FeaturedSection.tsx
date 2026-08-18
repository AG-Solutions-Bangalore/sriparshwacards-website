import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { RevealSection } from "../../../components/common/RevealSection";
import { useActiveProductsWithImages } from "../../collections/hooks";
import type { ProductWithImage } from "../../collections/types";
import { ProductCarouselTrack } from "./ProductCarouselTrack";
import { ProductGalleryModal } from "../../../components/common/ProductGalleryModal";

export function FeaturedSection() {
  const { products, isLoading, isError } = useActiveProductsWithImages();
  const [selectedProduct, setSelectedProduct] = useState<ProductWithImage | null>(null);
  const [initialImageIndex, setInitialImageIndex] = useState(0);

  const featuredProducts = useMemo(() => {
    if (!products.length) return [];
    const featured = products.filter((p) =>
      p.placements?.some((pl) =>
        pl.placements.toLowerCase().includes("featured"),
      ),
    );
    return featured.length > 0 ? featured : products;
  }, [products]);

  const handleOpenGallery = (product: ProductWithImage, initialIndex = 0) => {
    setSelectedProduct(product);
    setInitialImageIndex(initialIndex);
  };

  if (!isLoading && !isError && featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-surface-container-low/50 dark:bg-surface-container-low/30 border-t border-outline-variant/15 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <RevealSection>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-outline-variant/20 pb-4 gap-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        ) : isError || featuredProducts.length === 0 ? null : (
          <RevealSection>
            <ProductCarouselTrack
              products={featuredProducts}
              onOpenGallery={handleOpenGallery}
              badgeType="featured"
              getBadgeLabel={() => "Featured"}
            />
          </RevealSection>
        )}

        {/* Lightbox / Gallery Modal */}
        {selectedProduct && (
          <ProductGalleryModal
            product={selectedProduct}
            initialImageIndex={initialImageIndex}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </section>
  );
}
