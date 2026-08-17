import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group bg-surface-container border border-outline-variant/20 hover:border-primary/50 transition-all duration-300 flex flex-col h-full rounded-sm overflow-hidden shadow-xs hover:shadow-xl relative select-none"
    >
      {/* Top Badge */}
      {badgeLabel && (
        <div className="absolute top-3 left-3 z-10">
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

      {/* Multiple Images Indicator Badge */}
      {images.length > 1 && !imageError && (
        <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-[10px] font-label font-medium flex items-center gap-1 shadow-sm">
          <span className="material-symbols-outlined text-[12px]">photo_library</span>
          <span>{images.length}</span>
        </div>
      )}

      {/* Product Image Area with Hover Zoom & Quick View */}
      <div
        className="relative aspect-square overflow-hidden bg-surface p-4 flex items-center justify-center cursor-pointer"
        onClick={() => onOpenGallery(product, activeImageIndex)}
      >
        {displayImage && !imageError ? (
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt={product.product_name}
            src={displayImage}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant/40 bg-surface-container-lowest/60 p-4 text-center">
            <span className="material-symbols-outlined text-[36px] mb-1">image_not_supported</span>
            <span className="font-label text-xs uppercase tracking-wider font-semibold">No Image</span>
          </div>
        )}

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <span className="bg-surface/90 dark:bg-surface-container-high/90 text-on-surface px-3 py-1.5 rounded-full text-xs font-label uppercase tracking-wider font-semibold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span>View Gallery</span>
          </span>
        </div>

        {/* Multi-image preview dot switchers if multiple images */}
        {images.length > 1 && (
          <div
            className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                aria-label={`Preview image ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === activeImageIndex
                    ? "w-4 bg-primary"
                    : "w-1.5 bg-white/70 hover:bg-white"
                }`}
              />
            ))}
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
            <span>Enquire</span>
            <span className="material-symbols-outlined text-[16px] inline-block transition-transform duration-300 group-hover/btn:translate-x-0.5">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
