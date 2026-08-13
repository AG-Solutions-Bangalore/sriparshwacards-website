import { useState } from "react";
import { COMPANY_INFO } from "../../../constants";

export function EnquiryHeroForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
      {/* Left: Editorial Image */}
      <div className="relative w-full h-[42rem] bg-surface-container-low dark:bg-surface-container-low overflow-hidden rounded-sm border border-outline-variant/15 dark:border-outline-variant/20 shadow-sm">
        <img
          className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
          alt="Bespoke luxury wedding invitation suite with wax seal and silk ribbon"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy-JHdOvkwbH478D6JUanbMkVPmnw8KJhX-_sfxKSJr5JdhrkHgYbGRz7cCDO6bNKPLPqiQgw4xSvJuhb6Nr86oiM513GS6c0hYXcfsCgWG5NKy46EtkocEFC1LMxRt_GpASk4TOpbU7S7V9_TYaQk8KFw4YKSS0te06J2BUOok9_XSW1VM546Imce78q8Fu7yfuWLZtHD4iDU4WP77BWZRAmq43IR1b8fmaSixm2K5kzYlPDWjmdC"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Right: Enquiry Form */}
      <div className="flex flex-col justify-center space-y-8">
        <div className="space-y-3">
          <span className="font-label text-xs text-secondary dark:text-primary tracking-[0.2em] uppercase font-semibold">
            COMMISSION INQUIRY
          </span>
          <h1 className="font-NeuMachina text-3xl sm:text-4xl md:text-5xl text-primary dark:text-on-surface font-bold">
            Start Your Story
          </h1>
          <p className="font-HelveticaNow text-base text-on-surface-variant font-light leading-relaxed max-w-md">
            We invite you to share the details of your upcoming celebration. Our studio takes on a limited number of commissions each year to ensure uncompromising quality.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 bg-surface-container-low dark:bg-surface-container-low border border-secondary/30 dark:border-primary/40 rounded-sm text-center space-y-3">
            <span className="material-symbols-outlined text-[40px] text-secondary dark:text-primary">
              check_circle
            </span>
            <h3 className="font-serif text-2xl text-primary dark:text-on-surface font-medium">
              Enquiry Received
            </h3>
            <p className="font-body text-sm text-on-surface-variant font-light">
              Thank you for reaching out to {COMPANY_INFO.name}. Our senior design team will review your details and contact you within 24 business hours.
            </p>
          </div>
        ) : (
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div className="relative group">
                <input
                  required
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-transparent border-0 border-b border-outline-variant/40 dark:border-outline-variant/30 focus:border-primary dark:focus:border-primary focus:ring-0 px-0 py-2.5 font-body text-base text-primary dark:text-on-surface placeholder-transparent peer focus:outline-none transition-colors"
                />
                <label
                  htmlFor="fullName"
                  className="absolute left-0 -top-4 font-label text-xs uppercase tracking-wider text-on-surface-variant transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-on-surface-variant/60 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary dark:peer-focus:text-primary pointer-events-none font-semibold"
                >
                  Full Name
                </label>
              </div>

              {/* Email */}
              <div className="relative group">
                <input
                  required
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-transparent border-0 border-b border-outline-variant/40 dark:border-outline-variant/30 focus:border-primary dark:focus:border-primary focus:ring-0 px-0 py-2.5 font-body text-base text-primary dark:text-on-surface placeholder-transparent peer focus:outline-none transition-colors"
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 -top-4 font-label text-xs uppercase tracking-wider text-on-surface-variant transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-on-surface-variant/60 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary dark:peer-focus:text-primary pointer-events-none font-semibold"
                >
                  Email Address
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Phone */}
              <div className="relative group">
                <input
                  required
                  id="phone"
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full bg-transparent border-0 border-b border-outline-variant/40 dark:border-outline-variant/30 focus:border-primary dark:focus:border-primary focus:ring-0 px-0 py-2.5 font-body text-base text-primary dark:text-on-surface placeholder-transparent peer focus:outline-none transition-colors"
                />
                <label
                  htmlFor="phone"
                  className="absolute left-0 -top-4 font-label text-xs uppercase tracking-wider text-on-surface-variant transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-on-surface-variant/60 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary dark:peer-focus:text-primary pointer-events-none font-semibold"
                >
                  Phone Number
                </label>
              </div>

              {/* Wedding Date */}
              <div className="relative group">
                <input
                  id="date"
                  type="date"
                  className="w-full bg-transparent border-0 border-b border-outline-variant/40 dark:border-outline-variant/30 focus:border-primary dark:focus:border-primary focus:ring-0 px-0 py-2.5 font-body text-base text-primary dark:text-on-surface focus:outline-none transition-colors"
                />
                <label
                  htmlFor="date"
                  className="absolute left-0 -top-4 font-label text-xs uppercase tracking-wider text-on-surface-variant pointer-events-none font-semibold"
                >
                  Wedding Date
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Occasion Dropdown */}
              <div className="relative group pt-2">
                <select
                  id="occasion"
                  defaultValue=""
                  className="w-full bg-transparent border-0 border-b border-outline-variant/40 dark:border-outline-variant/30 focus:border-primary dark:focus:border-primary focus:ring-0 px-0 py-2.5 font-body text-base text-primary dark:text-on-surface appearance-none focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="" disabled className="bg-surface dark:bg-surface-container-high text-on-surface-variant">
                    Select Occasion
                  </option>
                  <option value="wedding" className="bg-surface dark:bg-surface-container-high text-on-surface">
                    Wedding Celebration
                  </option>
                  <option value="engagement" className="bg-surface dark:bg-surface-container-high text-on-surface">
                    Engagement Party
                  </option>
                  <option value="anniversary" className="bg-surface dark:bg-surface-container-high text-on-surface">
                    Milestone Anniversary
                  </option>
                  <option value="other" className="bg-surface dark:bg-surface-container-high text-on-surface">
                    Other Special Celebration
                  </option>
                </select>
                <label
                  htmlFor="occasion"
                  className="absolute left-0 -top-2 font-label text-xs uppercase tracking-wider text-on-surface-variant pointer-events-none font-semibold"
                >
                  Occasion
                </label>
                <span className="material-symbols-outlined absolute right-0 top-4 pointer-events-none text-on-surface-variant text-[20px]">
                  expand_more
                </span>
              </div>

              {/* Preferred Service Dropdown */}
              <div className="relative group pt-2">
                <select
                  id="service"
                  defaultValue=""
                  className="w-full bg-transparent border-0 border-b border-outline-variant/40 dark:border-outline-variant/30 focus:border-primary dark:focus:border-primary focus:ring-0 px-0 py-2.5 font-body text-base text-primary dark:text-on-surface appearance-none focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="" disabled className="bg-surface dark:bg-surface-container-high text-on-surface-variant">
                    Select Service
                  </option>
                  <option value="semi-custom" className="bg-surface dark:bg-surface-container-high text-on-surface">
                    Semi-Custom Collection
                  </option>
                  <option value="bespoke" className="bg-surface dark:bg-surface-container-high text-on-surface">
                    Bespoke Custom Suite
                  </option>
                  <option value="unsure" className="bg-surface dark:bg-surface-container-high text-on-surface">
                    Not Sure Yet (Consultation Needed)
                  </option>
                </select>
                <label
                  htmlFor="service"
                  className="absolute left-0 -top-2 font-label text-xs uppercase tracking-wider text-on-surface-variant pointer-events-none font-semibold"
                >
                  Preferred Service
                </label>
                <span className="material-symbols-outlined absolute right-0 top-4 pointer-events-none text-on-surface-variant text-[20px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Message Area */}
            <div className="relative group pt-4">
              <textarea
                rows={3}
                id="message"
                placeholder="Tell us about your vision"
                className="w-full bg-transparent border-0 border-b border-outline-variant/40 dark:border-outline-variant/30 focus:border-primary dark:focus:border-primary focus:ring-0 px-0 py-2.5 font-body text-base text-primary dark:text-on-surface placeholder-transparent peer resize-none focus:outline-none transition-colors"
              ></textarea>
              <label
                htmlFor="message"
                className="absolute left-0 top-0 font-label text-xs uppercase tracking-wider text-on-surface-variant transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-on-surface-variant/60 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary dark:peer-focus:text-primary pointer-events-none font-semibold"
              >
                Tell us about your vision (venue, aesthetic, colors)
              </label>
            </div>

            {/* Submit & WhatsApp Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row gap-4 items-center">
              {/* Submit Button with Text Flip */}
              <button
                type="submit"
                className="group/submit relative inline-flex justify-center items-center w-full sm:w-auto bg-primary text-on-primary dark:bg-primary-container dark:text-on-primary-container font-label text-xs uppercase tracking-widest px-8 py-4 hover:bg-secondary dark:hover:bg-primary transition-all duration-300 rounded-full font-semibold shadow-md cursor-pointer"
              >
                <span className="relative inline-block overflow-hidden h-[18px] leading-[18px] whitespace-nowrap">
                  <span className="block transition-transform duration-300 ease-out group-hover/submit:-translate-y-full whitespace-nowrap">
                    Submit Enquiry
                  </span>
                  <span className="block absolute top-0 left-0 transition-transform duration-300 ease-out translate-y-full group-hover/submit:translate-y-0 text-on-secondary dark:text-on-primary font-bold whitespace-nowrap">
                    Submit Enquiry
                  </span>
                </span>
              </button>

              {/* Direct WhatsApp Link */}
              <a
                className="inline-flex items-center gap-2 text-on-surface-variant hover:text-secondary dark:hover:text-primary transition-colors font-label text-xs uppercase tracking-widest font-semibold p-2"
                href={COMPANY_INFO.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[20px] text-[#25D366]">
                  chat
                </span>
                <span>WhatsApp Us Instead</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
