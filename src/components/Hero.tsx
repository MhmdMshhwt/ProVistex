import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const typewriterWords = ['AI', 'WEB', 'CLOUD', 'SECURITY'];

export default function Hero() {
  const { t, language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [meshStyle, setMeshStyle] = useState('');
  const [twIndex, setTwIndex] = useState(0);
  const [twText, setTwText] = useState('');
  const [twDeleting, setTwDeleting] = useState(false);

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
        `radial-gradient(ellipse 80% 60% at ${sx * 100}% ${sy * 100}%, rgba(6,182,212,0.12) 0%, transparent 65%),
         radial-gradient(ellipse 60% 50% at ${(1 - sx) * 100}% ${(1 - sy) * 100}%, rgba(147,51,234,0.12) 0%, transparent 65%)`
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

  useEffect(() => {
    const word = typewriterWords[twIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!twDeleting) {
      if (twText.length < word.length) {
        timeout = setTimeout(() => setTwText(word.slice(0, twText.length + 1)), 120);
      } else {
        timeout = setTimeout(() => setTwDeleting(true), 1800);
      }
    } else {
      if (twText.length > 0) {
        timeout = setTimeout(() => setTwText(word.slice(0, twText.length - 1)), 70);
      } else {
        setTwDeleting(false);
        setTwIndex((i) => (i + 1) % typewriterWords.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [twText, twDeleting, twIndex]);

  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]"></div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: meshStyle, y: scrollY * 0.3 }}
      />

      <motion.div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ y: scrollY * 0.2 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6,182,212,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'grid-flow 20s linear infinite',
          }}
        />
      </motion.div>

      <motion.div
        className="absolute top-1/4 start-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(6,182,212,0.05)', y: scrollY * 0.15 }}
      />
      <motion.div
        className="absolute bottom-1/4 end-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(147,51,234,0.05)', y: scrollY * 0.25 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-cyan-400 text-sm font-medium tracking-wide">{t('hero_subtitle')}</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight tracking-tight"
        >
          {t('hero_title')}
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            {t('hero_title_accent')}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-2xl sm:text-3xl font-bold text-gray-300 mb-12 h-10 flex items-center justify-center gap-3"
        >
          <span className="text-gray-500 font-normal text-xl">{t('hero_typewriter_prefix')}</span>
          <span className="text-cyan-400 font-black tabular-nums min-w-[120px] text-start rtl:text-end">
            {twText}
            <span className="inline-block w-0.5 h-6 bg-cyan-400 ms-0.5 animate-pulse" />
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <button
            onClick={scrollToServices}
            className="glow-pulse-btn group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-bold text-base overflow-hidden"
          >
            <span className="relative z-10">{t('hero_cta')}</span>
            <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button
            onClick={() => document.querySelector('#finder')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-cyan-500/40 text-cyan-400 font-semibold text-base hover:border-cyan-500 hover:bg-cyan-500/10 transition-all"
          >
            {language === 'ar' ? 'محدد الحل الأمثل' : 'Solution Finder'}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { num: '01', label: language === 'ar' ? 'العمارة الرقمية' : 'Digital Architecture' },
            { num: '02', label: language === 'ar' ? 'الذكاء العصبي' : 'Neural Intelligence' },
            { num: '03', label: language === 'ar' ? 'الدفاع السيبراني' : 'Cyber Defense' },
            { num: '04', label: language === 'ar' ? 'الأنظمة السحابية' : 'Cloud Ecosystems' },
          ].map((wing, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/5 to-purple-600/5 border border-cyan-500/15 backdrop-blur-sm text-center"
            >
              <div className="text-xs text-cyan-500 font-mono mb-1 opacity-60">WING {wing.num}</div>
              <div className="text-white text-xs font-medium">{wing.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
