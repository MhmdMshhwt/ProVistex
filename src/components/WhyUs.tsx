import { motion } from 'framer-motion';
import { Trophy, Clock, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const reasons = [
  {
    icon: Trophy,
    titleKey: 'why_us_1_title',
    descKey: 'why_us_1_desc',
    gradient: 'from-cyan-500 to-blue-600',
    stat: '200+',
  },
  {
    icon: Clock,
    titleKey: 'why_us_2_title',
    descKey: 'why_us_2_desc',
    gradient: 'from-emerald-500 to-teal-600',
    stat: '98.7%',
  },
  {
    icon: TrendingUp,
    titleKey: 'why_us_3_title',
    descKey: 'why_us_3_desc',
    gradient: 'from-blue-500 to-cyan-600',
    stat: '24/7',
  },
];

export default function WhyUs() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-xs text-cyan-500 font-mono uppercase tracking-widest mb-4 opacity-70">
            THE PROVISTEX ADVANTAGE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
            {t('why_us_title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/8 hover:border-white/16 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <reason.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-3xl font-black text-white/10 group-hover:text-white/20 transition-colors">
                    {reason.stat}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {t(reason.titleKey)}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t(reason.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
