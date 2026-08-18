import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { ProductWithImage } from "../types";
import { ProductGalleryModal } from "../../../components/common/ProductGalleryModal";

interface CollectionsProductGridProps {
  products: ProductWithImage[];
  isLoading?: boolean;
}

function CollectionItemCard({
  product,
  onSelect,
}: {
  product: ProductWithImage;
  onSelect: (product: ProductWithImage, initialIndex?: number) => void;
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const images = product.imageUrls?.length
    ? product.imageUrls
    : product.imageUrl
    ? [product.imageUrl]
    : [];

  const displayImage = images[activeImageIndex] || product.imageUrl;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <article className="group/card flex flex-col justify-between bg-surface-container-lowest/50 dark:bg-surface-container-low/40 p-4 rounded-sm border border-outline-variant/15 dark:border-outline-variant/20 hover:border-primary/40 dark:hover:border-primary/50 transition-all duration-300 shadow-2xs hover:shadow-md relative select-none">
      <div>
        {/* Compact Image Container with In-Card Mini Carousel */}
        <div
          onClick={() => onSelect(product, activeImageIndex)}
          className="aspect-[4/4.5] bg-surface-container-low dark:bg-surface-container-low mb-4 overflow-hidden relative rounded-xs border border-outline-variant/10 shadow-xs cursor-pointer group/img"
        >
          {displayImage && !imageError ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={displayImage}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.7 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                alt={`${product.product_name} - ${activeImageIndex + 1}`}
                src={displayImage}
                onError={() => setImageError(true)}
                loading="lazy"
              />
            </AnimatePresence>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant/40 bg-surface-container-lowest/60 p-4 text-center">
              <span className="material-symbols-outlined text-[36px] mb-1">
                image_not_supported
              </span>
              <span className="font-label text-xs uppercase tracking-wider font-semibold">
                No Image
              </span>
            </div>
          )}

          {/* Hover Quick View Overlay */}
          <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <span className="bg-surface/95 dark:bg-surface-container-high/95 text-on-surface px-3 py-1.5 rounded-full text-xs font-label uppercase tracking-wider font-semibold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
              <span className="material-symbols-outlined text-[16px]">visibility</span>
            </span>
          </div>

          {/* In-Card Prev / Next Arrow Controls (when 2+ images exist) */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 h-7 w-7 bg-black/65 hover:bg-black text-white rounded-full flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer opacity-0 group-hover/card:opacity-100 active:scale-90"
                aria-label="Previous image"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 h-7 w-7 bg-black/65 hover:bg-black text-white rounded-full flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer opacity-0 group-hover/card:opacity-100 active:scale-90"
                aria-label="Next image"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </>
          )}

          {/* Multi-Image Dots Pagination */}
          {images.length > 1 && (
            <div
              className="absolute bottom-2 left-0 right-0 flex justify-center items-center gap-1.5 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-black/50 backdrop-blur-xs px-2 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex(idx);
                    }}
                    aria-label={`Show image ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === activeImageIndex
                        ? "w-4 bg-primary"
                        : "w-1.5 bg-white/70 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="flex flex-col items-start space-y-1">
          <span className="font-HelveticaNow text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">
            {product.product_made_of || "Wedding Card"}
          </span>
          <h3
            onClick={() => onSelect(product, activeImageIndex)}
            className="font-HelveticaNow text-lg text-primary dark:text-on-surface font-medium line-clamp-1 cursor-pointer hover:text-primary transition-colors"
          >
            {product.product_name}
          </h3>
          <p className="font-NeuMachina text-xs text-secondary dark:text-primary font-semibold">
            {product.category_names || "Custom Suite"}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 flex justify-between items-center border-t border-outline-variant/10 dark:border-outline-variant/20 mt-4">
        <button
          onClick={() => onSelect(product, activeImageIndex)}
          className="font-HelveticaNow text-[11px] uppercase text-primary dark:text-on-surface hover:text-secondary dark:hover:text-primary transition-colors font-semibold tracking-wider border-b border-primary dark:border-on-surface cursor-pointer"
        >
          View Details
        </button>

        <Link
          to={`/contact?product=${encodeURIComponent(product.product_name)}`}
          className="inline-flex items-center gap-1 text-[11px] font-HelveticaNow font-bold uppercase tracking-wider text-primary dark:text-on-surface hover:text-secondary dark:hover:text-primary transition-colors py-1 px-1.5 rounded-xs hover:bg-surface-container-high/60 group/btn cursor-pointer"
          aria-label={`Enquire about ${product.product_name}`}
        >
          <span>Enquire</span>
          <span className="material-symbols-outlined text-[16px] inline-block transition-transform duration-300 group-hover/btn:translate-x-0.5">
            arrow_forward
          </span>
        </Link>
      </div>
    </article>
  );
}

export function CollectionsProductGrid({
  products,
  isLoading,
}: CollectionsProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductWithImage | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleSelectProduct = (product: ProductWithImage, initialIndex = 0) => {
    setSelectedProduct(product);
    setSelectedImageIndex(initialIndex);
  };

  if (isLoading) {
    return (
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col bg-surface-container-lowest/50 dark:bg-surface-container-low/40 p-4 rounded-sm border border-outline-variant/15 dark:border-outline-variant/20 animate-pulse"
          >
            <div className="aspect-[4/4.5] bg-surface-container-low dark:bg-surface-container-low mb-4 rounded-xs" />
            <div className="h-3 w-2/3 bg-surface-container-high dark:bg-surface-container-low rounded-sm mb-2" />
            <div className="h-4 w-3/4 bg-surface-container-high dark:bg-surface-container-low rounded-sm" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex-1 py-16 text-center space-y-4 bg-surface-container-low/50 dark:bg-surface-container-low/30 rounded-sm border border-outline-variant/10 dark:border-outline-variant/20">
        <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40">
          filter_list_off
        </span>
        <h3 className="font-serif text-xl text-primary dark:text-on-surface font-medium">
          No invitations match your selected filters.
        </h3>
        <p className="font-body text-sm text-on-surface-variant max-w-md mx-auto font-light">
          Try clearing some filters or exploring our full collection.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
        {products.map((product) => (
          <CollectionItemCard
            key={product.id}
            product={product}
            onSelect={handleSelectProduct}
          />
        ))}
      </div>

      {/* Product Gallery Modal */}
      {selectedProduct && (
        <ProductGalleryModal
          product={selectedProduct}
          initialImageIndex={selectedImageIndex}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}