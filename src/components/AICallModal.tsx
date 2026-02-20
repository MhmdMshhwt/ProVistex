import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, PhoneOff, Mic, MicOff, Volume2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AICallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SoundWaveVisualizer({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const barsRef = useRef<number[]>(Array.from({ length: 48 }, () => 0));

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const bars = barsRef.current;
    const barCount = bars.length;
    const gap = 3;
    const barWidth = (w - (barCount - 1) * gap) / barCount;
    const maxH = h * 0.85;

    for (let i = 0; i < barCount; i++) {
      const target = active
        ? Math.random() * 0.3 + 0.15 + Math.sin(Date.now() * 0.003 + i * 0.4) * 0.25
        : 0.04;
      bars[i] += (target - bars[i]) * (active ? 0.18 : 0.08);

      const barH = Math.max(2, bars[i] * maxH);
      const x = i * (barWidth + gap);
      const y = (h - barH) / 2;

      const gradient = ctx.createLinearGradient(x, y, x, y + barH);
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.9)');
      gradient.addColorStop(0.5, 'rgba(34, 211, 238, 1)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0.9)');

      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barH, 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    animFrameRef.current = requestAnimationFrame(draw);
  }, [active]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-20 sm:h-24"
      style={{ imageRendering: 'auto' }}
    />
  );
}

export default function AICallModal({ isOpen, onClose }: AICallModalProps) {
  const { t, language } = useLanguage();
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const startCall = () => {
    setCallState('connecting');
    setTimeout(() => {
      setCallState('connected');
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed((p) => p + 1), 1000);
    }, 2200);
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
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col"
        >
          <div className="absolute inset-0 bg-[#05080f]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-black text-xs">PV</span>
              </div>
              <div>
                <span className="text-white font-bold text-sm">ProVistex</span>
                <span className="text-gray-600 text-xs ms-2 font-mono">AI SALES LAB</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 20, delay: 0.1 }}
              className="flex flex-col items-center max-w-lg w-full"
            >
              <div className="relative mb-6">
                <motion.div
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full"
                  animate={
                    callState === 'connected'
                      ? {
                          boxShadow: [
                            '0 0 0 0 rgba(6,182,212,0.3)',
                            '0 0 0 24px rgba(6,182,212,0)',
                            '0 0 0 0 rgba(6,182,212,0.3)',
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500/15 to-blue-600/10 border-2 border-cyan-500/25 flex items-center justify-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                      <span className="text-white font-black text-3xl sm:text-4xl">N</span>
                    </div>
                  </div>
                </motion.div>
                {callState === 'connected' && (
                  <motion.div
                    className="absolute -bottom-1 -end-1 w-7 h-7 rounded-full bg-emerald-500 border-3 border-[#05080f] flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </motion.div>
                )}
                {callState === 'connecting' && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </div>

              <h3 className="text-white font-black text-xl sm:text-2xl mb-1">{t('ai_call_agent_name')}</h3>
              <p className="text-gray-500 text-sm mb-3">{t('ai_call_agent_role')}</p>

              <div className="flex items-center gap-2 mb-8">
                <span
                  className={`w-2 h-2 rounded-full ${
                    callState === 'connected'
                      ? 'bg-emerald-400'
                      : callState === 'connecting'
                      ? 'bg-amber-400 animate-pulse'
                      : 'bg-gray-600'
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

              <div className="w-full mb-4 px-2">
                <SoundWaveVisualizer active={callState === 'connected' && !isMuted} />
              </div>

              {callState === 'connected' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-cyan-400/70 text-xs sm:text-sm font-mono text-center mb-8"
                >
                  {t('ai_call_status_analyzing')}
                </motion.p>
              )}
              {callState !== 'connected' && <div className="mb-8" />}

              <div className="flex items-center justify-center gap-5">
                {callState === 'connected' && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                      isMuted
                        ? 'bg-red-500/20 border border-red-500/40 text-red-400'
                        : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </motion.button>
                )}

                {callState === 'idle' ? (
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startCall}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-shadow"
                  >
                    <Phone className="w-7 h-7 text-white" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={endCall}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-shadow"
                  >
                    <PhoneOff className="w-7 h-7 text-white" />
                  </motion.button>
                )}

                {callState === 'connected' && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-white/10 transition-all"
                  >
                    <Volume2 className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>

          <div className="relative z-10 flex items-center justify-center px-4 py-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/60" />
              <span className="text-gray-700 text-[10px] font-mono uppercase tracking-wider">
                {language === 'ar' ? 'بيئة عرض توضيحي' : 'Demo Environment'}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
