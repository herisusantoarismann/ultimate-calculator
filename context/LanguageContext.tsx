"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import { Locale, TranslationSchema } from "@/types/i18n";
import { translations, DEFAULT_LOCALE } from "@/locales";
import { STORAGE_KEYS } from "@/lib/constants";

export interface LanguageContextValue {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    toggleLocale: () => void;
    t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export interface LanguageProviderProps {
    children: React.ReactNode;
    initialLocale?: Locale;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
    children,
    initialLocale,
}) => {
    const [locale, setLocaleState] = useState<Locale>(
        initialLocale || DEFAULT_LOCALE,
    );

    // Sync with localStorage on mount
    useEffect(() => {
        if (initialLocale) return;

        try {
            const saved = localStorage.getItem(
                STORAGE_KEYS.LANGUAGE,
            ) as Locale | null;
            if (saved === "id" || saved === "en") {
                setLocaleState(saved);
                document.documentElement.lang = saved;
            } else {
                setLocaleState(DEFAULT_LOCALE);
                document.documentElement.lang = DEFAULT_LOCALE;
            }
        } catch {
            // LocalStorage might be restricted/unavailable in private modes
            setLocaleState(DEFAULT_LOCALE);
            document.documentElement.lang = DEFAULT_LOCALE;
        }
    }, [initialLocale]);

    const setLocale = useCallback((nextLocale: Locale) => {
        setLocaleState(nextLocale);
        try {
            localStorage.setItem(STORAGE_KEYS.LANGUAGE, nextLocale);
        } catch {
            // Ignore storage errors
        }
        if (typeof document !== "undefined") {
            document.documentElement.lang = nextLocale;
        }
    }, []);

    const toggleLocale = useCallback(() => {
        setLocale(locale === "id" ? "en" : "id");
    }, [locale, setLocale]);

    const t = useMemo(() => translations[locale], [locale]);

    const value = useMemo(
        () => ({
            locale,
            setLocale,
            toggleLocale,
            t,
        }),
        [locale, setLocale, toggleLocale, t],
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextValue => {
    const context = useContext(LanguageContext);
    if (!context) {
        // Fallback default value if used outside provider (e.g., isolated test or SSR)
        return {
            locale: DEFAULT_LOCALE,
            setLocale: () => {},
            toggleLocale: () => {},
            t: translations[DEFAULT_LOCALE],
        };
    }
    return context;
};

export const useTranslation = (): {
    t: TranslationSchema;
    locale: Locale;
    setLocale: (l: Locale) => void;
    toggleLocale: () => void;
} => {
    return useLanguage();
};
