import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { COMPANY_INFO } from "../../constants";
import { useCompanyProfile } from "../../modules/home/hooks";

interface FlipNavLinkProps {
  to: string;
  children: string;
  onClick?: () => void;
}

function FlipNavLink({ to, children, onClick }: FlipNavLinkProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `group relative inline-flex flex-col py-1 font-label text-xs uppercase tracking-[0.12em] whitespace-nowrap shrink-0 transition-colors duration-300 ${
          isActive
            ? "text-primary font-bold"
            : "text-on-surface-variant hover:text-primary"
        }`
      }
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
    </NavLink>
  );
}

export function Header() {
  const { company, logoUrl } = useCompanyProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const companyName = company?.company_name || COMPANY_INFO.name;

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 150);
    }
  }, [searchOpen]);

  return (
    <header className="bg-surface/90 dark:bg-surface-dim/90 backdrop-blur-md sticky top-0 w-full z-50 border-b border-outline-variant/20 transition-all duration-300 shadow-sm">
      <nav className="flex justify-between items-center px-4 sm:px-6 lg:px-12 py-3.5 max-w-[1440px] mx-auto w-full gap-4 lg:gap-8">
        {/* Brand Logo */}
        <Link
          className="flex items-center gap-2 font-serif text-xl sm:text-2xl lg:text-3xl tracking-tighter text-primary uppercase font-bold hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
          to="/"
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={companyName}
              className="h-8 md:h-10 w-auto object-contain"
            />
          ) : null}
          <span>{companyName}</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 font-HelveticaNow whitespace-nowrap shrink-0">
          {COMPANY_INFO.navLinks.map((item) => (
            <FlipNavLink key={item.to} to={item.to}>
              {item.label}
            </FlipNavLink>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
          {/* Search Toggle Button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-sm cursor-pointer"
            aria-label="Search"
            title="Search collection"
          >
            <span className="material-symbols-outlined text-[20px]">
              {searchOpen ? "close" : "search"}
            </span>
          </button>

          {/* Mobile Navigation Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-primary p-2 hover:bg-surface-container rounded-sm cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Animated Expandable Search Bar Dropdown */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out bg-surface-container-low border-outline-variant/15 ${
          searchOpen
            ? "max-h-24 opacity-100 py-3 border-t translate-y-0"
            : "max-h-0 opacity-0 py-0 border-t-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center gap-3">
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
            search
          </span>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search wedding cards, box suites, laser cut designs..."
            className="w-full bg-transparent text-sm font-body text-on-surface focus:outline-none placeholder:text-on-surface-variant/60"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="text-xs font-label uppercase text-on-surface-variant hover:text-primary tracking-wider whitespace-nowrap cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Animated Mobile Navigation Drawer */}
      <div
        className={`overflow-hidden lg:hidden transition-all duration-300 ease-in-out bg-surface-container-low border-outline-variant/20 ${
          mobileMenuOpen
            ? "max-h-96 opacity-100 py-6 border-t translate-y-0"
            : "max-h-0 opacity-0 py-0 border-t-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-6 flex flex-col space-y-3">
          {COMPANY_INFO.navLinks.map((item) => (
            <div key={item.to} className="py-1 border-b border-outline-variant/10">
              <FlipNavLink
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </FlipNavLink>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
