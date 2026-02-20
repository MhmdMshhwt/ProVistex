import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Check } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import SolutionFinder from '../components/SolutionFinder';
import TechStackMarquee from '../components/TechStackMarquee';

interface ServicePageProps {
  wingNum: string;
  titleKey: string;
  descriptionKey: string;
  capabilitiesKeys: string[];
  gradient: string;
  glowColor: string;
}

export default function ServicePage({
  wingNum,
  titleKey,
  descriptionKey,
  capabilitiesKeys,
  gradient,
  glowColor,
}: ServicePageProps) {
  const { t } = useLanguage();

  return (
    <>
      <Breadcrumb />

      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/8 to-black"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${gradient} bg-opacity-10 border border-white/10 mb-6`}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: glowColor }}></div>
              <span className="text-white font-mono text-xs uppercase tracking-widest">WING {wingNum}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              {t(titleKey)}
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
              {t(descriptionKey)}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-cyan-950/8"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Technical Capabilities</h2>
            <div className="w-20 h-px bg-gradient-to-r from-cyan-500 to-transparent mb-8"></div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilitiesKeys.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-white/3 border border-white/8 hover:border-white/14 transition-all group"
              >
                <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform`}>
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{t(key)}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TechStackMarquee />

      <SolutionFinder />
    </>
  );
}
