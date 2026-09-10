"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/atoms/Card";
import { CopyButton } from "@/components/molecules/CopyButton";
import { Flame, Activity } from "lucide-react";
import { CalorieResult } from "@/types/common";
import { formatNumber } from "@/utils/formatters";
import { useTranslation } from "@/context/LanguageContext";
import { clsx } from "clsx";

export const CalorieCalculator: React.FC = () => {
    const { t, locale } = useTranslation();
    const [gender, setGender] = useState<"male" | "female">("male");
    const [age, setAge] = useState<number>(26);
    const [weight, setWeight] = useState<number>(70); // kg
    const [height, setHeight] = useState<number>(175); // cm
    const [activityId, setActivityId] = useState<string>("moderate");

    const activityLevels = useMemo(
        () => [
            {
                id: "sedentary",
                label: t.health.calorie.sedentary,
                multiplier: 1.2,
            },
            {
                id: "light",
                label: t.health.calorie.light,
                multiplier: 1.375,
            },
            {
                id: "moderate",
                label: t.health.calorie.moderate,
                multiplier: 1.55,
            },
            {
                id: "heavy",
                label: t.health.calorie.heavy,
                multiplier: 1.725,
            },
            {
                id: "athlete",
                label: t.health.calorie.athlete,
                multiplier: 1.9,
            },
        ],
        [t],
    );

    const genderOptions = [
        {
            value: "male" as const,
            label: t.health.bmi.male,
            activeClass:
                "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20",
        },
        {
            value: "female" as const,
            label: t.health.bmi.female,
            activeClass:
                "bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-500/20",
        },
    ];

    const results: CalorieResult = useMemo(() => {
        // Mifflin-St Jeor Equation
        let bmr = 10 * weight + 6.25 * height - 5 * age;
        if (gender === "male") {
            bmr += 5;
        } else {
            bmr -= 161;
        }

        const currentActivity =
            activityLevels.find((a) => a.id === activityId) ||
            activityLevels[2];
        const tdee = bmr * currentActivity.multiplier;

        return {
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            deficitAggressive: Math.max(1200, Math.round(tdee - 1000)),
            deficitModerate: Math.max(1200, Math.round(tdee - 500)),
            maintenance: Math.round(tdee),
            surplusModerate: Math.round(tdee + 500),
        };
    }, [gender, age, weight, height, activityId, activityLevels]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-4xl mx-auto">
            {/* Left Input (7 cols) */}
            <Card className="p-5 sm:p-7 lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-200/80 dark:border-slate-800">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <h3 className="font-bold text-slate-800 dark:text-white text-base">
                        {t.health.calorie.paramsTitle}
                    </h3>
                </div>

                {/* Gender Selection */}
                <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        {t.health.bmi.gender}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {genderOptions.map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => setGender(opt.value)}
                                className={clsx(
                                    "flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all calc-btn",
                                    gender === opt.value
                                        ? opt.activeClass
                                        : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100",
                                )}
                            >
                                <span>{opt.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Usia, Berat, Tinggi */}
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                            {t.health.calorie.age}
                        </label>
                        <input
                            type="number"
                            value={age || ""}
                            onChange={(e) => setAge(Number(e.target.value))}
                            min="10"
                            max="110"
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                            {t.health.bmi.weight}
                        </label>
                        <input
                            type="number"
                            value={weight || ""}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            min="20"
                            max="250"
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                            {t.health.bmi.height}
                        </label>
                        <input
                            type="number"
                            value={height || ""}
                            onChange={(e) => setHeight(Number(e.target.value))}
                            min="80"
                            max="240"
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Tingkat Aktivitas */}
                <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        {t.health.calorie.activityLevel}
                    </label>
                    <div className="space-y-1.5">
                        {activityLevels.map((act) => (
                            <label
                                key={act.id}
                                className={clsx(
                                    "flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-colors",
                                    activityId === act.id
                                        ? "bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500/50 text-indigo-900 dark:text-indigo-200 font-medium"
                                        : "bg-slate-50/50 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100",
                                )}
                            >
                                <input
                                    type="radio"
                                    name="activityLevel"
                                    checked={activityId === act.id}
                                    onChange={() => setActivityId(act.id)}
                                    className="text-indigo-600 focus:ring-indigo-500"
                                />
                                <span>{act.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Right Result: BMR, TDEE, Calorie Goals (5 cols) */}
            <Card className="p-5 sm:p-7 lg:col-span-5 flex flex-col justify-between space-y-5 bg-gradient-to-b from-white/90 to-orange-50/30 dark:from-slate-900/80 dark:to-orange-950/20">
                <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800 mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            {t.health.calorie.tdeeTitle}
                        </span>
                        <CopyButton
                            textToCopy={`TDEE: ${results.tdee} kcal/${locale === "en" ? "day" : "hari"}`}
                            size="sm"
                        />
                    </div>

                    {/* TDEE Hero */}
                    <div className="mb-5">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                            <Activity className="w-3.5 h-3.5 text-orange-500" />
                            <span>{t.health.calorie.tdeeResult}</span>
                        </div>
                        <div className="text-3xl sm:text-4xl font-extrabold text-orange-600 dark:text-orange-400 font-mono tracking-tight">
                            {formatNumber(results.tdee)}{" "}
                            <span className="text-lg font-sans font-medium text-slate-500">
                                kcal/{locale === "en" ? "day" : "hari"}
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                            {t.health.calorie.bmrResult}:{" "}
                            <span className="font-mono font-bold text-slate-600 dark:text-slate-300">
                                {formatNumber(results.bmr)} kcal
                            </span>
                        </p>
                    </div>

                    {/* Recommendations based on goals */}
                    <div className="space-y-2.5">
                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60">
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                                    🎯 {t.health.calorie.maintenance}
                                </span>
                                <span className="font-bold font-mono text-emerald-700 dark:text-emerald-400 text-sm">
                                    {formatNumber(results.maintenance)} kcal
                                </span>
                            </div>
                            <p className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 mt-0.5">
                                {locale === "en"
                                    ? "Consume this amount to maintain current body weight."
                                    : "Konsumsi ini untuk menjaga bobot tubuh stabil."}
                            </p>
                        </div>

                        <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-800/60">
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-sky-800 dark:text-sky-300">
                                    📉 {t.health.calorie.cutting} (-0.5 kg/
                                    {locale === "en" ? "wk" : "mgg"})
                                </span>
                                <span className="font-bold font-mono text-sky-700 dark:text-sky-400 text-sm">
                                    {formatNumber(results.deficitModerate)} kcal
                                </span>
                            </div>
                            <p className="text-[11px] text-sky-600/80 dark:text-sky-400/80 mt-0.5">
                                {t.health.calorie.deficitNote}
                            </p>
                        </div>

                        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/60">
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-amber-800 dark:text-amber-300">
                                    💪 {t.health.calorie.bulking} (+0.5 kg/
                                    {locale === "en" ? "wk" : "mgg"})
                                </span>
                                <span className="font-bold font-mono text-amber-700 dark:text-amber-400 text-sm">
                                    {formatNumber(results.surplusModerate)} kcal
                                </span>
                            </div>
                            <p className="text-[11px] text-amber-600/80 dark:text-amber-400/80 mt-0.5">
                                {t.health.calorie.surplusNote}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-[11px] text-slate-400 text-center">
                    {locale === "en"
                        ? "Calculated with the clinical standard"
                        : "Menggunakan formula klinis terpercaya"}{" "}
                    <span className="font-semibold">Mifflin-St Jeor</span>
                </div>
            </Card>
        </div>
    );
};
