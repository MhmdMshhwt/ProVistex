import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function Blog() {
  const { t } = useLanguage();

  const posts = [
    {
      id: 1,
      titleKey: 'blog_post1_title',
      excerptKey: 'blog_post1_excerpt',
      icon: '🧠',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      id: 2,
      titleKey: 'blog_post2_title',
      excerptKey: 'blog_post2_excerpt',
      icon: '📈',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      id: 3,
      titleKey: 'blog_post3_title',
      excerptKey: 'blog_post3_excerpt',
      icon: '✨',
      gradient: 'from-cyan-400 to-teal-500',
    },
    {
      id: 4,
      titleKey: 'blog_post4_title',
      excerptKey: 'blog_post4_excerpt',
      icon: '⚡',
      gradient: 'from-purple-600 to-indigo-600',
    },
  ];

  return (
    <section id="insights" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/10 to-black"></div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-600 to-transparent opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-4">
            <BookOpen className="w-6 h-6 text-cyan-400" />
            <span className="text-cyan-400 font-medium">{t('blog_title')}</span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">
            {t('blog_title')}
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            {t('blog_subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-br ${post.gradient} rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>

              <div className="relative p-8 rounded-2xl bg-black border border-white/10 group-hover:border-white/20 transition-all duration-500 h-full flex flex-col">
                <div className="mb-6 flex items-center justify-between">
                  <div className="text-4xl">{post.icon}</div>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${post.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-cyan-400 transition-colors">
                  {t(post.titleKey)}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow group-hover:text-gray-300 transition-colors">
                  {t(post.excerptKey)}
                </p>

                <div className="flex items-center space-x-2 rtl:space-x-reverse text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  <span className="text-sm font-medium">{t('blog_read_more')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>

                <div className={`absolute top-4 right-4 rtl:right-auto rtl:left-4 w-24 h-24 rounded-full bg-gradient-to-br ${post.gradient} opacity-5 blur-2xl group-hover:opacity-15 transition-opacity`}></div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
