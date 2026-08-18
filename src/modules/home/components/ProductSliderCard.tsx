import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { ProductWithImage } from "../../collections/types";

interface ProductSliderCardProps {
  product: ProductWithImage;
  onOpenGallery: (product: ProductWithImage, initialIndex?: number) => void;
  badgeLabel?: string;
  badgeType?: "featured" | "new" | "bestseller";
}

export function ProductSliderCard({
  product,
  onOpenGallery,
  badgeLabel,
  badgeType = "bestseller",
}: ProductSliderCardProps) {
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
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group/card bg-surface-container border border-outline-variant/20 hover:border-primary/50 transition-all duration-300 flex flex-col h-full rounded-sm overflow-hidden shadow-xs hover:shadow-xl relative select-none"
    >
      {/* Top Badge */}
      {badgeLabel && (
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span
            className={`font-label text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-semibold shadow-xs ${
              badgeType === "featured"
                ? "bg-primary text-on-primary"
                : badgeType === "new"
                ? "bg-secondary dark:bg-primary text-on-secondary dark:text-on-primary"
                : "bg-surface-container-high text-primary border border-outline-variant/20"
            }`}
          >
            {badgeLabel}
          </span>
        </div>
      )}

      {/* Product Image Area with In-Card Mini Carousel */}
      <div
        className="relative aspect-square overflow-hidden bg-surface flex items-center justify-center cursor-pointer group/img"
        onClick={() => onOpenGallery(product, activeImageIndex)}
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
            <span className="material-symbols-outlined text-[36px] mb-1">image_not_supported</span>
            <span className="font-label text-xs uppercase tracking-wider font-semibold">No Image</span>
          </div>
        )}

        {/* Hover Quick View Button Overlay */}
        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="bg-surface/95 dark:bg-surface-container-high/95 text-on-surface px-3 py-1.5 rounded-full text-xs font-label uppercase tracking-wider font-semibold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
            <span className="material-symbols-outlined text-[16px]">visibility</span>
          </span>
        </div>

        {/* In-Card Prev / Next Arrow Controls (Visible on hover when 2+ images exist) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 h-7 w-7 bg-black/65 hover:bg-black text-white rounded-full flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer opacity-0 group-hover/card:opacity-100 active:scale-90"
              aria-label="Previous card image"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 h-7 w-7 bg-black/65 hover:bg-black text-white rounded-full flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer opacity-0 group-hover/card:opacity-100 active:scale-90"
              aria-label="Next card image"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </>
        )}

        {/* Multi-Image Dots Pagination */}
        {images.length > 1 && (
          <div
            className="absolute bottom-2.5 left-0 right-0 flex justify-center items-center gap-1.5 z-20"
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

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-surface-container">
        <div>
          <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">
            {product.card_type_names || "Custom Invitation"}
          </span>
          <h3
            onClick={() => onOpenGallery(product, activeImageIndex)}
            className="font-NeuMachina text-base text-on-surface font-semibold line-clamp-1 mb-1 hover:text-secondary dark:hover:text-primary transition-colors cursor-pointer"
            title={product.product_name}
          >
            {product.product_name}
          </h3>
          {product.occasion_names && (
            <p className="text-xs text-on-surface-variant/80 line-clamp-1 font-light">
              {product.occasion_names}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-outline-variant/10 mt-3">
          <span className="text-xs text-secondary dark:text-primary font-semibold">
            {product.category_names || "Standard Suite"}
          </span>
          <Link
            to={`/contact?product=${encodeURIComponent(product.product_name)}`}
            className="inline-flex items-center gap-1 text-xs font-HelveticaNow font-bold uppercase tracking-wider text-primary dark:text-on-surface hover:text-secondary dark:hover:text-primary transition-colors py-1 px-1.5 rounded-xs hover:bg-surface-container-high/60 group/btn cursor-pointer"
            aria-label={`Enquire about ${product.product_name}`}
          >
            <span>ENQUIRE</span>
            <span className="material-symbols-outlined text-[14px] transition-transform duration-300 group-hover/btn:translate-x-0.5">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
