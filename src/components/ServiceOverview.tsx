import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Code2, Brain, Shield, Cloud, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WingCardProps {
  num: string;
  Icon: React.ElementType;
  titleKey: string;
  shortKey: string;
  descriptionKey: string;
  tags: string[];
  gradient: string;
  glowColor: string;
  index: number;
  href: string;
}

function WingCard({ num, Icon, titleKey, shortKey, descriptionKey, tags, gradient, glowColor, index, href }: WingCardProps) {
  const { t, language } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, visible: false });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18 });
  const sy = useSpring(y, { stiffness: 180, damping: 18 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(sx, [-0.5, 0.5], language === 'ar' ? [5, -5] : [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    x.set(relX - 0.5);
    y.set(relY - 0.5);
    setSpotlight({ x: relX * 100, y: relY * 100, visible: true });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setSpotlight((s) => ({ ...s, visible: false }));
  };

  return (
    <Link to={href}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative cursor-pointer h-full"
      >
        <div className={`absolute -inset-px bg-gradient-to-r ${gradient} rounded-3xl blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>

        <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-[#0a0a0a] border border-white/8 group-hover:border-white/16 transition-all duration-300 h-full flex flex-col">
          {spotlight.visible && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-200 z-0"
              style={{
                background: `radial-gradient(320px circle at ${spotlight.x}% ${spotlight.y}%, ${glowColor}20, transparent 70%)`,
              }}
            />
          )}

          <div className="relative z-10 flex items-start justify-between mb-6">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} p-px group-hover:scale-105 transition-transform duration-500`}>
              <div className="w-full h-full bg-[#0a0a0a] rounded-2xl flex items-center justify-center">
                <Icon className="w-7 h-7 text-white" />
              </div>
            </div>
            <span className="text-xs text-gray-700 font-mono group-hover:text-gray-500 transition-colors">WING {num}</span>
          </div>

          <h3 className="relative z-10 text-xl sm:text-2xl font-black text-white mb-1 group-hover:text-cyan-400 transition-colors leading-tight">
            {t(titleKey)}
          </h3>
          <p className="relative z-10 text-xs text-gray-600 font-mono mb-4 group-hover:text-gray-500 transition-colors">{t(shortKey)}</p>

          <p className="relative z-10 text-gray-400 text-sm leading-relaxed flex-grow group-hover:text-gray-300 transition-colors mb-6">
            {t(descriptionKey)}
          </p>

          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full border border-white/8 text-gray-400 group-hover:text-gray-300 group-hover:border-white/14 transition-all">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300 transition-colors font-semibold text-sm">
              <span>{language === 'ar' ? 'معرفة المزيد' : 'Learn More'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className={`absolute top-0 end-0 w-40 h-40 rounded-full bg-gradient-to-br ${gradient} opacity-5 blur-3xl group-hover:opacity-10 transition-opacity pointer-events-none`}></div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function ServiceOverview() {
  const { t } = useLanguage();

  const wings: WingCardProps[] = [
    {
      num: '01',
      Icon: Code2,
      titleKey: 'wing1_title',
      shortKey: 'wing1_short',
      descriptionKey: 'wing1_description',
      tags: ['wing1_tag1', 'wing1_tag2', 'wing1_tag3', 'wing1_tag4'],
      gradient: 'from-cyan-500 to-blue-600',
      glowColor: '#06b6d4',
      index: 0,
      href: '/services/software-engineering',
    },
    {
      num: '02',
      Icon: Brain,
      titleKey: 'wing2_title',
      shortKey: 'wing2_short',
      descriptionKey: 'wing2_description',
      tags: ['wing2_tag1', 'wing2_tag2', 'wing2_tag3', 'wing2_tag4'],
      gradient: 'from-purple-500 to-pink-600',
      glowColor: '#a855f7',
      index: 1,
      href: '/services/ai-intelligence',
    },
    {
      num: '03',
      Icon: Shield,
      titleKey: 'wing3_title',
      shortKey: 'wing3_short',
      descriptionKey: 'wing3_description',
      tags: ['wing3_tag1', 'wing3_tag2', 'wing3_tag3', 'wing3_tag4'],
      gradient: 'from-red-500 to-orange-500',
      glowColor: '#ef4444',
      index: 2,
      href: '/services/cloud-cyber',
    },
    {
      num: '04',
      Icon: Cloud,
      titleKey: 'wing4_title',
      shortKey: 'wing4_short',
      descriptionKey: 'wing4_description',
      tags: ['wing4_tag1', 'wing4_tag2', 'wing4_tag3', 'wing4_tag4'],
      gradient: 'from-blue-500 to-cyan-600',
      glowColor: '#3b82f6',
      index: 3,
      href: '/services/digital-design',
    },
  ];

  return (
    <section id="services" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/8 to-black"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="text-xs text-cyan-500 font-mono uppercase tracking-widest mb-4 opacity-70">
            MULTI-DEPARTMENTAL STRUCTURE
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">{t('wings_title')}</h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-8">{t('wings_subtitle')}</p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wings.map((wing) => (
            <WingCard key={wing.num} {...wing} tags={wing.tags.map((k) => t(k))} />
          ))}
        </div>
      </div>
    </section>
  );
}
