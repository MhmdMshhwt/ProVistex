import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { TrendingUp, Heart, ShoppingCart, Building2 } from 'lucide-react';

type IndustryKey = 'all' | 'fintech' | 'healthtech' | 'ecommerce' | 'government';

interface Solution {
  titleKey: string;
  descKey: string;
  tagKey: string;
  industry: Exclude<IndustryKey, 'all'>;
  gradient: string;
  Icon: React.ElementType;
}

const solutions: Solution[] = [
  { titleKey: 'sol_fintech_title', descKey: 'sol_fintech_desc', tagKey: 'sol_fintech_tag', industry: 'fintech', gradient: 'from-emerald-500 to-teal-600', Icon: TrendingUp },
  { titleKey: 'sol_health_title', descKey: 'sol_health_desc', tagKey: 'sol_health_tag', industry: 'healthtech', gradient: 'from-red-500 to-pink-600', Icon: Heart },
  { titleKey: 'sol_ecom_title', descKey: 'sol_ecom_desc', tagKey: 'sol_ecom_tag', industry: 'ecommerce', gradient: 'from-amber-500 to-orange-600', Icon: ShoppingCart },
  { titleKey: 'sol_gov_title', descKey: 'sol_gov_desc', tagKey: 'sol_gov_tag', industry: 'government', gradient: 'from-blue-600 to-cyan-600', Icon: Building2 },
  { titleKey: 'sol_fintech2_title', descKey: 'sol_fintech2_desc', tagKey: 'sol_fintech2_tag', industry: 'fintech', gradient: 'from-emerald-400 to-cyan-500', Icon: TrendingUp },
  { titleKey: 'sol_health2_title', descKey: 'sol_health2_desc', tagKey: 'sol_health2_tag', industry: 'healthtech', gradient: 'from-pink-500 to-red-500', Icon: Heart },
  { titleKey: 'sol_ecom2_title', descKey: 'sol_ecom2_desc', tagKey: 'sol_ecom2_tag', industry: 'ecommerce', gradient: 'from-orange-400 to-amber-500', Icon: ShoppingCart },
  { titleKey: 'sol_gov2_title', descKey: 'sol_gov2_desc', tagKey: 'sol_gov2_tag', industry: 'government', gradient: 'from-blue-500 to-blue-700', Icon: Building2 },
];

const filters: { key: IndustryKey; labelKey: string }[] = [
  { key: 'all', labelKey: 'solutions_filter_all' },
  { key: 'fintech', labelKey: 'solutions_filter_fintech' },
  { key: 'healthtech', labelKey: 'solutions_filter_healthtech' },
  { key: 'ecommerce', labelKey: 'solutions_filter_ecommerce' },
  { key: 'government', labelKey: 'solutions_filter_government' },
];

export default function SolutionsGrid() {
  const { t } = useLanguage();
  const [active, setActive] = useState<IndustryKey>('all');

  const filtered = active === 'all' ? solutions : solutions.filter((s) => s.industry === active);

  return (
    <section id="solutions" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black"></div>
      <div className="absolute top-0 start-0 w-full h-px bg-gradient-to-r from-transparent via-purple-600/50 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-xs text-purple-400 font-mono uppercase tracking-widest mb-4 opacity-70">
            INDUSTRY-SPECIFIC
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">{t('solutions_title')}</h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-8">{t('solutions_subtitle')}</p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                active === f.key
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-white/4 border border-white/10 text-gray-400 hover:border-cyan-500/40 hover:text-cyan-400'
              }`}
            >
              {t(f.labelKey)}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((sol, index) => (
              <motion.div
                key={sol.titleKey}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className={`absolute -inset-px bg-gradient-to-br ${sol.gradient} rounded-2xl blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>
                <div className="relative p-4 sm:p-6 rounded-2xl bg-[#0a0a0a] border border-white/8 group-hover:border-white/14 h-full flex flex-col transition-all">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${sol.gradient} p-px mb-4 group-hover:scale-110 transition-transform flex-shrink-0`}>
                    <div className="w-full h-full bg-[#0a0a0a] rounded-xl flex items-center justify-center">
                      <sol.Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r ${sol.gradient} bg-opacity-10 border border-white/8 text-gray-500 mb-3 self-start`}>
                    {t(sol.tagKey)}
                  </span>
                  <h3 className="text-white font-bold text-base leading-tight mb-2 group-hover:text-cyan-400 transition-colors">
                    {t(sol.titleKey)}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed flex-grow group-hover:text-gray-400 transition-colors">
                    {t(sol.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
