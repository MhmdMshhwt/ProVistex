import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Send, Mail, Phone, MapPin, Copy, Check } from 'lucide-react';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const contactEmail = 'contact@provistex.com';

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitStatus('success');
    setTimeout(() => {
      setSubmitStatus('idle');
      setFormData({ name: '', email: '', phone: '', projectType: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Mail,
      text: contactEmail,
      color: 'cyan',
      copyable: true,
    },
    { icon: Phone, text: '+966 XX XXX XXXX', color: 'purple', copyable: false },
    { icon: MapPin, text: 'Riyadh, Saudi Arabia', color: 'cyan', copyable: false },
  ];

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-white mb-4">{t('contact_title')}</h2>
          <p className="text-xl text-gray-400 mb-8">{t('contact_subtitle')}</p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Get In Touch</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Ready to transform your vision into reality? Our team of experts is here to help you build the next digital empire.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${
                    info.color === 'cyan'
                      ? 'from-cyan-500/10 to-cyan-500/5 border-cyan-500/30'
                      : 'from-purple-600/10 to-purple-600/5 border-purple-600/30'
                  } border`}
                >
                  <div className={`w-12 h-12 flex-shrink-0 rounded-lg bg-gradient-to-br ${
                    info.color === 'cyan' ? 'from-cyan-500 to-blue-600' : 'from-purple-500 to-pink-600'
                  } flex items-center justify-center`}>
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-300 flex-grow">{info.text}</span>
                  {info.copyable && (
                    <button
                      onClick={handleCopyEmail}
                      className="relative flex-shrink-0 p-2 rounded-lg hover:bg-cyan-500/20 transition-colors group"
                      title="Copy email"
                    >
                      <AnimatePresence mode="wait">
                        {copied ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Check className="w-4 h-4 text-green-400" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="copy"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Copy className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <AnimatePresence>
                        {copied && (
                          <motion.span
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: -8 }}
                            exit={{ opacity: 0 }}
                            className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-green-400 whitespace-nowrap font-medium"
                          >
                            Copied!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur opacity-20"></div>
              <form onSubmit={handleSubmit} className="relative p-8 rounded-2xl bg-black border border-cyan-500/20 backdrop-blur-sm space-y-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contact_name')}
                  required
                  className="w-full px-4 py-3 bg-cyan-500/5 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contact_email')}
                  required
                  className="w-full px-4 py-3 bg-cyan-500/5 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('contact_phone')}
                  className="w-full px-4 py-3 bg-cyan-500/5 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />

                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-cyan-500/5 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-black">{t('contact_project_select')}</option>
                  <option value="software" className="bg-black">{t('service1_title')}</option>
                  <option value="ai" className="bg-black">{t('service2_title')}</option>
                  <option value="uiux" className="bg-black">{t('service3_title')}</option>
                  <option value="cloud" className="bg-black">{t('service4_title')}</option>
                </select>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact_message')}
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-cyan-500/5 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                ></textarea>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`glow-pulse-btn w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all ${
                    isSubmitting
                      ? 'bg-gray-600 cursor-not-allowed'
                      : submitStatus === 'success'
                      ? 'bg-green-600'
                      : 'bg-gradient-to-r from-cyan-500 to-purple-600'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : submitStatus === 'success' ? (
                    <span>Message Sent Successfully!</span>
                  ) : (
                    <>
                      <span>{t('contact_submit')}</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
