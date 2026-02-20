import { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe, ChevronDown, Code2, Brain, Shield, Cloud, CalendarCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const wingGradients = [
  'from-cyan-500 to-blue-600',
  'from-purple-500 to-pink-600',
  'from-red-500 to-orange-500',
  'from-blue-500 to-cyan-600',
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const wingIcons = [Code2, Brain, Shield, Cloud];

  const wings = [
    { num: '01', titleKey: 'wing1_title', shortKey: 'wing1_short', gradient: wingGradients[0], Icon: wingIcons[0] },
    { num: '02', titleKey: 'wing2_title', shortKey: 'wing2_short', gradient: wingGradients[1], Icon: wingIcons[1] },
    { num: '03', titleKey: 'wing3_title', shortKey: 'wing3_short', gradient: wingGradients[2], Icon: wingIcons[2] },
    { num: '04', titleKey: 'wing4_title', shortKey: 'wing4_short', gradient: wingGradients[3], Icon: wingIcons[3] },
  ];

  const navLinks = [
    { key: 'nav_home', href: '#home' },
    { key: 'nav_about', href: '#about' },
    { key: 'nav_solutions', href: '#solutions' },
    { key: 'nav_contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      setIsMegaMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 start-0 end-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/70 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.04 }}>
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-base">PV</span>
              </div>
              <span className="text-white font-black text-xl tracking-tight">
                Pro<span className="text-cyan-400">Vistex</span>
              </span>
            </motion.div>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => scrollToSection(link.href)}
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium text-sm relative group"
                >
                  {t(link.key)}
                  <span className="absolute -bottom-0.5 start-0 w-0 h-px bg-gradient-to-r from-cyan-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}

              <div ref={megaRef} className="relative">
                <button
                  onClick={() => setIsMegaMenuOpen((v) => !v)}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${isMegaMenuOpen ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'}`}
                >
                  {t('nav_services')}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isMegaMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-10 w-[600px] bg-black/97 backdrop-blur-2xl border border-cyan-500/20 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden z-50"
                      style={{ [language === 'ar' ? 'right' : 'left']: '-220px' }}
                    >
                      <div className="p-5">
                        <div className="text-xs text-cyan-500 font-mono uppercase tracking-widest mb-4 opacity-60">
                          {t('nav_wings_label')}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {wings.map((wing) => (
                            <button
                              key={wing.num}
                              onClick={() => scrollToSection('#services')}
                              className="group text-start rtl:text-end flex items-start gap-3 p-3.5 rounded-xl hover:bg-white/4 border border-transparent hover:border-cyan-500/20 transition-all"
                            >
                              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${wing.gradient} p-px flex-shrink-0 group-hover:scale-105 transition-transform`}>
                                <div className="w-full h-full bg-black/80 rounded-lg flex items-center justify-center">
                                  <wing.Icon className="w-4 h-4 text-white" />
                                </div>
                              </div>
                              <div className="min-w-0">
                                <div className="text-[10px] text-gray-600 font-mono mb-0.5">WING {wing.num}</div>
                                <div className="text-white font-bold text-sm group-hover:text-cyan-400 transition-colors truncate">{t(wing.titleKey)}</div>
                                <div className="text-gray-500 text-xs mt-0.5 truncate">{t(wing.shortKey)}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-cyan-500/10">
                          <button
                            onClick={() => scrollToSection('#finder')}
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold hover:from-cyan-500/20 hover:to-purple-600/20 transition-all"
                          >
                            {language === 'ar' ? '← محدد الحل الأمثل' : 'Solution Finder →'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => document.querySelector('#finder')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(147,51,234,0.15))',
                  border: '1px solid transparent',
                  backgroundClip: 'padding-box',
                }}
              >
                <div className="absolute inset-0 rounded-xl border border-transparent"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4, #9333ea) border-box',
                    WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'destination-out',
                    maskComposite: 'exclude',
                    animation: 'border-glow 2s ease-in-out infinite',
                  }} />
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  animate={{
                    background: [
                      'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(147,51,234,0.15))',
                      'linear-gradient(135deg, rgba(6,182,212,0.25), rgba(147,51,234,0.25))',
                      'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(147,51,234,0.15))',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <CalendarCheck className="w-4 h-4 relative z-10 text-cyan-400" />
                <span className="relative z-10 text-white">{language === 'ar' ? 'احجز استشارة' : 'Book a Lab Consultation'}</span>
              </button>

              <motion.button
                onClick={toggleLanguage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/12 text-gray-300 text-sm font-bold hover:bg-white/10 hover:border-white/20 hover:text-white transition-all"
              >
                <Globe className="w-4 h-4" />
                <span className="font-mono text-xs tracking-wider">{language === 'en' ? 'AR' : 'EN'}</span>
                <span className="text-gray-600 text-xs hidden sm:block">{language === 'en' ? 'عربي' : 'English'}</span>
              </motion.button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-cyan-500/10 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? 300 : -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: language === 'ar' ? 300 : -300 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-y-0 end-0 z-40 w-72 bg-black/97 backdrop-blur-xl border-s border-cyan-500/20 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col pt-24 px-6 pb-10">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.key}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => scrollToSection(link.href)}
                  className="text-gray-300 hover:text-cyan-400 py-4 text-base font-medium border-b border-gray-800/60 hover:border-cyan-500/30 transition-all text-start rtl:text-end"
                >
                  {t(link.key)}
                </motion.button>
              ))}

              <div className="mt-5">
                <div className="text-xs text-cyan-600 font-mono uppercase tracking-widest mb-3 opacity-70">
                  {t('nav_wings_label')}
                </div>
                {wings.map((wing, i) => (
                  <motion.button
                    key={wing.num}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.07 }}
                    onClick={() => scrollToSection('#services')}
                    className="w-full flex items-center gap-3 py-3 border-b border-gray-800/40 text-gray-400 hover:text-cyan-400 transition-colors text-start rtl:text-end"
                  >
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${wing.gradient} flex items-center justify-center flex-shrink-0`}>
                      <wing.Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm font-medium">{t(wing.titleKey)}</span>
                  </motion.button>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                onClick={toggleLanguage}
                className="mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all"
              >
                <Globe className="w-4 h-4" />
                <span className="font-medium">{language === 'en' ? 'العربية' : 'English'}</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
