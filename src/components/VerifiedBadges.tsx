import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const platforms = [
  { key: 'trust_verified_fiverr', name: 'Fiverr', color: 'from-emerald-500 to-emerald-600' },
  { key: 'trust_verified_mostaql', name: 'Mostaql', color: 'from-blue-500 to-blue-600' },
  { key: 'trust_verified_upwork', name: 'Upwork', color: 'from-emerald-500 to-teal-600' },
];

export default function VerifiedBadges() {
  const { t } = useLanguage();

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-cyan-950/5"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/16 transition-all group"
            >
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center flex-shrink-0`}>
                <BadgeCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-sm group-hover:text-cyan-400 transition-colors">
                  {platform.name}
                </div>
                <div className="text-gray-500 text-xs">{t(platform.key)}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
