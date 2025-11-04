"use client";

import React, { createContext, useState, useEffect, useMemo, useCallback, type ReactNode } from 'react';
import translations, { type Language, type TranslationKey } from '@/lib/translations';

interface SettingsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('farmart-lang') as Language;
    if (storedLang && (storedLang === 'en' || storedLang === 'hi')) {
      setLanguageState(storedLang);
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
