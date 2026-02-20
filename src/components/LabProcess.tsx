import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Search, Cpu, Rocket, RefreshCw } from 'lucide-react';

const steps = [
  {
    num: '01',
    Icon: Search,
    titleKey: 'process1_title',
    descKey: 'process1_desc',
    gradient: 'from-cyan-500 to-blue-600',
    glowColor: 'rgba(6,182,212,0.5)',
  },
  {
    num: '02',
    Icon: Cpu,
    titleKey: 'process2_title',
    descKey: 'process2_desc',
    gradient: 'from-purple-500 to-pink-600',
    glowColor: 'rgba(168,85,247,0.5)',
  },
  {
    num: '03',
    Icon: Rocket,
    titleKey: 'process3_title',
    descKey: 'process3_desc',
    gradient: 'from-amber-500 to-orange-500',
    glowColor: 'rgba(245,158,11,0.5)',
  },
  {
    num: '04',
    Icon: RefreshCw,
    titleKey: 'process4_title',
    descKey: 'process4_desc',
    gradient: 'from-emerald-500 to-teal-600',
    glowColor: 'rgba(16,185,129,0.5)',
  },
];

function StepNode({ step, index }: { step: typeof steps[0]; index: number }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '-20% 0px -20% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center text-center"
    >
      <div className="relative mb-6">
        <motion.div
          animate={inView ? {
            boxShadow: [
              `0 0 0px ${step.glowColor}`,
              `0 0 30px ${step.glowColor}`,
              `0 0 0px ${step.glowColor}`,
            ],
          } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} p-px`}
        >
          <div className="w-full h-full bg-[#080810] rounded-2xl flex items-center justify-center">
            <motion.div
              animate={inView ? { rotate: [0, 8, -8, 0] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
            >
              <step.Icon className="w-9 h-9 text-white" />
            </motion.div>
          </div>
        </motion.div>

        <div className={`absolute -top-2 -end-2 w-7 h-7 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center`}>
          <span className="text-white text-[10px] font-black">{step.num}</span>
        </div>
      </div>

      <h3 className="text-lg font-black text-white mb-2 leading-tight">
        {t(step.titleKey)}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed max-w-[180px]">
        {t(step.descKey)}
      </p>
    </motion.div>
  );
}

export default function LabProcess() {
  const { t, language } = useLanguage();

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/8 to-black"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="text-xs text-cyan-500 font-mono uppercase tracking-widest mb-4 opacity-70">
            THE TECH LAB METHODOLOGY
          </div>
          <h2 className="text-5xl font-black text-white mb-4">{t('process_title')}</h2>
          <p className="text-xl text-gray-400 mb-8">{t('process_subtitle')}</p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto"></div>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-10 start-[calc(12.5%+2.5rem)] end-[calc(12.5%+2.5rem)] h-px">
            <div className="w-full h-full bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-emerald-500/30"></div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500"
              style={{ transformOrigin: language === 'ar' ? 'right' : 'left' }}
            />
            {[0, 33.3, 66.6, 100].map((pos, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.2 }}
                viewport={{ once: true }}
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-500 border-2 border-black"
                style={{ [language === 'ar' ? 'right' : 'left']: `${pos}%` }}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {steps.map((step, i) => (
              <StepNode key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-cyan-500/5 via-purple-600/5 to-emerald-500/5 border border-white/8 text-center"
        >
          <p className="text-gray-400 text-base leading-relaxed max-w-2xl mx-auto">
            {t('process_note')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
