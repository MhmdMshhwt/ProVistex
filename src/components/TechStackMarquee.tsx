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
  { name: 'Kafka', color: '#231f20' },
  { name: 'Elasticsearch', color: '#005571' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'Flutter', color: '#54c5f8' },
  { name: 'Swift', color: '#f05138' },
];

function MarqueeRow({ items, reverse = false }: { items: typeof techStack; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden relative">
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-white/3 border border-white/6 hover:border-white/14 hover:bg-white/6 transition-all cursor-default flex-shrink-0"
          >
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: tech.color, boxShadow: `0 0 8px ${tech.color}60` }}
            />
            <span className="text-gray-400 text-sm font-medium group-hover:text-gray-200 transition-colors whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function TechStackMarquee() {
  const { t } = useLanguage();
  const half = Math.ceil(techStack.length / 2);
  const row1 = techStack.slice(0, half);
  const row2 = techStack.slice(half);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-black"></div>
      <div className="absolute inset-0 border-y border-white/4"></div>

      <div className="relative z-10 mb-12 text-center px-4">
        <div className="text-xs text-cyan-500 font-mono uppercase tracking-widest mb-3 opacity-70">TECHNOLOGY STACK</div>
        <h2 className="text-3xl font-black text-white mb-2">{t('techstack_title')}</h2>
        <p className="text-gray-500 text-sm">{t('techstack_subtitle')}</p>
      </div>

      <div className="relative z-10 space-y-4">
        <div className="absolute inset-y-0 start-0 w-32 bg-gradient-to-e from-black to-transparent z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #050505, transparent)' }}></div>
        <div className="absolute inset-y-0 end-0 w-32 bg-gradient-to-s from-black to-transparent z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #050505, transparent)' }}></div>

        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
