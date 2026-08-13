import { COMPANY_INFO } from "../../../constants";

export function CollectionsCtaSection() {
  return (
    <section className="bg-surface-container-low dark:bg-surface-container-low py-24 px-6 md:px-16 border-t border-outline-variant/20 dark:border-outline-variant/30 mt-24">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-primary dark:text-on-surface font-semibold">
          Made Entirely Yours
        </h2>
        <p className="font-body text-base md:text-lg text-on-surface-variant font-light leading-relaxed">
          Seeking something truly unique? Our atelier specializes in bespoke commissions, tailoring every detail — from custom monogram seals to hand-pressed gold foil — to reflect your personal narrative.
        </p>
        <div className="pt-4">
          <a
            className="inline-block bg-primary text-on-primary dark:bg-primary-container dark:text-on-primary-container font-label text-xs uppercase tracking-widest px-8 py-4 hover:bg-secondary dark:hover:bg-primary transition-colors duration-300 rounded-full font-semibold shadow-md"
            href={COMPANY_INFO.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Request Custom Design
          </a>
        </div>
      </div>
    </section>
  );
}
