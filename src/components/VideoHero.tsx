import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface VideoHeroProps {
  embedUrl?: string;
}

export default function VideoHero({ embedUrl }: VideoHeroProps) {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative mt-12 max-w-3xl mx-auto"
      >
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/50">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(6,182,212,1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 group cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-shadow"
            >
              <Play className="w-8 h-8 text-white ms-1" fill="white" />
            </motion.div>
            <span className="text-gray-400 text-sm font-medium group-hover:text-white transition-colors">
              {t('video_placeholder')}
            </span>
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            onClick={() => setIsPlaying(false)}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black border border-white/10"
            >
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-3 end-3 z-10 w-10 h-10 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm font-mono">VIDEO EMBED PLACEHOLDER</p>
                    <p className="text-gray-700 text-xs mt-1">Add YouTube/Vimeo URL to enable</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
