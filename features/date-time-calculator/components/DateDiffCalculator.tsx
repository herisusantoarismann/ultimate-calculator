"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/atoms/Card";
import { CopyButton } from "@/components/molecules/CopyButton";
import { CalendarDays, Briefcase, Calendar } from "lucide-react";
import { calculateDateDiff, formatDateIndo } from "@/utils/formatters";

export const DateDiffCalculator: React.FC = () => {
    const todayStr = new Date().toISOString().split("T")[0];
    const nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 45);
    const nextMonthStr = nextMonth.toISOString().split("T")[0];

    const [startDateStr, setStartDateStr] = useState<string>(todayStr);
    const [endDateStr, setEndDateStr] = useState<string>(nextMonthStr);
    const [includeEndDay, setIncludeEndDay] = useState<boolean>(false);

    const diffResult = useMemo(() => {
        const start = new Date(startDateStr);
        const end = new Date(endDateStr);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return null;
        }

        return calculateDateDiff(start, end, includeEndDay);
    }, [startDateStr, endDateStr, includeEndDay]);

    const copyText = diffResult
        ? `Selisih: ${diffResult.totalDays} Hari (${diffResult.years} Tahun, ${diffResult.months} Bulan, ${diffResult.days} Hari)`
        : "";

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-4xl mx-auto">
            {/* Left Input (6 cols) */}
            <Card className="p-5 sm:p-7 lg:col-span-6 space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-200/80 dark:border-slate-800">
                    <CalendarDays className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-bold text-slate-800 dark:text-white text-base">
                        Rentang Dua Tanggal
                    </h3>
                </div>

                {/* Start Date */}
                <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Tanggal Awal (Mulai)
                    </label>
                    <input
                        type="date"
                        value={startDateStr}
                        onChange={(e) => setStartDateStr(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                        {formatDateIndo(new Date(startDateStr))}
                    </p>
                </div>

                {/* End Date */}
                <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Tanggal Akhir (Selesai)
                    </label>
                    <input
                        type="date"
                        value={endDateStr}
                        onChange={(e) => setEndDateStr(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                        {formatDateIndo(new Date(endDateStr))}
                    </p>
                </div>

                {/* Include End Day Checkbox */}
                <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800">
                    <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <input
                            type="checkbox"
                            checked={includeEndDay}
                            onChange={(e) => setIncludeEndDay(e.target.checked)}
                            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>
                            Sertakan hari terakhir dalam perhitungan (+1 hari)
                        </span>
                    </label>
                </div>
            </Card>

            {/* Right Result Card (6 cols) */}
            <Card className="p-5 sm:p-7 lg:col-span-6 flex flex-col justify-between space-y-5 bg-gradient-to-b from-white/90 to-indigo-50/30 dark:from-slate-900/80 dark:to-indigo-950/20">
                {diffResult ? (
                    <div>
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800 mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Hasil Durasi
                            </span>
                            <CopyButton textToCopy={copyText} size="sm" />
                        </div>

                        {/* Total Days Hero */}
                        <div className="mb-5">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                                Total Selisih Hari:
                            </p>
                            <div className="text-4xl sm:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono tracking-tight">
                                {diffResult.totalDays}{" "}
                                <span className="text-lg font-sans font-medium text-slate-500">
                                    Hari
                                </span>
                            </div>
                        </div>

                        {/* Breakdown Grid */}
                        <div className="space-y-3">
                            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                    Rincian Kalender:
                                </div>
                                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 font-mono">
                                    {diffResult.years > 0 &&
                                        `${diffResult.years} Tahun, `}
                                    {diffResult.months > 0 &&
                                        `${diffResult.months} Bulan, `}
                                    {diffResult.days} Hari
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                    Setara dengan{" "}
                                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                                        {diffResult.weeks}
                                    </span>{" "}
                                    Minggu dan{" "}
                                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                                        {diffResult.remainingDays}
                                    </span>{" "}
                                    Hari
                                </div>
                            </div>

                            {/* Workdays vs Weekends */}
                            <div className="grid grid-cols-2 gap-2.5">
                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                                        <Briefcase className="w-3.5 h-3.5 text-emerald-500" />
                                        <span>Hari Kerja (Sen-Jum)</span>
                                    </div>
                                    <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                                        {diffResult.weekdaysCount}{" "}
                                        <span className="text-xs font-sans font-normal text-slate-400">
                                            hari
                                        </span>
                                    </div>
                                </div>

                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                                        <span>Akhir Pekan (Sab-Min)</span>
                                    </div>
                                    <div className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400">
                                        {diffResult.totalDays -
                                            diffResult.weekdaysCount}{" "}
                                        <span className="text-xs font-sans font-normal text-slate-400">
                                            hari
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-slate-400 py-10">
                        Pilih tanggal untuk melihat hasil
                    </div>
                )}

                <div className="text-[11px] text-slate-400 text-center">
                    Perhitungan akurat berbasis zona waktu UTC tanpa distorsi
                    Daylight Saving
                </div>
            </Card>
        </div>
    );
};
