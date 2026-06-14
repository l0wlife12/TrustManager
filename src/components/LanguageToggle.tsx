import { useLanguage } from '../i18n/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage();

  const getLanguageLabel = (loc: string) => {
    switch(loc) {
      case 'fr': return 'FR';
      case 'en': return 'EN';
      case 'es': return 'ES';
      default: return 'FR';
    }
  };

  const getAriaLabel = (loc: string) => {
    switch(loc) {
      case 'fr': return 'Switch to English';
      case 'en': return 'Cambiar a español';
      case 'es': return 'Passer en français';
      default: return 'Switch language';
    }
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-1.5 text-slate-300 hover:text-blue-400 transition-all duration-300 bg-white/5 border border-white/10 hover:border-blue-400/30 rounded-lg px-3 py-1.5 text-sm font-medium"
      aria-label={getAriaLabel(locale)}
    >
      <Globe className="w-4 h-4" />
      <span>{getLanguageLabel(locale)}</span>
    </button>
  );
}
