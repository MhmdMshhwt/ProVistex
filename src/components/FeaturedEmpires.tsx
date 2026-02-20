import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowUpRight, TrendingUp, Brain, Cloud } from 'lucide-react';

interface CaseStudy {
  id: string;
  titleKey: string;
  subtitleKey: string;
  descKey: string;
  stat1Val: string;
  stat1LabelKey: string;
  stat2Val: string;
  stat2LabelKey: string;
  stat3Val: string;
  stat3LabelKey: string;
  wingKey: string;
  gradient: string;
  gradientFrom: string;
  gradientTo: string;
  Icon: React.ElementType;
  bgPattern: string;
}

const cases: CaseStudy[] = [
  {
    id: 'fintech',
    titleKey: 'empire1_title',
    subtitleKey: 'empire1_subtitle',
    descKey: 'empire1_desc',
    stat1Val: '2M+',
    stat1LabelKey: 'empire1_stat1',
    stat2Val: '0.8ms',
    stat2LabelKey: 'empire1_stat2',
    stat3Val: '99.99%',
    stat3LabelKey: 'empire1_stat3',
    wingKey: 'wing2_title',
    gradient: 'from-emerald-500 to-teal-600',
    gradientFrom: '#10b981',
    gradientTo: '#0d9488',
    Icon: TrendingUp,
    bgPattern: 'radial-gradient(circle at 80% 20%, rgba(16,185,129,0.15) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(13,148,136,0.1) 0%, transparent 60%)',
  },
  {
    id: 'logistics',
    titleKey: 'empire2_title',
    subtitleKey: 'empire2_subtitle',
    descKey: 'empire2_desc',
    stat1Val: '340%',
    stat1LabelKey: 'empire2_stat1',
    stat2Val: '15',
    stat2LabelKey: 'empire2_stat2',
    stat3Val: '48h',
    stat3LabelKey: 'empire2_stat3',
    wingKey: 'wing2_title',
    gradient: 'from-purple-500 to-pink-600',
    gradientFrom: '#a855f7',
    gradientTo: '#ec4899',
    Icon: Brain,
    bgPattern: 'radial-gradient(circle at 80% 20%, rgba(168,85,247,0.15) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(236,72,153,0.1) 0%, transparent 60%)',
  },
  {
    id: 'cloud',
    titleKey: 'empire3_title',
    subtitleKey: 'empire3_subtitle',
    descKey: 'empire3_desc',
    stat1Val: '12',
    stat1LabelKey: 'empire3_stat1',
    stat2Val: '70%',
    stat2LabelKey: 'empire3_stat2',
    stat3Val: '6 wks',
    stat3LabelKey: 'empire3_stat3',
    wingKey: 'wing4_title',
    gradient: 'from-blue-500 to-cyan-600',
    gradientFrom: '#3b82f6',
    gradientTo: '#0891b2',
    Icon: Cloud,
    bgPattern: 'radial-gradient(circle at 80% 20%, rgba(59,130,246,0.15) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(8,145,178,0.1) 0%, transparent 60%)',
  },
];

function CaseCard({ cs, index }: { cs: CaseStudy; index: number }) {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, visible: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      visible: true,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpotlight((s) => ({ ...s, visible: false }))}
      className="group relative overflow-hidden rounded-3xl cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: cs.bgPattern,
        }}
      />

      {spotlight.visible && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-200 z-10"
          style={{
            background: `radial-gradient(280px circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.06), transparent 70%)`,
          }}
        />
      )}

      <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${cs.gradientFrom}30, ${cs.gradientTo}20)` }} />

      <div className="relative border border-white/8 group-hover:border-white/20 rounded-3xl transition-all duration-300 bg-[#080810] p-8 md:p-10 h-full flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${cs.gradient} bg-opacity-10 border border-white/8 mb-3`}>
              <cs.Icon className="w-3.5 h-3.5 text-white" />
              <span className="text-white text-xs font-semibold">{t(cs.wingKey)}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
              style={{ backgroundImage: `linear-gradient(135deg, ${cs.gradientFrom}, ${cs.gradientTo})` }}>
              {t(cs.titleKey)}
            </h3>
            <p className="text-gray-500 text-sm mt-1 font-mono">{t(cs.subtitleKey)}</p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cs.gradient} flex items-center justify-center flex-shrink-0 ms-4 group-hover:scale-110 transition-transform`}
          >
            <ArrowUpRight className="w-5 h-5 text-white" />
          </motion.div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-8 group-hover:text-gray-300 transition-colors">
          {t(cs.descKey)}
        </p>

        <div className="grid grid-cols-3 gap-4 mt-auto">
          {[
            { val: cs.stat1Val, labelKey: cs.stat1LabelKey },
            { val: cs.stat2Val, labelKey: cs.stat2LabelKey },
            { val: cs.stat3Val, labelKey: cs.stat3LabelKey },
          ].map((stat, i) => (
            <div key={i} className="text-center p-3 rounded-xl bg-white/3 border border-white/6 group-hover:border-white/10 transition-all">
              <div className="text-xl font-black text-white mb-0.5"
                style={{ color: i === 0 ? cs.gradientFrom : i === 1 ? cs.gradientTo : 'white' }}>
                {stat.val}
              </div>
              <div className="text-gray-600 text-xs leading-tight group-hover:text-gray-500 transition-colors">
                {t(stat.labelKey)}
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-6 pt-6 border-t border-white/8">
                <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${cs.gradient} text-white text-sm font-bold`}>
                  {t('empire_view_study')}
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FeaturedEmpires() {
  const { t } = useLanguage();

  return (
    <section id="empires" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950/30 to-black"></div>
      <div className="absolute top-0 start-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="text-xs text-cyan-500 font-mono uppercase tracking-widest mb-4 opacity-70">
            CASE STUDIES
          </div>
          <h2 className="text-5xl font-black text-white mb-4">{t('empires_title')}</h2>
          <p className="text-xl text-gray-400 mb-8">{t('empires_subtitle')}</p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((cs, i) => (
            <CaseCard key={cs.id} cs={cs} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
