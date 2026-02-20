import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_services: 'Services',
    nav_contact: 'Contact',
    hero_title: 'Transforming Ambitious Ideas',
    hero_title_accent: 'into Digital Empires',
    hero_subtitle: 'The Digital Future in Your Hands',
    hero_cta: 'Start Your Journey',
    about_title: 'The Tech Lab',
    about_subtitle: 'Where Innovation Meets Excellence',
    about_description: 'We are not a traditional software company. ProVistex is a digital research facility where ambitious ideas are transformed into dominant market forces. We break conventional rules, engineer exceptional experiences, and build digital empires that stand the test of time.',
    about_stats_projects: 'Projects Delivered',
    about_stats_clients: 'Satisfied Clients',
    about_stats_success: 'Success Rate',
    services_title: 'Our Expertise',
    services_subtitle: 'Cutting-Edge Solutions for the Modern Era',
    service1_title: 'Software Engineering',
    service1_description: 'Building scalable, robust ecosystems that power your digital infrastructure with precision and innovation.',
    service2_title: 'AI & Automation',
    service2_description: 'Intelligent neural integration that transforms operations through smart automation and predictive analytics.',
    service3_title: 'UI/UX Architecture',
    service3_description: 'Psychology-driven design crafted to create intuitive, engaging experiences that convert and captivate.',
    service4_title: 'Cloud Infrastructure',
    service4_description: 'Resilient digital fortresses built on cutting-edge cloud technology for maximum security and scalability.',
    contact_title: 'Launch Your Project',
    contact_subtitle: 'Let\'s Build Something Extraordinary Together',
    contact_name: 'Full Name',
    contact_email: 'Email Address',
    contact_phone: 'Phone Number',
    contact_project_type: 'Project Type',
    contact_project_select: 'Select a service',
    contact_message: 'Tell us about your vision',
    contact_submit: 'Send Message',
    footer_tagline: 'The Digital Future in Your Hands',
    footer_rights: '2024 ProVistex. All rights reserved.',
  },
  ar: {
    nav_home: 'الرئيسية',
    nav_about: 'من نحن',
    nav_services: 'الخدمات',
    nav_contact: 'تواصل معنا',
    hero_title: 'نحول الأفكار الطموحة',
    hero_title_accent: 'إلى إمبراطوريات رقمية',
    hero_subtitle: 'المستقبل الرقمي بين يديك',
    hero_cta: 'ابدأ رحلتك',
    about_title: 'المعامل التقنية',
    about_subtitle: 'حيث يلتقي الابتكار بالتميز',
    about_description: 'نحن لسنا شركة برمجيات تقليدية. ProVistex هي منشأة بحث رقمية حيث يتم تحويل الأفكار الطموحة إلى قوى سوقية مهيمنة. نكسر القواعد التقليدية، ونصمم تجارب استثنائية، ونبني إمبراطوريات رقمية تصمد أمام اختبار الزمن.',
    about_stats_projects: 'مشروع منجز',
    about_stats_clients: 'عميل راض',
    about_stats_success: 'معدل النجاح',
    services_title: 'خبراتنا',
    services_subtitle: 'حلول متطورة للعصر الحديث',
    service1_title: 'هندسة البرمجيات',
    service1_description: 'بناء أنظمة قابلة للتطوير وقوية تشغل بنيتك التحتية الرقمية بدقة وابتكار.',
    service2_title: 'الذكاء الاصطناعي والأتمتة',
    service2_description: 'تكامل عصبي ذكي يحول العمليات من خلال الأتمتة الذكية والتحليلات التنبؤية.',
    service3_title: 'هندسة تجربة المستخدم',
    service3_description: 'تصميم يعتمد على علم النفس لإنشاء تجارب بديهية وجذابة تحول وتأسر.',
    service4_title: 'الحلول السحابية',
    service4_description: 'حصون رقمية مرنة مبنية على تقنية سحابية متطورة لأقصى قدر من الأمان وقابلية التوسع.',
    contact_title: 'أطلق مشروعك',
    contact_subtitle: 'دعنا نبني شيئًا استثنائيًا معًا',
    contact_name: 'الاسم الكامل',
    contact_email: 'البريد الإلكتروني',
    contact_phone: 'رقم الهاتف',
    contact_project_type: 'نوع المشروع',
    contact_project_select: 'اختر خدمة',
    contact_message: 'أخبرنا عن رؤيتك',
    contact_submit: 'إرسال الرسالة',
    footer_tagline: 'المستقبل الرقمي بين يديك',
    footer_rights: '2024 ProVistex. جميع الحقوق محفوظة.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
