import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ShieldCheck, Quote } from 'lucide-react';

interface Testimonial {
  quoteKey: string;
  nameKey: string;
  titleKey: string;
  companyKey: string;
  gradient: string;
  glowColor: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    quoteKey: 'testimonial1_quote',
    nameKey: 'testimonial1_name',
    titleKey: 'testimonial1_title',
    companyKey: 'testimonial1_company',
    gradient: 'from-cyan-500 to-blue-600',
    glowColor: '#06b6d4',
    initials: 'KA',
  },
  {
    quoteKey: 'testimonial2_quote',
    nameKey: 'testimonial2_name',
    titleKey: 'testimonial2_title',
    companyKey: 'testimonial2_company',
    gradient: 'from-emerald-500 to-teal-600',
    glowColor: '#10b981',
    initials: 'RM',
  },
  {
    quoteKey: 'testimonial3_quote',
    nameKey: 'testimonial3_name',
    titleKey: 'testimonial3_title',
    companyKey: 'testimonial3_company',
    gradient: 'from-amber-500 to-orange-500',
    glowColor: '#f59e0b',
    initials: 'SN',
  },
];

function TestimonialCard({ t: item, index }: { t: Testimonial; index: number }) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, visible: false });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 20 });
  const sy = useSpring(my, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    mx.set(relX - 0.5);
    my.set(relY - 0.5);
    setSpotlight({ x: relX * 100, y: relY * 100, visible: true });
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
    setSpotlight((s) => ({ ...s, visible: false }));
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      viewport={{ once: true }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full"
    >
      <div
        className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm"
        style={{ background: `linear-gradient(135deg, ${item.glowColor}40, transparent)` }}
      />

      <div className="relative h-full overflow-hidden rounded-3xl border border-white/8 group-hover:border-white/16 transition-all duration-300 bg-gradient-to-b from-white/[0.04] to-white/[0.02] backdrop-blur-md flex flex-col p-8">
        {spotlight.visible && (
          <div
            className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-200"
            style={{
              background: `radial-gradient(300px circle at ${spotlight.x}% ${spotlight.y}%, ${item.glowColor}18, transparent 70%)`,
            }}
          />
        )}

        <div className="relative z-10 flex items-start justify-between mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity"
            style={{ background: `linear-gradient(135deg, ${item.glowColor}40, transparent)` }}
          >
            <Quote className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/8">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Verified</span>
          </div>
        </div>

        <blockquote className="relative z-10 flex-grow text-gray-300 text-[15px] leading-[1.75] group-hover:text-white transition-colors mb-8">
          "{t(item.quoteKey)}"
        </blockquote>

        <div className="relative z-10 flex items-center gap-3 pt-6 border-t border-white/6">
          <div
            className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}
          >
            <span className="text-white font-black text-sm">{item.initials}</span>
          </div>
          <div className="min-w-0">
            <div className="text-white font-bold text-sm truncate">{t(item.nameKey)}</div>
            <div className="text-gray-500 text-xs truncate">{t(item.titleKey)}, {t(item.companyKey)}</div>
          </div>
          <div className="ms-auto flex-shrink-0">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-amber-400 text-xs">★</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/6 to-black"></div>
      <div className="absolute top-0 start-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="text-xs text-cyan-500 font-mono uppercase tracking-widest mb-4 opacity-70">
            CLIENT VOICES
          </div>
          <h2 className="text-5xl font-black text-white mb-4">{t('testimonials_title')}</h2>
          <p className="text-xl text-gray-400 mb-8">{t('testimonials_subtitle')}</p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <TestimonialCard key={i} t={item} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center"
        >
          {[
            { val: '98%', label: t('testimonials_stat1') },
            { val: '4.9/5', label: t('testimonials_stat2') },
            { val: '100%', label: t('testimonials_stat3') },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-3xl font-black text-white">{stat.val}</span>
              <span className="text-gray-500 text-sm">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
