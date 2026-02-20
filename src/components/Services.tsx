import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Code2, Brain, Palette, Cloud } from 'lucide-react';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Code2,
      titleKey: 'service1_title',
      descriptionKey: 'service1_description',
      gradient: 'from-cyan-500 to-blue-600',
      hoverGlow: 'group-hover:shadow-cyan-500/50',
    },
    {
      icon: Brain,
      titleKey: 'service2_title',
      descriptionKey: 'service2_description',
      gradient: 'from-purple-500 to-pink-600',
      hoverGlow: 'group-hover:shadow-purple-500/50',
    },
    {
      icon: Palette,
      titleKey: 'service3_title',
      descriptionKey: 'service3_description',
      gradient: 'from-cyan-400 to-teal-500',
      hoverGlow: 'group-hover:shadow-cyan-400/50',
    },
    {
      icon: Cloud,
      titleKey: 'service4_title',
      descriptionKey: 'service4_description',
      gradient: 'from-purple-600 to-indigo-600',
      hoverGlow: 'group-hover:shadow-purple-600/50',
    },
  ];

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/10 to-black"></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            {t('services_title')}
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            {t('services_subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-3xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500`}></div>

              <div className="relative p-8 rounded-3xl bg-black border border-cyan-500/20 backdrop-blur-sm h-full transition-all duration-500 group-hover:border-cyan-500/40">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {t(service.titleKey)}
                </h3>

                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {t(service.descriptionKey)}
                </p>

                <div className="mt-6 flex items-center space-x-2 rtl:space-x-reverse text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Learn More</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

                <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${service.gradient} opacity-10 blur-xl group-hover:opacity-30 transition-opacity`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-lg">
            Custom solutions tailored to your unique business needs
          </p>
        </motion.div>
      </div>
    </section>
  );
}
