import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { COMPANY_INFO } from "../../constants";
import { useCompanyProfile } from "../../modules/home/hooks";
import { useActiveOccasions } from "../../modules/collections/hooks";
import { ThemeToggle } from "./ThemeToggle";

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
  const location = useLocation();
  const { company, logoUrl } = useCompanyProfile();
  const { data: occasionsData } = useActiveOccasions();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOccasionsOpen, setMobileOccasionsOpen] = useState(false);
  const [occasionDropdownOpen, setOccasionDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<number | null>(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const companyName = company?.company_name || COMPANY_INFO.name;
  const occasions = occasionsData?.data ?? [];

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

  const handleMouseEnterDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOccasionDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = window.setTimeout(() => {
      setOccasionDropdownOpen(false);
    }, 150);
  };

  const handleSelectOccasion = (occasionId?: number) => {
    setOccasionDropdownOpen(false);
    setMobileMenuOpen(false);
    if (occasionId !== undefined) {
      navigate(`/occasions?occasion=${occasionId}`);
    } else {
      navigate("/occasions");
    }
  };

  const isOccasionsActive =
    location.pathname === "/occasions" ||
    (location.pathname === "/collections" && location.search.includes("occasion"));

  return (
    <header className="bg-surface/90 dark:bg-surface-dim/90 backdrop-blur-md sticky top-0 w-full z-50 border-b border-outline-variant/20 transition-all duration-300 shadow-sm">
      <nav className="flex justify-between items-center px-3 sm:px-6 lg:px-12 py-3.5 max-w-[1440px] mx-auto w-full gap-2 sm:gap-4 lg:gap-8">
        {/* Brand Logo */}
        <Link
          className="flex items-center gap-1.5 sm:gap-2 font-serif text-base sm:text-2xl lg:text-3xl tracking-tight text-primary uppercase font-bold hover:opacity-90 transition-opacity min-w-0"
          to="/"
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={companyName}
              className="h-7 sm:h-8 md:h-10 w-auto object-contain shrink-0"
            />
          ) : null}
          <span className="truncate">{companyName}</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 font-HelveticaNow whitespace-nowrap shrink-0">
          {COMPANY_INFO.navLinks.map((item) => {
            if (item.to === "/occasions" || item.label.toLowerCase() === "by occasion") {
              return (
                <div
                  key={item.to}
                  className="relative group/occasion py-1"
                  onMouseEnter={handleMouseEnterDropdown}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectOccasion()}
                    className={`group inline-flex items-center gap-1 font-label text-xs uppercase tracking-[0.12em] whitespace-nowrap cursor-pointer transition-colors duration-300 ${
                      isOccasionsActive
                        ? "text-primary font-bold"
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                    aria-expanded={occasionDropdownOpen}
                    aria-haspopup="true"
                  >
                    <span className="relative inline-block overflow-hidden h-[20px] leading-[20px]">
                      <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                        {item.label}
                      </span>
                      <span className="block absolute top-0 left-0 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 text-primary font-bold">
                        {item.label}
                      </span>
                    </span>
                    <span
                      className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                        occasionDropdownOpen ? "rotate-180 text-primary" : "text-on-surface-variant group-hover:text-primary"
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {/* Occasion Hover / Click Dropdown Menu */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-60 transition-all duration-200 ease-out z-50 ${
                      occasionDropdownOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto visible"
                        : "opacity-0 -translate-y-1 pointer-events-none invisible"
                    }`}
                  >
                    <div className="bg-surface/95 dark:bg-surface-container-high/95 backdrop-blur-md border border-outline-variant/20 rounded-xs shadow-xl py-1.5 px-1 max-h-80 overflow-y-auto custom-scrollbar">
                      {occasions.map((occ) => (
                        <button
                          key={occ.id}
                          type="button"
                          onClick={() => handleSelectOccasion(occ.id)}
                          className="w-full text-left px-3 py-2 rounded-xs font-HelveticaNow text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors flex items-center justify-between group/item cursor-pointer font-normal"
                        >
                          <span className="truncate">{occ.occasions}</span>
                          <span className="material-symbols-outlined text-[14px] opacity-0 group-hover/item:opacity-100 transition-opacity text-primary">
                            arrow_forward
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <FlipNavLink key={item.to} to={item.to}>
                {item.label}
              </FlipNavLink>
            );
          })}
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

          {/* Theme Toggle */}
          <ThemeToggle />

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
            ? "max-h-[32rem] opacity-100 py-6 border-t translate-y-0"
            : "max-h-0 opacity-0 py-0 border-t-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-6 flex flex-col space-y-3">
          {COMPANY_INFO.navLinks.map((item) => {
            if (item.to === "/occasions" || item.label.toLowerCase() === "by occasion") {
              return (
                <div key={item.to} className="py-1 border-b border-outline-variant/10">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleSelectOccasion()}
                      className={`font-label text-xs uppercase tracking-[0.12em] text-left cursor-pointer ${
                        isOccasionsActive ? "text-primary font-bold" : "text-on-surface-variant"
                      }`}
                    >
                      {item.label}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileOccasionsOpen(!mobileOccasionsOpen)}
                      className="p-1 text-on-surface-variant hover:text-primary cursor-pointer"
                      aria-label="Toggle occasions sub-menu"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {mobileOccasionsOpen ? "expand_less" : "expand_more"}
                      </span>
                    </button>
                  </div>

                  {/* Mobile Occasions Submenu */}
                  {mobileOccasionsOpen && (
                    <div className="mt-2 pl-3 space-y-2 border-l border-primary/30">
                      {occasions.map((occ) => (
                        <button
                          key={occ.id}
                          type="button"
                          onClick={() => handleSelectOccasion(occ.id)}
                          className="block w-full text-left font-HelveticaNow text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1 cursor-pointer"
                        >
                          {occ.occasions}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div key={item.to} className="py-1 border-b border-outline-variant/10">
                <FlipNavLink
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </FlipNavLink>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
