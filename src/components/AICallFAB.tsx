import { motion } from 'framer-motion';
import { Headphones } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AICallFABProps {
  onClick: () => void;
}

export default function AICallFAB({ onClick }: AICallFABProps) {
  const { t, language } = useLanguage();

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', damping: 15 }}
      onClick={onClick}
      className="fixed bottom-6 end-6 z-[80] group"
    >
      <div className="relative flex items-center gap-3">
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="hidden sm:block absolute end-full me-3 whitespace-nowrap"
        >
          <div className="px-4 py-2.5 rounded-xl bg-[#0a0f1a]/95 border border-cyan-500/20 backdrop-blur-md shadow-lg shadow-black/40">
            <p className="text-cyan-400 text-xs font-bold leading-relaxed">
              {t('ai_call_fab')}
            </p>
            {language === 'en' && (
              <p className="text-gray-500 text-[10px] font-medium mt-0.5" dir="rtl">
                مستشار تقني (ذكاء اصطناعي)
              </p>
            )}
            {language === 'ar' && (
              <p className="text-gray-500 text-[10px] font-medium mt-0.5" dir="ltr">
                AI Technical Consultant
              </p>
            )}
          </div>
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-full bg-cyan-500/30"
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-shadow">
            <Headphones className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -top-0.5 -end-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#050505]">
            <div className="w-full h-full rounded-full animate-ping bg-emerald-400/60" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}
