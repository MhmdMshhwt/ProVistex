import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Send, Mail, Phone, MapPin, Copy, Check, Upload, X, DollarSign, FileText, Rocket } from 'lucide-react';

const BUDGET_STEPS = [10, 25, 50, 75, 100];

function BudgetSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const { language } = useLanguage();
  const pct = ((value - 10) / (100 - 10)) * 100;
  const label = value >= 100 ? '$100k+' : `$${value}k`;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-cyan-500" />
          {language === 'ar' ? 'الميزانية التقديرية' : 'Project Budget'}
        </span>
        <motion.span
          key={label}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-cyan-400 font-black text-base font-mono"
        >
          {label}
        </motion.span>
      </div>
      <div className="relative h-8 flex items-center">
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-white/8">
          <div
            className="absolute inset-y-0 start-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-75"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={10}
          max={100}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 border-2 border-black shadow-lg shadow-cyan-500/40 pointer-events-none"
          style={{ [language === 'ar' ? 'right' : 'left']: `calc(${pct}% - 10px)` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-gray-700 font-mono">
        {BUDGET_STEPS.map((s) => (
          <span key={s}>{s >= 100 ? '$100k+' : `$${s}k`}</span>
        ))}
      </div>
    </div>
  );
}

function FileUploadField({
  file,
  onFile,
  onClear,
}: {
  file: File | null;
  onFile: (f: File) => void;
  onClear: () => void;
}) {
  const { language } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  };

  return (
    <div>
      <span className="text-gray-400 text-sm flex items-center gap-1.5 mb-2">
        <FileText className="w-3.5 h-3.5 text-cyan-500" />
        {language === 'ar' ? 'ملف موجز المشروع (اختياري)' : 'Project Brief (optional)'}
      </span>
      {file ? (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-500/8 border border-cyan-500/30">
          <FileText className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span className="text-gray-300 text-sm truncate flex-grow">{file.name}</span>
          <button onClick={onClear} className="text-gray-500 hover:text-red-400 transition-colors flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center gap-2 px-4 py-6 rounded-xl border border-dashed cursor-pointer transition-all ${
            isDragging
              ? 'border-cyan-500 bg-cyan-500/10'
              : 'border-white/14 bg-white/2 hover:border-cyan-500/50 hover:bg-white/4'
          }`}
        >
          <Upload className={`w-6 h-6 transition-colors ${isDragging ? 'text-cyan-400' : 'text-gray-600'}`} />
          <span className="text-gray-500 text-xs text-center">
            {language === 'ar' ? 'اسحب الملف هنا أو انقر للرفع' : 'Drop file here or click to upload'}
          </span>
          <span className="text-gray-700 text-[10px]">PDF, DOC, PPT up to 10MB</span>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,.ppt,.pptx"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
    </div>
  );
}

export default function Contact() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });
  const [budget, setBudget] = useState(25);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');
  const [copied, setCopied] = useState(false);

  const contactEmail = 'contact@provistex.com';

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitStatus('success');
    setTimeout(() => {
      setSubmitStatus('idle');
      setFormData({ name: '', email: '', phone: '', projectType: '', message: '' });
      setBudget(25);
      setUploadedFile(null);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, text: contactEmail, color: 'cyan', copyable: true },
    { icon: Phone, text: '+966 XX XXX XXXX', color: 'purple', copyable: false },
    { icon: MapPin, text: 'Riyadh, Saudi Arabia', color: 'cyan', copyable: false },
  ];

  const inputClass =
    'w-full px-4 py-3 bg-white/3 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/60 focus:bg-cyan-500/3 transition-all text-sm';

  return (
    <section id="contact" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/8 to-black"></div>
      <div className="absolute bottom-0 start-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="text-xs text-cyan-500 font-mono uppercase tracking-widest mb-4 opacity-70">
            PROJECT INITIATION PORTAL
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">{t('contact_title')}</h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-8">{t('contact_subtitle')}</p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-black text-white mb-4">
                {language === 'ar' ? 'ابدأ مشروعك' : 'Launch Your Project'}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {language === 'ar'
                  ? 'فريقنا جاهز لتحويل رؤيتك إلى واقع. أخبرنا عن مشروعك وسنتواصل معك خلال 24 ساعة.'
                  : 'Our team is ready to transform your vision into a digital empire. Tell us about your project and we will respond within 24 hours.'}
              </p>
            </div>

            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: language === 'ar' ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-4 p-4 rounded-xl border ${
                    info.color === 'cyan'
                      ? 'bg-cyan-500/5 border-cyan-500/20 hover:border-cyan-500/40'
                      : 'bg-purple-600/5 border-purple-600/20 hover:border-purple-500/40'
                  } transition-all`}
                >
                  <div
                    className={`w-10 h-10 flex-shrink-0 rounded-lg bg-gradient-to-br ${
                      info.color === 'cyan' ? 'from-cyan-500 to-blue-600' : 'from-purple-500 to-pink-600'
                    } flex items-center justify-center`}
                  >
                    <info.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 text-sm flex-grow">{info.text}</span>
                  {info.copyable && (
                    <button
                      onClick={handleCopyEmail}
                      className="relative flex-shrink-0 p-2 rounded-lg hover:bg-cyan-500/20 transition-colors group"
                    >
                      <AnimatePresence mode="wait">
                        {copied ? (
                          <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Check className="w-4 h-4 text-emerald-400" />
                          </motion.div>
                        ) : (
                          <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Copy className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-600/5 border border-white/8">
              <div className="flex items-center gap-2 mb-4">
                <Rocket className="w-4 h-4 text-cyan-400" />
                <span className="text-white font-bold text-sm">
                  {language === 'ar' ? 'ضمان الاستجابة السريعة' : 'Rapid Response Guarantee'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { val: '< 2h', label: language === 'ar' ? 'أوقات العمل' : 'Business hours' },
                  { val: '< 24h', label: language === 'ar' ? 'خارج ساعات العمل' : 'Off-hours' },
                  { val: '48h', label: language === 'ar' ? 'مقترح مفصل' : 'Full proposal' },
                  { val: 'Free', label: language === 'ar' ? 'جلسة الاستشارة' : 'Consultation' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="text-cyan-400 font-black text-lg">{item.val}</div>
                    <div className="text-gray-600 text-xs">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -inset-px bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-600/20 rounded-3xl blur-sm"></div>

              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative p-12 rounded-2xl bg-black/90 border border-emerald-500/30 backdrop-blur-sm text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6"
                    >
                      <Rocket className="w-8 h-8 text-emerald-400" />
                    </motion.div>
                    <h3 className="text-2xl font-black text-white mb-3">
                      {language === 'ar' ? 'تم الإطلاق!' : 'Project Initiated!'}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {language === 'ar'
                        ? 'تم استلام موجزك. سيتواصل معك أحد مهندسينا خلال ساعتين.'
                        : 'Your brief has been received. A senior engineer will reach out within 2 hours.'}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="relative p-5 sm:p-8 rounded-2xl bg-black/90 border border-white/8 backdrop-blur-sm space-y-4 sm:space-y-5"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Rocket className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-black text-sm">
                          {language === 'ar' ? 'بوابة بدء المشروع' : 'Project Initiation Portal'}
                        </div>
                        <div className="text-gray-700 text-[10px] font-mono">SECURE · ENCRYPTED · CONFIDENTIAL</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('contact_name')}
                        required
                        className={inputClass}
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('contact_email')}
                        required
                        className={inputClass}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t('contact_phone')}
                        className={inputClass}
                      />
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className={`${inputClass} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled className="bg-black">{t('contact_project_select')}</option>
                        <option value="software" className="bg-black">{t('wing1_title')}</option>
                        <option value="ai" className="bg-black">{t('wing2_title')}</option>
                        <option value="security" className="bg-black">{t('wing3_title')}</option>
                        <option value="cloud" className="bg-black">{t('wing4_title')}</option>
                      </select>
                    </div>

                    <BudgetSlider value={budget} onChange={setBudget} />

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('contact_message')}
                      rows={3}
                      required
                      className={`${inputClass} resize-none`}
                    />

                    <FileUploadField
                      file={uploadedFile}
                      onFile={setUploadedFile}
                      onClear={() => setUploadedFile(null)}
                    />

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { scale: 1.01, y: -1 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                      className={`glow-pulse-btn w-full py-4 rounded-xl font-black text-white flex items-center justify-center gap-2 transition-all text-sm ${
                        isSubmitting ? 'bg-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-cyan-500 to-purple-600'
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Rocket className="w-4 h-4" />
                          <motion.span whileHover={{ x: language === 'ar' ? -2 : 2 }} transition={{ type: 'spring', stiffness: 400 }}>
                            {language === 'ar' ? 'أطلق مشروعك الآن' : 'Initiate Your Project'}
                          </motion.span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-gray-700 text-[10px]">
                      {language === 'ar'
                        ? 'بياناتك محمية ومشفرة بالكامل. نحن لا نشاركها أبداً.'
                        : 'Your data is fully encrypted. We never share your information.'}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
