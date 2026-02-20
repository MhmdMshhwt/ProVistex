import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Github, Linkedin, Twitter, Mail, MapPin } from 'lucide-react';

const offices = [
  { city: 'Riyadh', cityAr: 'الرياض', flag: '🇸🇦' },
  { city: 'Dubai', cityAr: 'دبي', flag: '🇦🇪' },
  { city: 'London', cityAr: 'لندن', flag: '🇬🇧' },
  { city: 'New York', cityAr: 'نيويورك', flag: '🇺🇸' },
];

export default function Footer() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setSubscribeStatus('success');
    setEmail('');
    setTimeout(() => setSubscribeStatus('idle'), 3000);
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/8">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[#050510]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">PV</span>
              </div>
              <span className="text-white font-black text-xl">Pro<span className="text-cyan-400">Vistex</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">{t('footer_tagline')}</p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/4 border border-white/8 flex items-center justify-center text-gray-500 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/8 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="w-4 h-4 text-cyan-500" />
              <span className="text-white font-mono text-xs uppercase tracking-widest">
                {language === 'ar' ? 'حضورنا العالمي' : 'Global Presence'}
              </span>
            </div>
            <div className="space-y-3">
              {offices.map((office, i) => (
                <motion.div
                  key={office.city}
                  initial={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 group"
                >
                  <span className="text-lg leading-none">{office.flag}</span>
                  <span className="text-gray-400 text-sm font-medium group-hover:text-white transition-colors">
                    {language === 'ar' ? office.cityAr : office.city}
                  </span>
                  {i === 0 && (
                    <span className="ms-auto text-[10px] text-cyan-500 font-mono border border-cyan-500/30 px-1.5 py-0.5 rounded-md">
                      {language === 'ar' ? 'المقر' : 'HQ'}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="sm:col-span-2 md:col-span-1"
          >
            <h3 className="text-white font-bold text-base mb-2">{t('footer_newsletter')}</h3>
            <p className="text-gray-500 text-sm mb-5">{t('footer_newsletter_desc')}</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer_newsletter_placeholder')}
                className="w-full px-4 py-3 bg-white/3 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                disabled={isSubmitting}
              />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`glow-pulse-btn w-full px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  isSubmitting
                    ? 'bg-gray-700 cursor-not-allowed text-white'
                    : subscribeStatus === 'success'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                }`}
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : subscribeStatus === 'success' ? (
                  <span>{language === 'ar' ? 'تم الاشتراك!' : 'Subscribed!'}</span>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>{t('footer_newsletter_button')}</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-start">
          <p className="text-gray-600 text-xs order-2 md:order-1">{t('footer_rights')}</p>
          <div className="flex items-center gap-2 order-1 md:order-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-gray-600 text-xs">
              {language === 'ar' ? 'جميع الأنظمة تعمل' : 'All systems operational'}
            </span>
          </div>
          <p className="text-gray-700 text-xs order-3">
            {language === 'ar' ? 'صُنع بدقة في المعمل التقني' : 'Crafted with precision by The Tech Lab'}
          </p>
        </div>
      </div>
    </footer>
  );
}
