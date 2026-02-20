import { motion } from 'framer-motion';
import { Check, ArrowRight, Crown, Star, Gem } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

interface PricingTableProps {
  gradient?: string;
}

const tiers = [
  {
    nameKey: 'pricing_silver',
    priceKey: 'pricing_silver_price',
    descKey: 'pricing_silver_desc',
    features: ['pricing_feat_silver_1', 'pricing_feat_silver_2', 'pricing_feat_silver_3', 'pricing_feat_silver_4', 'pricing_feat_silver_5'],
    popular: false,
    icon: Gem,
    accent: 'from-gray-300 to-gray-500',
    accentBorder: 'border-gray-500/20 hover:border-gray-400/40',
    checkGradient: 'from-gray-400 to-gray-500',
  },
  {
    nameKey: 'pricing_gold',
    priceKey: 'pricing_gold_price',
    descKey: 'pricing_gold_desc',
    features: ['pricing_feat_gold_1', 'pricing_feat_gold_2', 'pricing_feat_gold_3', 'pricing_feat_gold_4', 'pricing_feat_gold_5', 'pricing_feat_gold_6'],
    popular: true,
    icon: Star,
    accent: 'from-amber-400 to-yellow-500',
    accentBorder: 'border-amber-500/30 hover:border-amber-400/50',
    checkGradient: 'from-amber-400 to-yellow-500',
  },
  {
    nameKey: 'pricing_empire',
    priceKey: 'pricing_empire_price',
    descKey: 'pricing_empire_desc',
    features: ['pricing_feat_empire_1', 'pricing_feat_empire_2', 'pricing_feat_empire_3', 'pricing_feat_empire_4', 'pricing_feat_empire_5', 'pricing_feat_empire_6'],
    popular: false,
    icon: Crown,
    accent: 'from-cyan-400 to-blue-500',
    accentBorder: 'border-cyan-500/20 hover:border-cyan-400/40',
    checkGradient: 'from-cyan-400 to-blue-500',
  },
];

export default function PricingTable({ gradient }: PricingTableProps) {
  const { t } = useLanguage();
  const ctaGradient = gradient || 'from-cyan-500 to-blue-600';

  return (
    <section id="pricing" className="relative py-20 sm:py-32 overflow-hidden">
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
            TRANSPARENT PRICING
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-3">
            {t('pricing_title')}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            {t('pricing_subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, i) => {
            const TierIcon = tier.icon;
            return (
              <motion.div
                key={tier.nameKey}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                viewport={{ once: true }}
                className={`relative group rounded-3xl overflow-hidden ${
                  tier.popular ? 'md:-mt-4 md:mb-0' : ''
                }`}
              >
                {tier.popular && (
                  <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${tier.accent}`} />
                )}

                <div
                  className={`h-full p-6 sm:p-8 rounded-3xl flex flex-col transition-all duration-300 ${
                    tier.popular
                      ? `bg-gradient-to-b from-amber-500/[0.06] to-transparent border-2 ${tier.accentBorder}`
                      : `bg-white/[0.02] border ${tier.accentBorder}`
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tier.accent} flex items-center justify-center`}>
                      <TierIcon className="w-5 h-5 text-white" />
                    </div>
                    {tier.popular && (
                      <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                        {t('pricing_popular')}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-black text-white mb-1">{t(tier.nameKey)}</h3>
                  <p className="text-gray-500 text-sm mb-6">{t(tier.descKey)}</p>

                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-black text-white">{t(tier.priceKey)}</span>
                    {tier.nameKey !== 'pricing_empire' && (
                      <span className="text-gray-500 text-sm">{t('pricing_mo')}</span>
                    )}
                  </div>

                  <div className="space-y-3 mb-8 flex-grow">
                    {tier.features.map((fKey) => (
                      <div key={fKey} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${tier.checkGradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-300 text-sm">{t(fKey)}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      tier.popular
                        ? `bg-gradient-to-r ${ctaGradient} text-white hover:shadow-lg hover:shadow-cyan-500/25`
                        : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    {tier.nameKey === 'pricing_empire' ? t('pricing_contact') : t('pricing_select')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
