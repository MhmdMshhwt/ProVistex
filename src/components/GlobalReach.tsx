import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin } from 'lucide-react';

interface MapPoint {
  id: string;
  labelKey: string;
  x: number;
  y: number;
  color: string;
  isPrimary?: boolean;
}

const mapPoints: MapPoint[] = [
  { id: 'hq', labelKey: 'globalreach_hq', x: 58.5, y: 39, color: '#06b6d4', isPrimary: true },
  { id: 'mena', labelKey: 'globalreach_mena', x: 54, y: 35, color: '#8b5cf6' },
  { id: 'eu', labelKey: 'globalreach_eu', x: 47, y: 24, color: '#06b6d4' },
  { id: 'us', labelKey: 'globalreach_us', x: 22, y: 28, color: '#8b5cf6' },
];

export default function GlobalReach() {
  const { t } = useLanguage();
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/8 to-black"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-xs text-cyan-500 font-mono uppercase tracking-widest mb-4 opacity-70">WORLDWIDE PRESENCE</div>
          <h2 className="text-5xl font-black text-white mb-4">{t('globalreach_title')}</h2>
          <p className="text-xl text-gray-400 mb-8">{t('globalreach_subtitle')}</p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-3xl blur-xl"></div>
          <div className="relative rounded-2xl bg-[#080810] border border-cyan-500/15 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }} />
            </div>

            <svg
              viewBox="0 0 1000 500"
              className="w-full h-auto relative z-10"
              style={{ filter: 'drop-shadow(0 0 20px rgba(6,182,212,0.1))' }}
            >
              <defs>
                <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect width="1000" height="500" fill="url(#mapGlow)" />

              {/* World map paths - simplified continents */}
              <g fill="#1a2030" stroke="#06b6d4" strokeWidth="0.5" strokeOpacity="0.3">
                {/* North America */}
                <path d="M 80 80 L 220 70 L 240 90 L 250 130 L 230 170 L 200 190 L 160 200 L 130 180 L 100 160 L 70 130 Z" />
                {/* South America */}
                <path d="M 150 230 L 210 220 L 240 250 L 250 310 L 230 370 L 200 400 L 160 390 L 140 350 L 130 290 Z" />
                {/* Europe */}
                <path d="M 430 60 L 510 55 L 530 75 L 520 110 L 490 130 L 450 125 L 420 105 L 415 80 Z" />
                {/* Africa */}
                <path d="M 440 170 L 520 165 L 540 200 L 540 280 L 520 340 L 490 370 L 450 360 L 430 320 L 420 250 L 430 200 Z" />
                {/* Asia */}
                <path d="M 530 55 L 750 45 L 800 70 L 820 110 L 800 160 L 750 180 L 680 175 L 620 165 L 570 145 L 540 120 L 530 90 Z" />
                {/* Australia */}
                <path d="M 720 280 L 820 265 L 850 295 L 840 340 L 800 360 L 750 355 L 710 330 Z" />
              </g>

              {/* Connection lines */}
              {mapPoints.map((from) =>
                mapPoints
                  .filter((to) => to.id !== from.id)
                  .map((to) => (
                    <line
                      key={`${from.id}-${to.id}`}
                      x1={from.x * 10}
                      y1={from.y * 5}
                      x2={to.x * 10}
                      y2={to.y * 5}
                      stroke="#06b6d4"
                      strokeWidth="0.5"
                      strokeOpacity="0.15"
                      strokeDasharray="4 4"
                    />
                  ))
              )}

              {/* Map points */}
              {mapPoints.map((point) => {
                const cx = point.x * 10;
                const cy = point.y * 5;
                const isHovered = hoveredPoint === point.id;
                return (
                  <g
                    key={point.id}
                    onMouseEnter={() => setHoveredPoint(point.id)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle cx={cx} cy={cy} r={isHovered ? 14 : 10} fill={point.color} fillOpacity="0.1" />
                    <circle
                      cx={cx} cy={cy}
                      r={point.isPrimary ? 6 : 4}
                      fill={point.color}
                      style={{
                        filter: `drop-shadow(0 0 ${isHovered ? 12 : 6}px ${point.color})`,
                        transform: 'scale(1)',
                      }}
                    />
                    {isHovered && (
                      <text
                        x={cx} y={cy - 16}
                        textAnchor="middle"
                        fill="white"
                        fontSize="11"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {t(point.labelKey)}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {mapPoints.map((point, i) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredPoint(point.id)}
              onMouseLeave={() => setHoveredPoint(null)}
              className={`group flex items-center gap-3 p-4 rounded-xl border transition-all cursor-default ${
                hoveredPoint === point.id
                  ? 'bg-cyan-500/10 border-cyan-500/40'
                  : 'bg-white/2 border-white/6 hover:border-white/14'
              }`}
            >
              <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: point.color }} />
              <span className="text-gray-400 text-sm font-medium group-hover:text-white transition-colors">
                {t(point.labelKey)}
              </span>
              {point.isPrimary && (
                <span className="text-xs text-cyan-500 font-mono ms-auto">HQ</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
