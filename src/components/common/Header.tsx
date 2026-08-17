import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { company, logoUrl } = useCompanyProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const companyName = company?.company_name || COMPANY_INFO.name;

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 150);
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

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
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 shrink-0">
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

          {/* WhatsApp Direct Chat */}
          <a
            href={COMPANY_INFO.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-[#25D366] transition-colors p-2 rounded-sm cursor-pointer flex items-center justify-center"
            aria-label="Chat on WhatsApp"
            title="Chat with us on WhatsApp"
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>

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
        <form
          onSubmit={handleSearchSubmit}
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center gap-3"
        >
          <button
            type="submit"
            className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer flex items-center"
            aria-label="Submit search"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search wedding cards, box suites, laser cut designs, hindu, christian..."
            className="w-full bg-transparent text-sm font-body text-on-surface focus:outline-none placeholder:text-on-surface-variant/60"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-on-surface-variant hover:text-primary p-1 cursor-pointer"
              aria-label="Clear search"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}

          <button
            type="submit"
            className="text-xs font-label uppercase text-primary font-bold tracking-wider px-3 py-1.5 bg-primary/10 rounded-full hover:bg-primary hover:text-on-primary transition-all cursor-pointer whitespace-nowrap"
          >
            Search
          </button>

          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="text-xs font-label uppercase text-on-surface-variant hover:text-primary tracking-wider whitespace-nowrap cursor-pointer ml-1"
          >
            Cancel
          </button>
        </form>
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
