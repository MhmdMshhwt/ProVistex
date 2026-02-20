import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Twitter, href: '#', color: 'hover:text-cyan-400' },
    { icon: Linkedin, href: '#', color: 'hover:text-cyan-400' },
    { icon: Github, href: '#', color: 'hover:text-cyan-400' },
  ];

  return (
    <footer className="relative py-12 overflow-hidden border-t border-cyan-500/20">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-purple-950/20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left rtl:md:text-right"
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse justify-center md:justify-start rtl:md:justify-end mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">PV</span>
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
            className="flex justify-center space-x-6 rtl:space-x-reverse"
          >
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className={`text-gray-400 ${social.color} transition-colors`}
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
            className="text-center md:text-right rtl:md:text-left"
          >
            <p className="text-gray-400 text-sm">{t('footer_rights')}</p>
          </motion.div>
        </div>

        <div className="mt-8 pt-8 border-t border-cyan-500/10 text-center">
          <p className="text-gray-500 text-xs">
            Crafted with precision by The Tech Lab
          </p>
        </div>
      </div>
    </footer>
  );
}
