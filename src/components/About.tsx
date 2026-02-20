import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Cpu, Zap, Target, Shield } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();

  const features = [
    { icon: Cpu, title: 'Innovation First', color: 'cyan' },
    { icon: Zap, title: 'Lightning Fast', color: 'purple' },
    { icon: Target, title: 'Precision Driven', color: 'cyan' },
    { icon: Shield, title: 'Secure & Robust', color: 'purple' },
  ];

  return (
    <section id="about" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-black to-black"></div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('about_title')}
          </h2>
          <p className="text-xl text-cyan-400 font-medium mb-8">
            {t('about_subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-3xl blur-xl"></div>
              <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-600/5 border border-cyan-500/20 backdrop-blur-sm">
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  {t('about_description')}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${
                  feature.color === 'cyan'
                    ? 'from-cyan-500/10 to-cyan-500/5 border-cyan-500/30'
                    : 'from-purple-600/10 to-purple-600/5 border-purple-600/30'
                } border backdrop-blur-sm cursor-pointer group`}
              >
                <feature.icon
                  className={`w-10 h-10 mb-4 ${
                    feature.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'
                  } group-hover:scale-110 transition-transform`}
                />
                <h3 className="text-white font-semibold text-lg">{feature.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur opacity-20"></div>
          <div className="relative p-8 sm:p-12 rounded-2xl bg-black border border-cyan-500/30 backdrop-blur-sm">
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-2">
                  150+
                </div>
                <div className="text-gray-400">{t('about_stats_projects')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-2">
                  50+
                </div>
                <div className="text-gray-400">{t('about_stats_clients')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-2">
                  98%
                </div>
                <div className="text-gray-400">{t('about_stats_success')}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
