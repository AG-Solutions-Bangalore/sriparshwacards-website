import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { COMPANY_INFO } from "../../constants";

interface FlipFooterLinkProps {
  to: string;
  children: string;
}

function FlipFooterLink({ to, children }: FlipFooterLinkProps) {
  return (
    <Link
      to={to}
      className="group relative inline-flex flex-col  text-sm text-on-surface-variant hover:text-primary transition-colors duration-300 font-light whitespace-nowrap"
    >
      <span className="relative inline-block overflow-hidden h-[20px] leading-[20px] whitespace-nowrap">
        {/* Default Text (Rolls Up) */}
        <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full whitespace-nowrap">
          {children}
        </span>
        {/* Hover Text (Rolls In from bottom) */}
        <span className="block absolute top-0 left-0 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 text-primary font-normal whitespace-nowrap">
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
  return (
    <footer className="bg-surface-container-low font-HelveticaNow dark:bg-surface-container-lowest w-full py-24 border-t border-outline-variant/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-16 max-w-[1280px] mx-auto">
        {/* Brand Column */}
        <div className="col-span-1">
          <h2 className=" text-2xl text-primary mb-6 font-semibold uppercase">
            {COMPANY_INFO.brandName}
          </h2>
          <p className="text-sm text-on-surface-variant mb-6 pr-4 leading-relaxed font-light">
            {COMPANY_INFO.subTagline}
          </p>
          <div className="flex gap-4">
            <a
              className="text-on-surface-variant hover:text-primary transition-colors p-1"
              href={COMPANY_INFO.social.share}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website Link"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors p-1"
              href={`mailto:${COMPANY_INFO.contact.email}`}
              aria-label="Email Us"
            >
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </a>
          </div>
        </div>

        {/* Collections Column with Text Flip Links */}
        <div className="col-span-1">
          <h3 className="font-label text-xs text-primary mb-6 tracking-widest uppercase font-semibold">
            COLLECTIONS
          </h3>
          <ul className="space-y-3  text-sm">
            {COMPANY_INFO.footerCollections.map((link, idx) => (
              <li key={idx}>
                <FlipFooterLink to={link.to}>{link.label}</FlipFooterLink>
              </li>
            ))}
          </ul>
        </div>

        {/* About Us Column with Text Flip Links */}
        <div className="col-span-1">
          <h3 className="font-label text-xs text-primary mb-6 tracking-widest uppercase font-semibold">
            ABOUT US
          </h3>
          <ul className="space-y-3  text-sm">
            {COMPANY_INFO.footerCompany.map((link, idx) => (
              <li key={idx}>
                <FlipFooterLink to={link.to}>{link.label}</FlipFooterLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing Tiers Column with Text Flip Links */}
        <div className="col-span-1">
          <h3 className="font-label text-xs text-primary mb-6 tracking-widest uppercase font-semibold">
            PRICING TIERS
          </h3>
          <ul className="space-y-3  text-sm">
            {COMPANY_INFO.footerPricingTiers.map((link, idx) => (
              <li key={idx}>
                <FlipFooterLink to={link.to}>{link.label}</FlipFooterLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright & Legal Links with Text Flip */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mt-16 pt-8 border-t border-outline-variant/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6 font-label text-xs text-on-surface-variant">
        <p className="mb-2 md:mb-0">{COMPANY_INFO.copyright}</p>

        <div className="flex gap-6">
          <FlipFooterAnchor href="#">Privacy Policy</FlipFooterAnchor>
          <FlipFooterAnchor href="#">Terms of Service</FlipFooterAnchor>
        </div>
      </div>

      {/* Theme Toggle Component in Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-6 flex items-center justify-center md:justify-start gap-2">
        <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
          Theme:
        </span>
        <ThemeToggle />
      </div>
    </footer>
  );
}
