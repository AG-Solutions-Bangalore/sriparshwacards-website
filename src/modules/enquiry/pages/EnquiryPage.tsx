import { EnquiryHeroForm } from "../components/EnquiryHeroForm";
import { EnquiryProcessSection } from "../components/EnquiryProcessSection";
import { ContactMapSection } from "../components/ContactMapSection";

export function EnquiryPage() {
  return (
    <main className="bg-surface min-h-screen">
      <EnquiryHeroForm />
      <ContactMapSection />
      <EnquiryProcessSection />
    </main>
  );
}
