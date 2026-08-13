import { Link } from "react-router-dom";

export function CollectionsHero() {
  return (
    <div className="space-y-8 mb-16">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 font-label text-xs text-on-surface-variant uppercase tracking-wider">
        <Link to="/" className="hover:text-primary dark:hover:text-primary transition-colors">
          Home
        </Link>
        <span className="material-symbols-outlined text-[16px] text-outline-variant/60">
          chevron_right
        </span>
        <span className="text-primary dark:text-on-surface font-semibold">Wedding Invitations</span>
      </div>

      {/* Hero Title & Description */}
      <header className="max-w-3xl space-y-4">
        <h1 className="font-HelveticaNow text-nowrap text-4xl sm:text-5xl md:text-6xl text-primary dark:text-on-surface font-bold leading-tight">
          The Wedding Collection
        </h1>
        <p className="font-HelveticaNow text-base md:text-lg text-on-surface-variant font-light leading-relaxed">
          An exquisite curation of finely crafted wedding invitations, designed for those who appreciate the tactile beauty of premium cardstock, meticulous typography, and understated elegance. Explore our signature aesthetics tailored for diverse traditions and modern celebrations.
        </p>
      </header>
    </div>
  );
}
