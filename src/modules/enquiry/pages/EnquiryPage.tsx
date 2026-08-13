import { EnquiryHeroForm } from "../components/EnquiryHeroForm";
import { EnquiryProcessSection } from "../components/EnquiryProcessSection";

export function EnquiryPage() {
  return (
    <main className="bg-surface min-h-screen">
      <EnquiryHeroForm />
      <EnquiryProcessSection />
    </main>
  );
}
