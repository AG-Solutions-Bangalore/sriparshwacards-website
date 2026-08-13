import { COMPANY_INFO } from "../../../constants";

export function ContactPage() {
  return (
    <div className="py-16 md:py-24 bg-surface max-w-[1280px] mx-auto px-6 md:px-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="font-label text-xs text-secondary dark:text-primary tracking-[0.2em] uppercase font-semibold">
          GET IN TOUCH
        </span>
        <h1 className="font-serif text-4xl md:text-5xl text-primary font-bold">
          Contact Our Studio
        </h1>
        <p className="font-body text-base text-on-surface-variant font-light leading-relaxed">
          Whether you need advice on bespoke print finishes or want to discuss a custom design suite, our team is here to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div className="bg-surface-container-low p-8 md:p-12 border border-outline-variant/20 rounded-sm space-y-6 shadow-sm">
          <h2 className="font-serif text-2xl text-primary font-semibold">
            Send Us a Message
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-label text-xs text-on-surface-variant uppercase tracking-wider block mb-1 font-semibold">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Ananya"
                  className="w-full bg-surface border border-outline-variant/30 rounded-sm px-4 py-3 font-body text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="font-label text-xs text-on-surface-variant uppercase tracking-wider block mb-1 font-semibold">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Sharma"
                  className="w-full bg-surface border border-outline-variant/30 rounded-sm px-4 py-3 font-body text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="font-label text-xs text-on-surface-variant uppercase tracking-wider block mb-1 font-semibold">
                Email Address
              </label>
              <input
                type="email"
                placeholder="ananya@example.com"
                className="w-full bg-surface border border-outline-variant/30 rounded-sm px-4 py-3 font-body text-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-label text-xs text-on-surface-variant uppercase tracking-wider block mb-1 font-semibold">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full bg-surface border border-outline-variant/30 rounded-sm px-4 py-3 font-body text-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-label text-xs text-on-surface-variant uppercase tracking-wider block mb-1 font-semibold">
                Your Enquiry Details
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your event, quantity, and preferences..."
                className="w-full bg-surface border border-outline-variant/30 rounded-sm px-4 py-3 font-body text-sm text-on-surface focus:outline-none focus:border-primary"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-on-primary font-label text-xs uppercase tracking-widest py-4 rounded-sm font-semibold hover:opacity-90 transition-opacity shadow-md cursor-pointer"
            >
              Submit Enquiry
            </button>
          </form>
        </div>

        {/* Studio Info Details */}
        <div className="space-y-8 lg:pl-6">
          <div className="space-y-6">
            <h2 className="font-serif text-2xl text-primary font-semibold">
              Studio & Flagship Store
            </h2>
            <div className="space-y-4 font-body text-base text-on-surface-variant">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-[24px] shrink-0 mt-0.5">
                  location_on
                </span>
                <div>
                  <h3 className="font-label text-xs uppercase tracking-wider text-primary font-semibold mb-1">
                    Address
                  </h3>
                  <p className="font-light leading-relaxed">
                    {COMPANY_INFO.contact.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-[24px] shrink-0 mt-0.5">
                  phone
                </span>
                <div>
                  <h3 className="font-label text-xs uppercase tracking-wider text-primary font-semibold mb-1">
                    Phone Numbers
                  </h3>
                  <p className="font-light">
                    {COMPANY_INFO.contact.phonePrimary} / {COMPANY_INFO.contact.phoneSecondary}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-[24px] shrink-0 mt-0.5">
                  mail
                </span>
                <div>
                  <h3 className="font-label text-xs uppercase tracking-wider text-primary font-semibold mb-1">
                    Email
                  </h3>
                  <p className="font-light">{COMPANY_INFO.contact.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-[24px] shrink-0 mt-0.5">
                  schedule
                </span>
                <div>
                  <h3 className="font-label text-xs uppercase tracking-wider text-primary font-semibold mb-1">
                    Studio Hours
                  </h3>
                  <p className="font-light">{COMPANY_INFO.contact.studioHours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-surface-container border border-outline-variant/20 rounded-sm space-y-3">
            <h3 className="font-label text-xs uppercase tracking-wider text-primary font-semibold">
              Instant WhatsApp Support
            </h3>
            <p className="font-body text-sm text-on-surface-variant font-light">
              Connect directly with our design consultants for immediate assistance with catalog request & custom pricing.
            </p>
            <a
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-label text-xs uppercase px-5 py-3 rounded-full font-semibold hover:bg-[#20bd5a] transition-colors shadow-sm"
              href={COMPANY_INFO.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
