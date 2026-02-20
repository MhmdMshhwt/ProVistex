import { lazy, Suspense } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import ServiceOverview from '../components/ServiceOverview';
import TechStackMarquee from '../components/TechStackMarquee';
import SolutionFinder from '../components/SolutionFinder';

const Testimonials = lazy(() => import('../components/Testimonials'));

function SectionFallback() {
  return (
    <div className="py-32 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
    </div>
  );
}

export default function ServicesHub() {
  return (
    <>
      <Breadcrumb />
      <ServiceOverview />
      <TechStackMarquee />
      <Suspense fallback={<SectionFallback />}>
        <Testimonials />
      </Suspense>
      <SolutionFinder />
    </>
  );
}
