import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [meshStyle, setMeshStyle] = useState('');

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const springX = useSpring(rawX, { stiffness: 40, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsub = springX.on('change', () => {
      const sx = springX.get();
      const sy = springY.get();
      setMeshStyle(
        `radial-gradient(ellipse 80% 60% at ${sx * 100}% ${sy * 100}%, rgba(6,182,212,0.13) 0%, transparent 65%),
         radial-gradient(ellipse 60% 50% at ${(1 - sx) * 100}% ${(1 - sy) * 100}%, rgba(147,51,234,0.13) 0%, transparent 65%),
         radial-gradient(ellipse 40% 40% at 50% 50%, rgba(20,20,40,0.8) 0%, transparent 80%)`
      );
    });
    return unsub;
  }, [springX, springY]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth);
      rawY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rawX, rawY]);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]"></div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: meshStyle,
          y: scrollY * 0.3,
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{ y: scrollY * 0.2 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'grid-flow 20s linear infinite',
          }}
        />
      </motion.div>

      <motion.div
        className="absolute top-1/4 start-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(6,182,212,0.06)', y: scrollY * 0.15 }}
      />
      <motion.div
        className="absolute bottom-1/4 end-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(147,51,234,0.06)', y: scrollY * 0.25 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">{t('hero_subtitle')}</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          {t('hero_title')}
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-600 bg-clip-text text-transparent">
            {t('hero_title_accent')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto"
        >
          ProVistex — The Tech Lab
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center"
        >
          <button
            onClick={scrollToContact}
            className="glow-pulse-btn group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-semibold text-lg overflow-hidden"
          >
            <span className="relative z-10">{t('hero_cta')}</span>
            <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: '150+', label: t('about_stats_projects') },
            { value: '98%', label: t('about_stats_success') },
            { value: '50+', label: t('about_stats_clients') },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-600/5 border border-cyan-500/20 backdrop-blur-sm"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
