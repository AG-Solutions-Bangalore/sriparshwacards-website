import { useRef, useEffect, useState, useCallback } from "react";
import type { ProductWithImage } from "../../collections/types";
import { ProductSliderCard } from "./ProductSliderCard";

interface ProductCarouselTrackProps {
  products: ProductWithImage[];
  onOpenGallery: (product: ProductWithImage, initialIndex?: number) => void;
  badgeType?: "featured" | "new" | "bestseller";
  getBadgeLabel?: (product: ProductWithImage) => string | undefined;
  autoScrollSpeed?: number; // pixels per frame, e.g. 0.75
}

export function ProductCarouselTrack({
  products,
  onOpenGallery,
  badgeType = "bestseller",
  getBadgeLabel,
  autoScrollSpeed = 0.675,
}: ProductCarouselTrackProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isAdjustingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items 3x for continuous infinite loop (if we have at least 2 items)
  const isLoopable = products.length >= 2;
  const displayItems = isLoopable
    ? [
        ...products.map((p) => ({ ...p, _loopKey: `set0-${p.id}` })),
        ...products.map((p) => ({ ...p, _loopKey: `set1-${p.id}` })),
        ...products.map((p) => ({ ...p, _loopKey: `set2-${p.id}` })),
      ]
    : products.map((p) => ({ ...p, _loopKey: `set0-${p.id}` }));

  // Set initial scroll position to the middle duplicate set
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el || !isLoopable) return;

    const frameId = requestAnimationFrame(() => {
      const singleSetWidth = el.scrollWidth / 3;
      el.scrollLeft = singleSetWidth;
    });

    return () => cancelAnimationFrame(frameId);
  }, [products, isLoopable]);

  // Handle infinite boundary looping
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el || !isLoopable || isAdjustingRef.current) return;

    const singleSetWidth = el.scrollWidth / 3;
    const threshold = 30;

    if (el.scrollLeft < threshold) {
      isAdjustingRef.current = true;
      el.scrollLeft += singleSetWidth;
      setTimeout(() => {
        isAdjustingRef.current = false;
      }, 50);
    } else if (el.scrollLeft >= singleSetWidth * 2 - threshold) {
      isAdjustingRef.current = true;
      el.scrollLeft -= singleSetWidth;
      setTimeout(() => {
        isAdjustingRef.current = false;
      }, 50);
    }
  }, [isLoopable]);

  // Continuous smooth auto-scrolling loop
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el || !isLoopable) return;

    let animId: number;

    const tick = () => {
      if (!isHoveredRef.current && !isPaused && !isAdjustingRef.current) {
        el.scrollLeft += autoScrollSpeed;
        handleScroll();
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [isLoopable, isPaused, autoScrollSpeed, handleScroll]);

  const pauseTemporarily = (duration = 2500) => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, duration);
  };

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;

    pauseTemporarily(3000);

    const cardEl = el.querySelector(".carousel-item") as HTMLElement | null;
    const cardWidth = cardEl?.offsetWidth || 340;
    const scrollAmount = cardWidth + 24; // card width + gap

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (products.length === 0) return null;

  return (
    <div
      className="relative group/carousel select-none"
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      onTouchStart={() => {
        isHoveredRef.current = true;
      }}
      onTouchEnd={() => {
        isHoveredRef.current = false;
        pauseTemporarily(2000);
      }}
    >
      {/* Left Navigation Arrow */}
      {isLoopable && (
        <button
          onClick={() => scroll("left")}
          className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 h-11 w-11 bg-surface/90 dark:bg-surface-container-high/90 hover:bg-primary hover:text-on-primary text-on-surface rounded-full flex items-center justify-center shadow-xl border border-outline-variant/30 transition-all duration-200 cursor-pointer opacity-90 hover:opacity-100 active:scale-90"
          aria-label="Previous Slide"
        >
          <span className="material-symbols-outlined text-[24px]">chevron_left</span>
        </button>
      )}

      {/* Right Navigation Arrow */}
      {isLoopable && (
        <button
          onClick={() => scroll("right")}
          className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 h-11 w-11 bg-surface/90 dark:bg-surface-container-high/90 hover:bg-primary hover:text-on-primary text-on-surface rounded-full flex items-center justify-center shadow-xl border border-outline-variant/30 transition-all duration-200 cursor-pointer opacity-90 hover:opacity-100 active:scale-90"
          aria-label="Next Slide"
        >
          <span className="material-symbols-outlined text-[24px]">chevron_right</span>
        </button>
      )}

      {/* Infinite Auto-Scrollable Track */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto pb-4 pt-1 px-1 custom-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {displayItems.map((product) => (
          <div
            key={product._loopKey}
            className="carousel-item shrink-0 w-[260px] sm:w-[320px] md:w-[340px] lg:w-[360px]"
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
