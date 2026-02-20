import { lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import ScrollProgressBar from './components/ScrollProgressBar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';

const About = lazy(() => import('./components/About'));
const Statistics = lazy(() => import('./components/Statistics'));
const Services = lazy(() => import('./components/Services'));
const FeaturedEmpires = lazy(() => import('./components/FeaturedEmpires'));
const LabProcess = lazy(() => import('./components/LabProcess'));
const SolutionsGrid = lazy(() => import('./components/SolutionsGrid'));
const TechStackMarquee = lazy(() => import('./components/TechStackMarquee'));
const GlobalReach = lazy(() => import('./components/GlobalReach'));
const SolutionFinder = lazy(() => import('./components/SolutionFinder'));
const TrustedBy = lazy(() => import('./components/TrustedBy'));
const Blog = lazy(() => import('./components/Blog'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function SectionFallback() {
  return (
    <div className="py-32 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <div className="scanline-overlay" />
      <div className="noise-overlay" />
      <ScrollProgressBar />
      <CustomCursor />
      <Navigation />
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Statistics />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Services />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FeaturedEmpires />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <LabProcess />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <SolutionsGrid />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TechStackMarquee />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <GlobalReach />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <SolutionFinder />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TrustedBy />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Blog />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
