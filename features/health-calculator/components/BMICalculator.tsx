"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/atoms/Card";
import { CopyButton } from "@/components/molecules/CopyButton";
import { HeartPulse } from "lucide-react";
import { BMIResult } from "@/types/common";
import { useTranslation } from "@/context/LanguageContext";
import { clsx } from "clsx";

export const BMICalculator: React.FC = () => {
    const { t, locale } = useTranslation();
    const [gender, setGender] = useState<"male" | "female">("male");
    const [weight, setWeight] = useState<number>(68); // kg
    const [height, setHeight] = useState<number>(172); // cm
    const [age, setAge] = useState<number>(25);

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

    const result: BMIResult = useMemo(() => {
        if (weight <= 0 || height <= 0) {
            return {
                bmi: 0,
                category: "Normal",
                categoryLabel:
                    locale === "en" ? "Invalid data" : "Data tidak valid",
                color: "text-slate-500",
                healthyWeightRange: [0, 0],
                advice:
                    locale === "en"
                        ? "Please enter valid height and weight values."
                        : "Silakan masukkan tinggi dan berat badan yang valid.",
            };
        }

        const heightM = height / 100;
        const bmiVal = weight / (heightM * heightM);
        const roundedBmi = Number(bmiVal.toFixed(1));

        const minHealthy = Number((18.5 * heightM * heightM).toFixed(1));
        const maxHealthy = Number((24.9 * heightM * heightM).toFixed(1));

        if (roundedBmi < 18.5) {
            return {
                bmi: roundedBmi,
                category: "Underweight",
                categoryLabel: t.health.bmi.underweight,
                color: "text-sky-500",
                healthyWeightRange: [minHealthy, maxHealthy],
                advice: t.health.bmi.adviceUnderweight,
            };
        } else if (roundedBmi <= 24.9) {
            return {
                bmi: roundedBmi,
                category: "Normal",
                categoryLabel: t.health.bmi.normal,
                color: "text-emerald-500",
                healthyWeightRange: [minHealthy, maxHealthy],
                advice: t.health.bmi.adviceNormal,
            };
        } else if (roundedBmi <= 29.9) {
            return {
                bmi: roundedBmi,
                category: "Overweight",
                categoryLabel: t.health.bmi.overweight,
                color: "text-amber-500",
                healthyWeightRange: [minHealthy, maxHealthy],
                advice: t.health.bmi.adviceOverweight,
            };
        } else {
            return {
                bmi: roundedBmi,
                category: "Obese",
                categoryLabel: t.health.bmi.obese,
                color: "text-rose-500",
                healthyWeightRange: [minHealthy, maxHealthy],
                advice: t.health.bmi.adviceObese,
            };
        }
    }, [weight, height, t, locale]);

    // Position on gauge bar (0 to 100%)
    const gaugePercent = useMemo(() => {
        // min clamp 12, max clamp 38
        const min = 12;
        const max = 38;
        const clamped = Math.min(max, Math.max(min, result.bmi));
        return ((clamped - min) / (max - min)) * 100;
    }, [result.bmi]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-4xl mx-auto">
            {/* Left Inputs (7 cols) */}
            <Card className="p-5 sm:p-7 lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-200/80 dark:border-slate-800">
                    <HeartPulse className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-bold text-slate-800 dark:text-white text-base">
                        {t.health.bmi.physicalData}
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

                {/* Berat & Tinggi */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Berat Badan */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                                {t.health.bmi.weight}
                            </label>
                            <span className="text-xs font-mono font-medium text-slate-500">
                                {weight} kg
                            </span>
                        </div>
                        <div className="relative">
                            <input
                                type="number"
                                value={weight || ""}
                                onChange={(e) =>
                                    setWeight(Number(e.target.value))
                                }
                                min="10"
                                max="300"
                                step="0.5"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-mono text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">
                                kg
                            </span>
                        </div>
                        <input
                            type="range"
                            min="30"
                            max="150"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            className="w-full mt-2 accent-indigo-600"
                        />
                    </div>

                    {/* Tinggi Badan */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                                {t.health.bmi.height}
                            </label>
                            <span className="text-xs font-mono font-medium text-slate-500">
                                {height} cm
                            </span>
                        </div>
                        <div className="relative">
                            <input
                                type="number"
                                value={height || ""}
                                onChange={(e) =>
                                    setHeight(Number(e.target.value))
                                }
                                min="50"
                                max="250"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-mono text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">
                                cm
                            </span>
                        </div>
                        <input
                            type="range"
                            min="120"
                            max="220"
                            value={height}
                            onChange={(e) => setHeight(Number(e.target.value))}
                            className="w-full mt-2 accent-indigo-600"
                        />
                    </div>
                </div>

                {/* Usia */}
                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                            {t.health.bmi.age}
                        </label>
                        <span className="text-xs font-mono font-medium text-slate-500">
                            {age} {locale === "en" ? "Years" : "Tahun"}
                        </span>
                    </div>
                    <div className="relative">
                        <input
                            type="number"
                            value={age || ""}
                            onChange={(e) => setAge(Number(e.target.value))}
                            min="5"
                            max="120"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-mono text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">
                            {locale === "en" ? "Years" : "Tahun"}
                        </span>
                    </div>
                </div>
            </Card>

            {/* Right Result Card (5 cols) */}
            <Card className="p-5 sm:p-7 lg:col-span-5 flex flex-col justify-between space-y-5 bg-gradient-to-b from-white/90 to-slate-50/70 dark:from-slate-900/80 dark:to-slate-950/40">
                <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800 mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            {t.health.bmi.statusLabel}
                        </span>
                        <CopyButton
                            textToCopy={`BMI: ${result.bmi} (${result.categoryLabel})`}
                            size="sm"
                        />
                    </div>

                    {/* BMI Score Display */}
                    <div className="text-center py-3">
                        <div className="text-5xl sm:text-6xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white">
                            {result.bmi}
                        </div>
                        <div
                            className={clsx(
                                "text-base sm:text-lg font-bold mt-1.5",
                                result.color,
                            )}
                        >
                            {result.categoryLabel}
                        </div>
                    </div>

                    {/* Visual Color Spectrum Gauge Bar */}
                    <div className="my-4 space-y-1.5">
                        <div className="relative h-3 w-full rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 flex">
                            <div
                                className="w-[25%] bg-sky-400"
                                title="< 18.5"
                            />
                            <div
                                className="w-[25%] bg-emerald-500"
                                title="18.5 - 24.9"
                            />
                            <div
                                className="w-[25%] bg-amber-400"
                                title="25.0 - 29.9"
                            />
                            <div
                                className="w-[25%] bg-rose-500"
                                title=">= 30.0"
                            />
                        </div>

                        {/* Indicator Marker Arrow */}
                        <div className="relative h-4 w-full">
                            <div
                                className="absolute -top-1 -translate-x-1/2 transition-all duration-300 flex flex-col items-center"
                                style={{ left: `${gaugePercent}%` }}
                            >
                                <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-slate-800 dark:border-b-white" />
                                <span className="text-[10px] font-bold text-slate-800 dark:text-white font-mono mt-0.5">
                                    ▲
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                            <span>&lt; 18.5</span>
                            <span>18.5 - 24.9</span>
                            <span>25.0 - 29.9</span>
                            <span>&ge; 30.0</span>
                        </div>
                    </div>

                    {/* Berat Ideal & Advice Box */}
                    <div className="space-y-3 pt-3 border-t border-slate-200/70 dark:border-slate-800">
                        <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                            <span className="text-slate-600 dark:text-slate-400 font-medium">
                                {t.health.bmi.idealRange}
                            </span>
                            <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                                {result.healthyWeightRange[0]} -{" "}
                                {result.healthyWeightRange[1]} kg
                            </span>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-white/50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-200/50 dark:border-slate-800">
                            {result.advice}
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};
