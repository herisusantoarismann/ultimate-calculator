"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/atoms/Card";
import { CopyButton } from "@/components/molecules/CopyButton";
import { CalendarPlus, Plus, Minus } from "lucide-react";
import { addSubtractDate, formatDateLocale } from "@/utils/formatters";
import { useTranslation } from "@/context/LanguageContext";
import { clsx } from "clsx";

type TimeUnit = "days" | "weeks" | "months" | "years";

export const DateAddSubCalculator: React.FC = () => {
    const { t, locale } = useTranslation();
    const todayStr = new Date().toISOString().split("T")[0];

    const [baseDateStr, setBaseDateStr] = useState<string>(todayStr);
    const [operation, setOperation] = useState<"add" | "subtract">("add");
    const [amount, setAmount] = useState<number>(30);
    const [unit, setUnit] = useState<TimeUnit>("days");

    const targetDate = useMemo(() => {
        const base = new Date(baseDateStr);
        if (isNaN(base.getTime()) || isNaN(amount)) return null;

        return addSubtractDate(base, amount, operation, unit);
    }, [baseDateStr, amount, operation, unit]);

    const targetDateFormatted = targetDate
        ? formatDateLocale(targetDate, locale)
        : "";

    const unitLabels: Record<TimeUnit, string> = {
        days: t.dateTime.addSubtract.days,
        weeks: t.dateTime.addSubtract.weeks,
        months: t.dateTime.addSubtract.months,
        years: t.dateTime.addSubtract.years,
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-4xl mx-auto">
            {/* Left Input (6 cols) */}
            <Card className="p-5 sm:p-7 lg:col-span-6 space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-200/80 dark:border-slate-800">
                    <CalendarPlus className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-bold text-slate-800 dark:text-white text-base">
                        {t.dateTime.addSubtract.title}
                    </h3>
                </div>

                {/* Tanggal Mulai */}
                <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        {t.dateTime.addSubtract.baseDate}
                    </label>
                    <input
                        type="date"
                        value={baseDateStr}
                        onChange={(e) => setBaseDateStr(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                        {formatDateLocale(new Date(baseDateStr), locale)}
                    </p>
                </div>

                {/* Operasi: Tambah vs Kurang */}
                <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        {t.dateTime.addSubtract.operation}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setOperation("add")}
                            className={clsx(
                                "flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all calc-btn",
                                operation === "add"
                                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25"
                                    : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300",
                            )}
                        >
                            <Plus className="w-4 h-4" />
                            <span>{t.dateTime.addSubtract.add}</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setOperation("subtract")}
                            className={clsx(
                                "flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all calc-btn",
                                operation === "subtract"
                                    ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-500/25"
                                    : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300",
                            )}
                        >
                            <Minus className="w-4 h-4" />
                            <span>{t.dateTime.addSubtract.subtract}</span>
                        </button>
                    </div>
                </div>

                {/* Jumlah & Satuan */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                            {t.dateTime.addSubtract.amount}
                        </label>
                        <input
                            type="number"
                            value={amount || ""}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            min="1"
                            max="10000"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                            {t.dateTime.addSubtract.timeUnit}
                        </label>
                        <select
                            value={unit}
                            onChange={(e) =>
                                setUnit(e.target.value as TimeUnit)
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-medium text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
                        >
                            <option value="days">{unitLabels.days}</option>
                            <option value="weeks">{unitLabels.weeks}</option>
                            <option value="months">{unitLabels.months}</option>
                            <option value="years">{unitLabels.years}</option>
                        </select>
                    </div>
                </div>
            </Card>

            {/* Right Result Card (6 cols) */}
            <Card className="p-5 sm:p-7 lg:col-span-6 flex flex-col justify-between space-y-5 bg-gradient-to-b from-white/90 to-indigo-50/30 dark:from-slate-900/80 dark:to-indigo-950/20">
                {targetDate ? (
                    <div>
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800 mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                {t.dateTime.addSubtract.targetDate}
                            </span>
                            <CopyButton
                                textToCopy={targetDateFormatted}
                                size="sm"
                            />
                        </div>

                        <div className="mb-6">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                                {operation === "add"
                                    ? locale === "en"
                                        ? "Added"
                                        : "Ditambahkan"
                                    : locale === "en"
                                      ? "Subtracted"
                                      : "Dikurangkan"}{" "}
                                {amount} {unitLabels[unit]}:
                            </p>
                            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
                                {targetDateFormatted}
                            </div>
                            <p className="text-xs font-mono text-slate-400 mt-2">
                                ISO: {targetDate.toISOString().split("T")[0]}
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                {locale === "en"
                                    ? "Day of week:"
                                    : "Hari dalam seminggu:"}{" "}
                                <span className="font-bold text-slate-800 dark:text-white font-sans">
                                    {new Intl.DateTimeFormat(
                                        locale === "en" ? "en-US" : "id-ID",
                                        { weekday: "long" },
                                    ).format(targetDate)}
                                </span>
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                Status:{" "}
                                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                    {targetDate > new Date()
                                        ? locale === "en"
                                            ? "Future Date"
                                            : "Masa Mendatang (Future)"
                                        : locale === "en"
                                          ? "Past Date"
                                          : "Masa Lalu (Past)"}
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-slate-400 py-10">
                        {locale === "en"
                            ? "Enter parameters to calculate"
                            : "Masukkan parameter untuk menghitung"}
                    </div>
                )}

                <div className="text-[11px] text-slate-400 text-center">
                    {locale === "en"
                        ? "Versatile calendar calculator for planning and project deadlines"
                        : "Kalkulator penanggalan serbaguna untuk perencanaan dan deadline proyek"}
                </div>
            </Card>
        </div>
    );
};
