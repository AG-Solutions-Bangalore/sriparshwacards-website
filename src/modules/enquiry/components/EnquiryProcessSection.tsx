export function EnquiryProcessSection() {
  const steps = [
    {
      step: 1,
      title: "Discovery",
      description:
        "We begin with a consultation to understand your aesthetic, venue, and the story you wish to tell through your stationery.",
    },
    {
      step: 2,
      title: "Personalisation",
      description:
        "Our designers craft digital proofs, refining typography, layout, and selecting the perfect premium cardstocks and embellishments.",
    },
    {
      step: 3,
      title: "Creation",
      description:
        "Approved designs move into production, where traditional print methods like letterpress and foil stamping bring your suite to life.",
    },
  ];

  return (
    <section className="bg-surface-container-low dark:bg-surface-container-low py-20 border-t border-outline-variant/20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        <div className="text-center mb-16 space-y-3">
          <span className="font-NeuMachina text-xs text-secondary dark:text-primary tracking-[0.2em] uppercase font-semibold">
            OUR ATELIER METHOD
          </span>
          <h2 className="font-HelveticaNow text-3xl sm:text-4xl text-primary dark:text-on-surface font-semibold">
            The Process
          </h2>
          <div className="h-px w-16 bg-secondary dark:bg-primary mx-auto opacity-60"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative">
          {/* Connecting Line on Desktop */}
          <div className="hidden md:block absolute top-6 left-[20%] right-[20%] h-px bg-outline-variant/30 dark:bg-outline-variant/20 z-0"></div>

          {steps.map((s) => (
            <div key={s.step} className="text-center space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-surface dark:bg-surface-container-high border border-outline-variant/30 flex items-center justify-center mx-auto font-NeuMachina text-xl text-secondary dark:text-primary font-bold shadow-xs">
                {s.step}
              </div>
              <h3 className="font-NeuMachina text-xs uppercase tracking-widest text-primary dark:text-on-surface font-bold">
                {s.title}
              </h3>
              <p className="font-HelveticaNow text-sm text-on-surface-variant font-light leading-relaxed max-w-sm mx-auto">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
