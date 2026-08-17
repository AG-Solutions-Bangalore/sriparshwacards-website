import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProductWithImage } from "../../modules/collections/types";
import { COMPANY_INFO } from "../../constants";

interface ProductGalleryModalProps {
  product: ProductWithImage | null;
  initialImageIndex?: number;
  onClose: () => void;
}

export function ProductGalleryModal({
  product,
  initialImageIndex = 0,
  onClose,
}: ProductGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex);

  useEffect(() => {
    setCurrentIndex(initialImageIndex);
  }, [initialImageIndex, product]);

  const images = product?.imageUrls?.length ? product.imageUrls : product?.imageUrl ? [product.imageUrl] : [];

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, handlePrev, handleNext]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  const [modalImageError, setModalImageError] = useState(false);

  useEffect(() => {
    setModalImageError(false);
  }, [currentIndex, product]);

  if (!product) return null;

  const currentImageUrl = images[currentIndex];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative z-10 w-full max-w-5xl bg-surface dark:bg-surface-container rounded-sm border border-outline-variant/30 shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 h-10 w-10 bg-surface/80 dark:bg-surface-container-high/80 hover:bg-surface dark:hover:bg-surface-container-highest backdrop-blur-sm rounded-full flex items-center justify-center text-on-surface hover:text-primary transition-colors cursor-pointer shadow-md"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>

          {/* Left: Interactive Image Viewer & Gallery */}
          <div className="relative flex-1 bg-surface-container-lowest flex flex-col items-center justify-center p-4 sm:p-8 min-h-[300px] sm:min-h-[420px] lg:min-h-[540px] select-none">
            {/* Active Image with Transition */}
            <div className="relative w-full h-full flex items-center justify-center max-h-[55vh] lg:max-h-[65vh]">
              {currentImageUrl && !modalImageError ? (
                <motion.img
                  key={currentImageUrl}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  src={currentImageUrl}
                  alt={`${product.product_name} - view ${currentIndex + 1}`}
                  onError={() => setModalImageError(true)}
                  className="max-h-full max-w-full object-contain rounded-xs shadow-sm"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-on-surface-variant/40">
                  <span className="material-symbols-outlined text-[64px]">image_not_supported</span>
                  <span className="font-label text-sm uppercase tracking-wider font-semibold mt-2">No Image</span>
                </div>
              )}

              {/* Prev / Next Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-surface/90 dark:bg-surface-container-high/90 hover:bg-primary hover:text-on-primary text-on-surface rounded-full flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer"
                    aria-label="Previous image"
                  >
                    <span className="material-symbols-outlined text-[22px]">arrow_back</span>
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-surface/90 dark:bg-surface-container-high/90 hover:bg-primary hover:text-on-primary text-on-surface rounded-full flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer"
                    aria-label="Next image"
                  >
                    <span className="material-symbols-outlined text-[22px]">arrow_forward</span>
                  </button>
                </>
              )}
            </div>

            {/* Bottom Image Counter & Thumbnails */}
            {images.length > 1 && (
              <div className="mt-4 flex flex-col items-center gap-2">
                <span className="font-label text-[11px] text-on-surface-variant tracking-wider uppercase">
                  Image {currentIndex + 1} of {images.length}
                </span>
                <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1 px-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative h-12 w-12 sm:h-14 sm:w-14 rounded-xs overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        idx === currentIndex
                          ? "border-primary shadow-sm scale-105"
                          : "border-outline-variant/30 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Product Details & WhatsApp CTA */}
          <div className="w-full lg:w-96 p-6 sm:p-8 flex flex-col justify-between bg-surface dark:bg-surface-container border-t lg:border-t-0 lg:border-l border-outline-variant/20 overflow-y-auto">
            <div className="space-y-4">
              <div>
                <span className="font-label text-[10px] text-secondary dark:text-primary tracking-[0.2em] uppercase font-semibold block">
                  {product.category_names || "Bespoke Collection"}
                </span>
                <h3 className="font-NeuMachina text-2xl text-primary dark:text-on-surface font-semibold mt-1">
                  {product.product_name}
                </h3>
              </div>

              {/* Product Specifications */}
              <div className="space-y-2.5 pt-2 border-t border-outline-variant/15 text-xs font-body">
                {product.card_type_names && (
                  <div className="flex justify-between py-1 border-b border-outline-variant/10">
                    <span className="text-on-surface-variant font-medium">Card Type:</span>
                    <span className="text-on-surface font-medium">{product.card_type_names}</span>
                  </div>
                )}
                {product.occasion_names && (
                  <div className="flex justify-between py-1 border-b border-outline-variant/10">
                    <span className="text-on-surface-variant font-medium">Occasion:</span>
                    <span className="text-on-surface font-medium">{product.occasion_names}</span>
                  </div>
                )}
                {product.product_made_of && (
                  <div className="flex justify-between py-1 border-b border-outline-variant/10">
                    <span className="text-on-surface-variant font-medium">Material:</span>
                    <span className="text-on-surface font-medium">{product.product_made_of}</span>
                  </div>
                )}
                {product.placements && product.placements.length > 0 && (
                  <div className="flex justify-between py-1 border-b border-outline-variant/10">
                    <span className="text-on-surface-variant font-medium">Tier:</span>
                    <span className="text-secondary dark:text-primary font-semibold">
                      {product.placements.map((p) => p.placements).join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 space-y-3">
              <a
                href={`${COMPANY_INFO.contact.whatsappUrl}&text=Hello%20Sri%20Parshwa%20Cards%2C%20I%20am%20interested%20in%20customizing%20the%20invitation%20${encodeURIComponent(
                  product.product_name,
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-label text-xs uppercase tracking-widest py-3.5 px-6 rounded-full font-semibold transition-all shadow-md cursor-pointer"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>Enquire on WhatsApp</span>
              </a>

              <p className="text-[11px] text-center text-on-surface-variant font-light">
                Custom samples, foil stamping & bespoke printing available.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
