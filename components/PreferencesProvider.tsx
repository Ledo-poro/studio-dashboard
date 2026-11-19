"use client";

import { createContext, ReactNode, useContext, useEffect, useState, useMemo } from "react";
import { esTranslations } from "@/lib/translations/es";
import { frTranslations } from "@/lib/translations/fr";
import { arTranslations } from "@/lib/translations/ar";
import { commonEs, commonFr, commonAr } from "@/lib/translations/common";

export type ThemePreference = "light" | "dark";
export type LanguagePreference = "en" | "ar" | "es" | "fr";

type Preferences = {
  theme: ThemePreference;
  language: LanguagePreference;
  loading: boolean;
  t: (text: string) => string;
  savePreferences: (theme: ThemePreference, language: LanguagePreference) => Promise<void>;
};

const PreferencesContext = createContext<Preferences | null>(null);

const translations: Record<Exclude<LanguagePreference, "en">, Record<string, string>> = {
  es: esTranslations,
  fr: frTranslations,
  ar: arTranslations,
};

const commonTranslations: Record<Exclude<LanguagePreference, "en">, Record<string, string>> = {
  es: commonEs,
  fr: commonFr,
  ar: commonAr,
};

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemePreference>("light");
  const [language, setLanguage] = useState<LanguagePreference>("en");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/preferences")
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not load preferences");
        return response.json();
      })
      .then((preferences: { theme: ThemePreference; language: LanguagePreference }) => {
        if (!active) return;
        setTheme(preferences.theme);
        setLanguage(preferences.language);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const savePreferences = async (nextTheme: ThemePreference, nextLanguage: LanguagePreference) => {
    const response = await fetch("/api/preferences", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme: nextTheme, language: nextLanguage }),
    });
    let result: { theme?: ThemePreference; language?: LanguagePreference; error?: string } = {};
    try {
      result = await response.json();
    } catch {
      // response body was empty or not json
    }
    if (!response.ok) {
      throw new Error(result.error || `Could not save preferences (status ${response.status})`);
    }
    if (result.theme) setTheme(result.theme);
    if (result.language) setLanguage(result.language);
  };

  const t = useMemo(
    () => (text: string) =>
      language === "en" ? text : commonTranslations[language][text] || translations[language][text] || text,
    [language]
  );

  return (
    <PreferencesContext.Provider value={{ theme, language, loading, t, savePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const preferences = useContext(PreferencesContext);
  if (!preferences) throw new Error("usePreferences must be used within PreferencesProvider");
  return preferences;
}
