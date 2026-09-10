"use client";

import React from "react";
import { Menu, Sparkles, Calculator } from "lucide-react";
import { ThemeToggle } from "@/components/molecules/ThemeToggle";
import { Badge } from "@/components/atoms/Badge";
import { IconButton } from "@/components/atoms/IconButton";

export interface HeaderProps {
    onToggleSidebar: () => void;
    activeCategoryName: string;
}

/**
 * Organism Header component orchestrating top brand presentation,
 * active category breadcrumb, theme toggle, and mobile menu trigger.
 */
export const Header: React.FC<HeaderProps> = ({
    onToggleSidebar,
    activeCategoryName,
}) => {
    return (
        <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/75 backdrop-blur-xl transition-colors">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
                {/* Left: Mobile hamburger & Brand */}
                <div className="flex items-center gap-3">
                    <IconButton
                        className="lg:hidden"
                        aria-label="Buka menu navigasi"
                        onClick={onToggleSidebar}
                        icon={<Menu className="w-5 h-5" />}
                    />

                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
                            <Calculator className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="font-bold text-base sm:text-lg tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                                    Ultimate Calc
                                </span>
                                <Badge
                                    variant="primary"
                                    className="hidden sm:inline-flex"
                                >
                                    <Sparkles className="w-2.5 h-2.5 mr-1" />{" "}
                                    Pro Web
                                </Badge>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                                {activeCategoryName}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Center: Category badge on mobile */}
                <div className="sm:hidden font-medium text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg">
                    {activeCategoryName}
                </div>

                {/* Right: Actions & Theme Toggle */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
};
