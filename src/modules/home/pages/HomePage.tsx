import { HeroSection } from "../components/HeroSection";
import { StatisticsSection } from "../components/StatisticsSection";
import { BestsellersSection } from "../components/BestsellersSection";
import { CategoriesSection } from "../components/CategoriesSection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { CtaSection } from "../components/CtaSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <BestsellersSection />
      <CategoriesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
