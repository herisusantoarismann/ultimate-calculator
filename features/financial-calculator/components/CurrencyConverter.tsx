"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Card } from "@/components/atoms/Card";
import { CopyButton } from "@/components/molecules/CopyButton";
import { ArrowUpDown, RefreshCw, CheckCircle2, TrendingUp } from "lucide-react";
import { formatNumber } from "@/utils/formatters";
import { logErrorToSentry } from "@/lib/sentry";
import { useTranslation } from "@/context/LanguageContext";
import { clsx } from "clsx";

interface Currency {
    code: string;
    name: string;
    symbol: string;
    rateToUSD: number; // 1 USD = X
    flag: string;
}

const DEFAULT_CURRENCIES: Currency[] = [
    { code: "USD", name: "US Dollar", symbol: "$", rateToUSD: 1, flag: "🇺🇸" },
    {
        code: "IDR",
        name: "Indonesian Rupiah",
        symbol: "Rp",
        rateToUSD: 15850,
        flag: "🇮🇩",
    },
    { code: "EUR", name: "Euro", symbol: "€", rateToUSD: 0.92, flag: "🇪🇺" },
    {
        code: "JPY",
        name: "Japanese Yen",
        symbol: "¥",
        rateToUSD: 154.5,
        flag: "🇯🇵",
    },
    {
        code: "GBP",
        name: "British Pound",
        symbol: "£",
        rateToUSD: 0.79,
        flag: "🇬🇧",
    },
    {
        code: "SGD",
        name: "Singapore Dollar",
        symbol: "S$",
        rateToUSD: 1.34,
        flag: "🇸🇬",
    },
    {
        code: "AUD",
        name: "Australian Dollar",
        symbol: "A$",
        rateToUSD: 1.52,
        flag: "🇦🇺",
    },
    {
        code: "CNY",
        name: "Chinese Yuan",
        symbol: "¥",
        rateToUSD: 7.23,
        flag: "🇨🇳",
    },
    {
        code: "MYR",
        name: "Malaysian Ringgit",
        symbol: "RM",
        rateToUSD: 4.45,
        flag: "🇲🇾",
    },
    {
        code: "SAR",
        name: "Saudi Riyal",
        symbol: "﷼",
        rateToUSD: 3.75,
        flag: "🇸🇦",
    },
];

export const CurrencyConverter: React.FC = () => {
    const { t, locale } = useTranslation();
    const [currencies, setCurrencies] =
        useState<Currency[]>(DEFAULT_CURRENCIES);
    const [fromCode, setFromCode] = useState("USD");
    const [toCode, setToCode] = useState("IDR");
    const [amount, setAmount] = useState<number>(100);
    const [isLoading, setIsLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<string>(
        t.financial.currency.ratesLive,
    );

    const fromCurrency =
        currencies.find((c) => c.code === fromCode) || currencies[0];
    const toCurrency =
        currencies.find((c) => c.code === toCode) || currencies[1];

    // Hydrate cached live exchange rates from localStorage on mount
    useEffect(() => {
        try {
            const cached = localStorage.getItem("calc-currency-rates");
            if (cached) {
                const parsed = JSON.parse(cached);
                if (parsed?.rates && parsed?.timestamp) {
                    // Valid if within 24 hours
                    if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
                        setCurrencies((prev) =>
                            prev.map((c) => ({
                                ...c,
                                rateToUSD: parsed.rates[c.code] || c.rateToUSD,
                            })),
                        );
                        if (parsed.lastUpdated) {
                            setLastUpdated(parsed.lastUpdated);
                        }
                    }
                }
            }
        } catch {
            // Ignore SSR/localStorage error
        }
    }, []);

    // Fetch live exchange rates from free open API with fallback
    const fetchLiveRates = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("https://open.er-api.com/v6/latest/USD");
            if (!res.ok) throw new Error("Network response not ok");
            const data = await res.json();
            if (data && data.rates) {
                const updatedTime = `Diperbarui: ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
                setCurrencies((prev) =>
                    prev.map((c) => ({
                        ...c,
                        rateToUSD: data.rates[c.code] || c.rateToUSD,
                    })),
                );
                setLastUpdated(updatedTime);
                try {
                    localStorage.setItem(
                        "calc-currency-rates",
                        JSON.stringify({
                            rates: data.rates,
                            timestamp: Date.now(),
                            lastUpdated: updatedTime,
                        }),
                    );
                } catch {
                    // Ignore quota error
                }
            }
        } catch (err) {
            logErrorToSentry(err, {
                tags: {
                    feature: "currency-converter",
                    action: "fetchLiveRates",
                },
                level: "warning",
            });
            console.warn(
                "Menggunakan kurs lokal bawaan (offline fallback):",
                err,
            );
            setLastUpdated("Kurs Lokal (Tersimpan)");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSwap = () => {
        setFromCode(toCode);
        setToCode(fromCode);
    };

    // Conversion: amount in FROM -> USD -> TO
    const convertedAmount = useMemo(() => {
        if (isNaN(amount) || amount < 0) return 0;
        // 1 USD = fromRate => amount / fromRate gives USD
        const inUSD = amount / fromCurrency.rateToUSD;
        // inUSD * toRate gives TO
        return inUSD * toCurrency.rateToUSD;
    }, [amount, fromCurrency, toCurrency]);

    const singleRateFromTo = toCurrency.rateToUSD / fromCurrency.rateToUSD;
    const singleRateToFrom = fromCurrency.rateToUSD / toCurrency.rateToUSD;

    const quickPairs = [
        { from: "USD", to: "IDR" },
        { from: "EUR", to: "IDR" },
        { from: "SGD", to: "IDR" },
        { from: "JPY", to: "IDR" },
        { from: "IDR", to: "USD" },
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-5">
            <Card className="p-5 sm:p-7 space-y-6">
                {/* Header & Refresh */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-indigo-500" />
                        <h3 className="font-bold text-slate-800 dark:text-white text-base">
                            {t.financial.currency.paramsTitle}
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={fetchLiveRates}
                        disabled={isLoading}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors calc-btn"
                    >
                        <RefreshCw
                            className={clsx(
                                "w-3.5 h-3.5",
                                isLoading && "animate-spin text-indigo-500",
                            )}
                        />
                        <span>
                            {isLoading
                                ? t.common.loading
                                : locale === "en"
                                  ? "Update Rates"
                                  : "Update Kurs"}
                        </span>
                    </button>
                </div>

                {/* Inputs Layout */}
                <div className="grid grid-cols-1 md:grid-cols-9 gap-3 items-center">
                    {/* FROM */}
                    <div className="md:col-span-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-slate-400">
                                {t.financial.currency.from}
                            </span>
                            <select
                                value={fromCode}
                                onChange={(e) => setFromCode(e.target.value)}
                                className="bg-transparent font-bold text-sm text-slate-800 dark:text-white focus:outline-none cursor-pointer"
                            >
                                {currencies.map((c) => (
                                    <option
                                        key={c.code}
                                        value={c.code}
                                        className="dark:bg-slate-900"
                                    >
                                        {c.flag} {c.code} - {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="relative">
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-lg">
                                {fromCurrency.symbol}
                            </span>
                            <input
                                type="number"
                                value={amount || ""}
                                onChange={(e) =>
                                    setAmount(Number(e.target.value))
                                }
                                min="0"
                                step="any"
                                className="w-full pl-8 pr-2 py-1 bg-transparent font-mono font-bold text-xl sm:text-2xl text-slate-900 dark:text-white focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* SWAP BUTTON */}
                    <div className="md:col-span-1 flex justify-center">
                        <button
                            type="button"
                            onClick={handleSwap}
                            className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:scale-110 transition-transform calc-btn shadow-sm"
                            title={t.financial.currency.swap}
                            aria-label={t.financial.currency.swap}
                        >
                            <ArrowUpDown className="w-4 h-4" />
                        </button>
                    </div>

                    {/* TO */}
                    <div className="md:col-span-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-slate-400">
                                {t.financial.currency.to}
                            </span>
                            <select
                                value={toCode}
                                onChange={(e) => setToCode(e.target.value)}
                                className="bg-transparent font-bold text-sm text-slate-800 dark:text-white focus:outline-none cursor-pointer"
                            >
                                {currencies.map((c) => (
                                    <option
                                        key={c.code}
                                        value={c.code}
                                        className="dark:bg-slate-900"
                                    >
                                        {c.flag} {c.code} - {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="relative">
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-lg">
                                {toCurrency.symbol}
                            </span>
                            <div className="w-full pl-8 pr-2 py-1 bg-transparent font-mono font-bold text-xl sm:text-2xl text-indigo-600 dark:text-indigo-400 overflow-x-auto whitespace-nowrap no-scrollbar">
                                {formatNumber(convertedAmount, 2)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Result Highlight & Copy */}
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                            {t.financial.currency.convertedResult}:
                        </div>
                        <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                            {fromCurrency.symbol} {formatNumber(amount, 2)} ={" "}
                            {toCurrency.symbol}{" "}
                            {formatNumber(convertedAmount, 2)}
                        </div>
                    </div>
                    <CopyButton
                        textToCopy={`${toCurrency.symbol} ${formatNumber(convertedAmount, 2)}`}
                        label={`${t.common.copy} ${t.financial.currency.convertedResult}`}
                        size="md"
                    />
                </div>

                {/* Live Rate info & status */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 gap-2">
                    <div className="space-y-0.5">
                        <div>
                            1 {fromCurrency.code} ={" "}
                            <span className="font-semibold text-slate-700 dark:text-slate-200">
                                {formatNumber(singleRateFromTo, 4)}{" "}
                                {toCurrency.code}
                            </span>
                        </div>
                        <div>
                            1 {toCurrency.code} ={" "}
                            <span className="font-semibold text-slate-700 dark:text-slate-200">
                                {formatNumber(singleRateToFrom, 6)}{" "}
                                {fromCurrency.code}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{lastUpdated}</span>
                    </div>
                </div>

                {/* Quick Pair Buttons */}
                <div>
                    <div className="text-xs font-semibold text-slate-400 mb-2">
                        {t.financial.currency.popularPairs}:
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {quickPairs.map((pair) => (
                            <button
                                key={`${pair.from}-${pair.to}`}
                                type="button"
                                onClick={() => {
                                    setFromCode(pair.from);
                                    setToCode(pair.to);
                                }}
                                className={clsx(
                                    "px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors calc-btn",
                                    fromCode === pair.from && toCode === pair.to
                                        ? "bg-indigo-600 text-white border-indigo-600"
                                        : "bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200",
                                )}
                            >
                                {pair.from} → {pair.to}
                            </button>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
};
