"use client";

import React from "react";
import { Languages } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { clsx } from "clsx";

export interface LanguageToggleProps {
    className?: string;
}

/**
 * Molecule LanguageToggle component for switching between Indonesian and English.
 * Provides accessible keyboard triggers, aria tags, and visual indicator of current active language.
 */
export const LanguageToggle: React.FC<LanguageToggleProps> = ({
    className,
}) => {
    const { locale, toggleLocale } = useTranslation();

    const ariaLabel =
        locale === "id"
            ? "Ganti bahasa ke English"
            : "Switch language to Bahasa Indonesia";

    return (
        <button
            type="button"
            aria-label={ariaLabel}
            title={ariaLabel}
            onClick={toggleLocale}
            className={clsx(
                "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold",
                "bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700",
                "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700",
                "transition-all duration-200 select-none calc-btn",
                className,
            )}
        >
            <Languages className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            <span className="font-bold tracking-wider">
                {locale.toUpperCase()}
            </span>
        </button>
    );
};
