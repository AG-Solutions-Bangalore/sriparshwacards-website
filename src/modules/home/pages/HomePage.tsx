import { BestsellersSection } from "../components/BestsellersSection";
import { CategoriesSection } from "../components/CategoriesSection";
import { CtaSection } from "../components/CtaSection";
import { FeaturedSection } from "../components/FeaturedSection";
import { HeroSection } from "../components/HeroSection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { NewArrivalsSection } from "../components/NewArrivalsSection";
import { StatisticsSection } from "../components/StatisticsSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <FeaturedSection />
      <CategoriesSection />
      <NewArrivalsSection />
      <BestsellersSection />
      <HowItWorksSection />
      <CtaSection />
    </>
  );
}

