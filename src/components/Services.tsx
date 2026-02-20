import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Code2, Brain, Palette, Cloud } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ElementType;
  titleKey: string;
  descriptionKey: string;
  gradient: string;
  index: number;
}

function ServiceCard({ icon: Icon, titleKey, descriptionKey, gradient, index }: ServiceCardProps) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500`}></div>

      <div className="relative p-8 rounded-3xl bg-black border border-cyan-500/20 backdrop-blur-sm h-full transition-all duration-300 group-hover:border-cyan-500/40">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-500`}>
          <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
          {t(titleKey)}
        </h3>

        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
          {t(descriptionKey)}
        </p>

        <div className="mt-6 flex items-center gap-2 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-sm font-medium">Learn More</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        <div className="absolute top-4 end-4">
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-xl group-hover:opacity-30 transition-opacity`}></div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const { t } = useLanguage();

  const services = [
    { icon: Code2, titleKey: 'service1_title', descriptionKey: 'service1_description', gradient: 'from-cyan-500 to-blue-600' },
    { icon: Brain, titleKey: 'service2_title', descriptionKey: 'service2_description', gradient: 'from-purple-500 to-pink-600' },
    { icon: Palette, titleKey: 'service3_title', descriptionKey: 'service3_description', gradient: 'from-cyan-400 to-teal-500' },
    { icon: Cloud, titleKey: 'service4_title', descriptionKey: 'service4_description', gradient: 'from-purple-600 to-blue-700' },
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
          <h2 className="text-5xl font-bold text-white mb-4">{t('services_title')}</h2>
          <p className="text-xl text-gray-400 mb-8">{t('services_subtitle')}</p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-lg">Custom solutions tailored to your unique business needs</p>
        </motion.div>
      </div>
    </section>
  );
}
