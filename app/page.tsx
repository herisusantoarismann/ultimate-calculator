"use client";

import React, { useState } from "react";
import { CalculatorCategory } from "@/types/common";
import dynamic from "next/dynamic";
import { Header } from "@/components/organisms/Header";
import { Sidebar } from "@/components/organisms/Sidebar";

import { StandardCalculator } from "@/features/standard-calculator/components/StandardCalculator";
import { CalculatorSkeleton } from "@/components/molecules/CalculatorSkeleton";
import { Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const ScientificCalculator = dynamic(
    () =>
        import("@/features/scientific-calculator/components/ScientificCalculator").then(
            (mod) => mod.ScientificCalculator,
        ),
    {
        loading: () => <CalculatorSkeleton className="max-w-2xl mx-auto" />,
    },
);
const FinancialCalculator = dynamic(
    () =>
        import("@/features/financial-calculator/components/FinancialCalculator").then(
            (mod) => mod.FinancialCalculator,
        ),
    {
        loading: () => <CalculatorSkeleton className="max-w-3xl mx-auto" />,
    },
);
const HealthCalculator = dynamic(
    () =>
        import("@/features/health-calculator/components/HealthCalculator").then(
            (mod) => mod.HealthCalculator,
        ),
    {
        loading: () => <CalculatorSkeleton className="max-w-2xl mx-auto" />,
    },
);
const UnitConverter = dynamic(
    () =>
        import("@/features/unit-converter/components/UnitConverter").then(
            (mod) => mod.UnitConverter,
        ),
    {
        loading: () => <CalculatorSkeleton className="max-w-3xl mx-auto" />,
    },
);
const DateTimeCalculator = dynamic(
    () =>
        import("@/features/date-time-calculator/components/DateTimeCalculator").then(
            (mod) => mod.DateTimeCalculator,
        ),
    {
        loading: () => <CalculatorSkeleton className="max-w-2xl mx-auto" />,
    },
);

export default function HomePage() {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] =
        useState<CalculatorCategory>("standard");
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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

    const activeDetails = getCategoryDetails(activeCategory);

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-50 dark:bg-[#090d16] transition-colors duration-300">
            {/* Ambient background glow effects (Glassmorphism backdrop) */}
            <div className="fixed top-[-10%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] pointer-events-none -z-10" />
            <div className="fixed bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-violet-500/10 dark:bg-purple-600/15 blur-[120px] pointer-events-none -z-10" />
            <div className="fixed top-[40%] right-[15%] w-[30vw] h-[30vw] rounded-full bg-sky-500/5 dark:bg-sky-500/10 blur-[100px] pointer-events-none -z-10" />

            {/* Header */}
            <Header
                onToggleSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
                activeCategoryName={activeDetails.name}
            />

            {/* Main Container */}
            <div className="flex-1 flex max-w-7xl w-full mx-auto">
                {/* Sidebar Nav */}
                <Sidebar
                    activeCategory={activeCategory}
                    onSelectCategory={(cat) => setActiveCategory(cat)}
                    isOpenMobile={isMobileSidebarOpen}
                    onCloseMobile={() => setIsMobileSidebarOpen(false)}
                />

                {/* Dynamic Calculator Content Area */}
                <main
                    id="main-content"
                    tabIndex={-1}
                    className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 min-w-0 focus:outline-none"
                >
                    {/* Active Category Title Banner */}
                    <div className="mb-6 sm:mb-8 text-center sm:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 mb-2">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{activeDetails.description}</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            {activeDetails.name}
                        </h1>
                    </div>

                    {/* Calculator Switcher */}
                    <div className="transition-all duration-300">
                        {activeCategory === "standard" && (
                            <StandardCalculator />
                        )}
                        {activeCategory === "scientific" && (
                            <ScientificCalculator />
                        )}
                        {activeCategory === "financial" && (
                            <FinancialCalculator />
                        )}
                        {activeCategory === "health" && <HealthCalculator />}
                        {activeCategory === "converter" && <UnitConverter />}
                        {activeCategory === "date-time" && (
                            <DateTimeCalculator />
                        )}
                    </div>

                    {/* Bottom Footer Note */}
                    <footer className="mt-12 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-xs text-slate-500 dark:text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5">
                            <span>{t.common.version}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>{t.common.footerNote}</span>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
}
