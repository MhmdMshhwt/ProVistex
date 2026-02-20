import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Check, ArrowRight, AlertTriangle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import VideoHero from '../components/VideoHero';
import PricingTable from '../components/PricingTable';
import WhyUs from '../components/WhyUs';

interface ServicePageProps {
  wingNum: string;
  titleKey: string;
  descriptionKey: string;
  capabilitiesKeys: string[];
  gradient: string;
  glowColor: string;
  problemKey: string;
  solutionKey: string;
  videoUrl?: string;
}

export default function ServicePage({
  wingNum,
  titleKey,
  descriptionKey,
  capabilitiesKeys,
  gradient,
  glowColor,
  problemKey,
  solutionKey,
  videoUrl,
}: ServicePageProps) {
  const { t, language } = useLanguage();

  return (
    <>
      <Breadcrumb />

      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/8 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.06)_0%,transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 mb-6"
              style={{ background: `linear-gradient(135deg, ${glowColor}10, transparent)` }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: glowColor }} />
              <span className="text-white font-mono text-xs uppercase tracking-widest">WING {wingNum}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              {t(titleKey)}
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-8">
              {t(descriptionKey)}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className={`glow-pulse-btn group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r ${gradient} rounded-full text-white font-bold text-base`}
              >
                <span>{t('service_hero_cta')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Link>
              <a
                href="#pricing"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-gray-300 font-semibold text-base hover:border-cyan-500/40 hover:text-white hover:bg-white/5 transition-all"
              >
                {t('service_hero_cta2')}
              </a>
            </div>
          </motion.div>

          <VideoHero embedUrl={videoUrl} />
        </div>
      </section>

      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="text-xs text-cyan-500 font-mono uppercase tracking-widest mb-4 opacity-70">
              {language === 'ar' ? 'لماذا تحتاجنا' : 'WHY YOU NEED US'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {t('problem_title')} <span className="text-gray-500">&</span> {t('solution_title')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: language === 'ar' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative p-6 sm:p-8 rounded-2xl bg-red-500/[0.04] border border-red-500/15 hover:border-red-500/25 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-white font-black text-lg">{t('problem_title')}</h3>
                  <p className="text-red-400/60 text-xs font-mono">{t('problem_subtitle')}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                {t(problemKey)}
              </p>
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: language === 'ar' ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
              className="relative p-6 sm:p-8 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/15 hover:border-emerald-500/25 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-black text-lg">{t('solution_title')}</h3>
                  <p className="text-emerald-400/60 text-xs font-mono">
                    {language === 'ar' ? 'هكذا نحلّها' : 'Here\'s how we fix it'}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {t(solutionKey)}
              </p>
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-950/5" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="text-xs text-cyan-500 font-mono uppercase tracking-widest mb-4 opacity-70">
              WHAT WE DELIVER
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              {language === 'ar' ? 'القدرات التقنية' : 'Technical Capabilities'}
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {capabilitiesKeys.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-white/16 transition-all group"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <Check className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-white font-semibold text-sm sm:text-base">{t(key)}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PricingTable gradient={gradient} />

      <WhyUs />
    </>
  );
}
