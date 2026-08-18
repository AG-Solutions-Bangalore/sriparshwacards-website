import { COMPANY_INFO } from "../../../constants";
import { useCompanyProfile } from "../../home/hooks";

export function ContactMapSection() {
  const { company } = useCompanyProfile();
  const companyAddress = company?.company_address || COMPANY_INFO.contact.address;
  const companyPhone = company?.company_mobile_no || COMPANY_INFO.contact.phonePrimary;
  const companyEmail = company?.company_support_email || company?.company_email || COMPANY_INFO.contact.email;
  const companyName = company?.company_name || COMPANY_INFO.name;

  return (
    <section className="bg-surface-container-low dark:bg-surface-container-lowest border-t border-outline-variant/20 py-20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left Studio Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-2">
              <span className="font-label text-xs text-secondary dark:text-primary tracking-[0.2em] uppercase font-semibold">
                VISIT OUR STUDIO
              </span>
              <h2 className="font-NeuMachina text-3xl sm:text-4xl text-primary dark:text-on-surface font-bold">
                Experience the Craft in Person
              </h2>
              <p className="font-HelveticaNow text-sm text-on-surface-variant font-light leading-relaxed">
                Schedule a private studio consultation to explore our physical paper swatches, tactile textures, foil stamp samples, and bespoke handcrafted suites.
              </p>
            </div>

            <div className="space-y-5 border-t border-outline-variant/15 pt-6 font-HelveticaNow text-sm">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <span className="material-symbols-outlined text-[22px] text-secondary dark:text-primary shrink-0 mt-0.5">
                  location_on
                </span>
                <div>
                  <h4 className="font-semibold text-primary dark:text-on-surface text-xs uppercase tracking-wider mb-1 font-label">
                    Studio Location
                  </h4>
                  <p className="text-on-surface-variant font-light leading-relaxed">
                    {companyAddress}
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-3.5">
                <span className="material-symbols-outlined text-[22px] text-secondary dark:text-primary shrink-0 mt-0.5">
                  schedule
                </span>
                <div>
                  <h4 className="font-semibold text-primary dark:text-on-surface text-xs uppercase tracking-wider mb-1 font-label">
                    Studio Hours
                  </h4>
                  <p className="text-on-surface-variant font-light">
                    {COMPANY_INFO.contact.studioHours}
                  </p>
                </div>
              </div>

              {/* Direct Phone & Email */}
              <div className="flex items-start gap-3.5">
                <span className="material-symbols-outlined text-[22px] text-secondary dark:text-primary shrink-0 mt-0.5">
                  phone_in_talk
                </span>
                <div>
                  <h4 className="font-semibold text-primary dark:text-on-surface text-xs uppercase tracking-wider mb-1 font-label">
                    Appointments & Inquiries
                  </h4>
                  <p className="text-on-surface-variant font-light">
                    <a href={`tel:${companyPhone.replace(/\s+/g, "")}`} className="hover:text-primary transition-colors">
                      {companyPhone}
                    </a>
                  </p>
                  <p className="text-on-surface-variant font-light">
                    <a href={`mailto:${companyEmail}`} className="hover:text-primary transition-colors">
                      {companyEmail}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Google Map Embed */}
          <div className="lg:col-span-2 h-[420px] sm:h-[480px] w-full rounded-sm overflow-hidden border border-outline-variant/20 shadow-md relative">
            <iframe
              title={`${companyName} Studio Location`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(companyName + ", " + companyAddress)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
