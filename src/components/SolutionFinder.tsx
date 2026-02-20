import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronRight, ChevronLeft, Rocket, BarChart2, Shield, Brain, Layers, TrendingUp, Server, Flag } from 'lucide-react';

interface SelectionCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  Icon: React.ElementType;
}

function SelectionCard({ label, selected, onClick, Icon }: SelectionCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative w-full flex items-center gap-4 p-5 rounded-2xl border text-start rtl:text-end transition-all ${
        selected
          ? 'bg-gradient-to-r from-cyan-500/15 to-purple-600/15 border-cyan-500/60 text-white'
          : 'bg-white/2 border-white/8 text-gray-400 hover:border-cyan-500/30 hover:text-gray-200'
      }`}
    >
      {selected && (
        <div className="absolute -inset-px bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-sm opacity-30 pointer-events-none" />
      )}
      <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
        selected ? 'bg-gradient-to-br from-cyan-500 to-purple-600' : 'bg-white/5 group-hover:bg-white/8'
      }`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <span className="relative font-semibold text-sm">{label}</span>
      {selected && (
        <div className="relative ms-auto">
          <div className="w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
        </div>
      )}
    </motion.button>
  );
}

export default function SolutionFinder() {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [scale, setScale] = useState('');
  const [form, setForm] = useState({ name: '', email: '', org: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const step1Options = [
    { key: 'finder_step1_opt1', Icon: Rocket },
    { key: 'finder_step1_opt2', Icon: TrendingUp },
    { key: 'finder_step1_opt3', Icon: Shield },
    { key: 'finder_step1_opt4', Icon: Brain },
  ];

  const step2Options = [
    { key: 'finder_step2_opt1', Icon: Layers },
    { key: 'finder_step2_opt2', Icon: BarChart2 },
    { key: 'finder_step2_opt3', Icon: Server },
    { key: 'finder_step2_opt4', Icon: Flag },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const StepIndicator = () => (
    <div className="flex items-center gap-2 justify-center mb-8">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
            s === step ? 'bg-gradient-to-br from-cyan-500 to-purple-600 text-white scale-110' :
            s < step ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-500/50' :
            'bg-white/5 text-gray-600 border border-white/8'
          }`}>
            {s < step ? '✓' : s}
          </div>
          {s < 3 && <div className={`w-12 h-px transition-all ${s < step ? 'bg-cyan-500' : 'bg-white/8'}`} />}
        </div>
      ))}
    </div>
  );

  return (
    <section id="finder" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/10 to-black"></div>
      <div className="absolute top-0 start-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="text-xs text-cyan-500 font-mono uppercase tracking-widest mb-4 opacity-70">HIGH-CONVERSION INQUIRY</div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">{t('finder_title')}</h2>
          <p className="text-lg sm:text-xl text-gray-400">{t('finder_subtitle')}</p>
        </motion.div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/15 to-purple-600/15 rounded-3xl blur-xl"></div>
          <div className="relative rounded-2xl bg-[#080810] border border-cyan-500/20 p-5 sm:p-8">
            <StepIndicator />

            <AnimatePresence mode="wait">
              {step === 1 && !submitted && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: language === 'ar' ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: language === 'ar' ? 30 : -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">{t('finder_step1_title')}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {step1Options.map((opt) => (
                      <SelectionCard
                        key={opt.key}
                        label={t(opt.key)}
                        selected={goal === opt.key}
                        onClick={() => setGoal(opt.key)}
                        Icon={opt.Icon}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => goal && setStep(2)}
                    disabled={!goal}
                    className={`glow-pulse-btn w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
                      goal
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600'
                        : 'bg-white/5 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    <span>{t('finder_next')}</span>
                    {language === 'ar' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </button>
                </motion.div>
              )}

              {step === 2 && !submitted && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: language === 'ar' ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: language === 'ar' ? 30 : -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">{t('finder_step2_title')}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {step2Options.map((opt) => (
                      <SelectionCard
                        key={opt.key}
                        label={t(opt.key)}
                        selected={scale === opt.key}
                        onClick={() => setScale(opt.key)}
                        Icon={opt.Icon}
                      />
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex items-center gap-2 px-6 py-4 rounded-xl border border-white/12 text-gray-400 hover:border-white/24 hover:text-white transition-all"
                    >
                      {language === 'ar' ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                      {t('finder_back')}
                    </button>
                    <button
                      onClick={() => scale && setStep(3)}
                      disabled={!scale}
                      className={`glow-pulse-btn flex-grow py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
                        scale
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-600'
                          : 'bg-white/5 text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      <span>{t('finder_next')}</span>
                      {language === 'ar' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && !submitted && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: language === 'ar' ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: language === 'ar' ? 30 : -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">{t('finder_step3_title')}</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder={t('finder_step3_name')}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="w-full px-4 py-3.5 bg-white/3 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/60 transition-colors"
                    />
                    <input
                      type="email"
                      placeholder={t('finder_step3_email')}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="w-full px-4 py-3.5 bg-white/3 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/60 transition-colors"
                    />
                    <input
                      type="text"
                      placeholder={t('finder_step3_org')}
                      value={form.org}
                      onChange={(e) => setForm({ ...form, org: e.target.value })}
                      className="w-full px-4 py-3.5 bg-white/3 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/60 transition-colors"
                    />

                    <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15 text-xs text-gray-500 font-mono">
                      {language === 'ar' ? 'الهدف:' : 'Goal:'} <span className="text-cyan-400">{goal ? t(goal) : '—'}</span>
                      {'  ·  '}
                      {language === 'ar' ? 'الحجم:' : 'Scale:'} <span className="text-purple-400">{scale ? t(scale) : '—'}</span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex items-center gap-2 px-6 py-4 rounded-xl border border-white/12 text-gray-400 hover:border-white/24 hover:text-white transition-all"
                      >
                        {language === 'ar' ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                        {t('finder_back')}
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="glow-pulse-btn flex-grow py-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          t('finder_step3_submit')
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {submitted && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-white font-semibold text-lg leading-relaxed">{t('finder_step3_success')}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
