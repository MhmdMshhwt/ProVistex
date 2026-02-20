import Navigation from './components/Navigation';
import ScrollProgressBar from './components/ScrollProgressBar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Statistics from './components/Statistics';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import TrustedBy from './components/TrustedBy';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <div className="scanline-overlay" />
      <div className="noise-overlay" />
      <ScrollProgressBar />
      <CustomCursor />
      <Navigation />
      <Hero />
      <About />
      <Statistics />
      <Services />
      <Portfolio />
      <TrustedBy />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
