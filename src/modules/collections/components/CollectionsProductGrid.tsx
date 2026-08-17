import { useState } from "react";
import { Link } from "react-router-dom";
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
  onSelect: (product: ProductWithImage) => void;
}) {
  const [imageError, setImageError] = useState(false);
  const images = product.imageUrls?.length ? product.imageUrls : product.imageUrl ? [product.imageUrl] : [];

  return (
    <article className="group flex flex-col justify-between bg-surface-container-lowest/50 dark:bg-surface-container-low/40 p-4 rounded-sm border border-outline-variant/15 dark:border-outline-variant/20 hover:border-primary/40 dark:hover:border-primary/50 transition-all duration-300 shadow-2xs hover:shadow-md relative">
      <div>
        {/* Multi-image count badge */}
        {images.length > 1 && !imageError && (
          <div className="absolute top-6 right-6 z-10 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-[10px] font-label font-medium flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-[12px]">photo_library</span>
            <span>{images.length}</span>
          </div>
        )}

        {/* Compact Image Container with Zoom & Click to Open Lightbox */}
        <div
          onClick={() => onSelect(product)}
          className="aspect-[4/4.5] bg-surface-container-low dark:bg-surface-container-low mb-4 overflow-hidden relative rounded-xs border border-outline-variant/10 shadow-xs cursor-pointer group/img"
        >
          {product.imageUrl && !imageError ? (
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
              alt={product.product_name}
              src={product.imageUrl}
              onError={() => setImageError(true)}
              loading="lazy"
            />
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
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-surface/90 dark:bg-surface-container-high/90 text-on-surface px-3 py-1.5 rounded-full text-xs font-label uppercase tracking-wider font-semibold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>View Gallery</span>
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="flex flex-col items-start space-y-1">
          <span className="font-HelveticaNow text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">
            {product.product_made_of || "Wedding Card"}
          </span>
          <h3
            onClick={() => onSelect(product)}
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
          onClick={() => onSelect(product)}
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
  isLoading = false,
}: CollectionsProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductWithImage | null>(null);

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
            onSelect={setSelectedProduct}
          />
        ))}
      </div>

      {/* Product Gallery Modal */}
      {selectedProduct && (
        <ProductGalleryModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}