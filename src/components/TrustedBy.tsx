import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export default function TrustedBy() {
  const { t } = useLanguage();

  const companies = [
    { name: 'TechCorp', logo: 'TC' },
    { name: 'DataFlow', logo: 'DF' },
    { name: 'CloudVision', logo: 'CV' },
    { name: 'NeuralAI', logo: 'NA' },
    { name: 'QuantumLabs', logo: 'QL' },
    { name: 'InnovateTech', logo: 'IT' },
    { name: 'FutureScale', logo: 'FS' },
    { name: 'PrimeDigital', logo: 'PD' },
  ];

  const duplicatedCompanies = [...companies, ...companies];

  return (
    <section className="relative py-16 overflow-hidden bg-black/50 border-y border-cyan-500/10">
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">
            {t('trusted_title')}
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: [0, -50 * companies.length] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="flex space-x-12 rtl:space-x-reverse"
          >
            {duplicatedCompanies.map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 h-20 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 flex items-center justify-center hover:border-cyan-500/30 transition-all group"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-500 group-hover:text-cyan-400 transition-colors">
                    {company.logo}
                  </div>
                  <div className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors mt-1">
                    {company.name}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20"></div>
        </div>
      </div>
    </section>
  );
}
