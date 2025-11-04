"use client";

import React, { createContext, useState, useEffect, useMemo, useCallback, type ReactNode } from 'react';
import translations, { type Language, type TranslationKey, languages, isLanguage } from '@/lib/translations';

interface SettingsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('farmart-lang');
    if (storedLang && isLanguage(storedLang)) {
      setLanguageState(storedLang);
    } else {
        // Fallback to hindi if browser language is not supported
        const browserLang = navigator.language.split('-')[0];
        if (isLanguage(browserLang)) {
            setLanguageState(browserLang);
        } else {
            setLanguageState('hi');
        }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('farmart-lang', lang);
  };

  const t = useCallback((key: TranslationKey): string => {
    return translations[language][key] || translations['en'][key];
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
