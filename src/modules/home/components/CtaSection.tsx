import { COMPANY_INFO } from "../../../constants";
import { RevealSection } from "../../../components/common/RevealSection";

export function CtaSection() {
  return (
    <section className="py-24 px-6 md:px-16 bg-surface">
      <RevealSection className="max-w-[1280px] mx-auto">
        <div className="bg-primary rounded-2xl overflow-hidden relative p-12 md:p-16 text-center shadow-xl">
          <div className="relative z-10 flex flex-col items-center">
            <div className="flex justify-center items-center space-x-2 mb-6">
              <div className="w-8 h-[1px] bg-on-primary/20"></div>
              <div className="w-1.5 h-1.5 rotate-45 bg-secondary"></div>
              <div className="w-8 h-[1px] bg-on-primary/20"></div>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-on-primary mb-4 font-semibold">
              Ready to design your invitation?
            </h2>
            <p className="font-body text-base text-on-primary/80 max-w-lg mx-auto mb-10 font-light leading-relaxed">
              Tell us about your celebration and we'll help you find — or create — the perfect card for your special day.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
              <a
                className="bg-secondary-container text-on-secondary-container font-label text-xs font-semibold px-8 py-4 rounded-full uppercase tracking-[0.1em] hover:bg-secondary hover:text-on-secondary transition-all duration-300 w-full sm:w-auto shadow-md hover:scale-105 active:scale-95"
                href="/collections"
              >
                Browse Designs
              </a>
              <a
                className="inline-flex items-center justify-center gap-2 border border-on-primary/30 text-on-primary font-label text-xs font-semibold px-8 py-4 rounded-full uppercase tracking-[0.1em] hover:bg-on-primary/10 transition-all duration-300 w-full sm:w-auto hover:scale-105 active:scale-95"
                href={COMPANY_INFO.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Chat with Us</span>
              </a>
            </div>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}
