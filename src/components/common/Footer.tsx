import { Link } from "react-router-dom";
import { COMPANY_INFO } from "../../constants";
import { useCompanyProfile } from "../../modules/home/hooks";

interface FlipFooterLinkProps {
  to: string;
  children: string;
}

function FlipFooterLink({ to, children }: FlipFooterLinkProps) {
  return (
    <Link
      to={to}
      className="group relative inline-flex flex-col py-1 font-label text-xs uppercase tracking-[0.12em] whitespace-nowrap shrink-0 transition-colors duration-300 text-on-surface-variant hover:text-primary"
    >
      {/* Text Roll / Flip Container */}
      <span className="relative inline-block overflow-hidden h-[20px] leading-[20px] whitespace-nowrap">
        {/* Default Text */}
        <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full whitespace-nowrap">
          {children}
        </span>
        {/* Hover Text */}
        <span className="block absolute top-0 left-0 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 text-primary font-bold whitespace-nowrap">
          {children}
        </span>
      </span>
    </Link>
  );
}

function FlipFooterAnchor({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="group relative inline-flex flex-col font-label text-xs text-on-surface-variant hover:text-primary transition-colors duration-300 whitespace-nowrap"
    >
      <span className="relative inline-block overflow-hidden h-[18px] leading-[18px] whitespace-nowrap">
        {/* Default Text */}
        <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full whitespace-nowrap">
          {children}
        </span>
        {/* Hover Text */}
        <span className="block absolute top-0 left-0 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 text-primary font-medium whitespace-nowrap">
          {children}
        </span>
      </span>
    </a>
  );
}

export function Footer() {
  const { company } = useCompanyProfile();
  const companyName = company?.company_name || COMPANY_INFO.name;
  const companyAddress = company?.company_address || COMPANY_INFO.contact.address;
  const companyEmail = company?.company_support_email || company?.company_email || COMPANY_INFO.contact.email;
  const companyPhone = company?.company_mobile_no || COMPANY_INFO.contact.phonePrimary;
  const cleanPhone = companyPhone ? companyPhone.replace(/\D/g, "") : "";
  const whatsappUrl = cleanPhone ? `https://wa.me/${cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`}` : COMPANY_INFO.contact.whatsappUrl;

  return (
    <footer className="bg-surface-container-low font-HelveticaNow dark:bg-surface-container-lowest w-full pt-24 pb-4 border-t border-outline-variant/10">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-12 px-6 md:px-16 max-w-[1280px] mx-auto">
        {/* Brand Column */}
        <div className="col-span-2 md:col-span-1">
          <h2 className=" text-2xl text-primary mb-6 font-semibold uppercase">
            {companyName}
          </h2>
          <p className="text-sm text-on-surface-variant mb-6 pr-4 leading-relaxed font-light">
            {COMPANY_INFO.subTagline}
          </p>
          <div className="flex items-start gap-3 mb-6 pr-4">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant shrink-0 mt-0.5">
              location_on
            </span>
            <p className="text-sm text-on-surface-variant leading-relaxed font-light">
              {companyAddress}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Email */}
            <a
              className="w-9 h-9 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface-variant flex items-center justify-center transition-all duration-200 shadow-2xs border border-outline-variant/20"
              href={`mailto:${companyEmail}`}
              aria-label="Email Us"
              title={`Email: ${companyEmail}`}
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
            </a>

            {/* Phone */}
            <a
              className="w-9 h-9 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface-variant flex items-center justify-center transition-all duration-200 shadow-2xs border border-outline-variant/20"
              href={`tel:${companyPhone.replace(/\s+/g, "")}`}
              aria-label="Call Us"
              title={`Call: ${companyPhone}`}
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
            </a>

            {/* WhatsApp */}
            <a
              className="w-9 h-9 rounded-full bg-surface-container hover:bg-[#25D366] hover:text-white text-on-surface-variant flex items-center justify-center transition-all duration-200 shadow-2xs border border-outline-variant/20 group"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              title="Chat with us on WhatsApp"
            >
              <svg
                className="w-4.5 h-4.5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Collections Column with Text Flip Links */}
        <div className="col-span-1">
          <h3 className="font-label text-xs text-primary mb-6 tracking-widest uppercase font-semibold">
            COLLECTIONS
          </h3>
          <ul className="space-y-1 text-sm">
            {COMPANY_INFO.footerCollections.map((link, idx) => (
              <li key={idx}>
                <FlipFooterLink to={link.to}>{link.label}</FlipFooterLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links Column with Text Flip Links */}
        <div className="col-span-1">
          <h3 className="font-label text-xs text-primary mb-6 tracking-widest uppercase font-semibold">
            QUICK LINKS
          </h3>
          <ul className="space-y-1 text-sm">
            {COMPANY_INFO.footerCompany.map((link, idx) => (
              <li key={idx}>
                <FlipFooterLink to={link.to}>{link.label}</FlipFooterLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright & Legal Links with Text Flip */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mt-16 pt-8 border-t border-outline-variant/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6 font-label text-xs text-on-surface-variant">
        <div className="flex items-center gap-1.5 mb-2 md:mb-0 flex-wrap justify-center md:justify-start">
          <p>{COMPANY_INFO.copyright}</p>
          <a
            href="https://ag-solutions.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors underline underline-offset-2 decoration-on-surface-variant/30 hover:decoration-primary font-medium"
          >
            AG-Solutions
          </a>
        </div>

        <div className="flex gap-6">
          <FlipFooterAnchor href="#">Privacy Policy</FlipFooterAnchor>
          <FlipFooterAnchor href="#">Terms of Service</FlipFooterAnchor>
        </div>
      </div>

    </footer>
  );
}
