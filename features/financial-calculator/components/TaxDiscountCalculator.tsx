"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/atoms/Card";
import { CopyButton } from "@/components/molecules/CopyButton";
import { formatCurrency } from "@/utils/formatters";
import { Tag, Receipt, Percent, ShieldCheck, Sparkles } from "lucide-react";
import { clsx } from "clsx";

export const TaxDiscountCalculator: React.FC = () => {
    const [originalPrice, setOriginalPrice] = useState<number>(500000); // Rp 500.000
    const [discountPercent, setDiscountPercent] = useState<number>(20); // 20%
    const [extraDiscountPercent, setExtraDiscountPercent] = useState<number>(0); // e.g. +10%
    const [taxPercent, setTaxPercent] = useState<number>(11); // PPN 11%
    const [enableTax, setEnableTax] = useState<boolean>(true);

    const results = useMemo(() => {
        const price = Math.max(0, originalPrice);
        const d1 = Math.min(100, Math.max(0, discountPercent)) / 100;
        const d2 = Math.min(100, Math.max(0, extraDiscountPercent)) / 100;
        const taxRate = enableTax ? Math.max(0, taxPercent) / 100 : 0;

        // First discount
        const firstDiscountAmount = price * d1;
        const priceAfterFirst = price - firstDiscountAmount;

        // Second stacked discount (if any)
        const extraDiscountAmount = priceAfterFirst * d2;
        const priceAfterDiscount = priceAfterFirst - extraDiscountAmount;

        const totalSaved = firstDiscountAmount + extraDiscountAmount;

        // Tax on discounted price
        const taxAmount = priceAfterDiscount * taxRate;
        const finalPrice = priceAfterDiscount + taxAmount;

        return {
            price,
            firstDiscountAmount,
            extraDiscountAmount,
            totalSaved,
            priceAfterDiscount,
            taxAmount,
            finalPrice,
            effectiveDiscountPercent:
                price > 0 ? (totalSaved / price) * 100 : 0,
        };
    }, [
        originalPrice,
        discountPercent,
        extraDiscountPercent,
        taxPercent,
        enableTax,
    ]);

    const presetDiscounts = [10, 20, 30, 50, 70];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Input Form (7 cols) */}
            <Card className="p-5 sm:p-7 lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-200/80 dark:border-slate-800">
                    <Tag className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-bold text-slate-800 dark:text-white text-base">
                        Parameter Harga & Diskon
                    </h3>
                </div>

                {/* Harga Asli */}
                <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Harga Awal (Sebelum Diskon)
                    </label>
                    <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                            Rp
                        </span>
                        <input
                            type="number"
                            value={originalPrice || ""}
                            onChange={(e) =>
                                setOriginalPrice(Number(e.target.value))
                            }
                            min="0"
                            step="1000"
                            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-mono text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Diskon Utama */}
                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Diskon Utama (%)
                        </label>
                        <span className="text-xs font-mono font-medium text-indigo-600 dark:text-indigo-400">
                            {discountPercent}%
                        </span>
                    </div>
                    <div className="relative">
                        <input
                            type="number"
                            value={discountPercent}
                            onChange={(e) =>
                                setDiscountPercent(Number(e.target.value))
                            }
                            min="0"
                            max="100"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-mono text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        <Percent className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {presetDiscounts.map((p) => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => setDiscountPercent(p)}
                                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors calc-btn"
                            >
                                {p}%
                            </button>
                        ))}
                    </div>
                </div>

                {/* Diskon Tambahan & Pajak Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Diskon Tambahan (e.g. +10%) */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Diskon Tambahan (+%)
                            </label>
                            <span className="text-xs font-mono text-slate-400">
                                Opsional
                            </span>
                        </div>
                        <div className="relative">
                            <input
                                type="number"
                                value={extraDiscountPercent}
                                onChange={(e) =>
                                    setExtraDiscountPercent(
                                        Number(e.target.value),
                                    )
                                }
                                min="0"
                                max="100"
                                placeholder="Contoh: 10"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-mono text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            <Percent className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Pajak PPN */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                <span>Pajak (PPN)</span>
                                <input
                                    type="checkbox"
                                    checked={enableTax}
                                    onChange={(e) =>
                                        setEnableTax(e.target.checked)
                                    }
                                    className="rounded text-indigo-600 focus:ring-indigo-500"
                                />
                            </label>
                            <span className="text-xs font-mono text-slate-400">
                                {enableTax ? `${taxPercent}%` : "Non-aktif"}
                            </span>
                        </div>
                        <div className="relative">
                            <input
                                type="number"
                                disabled={!enableTax}
                                value={taxPercent}
                                onChange={(e) =>
                                    setTaxPercent(Number(e.target.value))
                                }
                                min="0"
                                max="50"
                                className={clsx(
                                    "w-full px-3.5 py-2.5 rounded-xl border text-slate-800 dark:text-slate-100 font-mono text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none",
                                    enableTax
                                        ? "bg-slate-50 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700"
                                        : "bg-slate-100 dark:bg-slate-800/40 border-slate-200/50 opacity-60",
                                )}
                            />
                            <Percent className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </Card>

            {/* Right Receipt Summary Card (5 cols) */}
            <Card className="p-5 sm:p-7 lg:col-span-5 flex flex-col justify-between space-y-5 bg-gradient-to-b from-white/90 to-emerald-50/30 dark:from-slate-900/80 dark:to-emerald-950/20">
                <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800 mb-4">
                        <div className="flex items-center gap-2">
                            <Receipt className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Struk Ringkasan
                            </span>
                        </div>
                        <CopyButton
                            textToCopy={formatCurrency(
                                results.finalPrice,
                                "IDR",
                            )}
                            size="sm"
                            label="Salin Total"
                        />
                    </div>

                    {/* Final Price Highlight */}
                    <div className="mb-6">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                            Harga Akhir yang Dibayar
                        </p>
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">
                            {formatCurrency(results.finalPrice, "IDR")}
                        </div>
                        <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                            <Sparkles className="w-3.5 h-3.5" />
                            Hemat {formatCurrency(results.totalSaved, "IDR")} (
                            {results.effectiveDiscountPercent.toFixed(1)}%)
                        </div>
                    </div>

                    {/* Itemized Receipt breakdown */}
                    <div className="space-y-2.5 p-3.5 rounded-2xl bg-white/60 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 text-xs">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Harga Asal:</span>
                            <span className="font-mono font-medium text-slate-800 dark:text-slate-200 line-through">
                                {formatCurrency(results.price, "IDR")}
                            </span>
                        </div>

                        <div className="flex justify-between text-rose-600 dark:text-rose-400">
                            <span>Potongan Diskon ({discountPercent}%):</span>
                            <span className="font-mono font-medium">
                                -{" "}
                                {formatCurrency(
                                    results.firstDiscountAmount,
                                    "IDR",
                                )}
                            </span>
                        </div>

                        {extraDiscountPercent > 0 && (
                            <div className="flex justify-between text-rose-600 dark:text-rose-400">
                                <span>
                                    Diskon Ekstra (+{extraDiscountPercent}%):
                                </span>
                                <span className="font-mono font-medium">
                                    -{" "}
                                    {formatCurrency(
                                        results.extraDiscountAmount,
                                        "IDR",
                                    )}
                                </span>
                            </div>
                        )}

                        <div className="flex justify-between pt-1 border-t border-dashed border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                            <span>Subtotal setelah diskon:</span>
                            <span className="font-mono font-medium">
                                {formatCurrency(
                                    results.priceAfterDiscount,
                                    "IDR",
                                )}
                            </span>
                        </div>

                        {enableTax && (
                            <div className="flex justify-between text-amber-600 dark:text-amber-400">
                                <span>Pajak PPN ({taxPercent}%):</span>
                                <span className="font-mono font-medium">
                                    + {formatCurrency(results.taxAmount, "IDR")}
                                </span>
                            </div>
                        )}

                        <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800 font-bold text-slate-900 dark:text-white text-sm">
                            <span>Total Bersih:</span>
                            <span className="font-mono text-emerald-600 dark:text-emerald-400">
                                {formatCurrency(results.finalPrice, "IDR")}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>
                        Kalkulasi diskon bertingkat standar ritel & perpajakan
                    </span>
                </div>
            </Card>
        </div>
    );
};
