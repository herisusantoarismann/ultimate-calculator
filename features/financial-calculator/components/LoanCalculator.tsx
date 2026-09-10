"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/atoms/Card";
import { CopyButton } from "@/components/molecules/CopyButton";
import { formatCurrency } from "@/utils/formatters";
import { Landmark, Percent, ChevronDown, ChevronUp } from "lucide-react";
import { clsx } from "clsx";

export const LoanCalculator: React.FC = () => {
    const [loanAmount, setLoanAmount] = useState<number>(250000000); // 250 Jt
    const [interestRate, setInterestRate] = useState<number>(7.5); // 7.5%
    const [tenureYears, setTenureYears] = useState<number>(15); // 15 Tahun
    const [interestType, setInterestType] = useState<"annuity" | "flat">(
        "annuity",
    );
    const [showSchedule, setShowSchedule] = useState<boolean>(false);

    // Calculation logic
    const results = useMemo(() => {
        const P = Math.max(0, loanAmount);
        const annualRate = Math.max(0, interestRate) / 100;
        const months = Math.max(1, tenureYears * 12);

        if (P === 0) {
            return {
                monthlyPayment: 0,
                totalPayment: 0,
                totalInterest: 0,
                principalRatio: 100,
                interestRatio: 0,
                schedule: [],
            };
        }

        if (interestType === "flat") {
            // Flat interest: Total Interest = P * r * t
            const totalInterest = P * annualRate * tenureYears;
            const totalPayment = P + totalInterest;
            const monthlyPayment = totalPayment / months;

            return {
                monthlyPayment,
                totalPayment,
                totalInterest,
                principalRatio: (P / totalPayment) * 100,
                interestRatio: (totalInterest / totalPayment) * 100,
                schedule: [],
            };
        } else {
            // Annuity / Effective interest: M = P * [r(1+r)^n] / [(1+r)^n - 1]
            const monthlyRate = annualRate / 12;
            let monthlyPayment: number;
            let totalPayment: number;
            let totalInterest: number;

            if (monthlyRate === 0) {
                monthlyPayment = P / months;
                totalPayment = P;
                totalInterest = 0;
            } else {
                const factor = Math.pow(1 + monthlyRate, months);
                monthlyPayment = (P * monthlyRate * factor) / (factor - 1);
                totalPayment = monthlyPayment * months;
                totalInterest = totalPayment - P;
            }

            // Generate yearly schedule
            let remainingBalance = P;
            const schedule = [];
            for (let y = 1; y <= tenureYears; y++) {
                let yearlyPrincipal = 0;
                let yearlyInterest = 0;

                for (let m = 1; m <= 12; m++) {
                    const interestMonth = remainingBalance * monthlyRate;
                    const principalMonth = monthlyPayment - interestMonth;
                    yearlyInterest += interestMonth;
                    yearlyPrincipal += principalMonth;
                    remainingBalance = Math.max(
                        0,
                        remainingBalance - principalMonth,
                    );
                }

                schedule.push({
                    year: y,
                    principalPaid: yearlyPrincipal,
                    interestPaid: yearlyInterest,
                    remainingBalance,
                });
            }

            return {
                monthlyPayment,
                totalPayment,
                totalInterest,
                principalRatio:
                    totalPayment > 0 ? (P / totalPayment) * 100 : 100,
                interestRatio:
                    totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0,
                schedule,
            };
        }
    }, [loanAmount, interestRate, tenureYears, interestType]);

    const presetAmounts = [
        { label: "50 Jt", val: 50000000 },
        { label: "100 Jt", val: 100000000 },
        { label: "250 Jt", val: 250000000 },
        { label: "500 Jt", val: 500000000 },
        { label: "1 Milyar", val: 1000000000 },
    ];

    return (
        <div className="space-y-6">
            {/* Top Input & Result Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Inputs (7 cols) */}
                <Card className="p-5 sm:p-7 lg:col-span-7 space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                            <Landmark className="w-5 h-5 text-indigo-500" />
                            <h3 className="font-bold text-slate-800 dark:text-white text-base">
                                Parameter Pinjaman
                            </h3>
                        </div>
                        <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700">
                            <button
                                type="button"
                                onClick={() => setInterestType("annuity")}
                                className={clsx(
                                    "px-3 py-1 rounded-lg text-xs font-semibold transition-all",
                                    interestType === "annuity"
                                        ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                                        : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200",
                                )}
                            >
                                Anuitas / KPR
                            </button>
                            <button
                                type="button"
                                onClick={() => setInterestType("flat")}
                                className={clsx(
                                    "px-3 py-1 rounded-lg text-xs font-semibold transition-all",
                                    interestType === "flat"
                                        ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                                        : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200",
                                )}
                            >
                                Bunga Flat
                            </button>
                        </div>
                    </div>

                    {/* Plafon Pinjaman */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Plafon Pinjaman (Pokok)
                            </label>
                            <span className="text-xs font-mono font-medium text-indigo-600 dark:text-indigo-400">
                                {formatCurrency(loanAmount, "IDR")}
                            </span>
                        </div>
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                                Rp
                            </span>
                            <input
                                type="number"
                                value={loanAmount || ""}
                                onChange={(e) =>
                                    setLoanAmount(Number(e.target.value))
                                }
                                step="1000000"
                                min="0"
                                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-mono text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                            />
                        </div>
                        {/* Quick Preset Buttons */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                            {presetAmounts.map((preset) => (
                                <button
                                    key={preset.label}
                                    type="button"
                                    onClick={() => setLoanAmount(preset.val)}
                                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors calc-btn"
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Suku Bunga & Tenor Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Suku Bunga */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Suku Bunga (% per tahun)
                                </label>
                                <span className="text-xs font-mono font-medium text-slate-500">
                                    {interestRate}%
                                </span>
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={interestRate}
                                    onChange={(e) =>
                                        setInterestRate(Number(e.target.value))
                                    }
                                    step="0.1"
                                    min="0.1"
                                    max="40"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-mono text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                />
                                <Percent className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="25"
                                step="0.25"
                                value={interestRate}
                                onChange={(e) =>
                                    setInterestRate(Number(e.target.value))
                                }
                                className="w-full mt-2 accent-indigo-600"
                            />
                        </div>

                        {/* Tenor Tahun */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Jangka Waktu (Tenor)
                                </label>
                                <span className="text-xs font-mono font-medium text-slate-500">
                                    {tenureYears} Tahun ({tenureYears * 12} Bln)
                                </span>
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={tenureYears}
                                    onChange={(e) =>
                                        setTenureYears(
                                            Math.max(1, Number(e.target.value)),
                                        )
                                    }
                                    min="1"
                                    max="35"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-mono text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                />
                                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                                    Tahun
                                </span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="30"
                                value={tenureYears}
                                onChange={(e) =>
                                    setTenureYears(Number(e.target.value))
                                }
                                className="w-full mt-2 accent-indigo-600"
                            />
                        </div>
                    </div>
                </Card>

                {/* Right Summary Result (5 cols) */}
                <Card className="p-5 sm:p-7 lg:col-span-5 flex flex-col justify-between space-y-5 bg-gradient-to-b from-white/90 to-indigo-50/40 dark:from-slate-900/80 dark:to-indigo-950/20">
                    <div>
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800 mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Estimasi Cicilan
                            </span>
                            <CopyButton
                                textToCopy={`${formatCurrency(results.monthlyPayment, "IDR")} / bulan`}
                                size="sm"
                                label="Salin Cicilan"
                            />
                        </div>

                        {/* Cicilan Bulanan Big Highlight */}
                        <div className="mb-6">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                                Angsuran per Bulan
                            </p>
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono tracking-tight">
                                {formatCurrency(results.monthlyPayment, "IDR")}
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1">
                                Metode:{" "}
                                {interestType === "annuity"
                                    ? "Bunga Efektif/Anuitas"
                                    : "Bunga Flat Tetap"}
                            </p>
                        </div>

                        {/* Breakdown Bars */}
                        <div className="space-y-3 p-3.5 rounded-2xl bg-white/60 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800">
                            <div className="flex justify-between text-xs">
                                <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                                    Pokok Pinjaman:
                                </span>
                                <span className="font-semibold font-mono text-slate-800 dark:text-slate-200">
                                    {formatCurrency(loanAmount, "IDR")}
                                </span>
                            </div>

                            <div className="flex justify-between text-xs">
                                <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                    Total Bunga:
                                </span>
                                <span className="font-semibold font-mono text-amber-600 dark:text-amber-400">
                                    {formatCurrency(
                                        results.totalInterest,
                                        "IDR",
                                    )}
                                </span>
                            </div>

                            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                                <div
                                    className="bg-indigo-500 h-full transition-all duration-500"
                                    style={{
                                        width: `${results.principalRatio}%`,
                                    }}
                                    title={`Pokok: ${results.principalRatio.toFixed(1)}%`}
                                />
                                <div
                                    className="bg-amber-500 h-full transition-all duration-500"
                                    style={{
                                        width: `${results.interestRatio}%`,
                                    }}
                                    title={`Bunga: ${results.interestRatio.toFixed(1)}%`}
                                />
                            </div>

                            <div className="flex justify-between text-xs pt-2 border-t border-slate-200/60 dark:border-slate-800/80">
                                <span className="font-bold text-slate-700 dark:text-slate-300">
                                    Total Pembayaran:
                                </span>
                                <span className="font-bold font-mono text-slate-900 dark:text-white">
                                    {formatCurrency(
                                        results.totalPayment,
                                        "IDR",
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Schedule button if annuity */}
                    {results.schedule.length > 0 && (
                        <button
                            type="button"
                            onClick={() => setShowSchedule(!showSchedule)}
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 transition-colors calc-btn"
                        >
                            <span>
                                {showSchedule
                                    ? "Sembunyikan Jadwal Amortisasi"
                                    : "Lihat Simulasi Jadwal Tahunan"}
                            </span>
                            {showSchedule ? (
                                <ChevronUp className="w-4 h-4" />
                            ) : (
                                <ChevronDown className="w-4 h-4" />
                            )}
                        </button>
                    )}
                </Card>
            </div>

            {/* Amortization Schedule Table */}
            {showSchedule && results.schedule.length > 0 && (
                <Card className="p-5 sm:p-6 overflow-hidden animate-in fade-in duration-300">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800 mb-4">
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                            Simulasi Amortisasi Tahunan
                        </h4>
                        <span className="text-xs text-slate-400">
                            Total {tenureYears} Tahun
                        </span>
                    </div>
                    <div className="overflow-x-auto max-h-72">
                        <table className="w-full text-left text-xs font-mono">
                            <thead className="sticky top-0 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400">
                                <tr>
                                    <th className="p-2.5 rounded-l-lg">
                                        Tahun
                                    </th>
                                    <th className="p-2.5">Pokok Terbayar</th>
                                    <th className="p-2.5">Bunga Terbayar</th>
                                    <th className="p-2.5 rounded-r-lg">
                                        Sisa Pinjaman
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {results.schedule.map((row) => (
                                    <tr
                                        key={row.year}
                                        className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
                                    >
                                        <td className="p-2.5 font-sans font-medium text-slate-700 dark:text-slate-300">
                                            Tahun ke-{row.year}
                                        </td>
                                        <td className="p-2.5 text-indigo-600 dark:text-indigo-400">
                                            {formatCurrency(
                                                row.principalPaid,
                                                "IDR",
                                            )}
                                        </td>
                                        <td className="p-2.5 text-amber-600 dark:text-amber-400">
                                            {formatCurrency(
                                                row.interestPaid,
                                                "IDR",
                                            )}
                                        </td>
                                        <td className="p-2.5 font-bold text-slate-800 dark:text-slate-200">
                                            {formatCurrency(
                                                row.remainingBalance,
                                                "IDR",
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    );
};
