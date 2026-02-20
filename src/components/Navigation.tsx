import { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe, ChevronDown, Code2, Brain, Shield, Cloud, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation, Link } from 'react-router-dom';

const wingGradients = [
  'from-cyan-500 to-blue-600',
  'from-emerald-500 to-teal-600',
  'from-red-500 to-orange-500',
  'from-blue-500 to-cyan-600',
];

interface NavigationProps {
  onLanguageChange?: (lang: 'en' | 'ar') => void;
  onOpenAICall?: () => void;
}

export default function Navigation({ onLanguageChange, onOpenAICall }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const megaRef = useRef<HTMLDivElement>(null);

  const handleLanguageToggle = () => {
    toggleLanguage();
    if (onLanguageChange) {
      const newLang = language === 'en' ? 'ar' : 'en';
      onLanguageChange(newLang);
    }
  };

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

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [location.pathname]);

  const wingIcons = [Code2, Brain, Shield, Cloud];

  const wings = [
    { num: '01', titleKey: 'wing1_title', shortKey: 'wing1_short', gradient: wingGradients[0], Icon: wingIcons[0] },
    { num: '02', titleKey: 'wing2_title', shortKey: 'wing2_short', gradient: wingGradients[1], Icon: wingIcons[1] },
    { num: '03', titleKey: 'wing3_title', shortKey: 'wing3_short', gradient: wingGradients[2], Icon: wingIcons[2] },
    { num: '04', titleKey: 'wing4_title', shortKey: 'wing4_short', gradient: wingGradients[3], Icon: wingIcons[3] },
  ];

  const wingPaths = ['/services/software-engineering', '/services/ai-intelligence', '/services/cloud-cyber', '/services/digital-design'];

  const navLinks = [
    { key: 'nav_home', path: '/' },
    { key: 'nav_services', path: '/services' },
    { key: 'nav_solutions', path: '/portfolio' },
    { key: 'nav_contact', path: '/contact' },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
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
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" onClick={handleNavClick}>
              <motion.div className="flex items-center gap-2 cursor-pointer" whileHover={{ scale: 1.04 }}>
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-sm sm:text-base">PV</span>
                </div>
                <span className="text-white font-black text-lg sm:text-xl tracking-tight">
                  Pro<span className="text-cyan-400">Vistex</span>
                </span>
              </motion.div>
            </Link>

            <div className="hidden lg:flex items-center gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.path}
                  onClick={handleNavClick}
                  className={`text-sm font-medium relative group transition-colors duration-200 ${
                    location.pathname === link.path ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
                  }`}
                >
                  {t(link.key)}
                  <span className={`absolute -bottom-0.5 start-0 h-px bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}

              <div ref={megaRef} className="relative">
                <button
                  onClick={() => setIsMegaMenuOpen((v) => !v)}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${isMegaMenuOpen ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'}`}
                >
                  {t('nav_wings_label')}
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
                            <Link
                              key={wing.num}
                              to={wingPaths[parseInt(wing.num) - 1]}
                              onClick={handleNavClick}
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
                            </Link>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-cyan-500/10">
                          <Link
                            to="/contact"
                            onClick={handleNavClick}
                            className="w-full inline-block py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold hover:from-cyan-500/20 hover:to-blue-600/20 transition-all text-center"
                          >
                            {language === 'ar' ? 'محدد الحل الأمثل ←' : 'Solution Finder →'}
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenAICall}
                className="relative group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white overflow-hidden consultation-btn-border"
                style={{
                  background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(59,130,246,0.15))',
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  animate={{
                    background: [
                      'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(59,130,246,0.15))',
                      'linear-gradient(135deg, rgba(6,182,212,0.25), rgba(59,130,246,0.25))',
                      'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(59,130,246,0.15))',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Headphones className="w-4 h-4 relative z-10 text-cyan-400" />
                <span className="relative z-10 text-white hidden xl:inline">{t('ai_call_nav')}</span>
                <span className="relative z-10 text-white xl:hidden">{language === 'ar' ? 'استشارة' : 'AI Call'}</span>
                <span className="relative z-10 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </motion.button>

              <motion.button
                onClick={handleLanguageToggle}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/12 text-gray-300 text-sm font-bold hover:bg-white/10 hover:border-white/20 hover:text-white transition-all"
              >
                <Globe className="w-4 h-4" />
                <span className="font-mono text-xs tracking-wider">{language === 'en' ? 'AR' : 'EN'}</span>
              </motion.button>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onOpenAICall}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'ar' ? 'استشارة' : 'AI Call'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </motion.button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-2 hover:bg-cyan-500/10 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: language === 'ar' ? -300 : 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: language === 'ar' ? -300 : 300 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-y-0 end-0 z-40 w-72 bg-[#0a0a0a]/98 backdrop-blur-xl border-s border-cyan-500/20 lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col pt-20 px-6 pb-10">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.key}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Link
                      to={link.path}
                      onClick={handleNavClick}
                      className={`block py-4 text-base font-medium border-b border-gray-800/60 transition-all text-start rtl:text-end ${
                        location.pathname === link.path ? 'text-cyan-400 border-cyan-500/30' : 'text-gray-300 hover:text-cyan-400 hover:border-cyan-500/30'
                      }`}
                    >
                      {t(link.key)}
                    </Link>
                  </motion.div>
                ))}

                <div className="mt-5">
                  <div className="text-xs text-cyan-600 font-mono uppercase tracking-widest mb-3 opacity-70">
                    {t('nav_wings_label')}
                  </div>
                  {wings.map((wing, i) => (
                    <motion.div
                      key={wing.num}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.07 }}
                    >
                      <Link
                        to={wingPaths[parseInt(wing.num) - 1]}
                        onClick={handleNavClick}
                        className="flex items-center gap-3 py-3 border-b border-gray-800/40 text-gray-400 hover:text-cyan-400 transition-colors text-start rtl:text-end"
                      >
                        <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${wing.gradient} flex items-center justify-center flex-shrink-0`}>
                          <wing.Icon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-sm font-medium">{t(wing.titleKey)}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={handleLanguageToggle}
                  className="mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span className="font-medium">{language === 'en' ? 'العربية' : 'English'}</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
