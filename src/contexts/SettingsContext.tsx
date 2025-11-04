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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem('farmart-lang');
    if (storedLang && isLanguage(storedLang)) {
      setLanguageState(storedLang);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (isLanguage(browserLang)) {
          setLanguageState(browserLang);
      } else {
          setLanguageState('hi'); // Fallback to Hindi
      }
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.documentElement.lang = language;
    }
  }, [language, isMounted]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if(typeof window !== 'undefined') {
      localStorage.setItem('farmart-lang', lang);
    }
  };

  const t = useCallback((key: TranslationKey): string => {
    return translations[language]?.[key] || translations['en'][key];
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  if (!isMounted) {
    // Render nothing or a loading spinner on the server or before hydration
    return null;
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
