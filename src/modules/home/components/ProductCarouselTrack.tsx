import { useRef, useState, useEffect } from "react";
import type { ProductWithImage } from "../../collections/types";
import { ProductSliderCard } from "./ProductSliderCard";

interface ProductCarouselTrackProps {
  products: ProductWithImage[];
  onOpenGallery: (product: ProductWithImage, initialIndex?: number) => void;
  badgeType?: "featured" | "new" | "bestseller";
  getBadgeLabel?: (product: ProductWithImage) => string | undefined;
}

export function ProductCarouselTrack({
  products,
  onOpenGallery,
  badgeType = "bestseller",
  getBadgeLabel,
}: ProductCarouselTrackProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("div")?.clientWidth || 300;
    const scrollAmount = (cardWidth + 24) * (window.innerWidth < 768 ? 1 : 2);
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // If 3 or fewer products, expand dynamically to full width grid
  if (products.length <= 3) {
    const gridCols =
      products.length === 1
        ? "grid-cols-1 max-w-md mx-auto"
        : products.length === 2
        ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full";

    return (
      <div className={`grid gap-6 w-full ${gridCols}`}>
        {products.map((product) => (
          <div key={product.id} className="w-full">
            <ProductSliderCard
              product={product}
              onOpenGallery={onOpenGallery}
              badgeType={badgeType}
              badgeLabel={getBadgeLabel ? getBadgeLabel(product) : undefined}
            />
          </div>
        ))}
      </div>
    );
  }

  // If 4 or more products, render full interactive horizontal carousel
  return (
    <div className="relative group/carousel">
      {/* Left Navigation Arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 h-11 w-11 bg-surface dark:bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface rounded-full flex items-center justify-center shadow-xl border border-outline-variant/30 transition-all duration-200 cursor-pointer opacity-90 hover:opacity-100"
          aria-label="Scroll left"
        >
          <span className="material-symbols-outlined text-[24px]">chevron_left</span>
        </button>
      )}

      {/* Right Navigation Arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 h-11 w-11 bg-surface dark:bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface rounded-full flex items-center justify-center shadow-xl border border-outline-variant/30 transition-all duration-200 cursor-pointer opacity-90 hover:opacity-100"
          aria-label="Scroll right"
        >
          <span className="material-symbols-outlined text-[24px]">chevron_right</span>
        </button>
      )}

      {/* Scrollable Track with Snap Alignment */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto pb-4 pt-1 px-1 snap-x snap-mandatory scrollbar-none scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="snap-start shrink-0 w-[280px] sm:w-[320px] md:w-[340px] lg:w-[360px]"
          >
            <ProductSliderCard
              product={product}
              onOpenGallery={onOpenGallery}
              badgeType={badgeType}
              badgeLabel={getBadgeLabel ? getBadgeLabel(product) : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
