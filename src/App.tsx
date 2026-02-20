import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import ScrollProgressBar from './components/ScrollProgressBar';
import CustomCursor from './components/CustomCursor';
import LabStatus from './components/LabStatus';
import Footer from './components/Footer';
import AICallModal from './components/AICallModal';
import AICallFAB from './components/AICallFAB';
import LeadMagnetPopup from './components/LeadMagnetPopup';
import { LanguageProvider } from './contexts/LanguageContext';

const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesHub = lazy(() => import('./pages/ServicesHub'));
const SoftwareEngineeringPage = lazy(() => import('./pages/SoftwareEngineeringPage'));
const AIIntelligencePage = lazy(() => import('./pages/AIIntelligencePage'));
const CloudCyberPage = lazy(() => import('./pages/CloudCyberPage'));
const DigitalDesignPage = lazy(() => import('./pages/DigitalDesignPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function SectionFallback() {
  return (
    <div className="py-32 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
    </div>
  );
}

function AppContent() {
  const [savedLanguage, setSavedLanguage] = useState<'en' | 'ar'>(() => {
    return (localStorage.getItem('language') as 'en' | 'ar') || 'en';
  });
  const [isAICallOpen, setIsAICallOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('language', savedLanguage);
  }, [savedLanguage]);

  return (
    <LanguageProvider initialLanguage={savedLanguage}>
      <div className="min-h-screen bg-[#050505]">
        <div className="scanline-overlay" />
        <div className="noise-overlay" />
        <ScrollProgressBar />
        <CustomCursor />
        <LabStatus />
        <Navigation
          onLanguageChange={setSavedLanguage}
          onOpenAICall={() => setIsAICallOpen(true)}
        />
        <Suspense fallback={<SectionFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesHub />} />
            <Route path="/services/software-engineering" element={<SoftwareEngineeringPage />} />
            <Route path="/services/ai-intelligence" element={<AIIntelligencePage />} />
            <Route path="/services/cloud-cyber" element={<CloudCyberPage />} />
            <Route path="/services/digital-design" element={<DigitalDesignPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
        <Footer />
        <AICallFAB onClick={() => setIsAICallOpen(true)} />
        <AICallModal isOpen={isAICallOpen} onClose={() => setIsAICallOpen(false)} />
        <LeadMagnetPopup />
      </div>
    </LanguageProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
