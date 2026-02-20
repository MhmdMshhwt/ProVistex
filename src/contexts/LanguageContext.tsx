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
    nav_services: 'Tech Wings',
    nav_solutions: 'Solutions',
    nav_contact: 'Contact',
    nav_wings_label: 'Our Tech Wings',

    wing1_title: 'Digital Architecture',
    wing1_short: 'Web · Mobile · SaaS · Enterprise',
    wing1_description: 'Full-spectrum digital construction — from responsive web applications and cross-platform mobile apps to large-scale enterprise systems and SaaS platforms built to dominate their market.',
    wing1_tag1: 'Web Applications',
    wing1_tag2: 'Mobile Apps',
    wing1_tag3: 'SaaS Platforms',
    wing1_tag4: 'Enterprise Systems',

    wing2_title: 'Neural Intelligence',
    wing2_short: 'AI · ML · Data Analytics · Automation',
    wing2_description: 'Deploying neural intelligence across your operations — from predictive analytics and machine learning models to intelligent automation pipelines that eliminate friction and surface insight.',
    wing2_tag1: 'AI Engineering',
    wing2_tag2: 'Machine Learning',
    wing2_tag3: 'Data Analytics',
    wing2_tag4: 'Automation',

    wing3_title: 'Cyber Defense',
    wing3_short: 'Security Audits · Pentesting · Data Sovereignty',
    wing3_description: 'Building impenetrable digital fortresses. Security audits, penetration testing, threat modeling, and data sovereignty frameworks that protect your assets from evolving cyber threats.',
    wing3_tag1: 'Security Audits',
    wing3_tag2: 'Penetration Testing',
    wing3_tag3: 'Data Sovereignty',
    wing3_tag4: 'Threat Modeling',

    wing4_title: 'Cloud Ecosystems',
    wing4_short: 'DevOps · AWS/Azure · Scalability',
    wing4_description: 'Engineering resilient, globally-distributed cloud ecosystems on AWS, Azure, and GCP. DevOps pipelines, Kubernetes orchestration, and autoscaling architectures built for enterprise scale.',
    wing4_tag1: 'DevOps & CI/CD',
    wing4_tag2: 'AWS / Azure',
    wing4_tag3: 'Kubernetes',
    wing4_tag4: 'Scalability Design',

    wings_title: 'The Tech Wings',
    wings_subtitle: 'Four Specialized Divisions. One Unified Mission.',

    solutions_title: 'Industry Solutions',
    solutions_subtitle: 'Tailored expertise for every sector',
    solutions_filter_all: 'All Industries',
    solutions_filter_fintech: 'FinTech',
    solutions_filter_healthtech: 'HealthTech',
    solutions_filter_ecommerce: 'E-Commerce',
    solutions_filter_government: 'Government',

    sol_fintech_title: 'Financial Intelligence Platform',
    sol_fintech_desc: 'Real-time trading systems, fraud detection AI, and regulatory compliance automation for financial institutions.',
    sol_fintech_tag: 'FinTech',

    sol_health_title: 'Smart Healthcare Ecosystem',
    sol_health_desc: 'Patient data management, diagnostic AI, telemedicine platforms, and HIPAA-compliant infrastructure.',
    sol_health_tag: 'HealthTech',

    sol_ecom_title: 'High-Conversion Commerce Engine',
    sol_ecom_desc: 'Personalization AI, inventory automation, multi-channel storefronts, and sub-second checkout flows.',
    sol_ecom_tag: 'E-Commerce',

    sol_gov_title: 'Sovereign Digital Services',
    sol_gov_desc: 'Secure citizen portals, e-governance platforms, smart city infrastructure, and data sovereignty frameworks.',
    sol_gov_tag: 'Government',

    sol_fintech2_title: 'Open Banking Infrastructure',
    sol_fintech2_desc: 'API-first banking layers, real-time payment rails, and cryptographic ledger systems.',
    sol_fintech2_tag: 'FinTech',

    sol_health2_title: 'Clinical AI Decision Engine',
    sol_health2_desc: 'ML-powered diagnostic support, clinical trial data pipelines, and predictive patient outcomes.',
    sol_health2_tag: 'HealthTech',

    sol_ecom2_title: 'Logistics Intelligence Network',
    sol_ecom2_desc: 'Route optimization AI, warehouse automation, last-mile delivery tracking, and demand forecasting.',
    sol_ecom2_tag: 'E-Commerce',

    sol_gov2_title: 'National Cybersecurity Framework',
    sol_gov2_desc: 'Critical infrastructure protection, national SIEM deployment, and government penetration testing.',
    sol_gov2_tag: 'Government',

    techstack_title: 'The Arsenal',
    techstack_subtitle: 'Battle-tested technologies powering every solution',

    globalreach_title: 'Global Reach',
    globalreach_subtitle: 'Operating from the Middle East, delivering worldwide',
    globalreach_hq: 'Headquarters',
    globalreach_mena: 'MENA Region',
    globalreach_eu: 'European Partners',
    globalreach_us: 'North America',

    finder_title: 'Solution Finder',
    finder_subtitle: 'Tell us your challenge. We\'ll engineer the answer.',
    finder_step1_title: 'What is your primary goal?',
    finder_step1_opt1: 'Build a new digital product',
    finder_step1_opt2: 'Scale existing infrastructure',
    finder_step1_opt3: 'Secure & defend systems',
    finder_step1_opt4: 'Integrate AI & automation',
    finder_step2_title: 'What is your scale?',
    finder_step2_opt1: 'Startup (1–50 users)',
    finder_step2_opt2: 'Growth (50K–1M users)',
    finder_step2_opt3: 'Enterprise (1M+ users)',
    finder_step2_opt4: 'Government / National Scale',
    finder_step3_title: 'Request Expert Consultation',
    finder_step3_name: 'Full Name',
    finder_step3_email: 'Work Email',
    finder_step3_org: 'Organization',
    finder_step3_submit: 'Get Expert Consultation',
    finder_step3_success: 'Request Submitted — Our team will contact you within 24 hours.',
    finder_back: 'Back',
    finder_next: 'Continue',
    finder_step_of: 'Step',

    hero_title: 'Universal Tech Solutions',
    hero_title_accent: 'for Digital Empires',
    hero_subtitle: 'The Tech Lab — Four Wings. One Vision.',
    hero_cta: 'Explore Our Wings',
    hero_typewriter_prefix: 'Building Empires in',

    about_title: 'The Tech Lab',
    about_subtitle: 'Where Innovation Meets Excellence',
    about_description: 'ProVistex is not a conventional agency. We are a multi-departmental tech laboratory where specialized divisions collaborate to engineer complete digital ecosystems — from the first line of code to global cloud deployment and security fortification.',
    about_stats_projects: 'Projects Delivered',
    about_stats_clients: 'Satisfied Clients',
    about_stats_success: 'Success Rate',

    portfolio_title: 'Case Studies',
    portfolio_subtitle: 'Real problems. Engineered solutions.',
    portfolio_filter_all: 'All',
    portfolio_filter_ai: 'Neural Intelligence',
    portfolio_filter_web: 'Digital Architecture',
    portfolio_filter_mobile: 'Mobile',
    portfolio_project1: 'Neural Trading Platform',
    portfolio_project1_desc: 'AI-powered financial analysis engine processing 2M+ transactions daily with sub-millisecond latency.',
    portfolio_project2: 'GovCloud Infrastructure',
    portfolio_project2_desc: 'National-scale cloud migration for a government ministry — 99.99% uptime, zero data sovereignty compromise.',
    portfolio_project3: 'E-Commerce Intelligence',
    portfolio_project3_desc: 'Personalization AI boosting conversion by 340% across 15 regional storefronts.',

    blog_title: 'Tech Intelligence',
    blog_subtitle: 'Insights from the Lab',
    blog_read_more: 'Read Full Analysis',
    blog_post1_title: 'The Architecture of AI-Native Applications',
    blog_post1_excerpt: 'How to design systems that treat AI as a first-class citizen — not an afterthought bolted onto legacy code.',
    blog_post2_title: 'Zero Trust: The Only Security Model That Scales',
    blog_post2_excerpt: 'Why perimeter defense is dead, and how to architect identity-first security for modern enterprises.',
    blog_post3_title: 'Cloud-Native at Government Scale',
    blog_post3_excerpt: 'The technical challenges of building sovereign, compliant cloud infrastructure for national institutions.',
    blog_post4_title: 'The Compounding Returns of DevOps Excellence',
    blog_post4_excerpt: 'How elite DevOps practices create exponential gains in delivery speed, reliability, and team velocity.',

    contact_title: 'Launch Your Project',
    contact_subtitle: 'Let\'s Build Something Extraordinary Together',
    contact_name: 'Full Name',
    contact_email: 'Email Address',
    contact_phone: 'Phone Number',
    contact_project_type: 'Project Type',
    contact_project_select: 'Select a wing',
    contact_message: 'Tell us about your vision',
    contact_submit: 'Send Message',

    footer_tagline: 'Universal Tech Solutions Agency',
    footer_rights: '2024 ProVistex. All rights reserved.',
    footer_newsletter: 'Stay in the Loop',
    footer_newsletter_desc: 'Tech intelligence delivered to your inbox.',
    footer_newsletter_placeholder: 'Enter your work email',
    footer_newsletter_button: 'Subscribe',

    empires_title: 'Featured Empires',
    empires_subtitle: 'Three case studies. Real impact. Proven at scale.',
    empire_view_study: 'View Full Case Study',

    empire1_title: 'Neural Trading Platform',
    empire1_subtitle: 'FinTech · Neural Intelligence Wing',
    empire1_desc: 'Engineered a real-time AI trading engine for a Gulf-based financial institution — processing 2M+ transactions daily with sub-millisecond latency and integrated fraud detection scoring.',
    empire1_stat1: 'Daily Transactions',
    empire1_stat2: 'Avg. Latency',
    empire1_stat3: 'Uptime SLA',

    empire2_title: 'AI-Driven Logistics Network',
    empire2_subtitle: 'E-Commerce · Neural Intelligence Wing',
    empire2_desc: 'Deployed an ML-powered logistics intelligence system across 15 regional distribution centers — route optimization AI reduced delivery costs by 38% and boosted on-time fulfillment to 97%.',
    empire2_stat1: 'Conversion Uplift',
    empire2_stat2: 'Distribution Hubs',
    empire2_stat3: 'Deployment Time',

    empire3_title: 'National Cloud Migration',
    empire3_subtitle: 'Government · Cloud Ecosystems Wing',
    empire3_desc: 'Led a sovereign cloud migration for a national government ministry — migrating 12 legacy systems to a zero-trust AWS architecture, cutting infrastructure costs by 70% with full data sovereignty.',
    empire3_stat1: 'Systems Migrated',
    empire3_stat2: 'Cost Reduction',
    empire3_stat3: 'Migration Duration',

    process_title: 'Scientific Process',
    process_subtitle: 'How The Tech Lab engineers solutions with precision.',
    process_note: 'Every engagement follows this methodology — ensuring no guesswork, no technical debt, and no surprises. Our process is iterative, data-driven, and built for compounding results over time.',

    process1_title: 'Discovery & Analysis',
    process1_desc: 'Deep-dive into your systems, market, and goals. We map every constraint before writing a single line.',
    process2_title: 'Neural Architecture',
    process2_desc: 'System design with precision — choosing the right technologies, patterns, and scale model for your exact context.',
    process3_title: 'Rapid Deployment',
    process3_desc: 'CI/CD-first delivery with progressive rollouts. Working software in your hands at every sprint milestone.',
    process4_title: 'Continuous Evolution',
    process4_desc: 'Post-launch monitoring, optimization cycles, and growth-driven iterations that compound over time.',
  },
  ar: {
    nav_home: 'الرئيسية',
    nav_about: 'من نحن',
    nav_services: 'الأجنحة التقنية',
    nav_solutions: 'الحلول',
    nav_contact: 'تواصل معنا',
    nav_wings_label: 'أجنحتنا التقنية',

    wing1_title: 'العمارة الرقمية',
    wing1_short: 'الويب · التطبيقات · SaaS · أنظمة المؤسسات',
    wing1_description: 'بناء رقمي شامل — من تطبيقات الويب المتجاوبة وتطبيقات الجوال متعددة المنصات إلى أنظمة المؤسسات الكبرى ومنصات SaaS المصممة للهيمنة على السوق.',
    wing1_tag1: 'تطبيقات الويب',
    wing1_tag2: 'تطبيقات الجوال',
    wing1_tag3: 'منصات SaaS',
    wing1_tag4: 'أنظمة المؤسسات',

    wing2_title: 'الذكاء العصبي',
    wing2_short: 'الذكاء الاصطناعي · تعلم الآلة · أتمتة البيانات',
    wing2_description: 'نشر الذكاء الاصطناعي عبر عملياتك — من التحليلات التنبؤية ونماذج تعلم الآلة إلى خطوط الأتمتة الذكية التي تُزيل الاحتكاك وتُبرز المعرفة.',
    wing2_tag1: 'هندسة الذكاء الاصطناعي',
    wing2_tag2: 'تعلم الآلة',
    wing2_tag3: 'تحليلات البيانات',
    wing2_tag4: 'الأتمتة الذكية',

    wing3_title: 'الدفاع السيبراني',
    wing3_short: 'تدقيق الأمان · اختبار الاختراق · سيادة البيانات',
    wing3_description: 'بناء حصون رقمية منيعة — تدقيق أمني شامل، واختبار اختراق احترافي، ونمذجة التهديدات، وأطر سيادة البيانات لحماية أصولك من التهديدات الإلكترونية المتطورة.',
    wing3_tag1: 'التدقيق الأمني',
    wing3_tag2: 'اختبار الاختراق',
    wing3_tag3: 'سيادة البيانات',
    wing3_tag4: 'نمذجة التهديدات',

    wing4_title: 'الأنظمة السحابية',
    wing4_short: 'DevOps · إدارة AWS/Azure · التوسع البرمجي',
    wing4_description: 'هندسة أنظمة سحابية مرنة وموزعة عالمياً على AWS وAzure وGCP — خطوط DevOps وتنسيق Kubernetes ومعمارية التوسع التلقائي لمستوى المؤسسات.',
    wing4_tag1: 'DevOps والتسليم المستمر',
    wing4_tag2: 'AWS / Azure',
    wing4_tag3: 'Kubernetes',
    wing4_tag4: 'تصميم قابلية التوسع',

    wings_title: 'الأجنحة التقنية',
    wings_subtitle: 'أربعة أقسام متخصصة. رسالة واحدة موحّدة.',

    solutions_title: 'حلول القطاعات',
    solutions_subtitle: 'خبرة مصممة لكل قطاع',
    solutions_filter_all: 'جميع القطاعات',
    solutions_filter_fintech: 'التقنية المالية',
    solutions_filter_healthtech: 'التقنية الصحية',
    solutions_filter_ecommerce: 'التجارة الإلكترونية',
    solutions_filter_government: 'القطاع الحكومي',

    sol_fintech_title: 'منصة الذكاء المالي',
    sol_fintech_desc: 'أنظمة تداول فوري، وذكاء اصطناعي لكشف الاحتيال، وأتمتة الامتثال التنظيمي للمؤسسات المالية.',
    sol_fintech_tag: 'التقنية المالية',

    sol_health_title: 'منظومة الرعاية الصحية الذكية',
    sol_health_desc: 'إدارة بيانات المرضى، وتشخيص يعمل بالذكاء الاصطناعي، ومنصات الطب عن بُعد، وبنية تحتية متوافقة مع معيار HIPAA.',
    sol_health_tag: 'التقنية الصحية',

    sol_ecom_title: 'محرك التجارة عالي التحويل',
    sol_ecom_desc: 'ذكاء اصطناعي للتخصيص، وأتمتة المخزون، وواجهات متعددة القنوات، وعمليات دفع فائقة السرعة.',
    sol_ecom_tag: 'التجارة الإلكترونية',

    sol_gov_title: 'الخدمات الرقمية السيادية',
    sol_gov_desc: 'بوابات المواطنين الآمنة، ومنصات الحكومة الإلكترونية، وبنية تحتية المدن الذكية، وأطر سيادة البيانات.',
    sol_gov_tag: 'القطاع الحكومي',

    sol_fintech2_title: 'بنية الخدمات المصرفية المفتوحة',
    sol_fintech2_desc: 'طبقات مصرفية قائمة على API، ومسارات دفع فوري، وأنظمة دفتر حسابات مشفّر.',
    sol_fintech2_tag: 'التقنية المالية',

    sol_health2_title: 'محرك قرار الذكاء الاصطناعي السريري',
    sol_health2_desc: 'دعم تشخيصي مدعوم بالتعلم الآلي، وخطوط بيانات التجارب السريرية، والتنبؤ بنتائج المرضى.',
    sol_health2_tag: 'التقنية الصحية',

    sol_ecom2_title: 'شبكة ذكاء اللوجستيات',
    sol_ecom2_desc: 'ذكاء اصطناعي لتحسين المسارات، وأتمتة المستودعات، وتتبع التوصيل في الميل الأخير، والتنبؤ بالطلب.',
    sol_ecom2_tag: 'التجارة الإلكترونية',

    sol_gov2_title: 'إطار الأمن السيبراني الوطني',
    sol_gov2_desc: 'حماية البنية التحتية الحيوية، ونشر SIEM وطني، واختبار اختراق حكومي احترافي.',
    sol_gov2_tag: 'القطاع الحكومي',

    techstack_title: 'الترسانة التقنية',
    techstack_subtitle: 'تقنيات مُختبرة في المعارك تُشغّل كل حل',

    globalreach_title: 'الحضور العالمي',
    globalreach_subtitle: 'نعمل من الشرق الأوسط، ونُنجز على مستوى العالم',
    globalreach_hq: 'المقر الرئيسي',
    globalreach_mena: 'منطقة الشرق الأوسط وأفريقيا',
    globalreach_eu: 'الشركاء الأوروبيون',
    globalreach_us: 'أمريكا الشمالية',

    finder_title: 'محدد الحل الأمثل',
    finder_subtitle: 'أخبرنا بتحديك. سنهندس الإجابة.',
    finder_step1_title: 'ما هو هدفك الرئيسي؟',
    finder_step1_opt1: 'بناء منتج رقمي جديد',
    finder_step1_opt2: 'توسيع البنية التحتية القائمة',
    finder_step1_opt3: 'تأمين والدفاع عن الأنظمة',
    finder_step1_opt4: 'دمج الذكاء الاصطناعي والأتمتة',
    finder_step2_title: 'ما هو حجم مشروعك؟',
    finder_step2_opt1: 'ناشئة (١ – ٥٠ ألف مستخدم)',
    finder_step2_opt2: 'نمو (٥٠ألف – مليون مستخدم)',
    finder_step2_opt3: 'مؤسسة (+مليون مستخدم)',
    finder_step2_opt4: 'حكومي / مستوى وطني',
    finder_step3_title: 'طلب استشارة متخصصة',
    finder_step3_name: 'الاسم الكامل',
    finder_step3_email: 'البريد الإلكتروني المهني',
    finder_step3_org: 'المنظمة',
    finder_step3_submit: 'احصل على استشارة متخصصة',
    finder_step3_success: 'تم استلام طلبك — سيتواصل معك فريقنا خلال ٢٤ ساعة.',
    finder_back: 'رجوع',
    finder_next: 'متابعة',
    finder_step_of: 'خطوة',

    hero_title: 'حلول تقنية شاملة',
    hero_title_accent: 'لبناء الإمبراطوريات الرقمية',
    hero_subtitle: 'المعمل التقني — أربعة أجنحة. رؤية واحدة.',
    hero_cta: 'استكشف الأجنحة',
    hero_typewriter_prefix: 'نبني الإمبراطوريات في مجال',

    about_title: 'المعمل التقني',
    about_subtitle: 'حيث يلتقي الابتكار بالتميز',
    about_description: 'ProVistex ليست وكالة تقليدية. نحن معمل تقني متعدد الأقسام تتعاون فيه وحدات متخصصة لهندسة منظومات رقمية متكاملة — من أول سطر كود إلى النشر السحابي العالمي وتحصين الأمن.',
    about_stats_projects: 'مشروع منجز',
    about_stats_clients: 'عميل راضٍ',
    about_stats_success: 'معدل النجاح',

    portfolio_title: 'دراسات الحالة',
    portfolio_subtitle: 'مشكلات حقيقية. حلول مهندَسة.',
    portfolio_filter_all: 'الكل',
    portfolio_filter_ai: 'الذكاء العصبي',
    portfolio_filter_web: 'العمارة الرقمية',
    portfolio_filter_mobile: 'الجوال',
    portfolio_project1: 'منصة التداول العصبي',
    portfolio_project1_desc: 'محرك تحليل مالي مدعوم بالذكاء الاصطناعي يعالج أكثر من مليوني معاملة يومياً بكمون دون الميلي ثانية.',
    portfolio_project2: 'البنية التحتية الحكومية السحابية',
    portfolio_project2_desc: 'ترحيل سحابي على المستوى الوطني لوزارة حكومية — وقت تشغيل ٩٩.٩٩٪، دون أي تنازل عن سيادة البيانات.',
    portfolio_project3: 'ذكاء التجارة الإلكترونية',
    portfolio_project3_desc: 'ذكاء اصطناعي للتخصيص رفع معدل التحويل بنسبة ٣٤٠٪ عبر ١٥ متجراً إقليمياً.',

    blog_title: 'الاستخبارات التقنية',
    blog_subtitle: 'رؤى من المعمل',
    blog_read_more: 'قراءة التحليل الكامل',
    blog_post1_title: 'معمارية تطبيقات الذكاء الاصطناعي الأصلية',
    blog_post1_excerpt: 'كيفية تصميم أنظمة تُعامل الذكاء الاصطناعي كمواطن من الدرجة الأولى، لا كإضافة لاحقة.',
    blog_post2_title: 'انعدام الثقة: نموذج الأمن الوحيد القابل للتوسع',
    blog_post2_excerpt: 'لماذا ماتت الدفاعات المحيطية، وكيف تُهندس أمناً يعتمد الهوية أولاً للمؤسسات الحديثة.',
    blog_post3_title: 'السحابة الأصلية على المستوى الحكومي',
    blog_post3_excerpt: 'التحديات التقنية لبناء بنية تحتية سحابية ذات سيادة ومتوافقة للمؤسسات الوطنية.',
    blog_post4_title: 'العوائد المتراكمة لتميز DevOps',
    blog_post4_excerpt: 'كيف تُحقق ممارسات DevOps الرفيعة مكاسب أسية في سرعة التسليم والموثوقية وسرعة الفريق.',

    contact_title: 'أطلق مشروعك',
    contact_subtitle: 'دعنا نبني شيئاً استثنائياً معاً',
    contact_name: 'الاسم الكامل',
    contact_email: 'البريد الإلكتروني',
    contact_phone: 'رقم الهاتف',
    contact_project_type: 'نوع المشروع',
    contact_project_select: 'اختر الجناح',
    contact_message: 'أخبرنا عن رؤيتك',
    contact_submit: 'إرسال الرسالة',

    footer_tagline: 'وكالة حلول تقنية شاملة',
    footer_rights: '2024 ProVistex. جميع الحقوق محفوظة.',
    footer_newsletter: 'ابقَ على اطلاع',
    footer_newsletter_desc: 'استخبارات تقنية تصل مباشرة إلى صندوق بريدك.',
    footer_newsletter_placeholder: 'أدخل بريدك الإلكتروني المهني',
    footer_newsletter_button: 'اشترك',

    empires_title: 'إمبراطوريات مختارة',
    empires_subtitle: 'ثلاث دراسات حالة. أثر حقيقي. مُثبتة على نطاق واسع.',
    empire_view_study: 'عرض دراسة الحالة كاملة',

    empire1_title: 'منصة التداول العصبي',
    empire1_subtitle: 'التقنية المالية · جناح الذكاء العصبي',
    empire1_desc: 'هندسنا محرك تداول بالذكاء الاصطناعي في الوقت الفعلي لمؤسسة مالية خليجية — يعالج أكثر من مليوني معاملة يومياً بكمون دون الميلي ثانية مع تسجيل مدمج للكشف عن الاحتيال.',
    empire1_stat1: 'معاملة يومية',
    empire1_stat2: 'متوسط الكمون',
    empire1_stat3: 'اتفاقية التشغيل',

    empire2_title: 'شبكة لوجستيات مدعومة بالذكاء الاصطناعي',
    empire2_subtitle: 'التجارة الإلكترونية · جناح الذكاء العصبي',
    empire2_desc: 'نشرنا نظام ذكاء لوجستي مدعوم بالتعلم الآلي عبر 15 مركز توزيع إقليمي — قلّل ذكاء تحسين المسارات تكاليف التوصيل بنسبة 38% ورفع نسبة الوفاء في الموعد إلى 97%.',
    empire2_stat1: 'ارتفاع معدل التحويل',
    empire2_stat2: 'مراكز التوزيع',
    empire2_stat3: 'وقت النشر',

    empire3_title: 'الترحيل السحابي الوطني',
    empire3_subtitle: 'القطاع الحكومي · جناح الأنظمة السحابية',
    empire3_desc: 'قدنا ترحيل سحابي سيادي لوزارة حكومية وطنية — ترحيل 12 نظاماً قديماً إلى معمارية AWS معتمدة على الثقة الصفرية، مع خفض تكاليف البنية التحتية بنسبة 70% وسيادة كاملة على البيانات.',
    empire3_stat1: 'نظاماً تم ترحيله',
    empire3_stat2: 'تخفيض التكاليف',
    empire3_stat3: 'مدة الترحيل',

    process_title: 'المنهجية العلمية',
    process_subtitle: 'كيف يهندس المعمل التقني الحلول بدقة.',
    process_note: 'تتبع كل عملية هذه المنهجية — لضمان عدم التخمين، وعدم الديون التقنية، وعدم المفاجآت. عمليتنا تكرارية وقائمة على البيانات ومصممة لتحقيق نتائج متراكمة عبر الزمن.',

    process1_title: 'الاستكشاف والتحليل',
    process1_desc: 'تعمق شامل في أنظمتك وسوقك وأهدافك. نرسم خريطة كل قيد قبل كتابة سطر واحد.',
    process2_title: 'الهندسة العصبية للأنظمة',
    process2_desc: 'تصميم الأنظمة بدقة — اختيار التقنيات والأنماط ونموذج التوسع المناسب لسياقك الدقيق.',
    process3_title: 'الإطلاق السريع',
    process3_desc: 'تسليم يُقدم CI/CD أولاً مع إصدارات تدريجية. برمجيات تعمل بين يديك في كل نقطة تسليم.',
    process4_title: 'التطوير المستمر',
    process4_desc: 'مراقبة ما بعد الإطلاق ودورات التحسين والتكرارات الموجهة بالنمو التي تتراكم عبر الزمن.',
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
