import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const techStack = [
  { name: 'React', color: '#61dafb' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Python', color: '#f7c948' },
  { name: 'Node.js', color: '#68a063' },
  { name: 'AWS', color: '#ff9900' },
  { name: 'Azure', color: '#0089d6' },
  { name: 'Docker', color: '#2496ed' },
  { name: 'Kubernetes', color: '#326ce5' },
  { name: 'TensorFlow', color: '#ff6f00' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Redis', color: '#dc382d' },
  { name: 'GraphQL', color: '#e535ab' },
  { name: 'Rust', color: '#ce412b' },
  { name: 'Go', color: '#00aed8' },
  { name: 'Terraform', color: '#7b42bc' },
  { name: 'Kafka', color: '#a0a0a0' },
  { name: 'Elasticsearch', color: '#00bfb3' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'Flutter', color: '#54c5f8' },
  { name: 'Swift', color: '#f05138' },
];

function TechPill({
  tech,
  tooltipText,
}: {
  tech: typeof techStack[0];
  tooltipText: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative flex-shrink-0"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-white/3 border border-white/6 hover:border-white/20 hover:bg-white/6 transition-all cursor-default"
        style={{ transition: 'border-color 0.2s, background 0.2s' }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{
            backgroundColor: tech.color,
            boxShadow: `0 0 8px ${tech.color}70`,
          }}
        />
        <span className="text-gray-400 text-sm font-medium whitespace-nowrap group-hover:text-white transition-colors">
          {tech.name}
        </span>
      </div>

      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 pointer-events-none z-50 whitespace-nowrap"
        >
          <div
            className="px-3 py-1.5 rounded-lg text-xs font-bold border"
            style={{
              background: `linear-gradient(135deg, ${tech.color}20, ${tech.color}10)`,
              borderColor: `${tech.color}40`,
              color: tech.color,
            }}
          >
            {tooltipText}
          </div>
          <div
            className="w-2 h-2 rotate-45 mx-auto -mt-1"
            style={{ background: `${tech.color}20`, borderRight: `1px solid ${tech.color}40`, borderBottom: `1px solid ${tech.color}40` }}
          />
        </motion.div>
      )}
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  paused,
  tooltipText,
}: {
  items: typeof techStack;
  reverse?: boolean;
  paused: boolean;
  tooltipText: string;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden relative">
      <motion.div
        className="flex gap-4 w-max"
        animate={paused ? {} : { x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: typeof window !== 'undefined' && window.innerWidth < 640 ? 20 : 35, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((tech, i) => (
          <TechPill key={`${tech.name}-${i}`} tech={tech} tooltipText={tooltipText} />
        ))}
      </motion.div>
    </div>
  );
}

export default function TechStackMarquee() {
  const { t, language } = useLanguage();
  const [paused, setPaused] = useState(false);
  const half = Math.ceil(techStack.length / 2);
  const row1 = techStack.slice(0, half);
  const row2 = techStack.slice(half);
  const tooltipText = language === 'ar' ? 'معايير المؤسسات الكبرى' : 'Enterprise Grade';

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 border-y border-white/4"></div>

      <div className="relative z-10 mb-12 text-center px-4">
        <div className="text-xs text-cyan-500 font-mono uppercase tracking-widest mb-3 opacity-70">TECHNOLOGY STACK</div>
        <h2 className="text-3xl font-black text-white mb-2">{t('techstack_title')}</h2>
        <p className="text-gray-500 text-sm">{t('techstack_subtitle')}</p>
      </div>

      <div
        className="relative z-10 space-y-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="absolute inset-y-0 start-0 w-12 sm:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #050505, transparent)' }}
        />
        <div
          className="absolute inset-y-0 end-0 w-12 sm:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #050505, transparent)' }}
        />

        <MarqueeRow items={row1} paused={paused} tooltipText={tooltipText} />
        <MarqueeRow items={row2} reverse paused={paused} tooltipText={tooltipText} />
      </div>

      {paused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 text-center mt-6"
        >
          <span className="text-xs text-cyan-500 font-mono opacity-50">
            {language === 'ar' ? '— معايير المؤسسات الكبرى —' : '— Enterprise Grade Technologies —'}
          </span>
        </motion.div>
      )}
    </section>
  );
}
