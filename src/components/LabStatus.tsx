import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Activity } from 'lucide-react';

export default function LabStatus() {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const label = language === 'ar' ? 'حالة المعمل' : 'Lab Status';
  const status = language === 'ar' ? 'متصل' : 'Online';
  const metrics = [
    { label: language === 'ar' ? 'وقت الاستجابة' : 'Response Time', value: '< 2h' },
    { label: language === 'ar' ? 'المشاريع النشطة' : 'Active Projects', value: '12' },
    { label: language === 'ar' ? 'التوفر' : 'Availability', value: '99.9%' },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-6 start-6 z-40 select-none"
          style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
        >
          <motion.button
            onClick={() => setExpanded((v) => !v)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-black/80 backdrop-blur-xl border border-emerald-500/30 hover:border-emerald-500/60 transition-all shadow-lg shadow-black/40 cursor-pointer"
          >
            <div className="relative flex-shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block"></span>
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60"></span>
            </div>
            <Activity className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="text-gray-400 text-xs font-mono">
              {label}:{' '}
              <span className="text-emerald-400 font-bold">{status}</span>
            </span>
          </motion.button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full mb-2 start-0 w-52 p-3 rounded-xl bg-black/90 backdrop-blur-xl border border-emerald-500/20 shadow-xl"
              >
                <div className="text-[10px] text-emerald-500 font-mono uppercase tracking-widest mb-3 opacity-70">
                  {language === 'ar' ? 'مقاييس النظام' : 'System Metrics'}
                </div>
                <div className="space-y-2">
                  {metrics.map((m, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-gray-500 text-xs">{m.label}</span>
                      <span className="text-emerald-400 text-xs font-bold font-mono">{m.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-white/6">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span className="text-gray-600 text-[10px] font-mono">
                      {language === 'ar' ? 'جميع الأنظمة تعمل' : 'All systems nominal'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
