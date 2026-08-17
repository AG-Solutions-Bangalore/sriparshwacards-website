import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { ScrollToTop } from "../components/common/ScrollToTop";
import { HomePage } from "../modules/home";
import { CollectionsPage } from "../modules/collections";
import { EnquiryPage } from "../modules/enquiry";
import { NotFoundPage } from "../components/common/NotFoundPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<EnquiryPage />} />
          <Route path="/enquire" element={<EnquiryPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/occasions" element={<CollectionsPage />} />
          <Route path="/custom" element={<EnquiryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

