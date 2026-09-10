"use client";

import React from "react";
import {
    Calculator,
    Binary,
    Landmark,
    HeartPulse,
    Scale,
    CalendarDays,
    X,
    Command,
} from "lucide-react";
import { CalculatorCategory } from "@/types/common";
import { CATEGORY_ITEMS } from "@/lib/constants";
import { Badge } from "@/components/atoms/Badge";
import { IconButton } from "@/components/atoms/IconButton";
import { clsx } from "clsx";
import { useTranslation } from "@/hooks/useTranslation";

export interface SidebarProps {
    activeCategory: CalculatorCategory;
    onSelectCategory: (category: CalculatorCategory) => void;
    isOpenMobile: boolean;
    onCloseMobile: () => void;
}

const CATEGORY_ICONS: Record<
    CalculatorCategory,
    React.ComponentType<{ className?: string }>
> = {
    standard: Calculator,
    scientific: Binary,
    financial: Landmark,
    health: HeartPulse,
    converter: Scale,
    "date-time": CalendarDays,
};

/**
 * Organism Sidebar component providing responsive navigation with
 * desktop persistent sidebar and mobile slide-over drawer.
 */
export const Sidebar: React.FC<SidebarProps> = ({
    activeCategory,
    onSelectCategory,
    isOpenMobile,
    onCloseMobile,
}) => {
    const { t } = useTranslation();

    const getCategoryDetails = (id: CalculatorCategory) => {
        switch (id) {
            case "standard":
                return t.nav.standard;
            case "scientific":
                return t.nav.scientific;
            case "financial":
                return t.nav.financial;
            case "health":
                return t.nav.health;
            case "converter":
                return t.nav.converter;
            case "date-time":
                return t.nav.dateTime;
            default:
                return { name: id, description: "" };
        }
    };

    const content = (
        <div className="flex flex-col h-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-r border-slate-200/80 dark:border-slate-800/80 p-4">
            {/* Mobile Top Close Header */}
            <div className="flex lg:hidden items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                        <Calculator className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-800 dark:text-white">
                        {t.nav.selectCalculator}
                    </span>
                </div>
                <IconButton
                    aria-label={t.nav.closeMenu}
                    onClick={onCloseMobile}
                    icon={<X className="w-5 h-5" />}
                />
            </div>

            {/* Navigation List */}
            <div className="space-y-1.5 flex-1 overflow-y-auto pr-1">
                <div className="px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                    {t.nav.categories}
                </div>
                {CATEGORY_ITEMS.map((item) => {
                    const Icon = CATEGORY_ICONS[item.id];
                    const isActive = activeCategory === item.id;
                    const details = getCategoryDetails(item.id);
                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                                onSelectCategory(item.id);
                                onCloseMobile();
                            }}
                            className={clsx(
                                "w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-left transition-all duration-200 calc-btn group",
                                isActive
                                    ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25 font-semibold"
                                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-900/90",
                            )}
                        >
                            <div
                                className={clsx(
                                    "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
                                    isActive
                                        ? "bg-white/20 text-white"
                                        : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
                                )}
                            >
                                <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm truncate">
                                        {details.name}
                                    </span>
                                    {item.badge && (
                                        <Badge
                                            variant={
                                                isActive ? "default" : "primary"
                                            }
                                            className={clsx(
                                                "text-[10px] px-1.5 py-0",
                                                isActive &&
                                                    "bg-white/25 text-white border-white/30",
                                            )}
                                        >
                                            {item.badge}
                                        </Badge>
                                    )}
                                </div>
                                <p
                                    className={clsx(
                                        "text-[11px] truncate",
                                        isActive
                                            ? "text-indigo-100"
                                            : "text-slate-400 dark:text-slate-500",
                                    )}
                                >
                                    {details.description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Keyboard Shortcut Hint Card */}
            <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/70">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <Command className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{t.common.keyboardReady}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {t.common.keyboardHint}
                </p>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Persistent Sidebar */}
            <aside className="hidden lg:block w-72 h-[calc(100vh-4rem)] sticky top-16 z-20">
                {content}
            </aside>

            {/* Mobile Drawer Backdrop */}
            {isOpenMobile && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
                    onClick={onCloseMobile}
                />
            )}

            {/* Mobile Slide-Over Drawer */}
            <aside
                className={clsx(
                    "fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl",
                    isOpenMobile ? "translate-x-0" : "-translate-x-full",
                )}
            >
                {content}
            </aside>
        </>
    );
};
