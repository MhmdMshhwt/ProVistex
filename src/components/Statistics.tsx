import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Shield, Monitor, TrendingUp } from 'lucide-react';

interface CounterProps {
  target: number;
  suffix: string;
  prefix: string;
  duration: number;
}

function Counter({ target, suffix, prefix, duration }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;

    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

export default function Statistics() {
  const { language } = useLanguage();

  const stats = [
    {
      icon: TrendingUp,
      value: 10,
      suffix: '+',
      prefix: '',
      label: language === 'ar' ? 'إمبراطوريات رقمية مبنية' : 'Digital Empires Built',
      gradient: 'from-cyan-500 to-blue-600',
      description: language === 'ar' ? 'مشاريع حولت صناعاتها' : 'Projects that transformed their industries',
    },
    {
      icon: Shield,
      value: 100,
      suffix: '%',
      prefix: '',
      label: language === 'ar' ? 'بنية تحتية آمنة' : 'Secure Infrastructure',
      gradient: 'from-purple-500 to-pink-600',
      description: language === 'ar' ? 'التزام لا تنازل عنه بالأمن' : 'Zero-compromise security commitment',
    },
    {
      icon: Monitor,
      value: 24,
      suffix: '/7',
      prefix: '',
      label: language === 'ar' ? 'مراقبة المعمل التقني' : 'Technical Lab Monitoring',
      gradient: 'from-cyan-400 to-teal-500',
      description: language === 'ar' ? 'دعم وإشراف مستمر على مدار الساعة' : 'Round-the-clock oversight and support',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/10 to-black"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-5 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-3xl blur opacity-20 group-hover:opacity-50 transition-opacity duration-500`}></div>

              <div className="relative p-6 sm:p-8 rounded-3xl bg-black border border-cyan-500/20 text-center group-hover:border-cyan-500/40 transition-all">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} p-0.5 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-3 tabular-nums">
                  <Counter
                    target={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    duration={2}
                  />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {stat.label}
                </h3>

                <p className="text-gray-500 text-sm group-hover:text-gray-400 transition-colors">
                  {stat.description}
                </p>

                <div className={`absolute top-4 end-4 w-16 h-16 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 blur-2xl group-hover:opacity-30 transition-opacity`}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
