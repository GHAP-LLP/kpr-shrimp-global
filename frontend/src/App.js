import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import ProductsHubPage from "@/pages/ProductsHubPage";
import ProductHubPage from "@/pages/ProductHubPage";
import ProductVariantPage from "@/pages/ProductVariantPage";
import SectorPage from "@/pages/SectorPage";
import RequestSamplePage from "@/pages/RequestSamplePage";
import ContactPage from "@/pages/ContactPage";
import AboutPage from "@/pages/AboutPage";
import SustainabilityPage from "@/pages/SustainabilityPage";
import ResourcesPage from "@/pages/ResourcesPage";
import NotFoundPage from "@/pages/NotFoundPage";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-ice-100">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsHubPage />} />
            <Route path="/products/:category" element={<ProductHubPage />} />
            <Route path="/products/:category/:variant" element={<ProductVariantPage />} />
            <Route path="/sectors/:sector" element={<SectorPage />} />
            <Route path="/request-a-sample" element={<RequestSamplePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/sustainability" element={<SustainabilityPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
