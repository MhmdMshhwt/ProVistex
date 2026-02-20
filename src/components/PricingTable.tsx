import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

interface PricingTableProps {
  gradient: string;
}

export default function PricingTable({ gradient }: PricingTableProps) {
  const { t } = useLanguage();

  const tiers = [
    {
      nameKey: 'pricing_basic',
      priceKey: 'pricing_basic_price',
      descKey: 'pricing_basic_desc',
      features: ['pricing_feat_basic_1', 'pricing_feat_basic_2', 'pricing_feat_basic_3', 'pricing_feat_basic_4', 'pricing_feat_basic_5'],
      popular: false,
    },
    {
      nameKey: 'pricing_business',
      priceKey: 'pricing_business_price',
      descKey: 'pricing_business_desc',
      features: ['pricing_feat_business_1', 'pricing_feat_business_2', 'pricing_feat_business_3', 'pricing_feat_business_4', 'pricing_feat_business_5', 'pricing_feat_business_6'],
      popular: true,
    },
    {
      nameKey: 'pricing_enterprise',
      priceKey: 'pricing_enterprise_price',
      descKey: 'pricing_enterprise_desc',
      features: ['pricing_feat_enterprise_1', 'pricing_feat_enterprise_2', 'pricing_feat_enterprise_3', 'pricing_feat_enterprise_4', 'pricing_feat_enterprise_5', 'pricing_feat_enterprise_6'],
      popular: false,
    },
  ];

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
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
            {t('pricing_select')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, i) => (
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
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${gradient}`} />
              )}

              <div
                className={`h-full p-6 sm:p-8 rounded-3xl flex flex-col transition-all duration-300 ${
                  tier.popular
                    ? 'bg-gradient-to-b from-cyan-500/[0.06] to-transparent border-2 border-cyan-500/20 hover:border-cyan-500/40'
                    : 'bg-white/[0.02] border border-white/8 hover:border-white/16'
                }`}
              >
                {tier.popular && (
                  <span className="self-start px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-wider mb-4">
                    {t('pricing_popular')}
                  </span>
                )}

                <h3 className="text-xl font-black text-white mb-1">{t(tier.nameKey)}</h3>
                <p className="text-gray-500 text-sm mb-6">{t(tier.descKey)}</p>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-white">{t(tier.priceKey)}</span>
                  {tier.nameKey !== 'pricing_enterprise' && (
                    <span className="text-gray-500 text-sm">{t('pricing_mo')}</span>
                  )}
                </div>

                <div className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((fKey) => (
                    <div key={fKey} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
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
                      ? `bg-gradient-to-r ${gradient} text-white hover:shadow-lg hover:shadow-cyan-500/25`
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  {tier.nameKey === 'pricing_enterprise' ? t('pricing_contact') : t('pricing_select')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
