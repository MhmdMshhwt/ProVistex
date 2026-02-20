import { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Statistics from '../components/Statistics';
import ServiceOverview from '../components/ServiceOverview';
import FeaturedEmpires from '../components/FeaturedEmpires';
import LabProcess from '../components/LabProcess';
import SolutionsGrid from '../components/SolutionsGrid';
import TechStackMarquee from '../components/TechStackMarquee';
import GlobalReach from '../components/GlobalReach';
import Testimonials from '../components/Testimonials';
import TrustedBy from '../components/TrustedBy';

const Blog = lazy(() => import('../components/Blog'));

function SectionFallback() {
  return (
    <div className="py-32 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Statistics />
      <ServiceOverview />
      <FeaturedEmpires />
      <LabProcess />
      <SolutionsGrid />
      <TechStackMarquee />
      <GlobalReach />
      <Testimonials />
      <TrustedBy />
      <Suspense fallback={<SectionFallback />}>
        <Blog />
      </Suspense>
    </>
  );
}
