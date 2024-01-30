"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { i18n } from "@/lib/locale";

const LanguageContext = createContext({
  setLanguage: () => {},
  language: "",
});

const useLanguage = () => {
  const context = useContext(LanguageContext);

  i18n.defaultLocale = context.language;
  i18n.locale = context.language;

  return {
    ...context,
    translate: (...args) => (
      <span suppressHydrationWarning>{i18n.t(...args)}</span>
    ),
  };
};

const getLanguage = (key, fallback = "") => {
  let value = "";

  try {
    value = localStorage.getItem(key) || null;
  } catch {
    // ignore
  }

  return value || fallback;
};

const LanguageProvider = ({ children, defaultValue }) => {
  const STORAGE_KEY = "language";

  const [language, setLanguageState] = useState(() =>
    getLanguage(STORAGE_KEY, defaultValue)
  );

  useEffect(() => {
    i18n.defaultLocale = language;
    i18n.locale = language;
  }, [language]);

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, []);

  const providerValue = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language, setLanguage]
  );

  return (
    <LanguageContext.Provider value={providerValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export { useLanguage, LanguageProvider };
