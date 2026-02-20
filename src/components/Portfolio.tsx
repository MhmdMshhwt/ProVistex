import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ExternalLink, Zap } from 'lucide-react';

export default function Portfolio() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      name: t('portfolio_project1'),
      description: t('portfolio_project1_desc'),
      category: 'ai',
      gradient: 'from-cyan-500 to-blue-600',
      icon: '🧠',
    },
    {
      id: 2,
      name: t('portfolio_project2'),
      description: t('portfolio_project2_desc'),
      category: 'web',
      gradient: 'from-purple-500 to-pink-600',
      icon: '☁️',
    },
    {
      id: 3,
      name: t('portfolio_project3'),
      description: t('portfolio_project3_desc'),
      category: 'ai',
      gradient: 'from-cyan-400 to-teal-500',
      icon: '🎨',
    },
  ];

  const filters = [
    { key: 'all', label: t('portfolio_filter_all') },
    { key: 'ai', label: t('portfolio_filter_ai') },
    { key: 'web', label: t('portfolio_filter_web') },
    { key: 'mobile', label: t('portfolio_filter_mobile') },
  ];

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black"></div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            {t('portfolio_title')}
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            {t('portfolio_subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === f.key
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/50'
                  : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:border-cyan-500 hover:bg-cyan-500/20'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {filtered.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -15 }}
              className="group relative cursor-pointer"
            >
              <div className={`absolute -inset-1 bg-gradient-to-br ${project.gradient} rounded-3xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-500`}></div>

              <div className="relative p-8 rounded-3xl bg-black/50 backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all duration-500 h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-6xl">{project.icon}</div>
                  <Zap className="w-6 h-6 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {project.name}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow group-hover:text-gray-300 transition-colors">
                  {project.description}
                </p>

                <div className="flex items-center space-x-2 rtl:space-x-reverse text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">View Case Study</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>

                <div className={`absolute top-0 right-0 rtl:right-auto rtl:left-0 w-32 h-32 rounded-full bg-gradient-to-br ${project.gradient} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">No projects in this category yet</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
