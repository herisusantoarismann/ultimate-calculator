"use client";

import React from "react";
import { clsx } from "clsx";
import { Badge } from "@/components/atoms/Badge";

export interface TabPillItem<T extends string> {
    id: T;
    label: string;
    icon?: React.ReactNode;
    badge?: string;
}

export interface TabPillsProps<T extends string> {
    tabs: TabPillItem<T>[];
    activeTab: T;
    onChange: (tabId: T) => void;
    className?: string;
}

/**
 * Molecule TabPills component for switching sub-features.
 */
export function TabPills<T extends string>({
    tabs,
    activeTab,
    onChange,
    className,
}: TabPillsProps<T>) {
    return (
        <div
            role="tablist"
            aria-label="Pilihan Kategori"
            className={clsx(
                "flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 overflow-x-auto no-scrollbar",
                className,
            )}
        >
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        id={`tab-${tab.id}`}
                        aria-selected={isActive}
                        onClick={() => onChange(tab.id)}
                        className={clsx(
                            "flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 whitespace-nowrap calc-btn",
                            isActive
                                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md shadow-slate-200/50 dark:shadow-black/40 border border-slate-200/80 dark:border-slate-700"
                                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/40 dark:hover:bg-slate-700/40",
                        )}
                    >
                        {tab.icon && (
                            <span className="w-4 h-4">{tab.icon}</span>
                        )}
                        <span>{tab.label}</span>
                        {tab.badge && (
                            <Badge
                                variant="primary"
                                className="text-[10px] px-1.5 py-0"
                            >
                                {tab.badge}
                            </Badge>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
