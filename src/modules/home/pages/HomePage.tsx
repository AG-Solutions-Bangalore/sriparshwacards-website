import { HeroSection } from "../components/HeroSection";
import { StatisticsSection } from "../components/StatisticsSection";
import { FeaturedSection } from "../components/FeaturedSection";
import { CategoriesSection } from "../components/CategoriesSection";
import { NewArrivalsSection } from "../components/NewArrivalsSection";
import { BestsellersSection } from "../components/BestsellersSection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { CtaSection } from "../components/CtaSection";

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
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}

