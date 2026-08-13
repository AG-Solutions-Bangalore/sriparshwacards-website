import { COMPANY_INFO } from "../../../constants";
import type { ProductItem } from "../data/collectionsData";

interface CollectionsProductGridProps {
  products: ProductItem[];
}

export function CollectionsProductGrid({ products }: CollectionsProductGridProps) {
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
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
      {products.map((product) => (
        <article
          key={product.id}
          className="group flex flex-col justify-between bg-surface-container-lowest/50 dark:bg-surface-container-low/40 p-4 rounded-sm border border-outline-variant/15 dark:border-outline-variant/20 hover:border-primary/40 dark:hover:border-primary/50 transition-all duration-300 shadow-2xs hover:shadow-md"
        >
          <div>
            {/* Compact Image Container with Zoom */}
            <div className="aspect-[4/4.5] bg-surface-container-low dark:bg-surface-container-low mb-4 overflow-hidden relative rounded-xs border border-outline-variant/10 shadow-xs">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={product.alt}
                src={product.image}
              />
            </div>

            {/* Content Details */}
            <div className="flex flex-col items-start space-y-1">
              <span className="font-HelveticaNow text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">
                {product.badge}
              </span>
              <h3 className="font-HelveticaNow text-lg text-primary dark:text-on-surface font-medium line-clamp-1">
                {product.title}
              </h3>
              <p className="font-NeuMachina text-xs text-secondary dark:text-primary font-semibold">
                {product.price}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex justify-between items-center border-t border-outline-variant/10 dark:border-outline-variant/20 mt-4">
            <a
              href={`${COMPANY_INFO.contact.whatsappUrl}&text=Hello%20Sri%20Parshwa%20Cards%2C%20I%20am%20interested%20in%20${encodeURIComponent(
                product.title
              )}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta relative inline-flex flex-col font-HelveticaNow text-[11px] uppercase text-primary dark:text-on-surface hover:text-secondary dark:hover:text-primary transition-colors font-semibold tracking-wider"
            >
              <span className="relative inline-block overflow-hidden h-[16px] leading-[16px] whitespace-nowrap border-b border-primary dark:border-on-surface">
                <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full group-hover/cta:-translate-y-full whitespace-nowrap">
                  View Invitation
                </span>
                <span className="block absolute top-0 left-0 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 group-hover/cta:translate-y-0 text-secondary dark:text-primary font-bold whitespace-nowrap">
                  View Invitation
                </span>
              </span>
            </a>

            <a
              href={`${COMPANY_INFO.contact.whatsappUrl}&text=Hello%20Sri%20Parshwa%20Cards%2C%20I%20am%20interested%20in%20${encodeURIComponent(
                product.title
              )}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-on-surface hover:text-secondary dark:hover:text-primary transition-colors p-1"
              aria-label={`Enquire about ${product.title}`}
            >
              <span className="material-symbols-outlined text-[18px] inline-block transition-transform duration-300 group-hover:-rotate-[35deg]">
                arrow_forward
              </span>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
