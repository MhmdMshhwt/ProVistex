import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
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
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Github, href: '#' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-cyan-500/20">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-purple-950/20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mb-16"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-3xl blur opacity-40"></div>
          <div className="relative p-10 rounded-2xl bg-black/70 backdrop-blur-xl border border-cyan-500/20">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-3">{t('footer_newsletter')}</h3>
                <p className="text-gray-400 text-lg">{t('footer_newsletter_desc')}</p>
              </div>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer_newsletter_placeholder')}
                  className="flex-grow px-4 py-3 bg-cyan-500/5 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  disabled={isSubmitting}
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`glow-pulse-btn px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 whitespace-nowrap transition-all ${
                    isSubmitting
                      ? 'bg-gray-600 cursor-not-allowed text-white'
                      : subscribeStatus === 'success'
                      ? 'bg-green-600 text-white'
                      : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : subscribeStatus === 'success' ? (
                    <span>Subscribed!</span>
                  ) : (
                    <>
                      <span>{t('footer_newsletter_button')}</span>
                      <Mail className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>

        <div className="pt-8 border-t border-cyan-500/10">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PV</span>
                </div>
                <span className="text-white font-bold text-xl">
                  Pro<span className="text-cyan-400">Vistex</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm">{t('footer_tagline')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex justify-center gap-6"
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center md:text-end"
            >
              <p className="text-gray-400 text-sm">{t('footer_rights')}</p>
            </motion.div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-xs">Crafted with precision by The Tech Lab</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
