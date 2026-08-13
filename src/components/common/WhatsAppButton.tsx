import { COMPANY_INFO } from "../../constants";

export function WhatsAppButton() {
  return (
    <a
      className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform z-50 group"
      href={COMPANY_INFO.contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <span className="material-symbols-outlined text-[30px]">chat</span>
    </a>
  );
}
