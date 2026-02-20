import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const breadcrumbLabels: Record<string, string> = {
  services: 'Services',
  portfolio: 'Portfolio',
  contact: 'Contact',
  'software-engineering': 'Software Engineering',
  'ai-intelligence': 'AI Intelligence',
  'cloud-cyber': 'Cloud & Cyber',
  'digital-design': 'Digital Design',
};

export default function Breadcrumb() {
  const location = useLocation();
  const { t, language } = useLanguage();

  const pathSegments = location.pathname.split('/').filter(Boolean);

  if (pathSegments.length === 0) return null;

  const items: BreadcrumbItem[] = [
    { label: language === 'ar' ? 'الرئيسية' : 'Home', path: '/' },
  ];

  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = breadcrumbLabels[segment] || segment;
    items.push({ label, path: currentPath });
  });

  return (
    <nav className="relative py-6 sm:py-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/8 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-sm flex-wrap">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            {i > 0 && (
              <ChevronRight className={`w-4 h-4 text-gray-600 ${language === 'ar' ? 'rotate-180' : ''}`} />
            )}
            {i === items.length - 1 ? (
              <span className="text-gray-400 font-medium truncate">{item.label}</span>
            ) : (
              <Link to={item.path} className="text-cyan-400 hover:text-cyan-300 transition-colors truncate">
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
