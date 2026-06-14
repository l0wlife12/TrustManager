import { createContext, useContext, useState, useCallback } from 'react';
import { translations, type Locale, type Translations } from './translations';

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('fr');

  const toggleLocale = useCallback(() => {
    setLocale(prev => {
      if (prev === 'fr') return 'en';
      if (prev === 'en') return 'es';
      return 'fr';
    });
  }, []);

  const t = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, t, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
