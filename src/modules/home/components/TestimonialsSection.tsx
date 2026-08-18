import { RevealSection } from "../../../components/common/RevealSection";

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote:
        "“The level of detail in our custom invitations was breathtaking. They truly captured the essence of our relationship and set the perfect tone for our wedding. An absolute masterpiece.”",
      author: "— Ananya & Rohan, New York",
      role: "Pichwai Pink Pastel Suite",
    },
    {
      id: 2,
      quote:
        "“From the first consultation to the final unboxing, the experience was flawless. The quality of the paper and the precision of the foil stamping exceeded all our expectations.”",
      author: "— Sarah & Michael, London",
      role: "Royal Gold Foil Deckle Suite",
    },
    {
      id: 3,
      quote:
        "“Elite Atelier designed our entire wedding stationery suite. It was a cohesive, elegant journey of design. Highly recommend for anyone looking for true luxury and exclusivity.”",
      author: "— Priya & Vikram, Dubai",
      role: "Powder Blue Velvet Boxed Suite",
    },
    {
      id: 4,
      quote:
        "“Outstanding craftsmanship! The intricate laser cut detailing and custom wax seals created an unbelievable first impression for our guests.”",
      author: "— Dev & Radhika, Mumbai",
      role: "Intricate Floral Filigree Suite",
    },
    {
      id: 5,
      quote:
        "“Every card felt like a piece of fine art. The team worked with us patiently through multiple digital proofs until every detail was perfection.”",
      author: "— Arjun & Meera, Singapore",
      role: "Sacred Heritage Gatefold Suite",
    },
  ];

  // Duplicate for seamless 100% infinite marquee loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-surface-container-low border-y border-outline-variant/20 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <RevealSection>
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="font-label text-xs text-secondary dark:text-primary block tracking-[0.2em] uppercase font-semibold">
              KIND WORDS
            </span>
            <h2 className="font-NeuMachina text-3xl md:text-4xl text-primary font-semibold">
              What Our Clients Say
            </h2>
            <p className="font-HelveticaNow text-base text-on-surface-variant font-light">
              Real stories from couples around the world who chose Sri Parshwa Cards for their celebration.
            </p>
          </div>
        </RevealSection>

        <RevealSection delay={0.2}>
          {/* Outer Carousel Track Container with Left & Right Gradient Overlays */}
          <div className="relative overflow-hidden py-4">
            {/* Left Gradient Fade Mask Overlay */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-surface-container-low via-surface-container-low/80 to-transparent z-10" />

            {/* Right Gradient Fade Mask Overlay */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-surface-container-low via-surface-container-low/80 to-transparent z-10" />

            {/* Infinite Marquee Track */}
            <div className="animate-infinite-scroll flex gap-6 pr-6">
              {duplicatedTestimonials.map((t, idx) => (
                <div
                  key={`${t.id}-${idx}`}
                  className="w-[270px] sm:w-[320px] md:w-[380px] shrink-0 bg-surface p-6 sm:p-8 border border-outline-variant/20 rounded-sm space-y-4 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-primary/50 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Star Rating & Quote Icon */}
                    <div className="flex justify-between items-center">
                      <div className="flex text-primary gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className="material-symbols-outlined text-[18px]"
                          >
                            star
                          </span>
                        ))}
                      </div>
                      <span className="material-symbols-outlined text-outline-variant/40 group-hover:text-primary/40 transition-colors text-[24px]">
                        format_quote
                      </span>
                    </div>

                    <p className="font-body text-base text-on-surface italic font-normal leading-relaxed">
                      {t.quote}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-outline-variant/10">
                    <p className="font-label text-xs text-primary uppercase tracking-widest font-semibold">
                      {t.author}
                    </p>
                    <p className="font-body text-xs text-on-surface-variant font-light mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
