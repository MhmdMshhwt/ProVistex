import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, PhoneOff, Mic, MicOff } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AICallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function VoiceWave({ active }: { active: boolean }) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-12">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-cyan-500 to-cyan-300"
          animate={
            active
              ? {
                  height: [4, Math.random() * 40 + 8, 4],
                  opacity: [0.4, 1, 0.4],
                }
              : { height: 4, opacity: 0.2 }
          }
          transition={
            active
              ? {
                  duration: 0.4 + Math.random() * 0.4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: i * 0.03,
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

export default function AICallModal({ isOpen, onClose }: AICallModalProps) {
  const { t } = useLanguage();
  const [callState, setCallState] = useState<'idle' | 'connecting' | 'connected'>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!isOpen) {
      setCallState('idle');
      setIsMuted(false);
      setElapsed(0);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isOpen]);

  const startCall = () => {
    setCallState('connecting');
    setTimeout(() => {
      setCallState('connected');
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed((p) => p + 1), 1000);
    }, 2000);
  };

  const endCall = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCallState('idle');
    setElapsed(0);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] to-[#050510]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)]" />

            <div className="relative p-6 sm:p-8">
              <button
                onClick={onClose}
                className="absolute top-4 end-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-8">
                <div className="text-xs text-cyan-500 font-mono uppercase tracking-widest mb-2 opacity-70">
                  AI SALES LAB
                </div>
                <h3 className="text-xl font-black text-white mb-1">{t('ai_call_title')}</h3>
                <p className="text-gray-500 text-sm">{t('ai_call_subtitle')}</p>
              </div>

              <div className="flex flex-col items-center mb-8">
                <motion.div
                  className="relative w-24 h-24 rounded-full mb-4"
                  animate={
                    callState === 'connected'
                      ? { boxShadow: ['0 0 0 0 rgba(6,182,212,0.4)', '0 0 0 20px rgba(6,182,212,0)', '0 0 0 0 rgba(6,182,212,0.4)'] }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border-2 border-cyan-500/30 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-black text-2xl">N</span>
                    </div>
                  </div>
                  {callState === 'connected' && (
                    <motion.div
                      className="absolute -bottom-1 -end-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#0a0f1a] flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </motion.div>
                  )}
                </motion.div>

                <h4 className="text-white font-bold text-base mb-0.5">{t('ai_call_agent_name')}</h4>
                <p className="text-gray-500 text-xs">{t('ai_call_agent_role')}</p>

                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      callState === 'connected' ? 'bg-emerald-400' : callState === 'connecting' ? 'bg-amber-400 animate-pulse' : 'bg-gray-600'
                    }`}
                  />
                  <span className="text-xs text-gray-400 font-mono">
                    {callState === 'connected'
                      ? `${t('ai_call_status_connected')} - ${formatTime(elapsed)}`
                      : callState === 'connecting'
                      ? t('ai_call_status_connecting')
                      : t('ai_call_status_idle')}
                  </span>
                </div>
              </div>

              <div className="mb-8 px-4">
                <VoiceWave active={callState === 'connected' && !isMuted} />
              </div>

              <div className="flex items-center justify-center gap-4">
                {callState === 'connected' && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                      isMuted ? 'bg-red-500/20 border border-red-500/40 text-red-400' : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </motion.button>
                )}

                {callState === 'idle' ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startCall}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-shadow"
                  >
                    <Phone className="w-6 h-6 text-white" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={endCall}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-shadow"
                  >
                    <PhoneOff className="w-6 h-6 text-white" />
                  </motion.button>
                )}

                {callState === 'connected' && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-14 h-14" />
                )}
              </div>

              <p className="text-center text-gray-700 text-[10px] mt-6 font-mono">
                AI VOICE AGENT PLACEHOLDER
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
