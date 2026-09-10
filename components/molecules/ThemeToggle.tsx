"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { STORAGE_KEYS } from "@/lib/constants";
import { IconButton } from "@/components/atoms/IconButton";
import { useTranslation } from "@/context/LanguageContext";

/**
 * Molecule ThemeToggle component for switching dark and light theme
 * with persistence in localStorage and DOM class synchronization.
 */
export const ThemeToggle: React.FC = () => {
    const { t } = useTranslation();
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.THEME);
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches;
        const initial = saved ? saved === "dark" : prefersDark;

        setIsDark(initial);
        if (initial) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const handleToggle = () => {
        const next = !isDark;
        setIsDark(next);
        if (next) {
            document.documentElement.classList.add("dark");
            localStorage.setItem(STORAGE_KEYS.THEME, "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem(STORAGE_KEYS.THEME, "light");
        }
    };

    return (
        <IconButton
            aria-label={isDark ? t.common.themeLight : t.common.themeDark}
            variant="secondary"
            onClick={handleToggle}
            icon={
                isDark ? (
                    <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-90 duration-300" />
                ) : (
                    <Moon className="w-4 h-4 text-slate-700 animate-in spin-in-90 duration-300" />
                )
            }
        />
    );
};
