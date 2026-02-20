import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LeadMagnetPopup() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('lead_magnet_shown');
    if (alreadyShown) {
      setDismissed(true);
      return;
    }

    const timer = setTimeout(() => {
      if (!dismissed) {
        setIsOpen(true);
        sessionStorage.setItem('lead_magnet_shown', '1');
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setDismissed(true);
  };

  if (dismissed && !isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] to-[#050510]" />
            <div className="absolute top-0 start-0 end-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500" />

            <div className="relative p-6 sm:p-8">
              <button
                onClick={handleClose}
                className="absolute top-4 end-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-wider">
                            {t('lead_magnet_badge')}
                          </span>
                          <span className="text-gray-600 text-xs line-through">{t('lead_magnet_value')}</span>
                        </div>
                        <h3 className="text-lg font-black text-white">{t('lead_magnet_title')}</h3>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {t('lead_magnet_subtitle')}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('lead_magnet_name')}
                        required
                        className="w-full px-4 py-3 bg-white/3 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('lead_magnet_email')}
                        required
                        className="w-full px-4 py-3 bg-white/3 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                      />
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-shadow"
                      >
                        <span>{t('lead_magnet_cta')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </form>

                    <button
                      onClick={handleClose}
                      className="w-full mt-3 py-2 text-gray-600 text-xs hover:text-gray-400 transition-colors text-center"
                    >
                      {t('lead_magnet_close')}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </motion.div>
                    <p className="text-white font-bold mb-2">
                      {language === 'ar' ? 'تم الإرسال!' : 'Submitted!'}
                    </p>
                    <p className="text-gray-400 text-sm">{t('lead_magnet_success')}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
