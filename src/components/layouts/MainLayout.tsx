import { Outlet } from "react-router-dom";
import { Header } from "../common/Header";
import { Footer } from "../common/Footer";
import { WhatsAppButton } from "../common/WhatsAppButton";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-surface text-on-surface transition-colors duration-300 font-sans selection:bg-secondary-container selection:text-on-secondary-container flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
