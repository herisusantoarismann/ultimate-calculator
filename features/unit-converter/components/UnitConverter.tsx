"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/atoms/Card";
import { CopyButton } from "@/components/molecules/CopyButton";
import {
    ArrowUpDown,
    Ruler,
    Scale,
    Thermometer,
    Clock,
    Sparkles,
    LucideIcon,
} from "lucide-react";
import { formatNumber } from "@/utils/formatters";
import { useTranslation } from "@/context/LanguageContext";
import { clsx } from "clsx";

type UnitCategory = "length" | "weight" | "temperature" | "time";

interface UnitOption {
    id: string;
    name: string;
    nameEn?: string;
    symbol: string;
    toBase: (v: number) => number;
    fromBase: (v: number) => number;
}

const UNITS: Record<
    UnitCategory,
    { label: string; icon: LucideIcon; baseUnit: string; list: UnitOption[] }
> = {
    length: {
        label: "Panjang & Jarak",
        icon: Ruler,
        baseUnit: "Meter",
        list: [
            {
                id: "m",
                name: "Meter",
                nameEn: "Meters",
                symbol: "m",
                toBase: (v) => v,
                fromBase: (v) => v,
            },
            {
                id: "km",
                name: "Kilometer",
                nameEn: "Kilometers",
                symbol: "km",
                toBase: (v) => v * 1000,
                fromBase: (v) => v / 1000,
            },
            {
                id: "cm",
                name: "Sentimeter",
                nameEn: "Centimeters",
                symbol: "cm",
                toBase: (v) => v / 100,
                fromBase: (v) => v * 100,
            },
            {
                id: "mm",
                name: "Milimeter",
                nameEn: "Millimeters",
                symbol: "mm",
                toBase: (v) => v / 1000,
                fromBase: (v) => v * 1000,
            },
            {
                id: "mi",
                name: "Mil (Miles)",
                nameEn: "Miles",
                symbol: "mi",
                toBase: (v) => v * 1609.344,
                fromBase: (v) => v / 1609.344,
            },
            {
                id: "yd",
                name: "Yard",
                nameEn: "Yards",
                symbol: "yd",
                toBase: (v) => v * 0.9144,
                fromBase: (v) => v / 0.9144,
            },
            {
                id: "ft",
                name: "Kaki (Foot)",
                nameEn: "Feet",
                symbol: "ft",
                toBase: (v) => v * 0.3048,
                fromBase: (v) => v / 0.3048,
            },
            {
                id: "in",
                name: "Inci (Inch)",
                nameEn: "Inches",
                symbol: "in",
                toBase: (v) => v * 0.0254,
                fromBase: (v) => v / 0.0254,
            },
        ],
    },
    weight: {
        label: "Massa & Berat",
        icon: Scale,
        baseUnit: "Gram",
        list: [
            {
                id: "kg",
                name: "Kilogram",
                nameEn: "Kilograms",
                symbol: "kg",
                toBase: (v) => v * 1000,
                fromBase: (v) => v / 1000,
            },
            {
                id: "g",
                name: "Gram",
                nameEn: "Grams",
                symbol: "g",
                toBase: (v) => v,
                fromBase: (v) => v,
            },
            {
                id: "mg",
                name: "Miligram",
                nameEn: "Milligrams",
                symbol: "mg",
                toBase: (v) => v / 1000,
                fromBase: (v) => v * 1000,
            },
            {
                id: "t",
                name: "Ton Metrik",
                nameEn: "Metric Tons",
                symbol: "t",
                toBase: (v) => v * 1e6,
                fromBase: (v) => v / 1e6,
            },
            {
                id: "lb",
                name: "Pound (lbs)",
                nameEn: "Pounds (lbs)",
                symbol: "lb",
                toBase: (v) => v * 453.59237,
                fromBase: (v) => v / 453.59237,
            },
            {
                id: "oz",
                name: "Ons (Ounce)",
                nameEn: "Ounces",
                symbol: "oz",
                toBase: (v) => v * 28.349523,
                fromBase: (v) => v / 28.349523,
            },
        ],
    },
    temperature: {
        label: "Suhu",
        icon: Thermometer,
        baseUnit: "Celsius",
        list: [
            {
                id: "c",
                name: "Celsius",
                nameEn: "Celsius",
                symbol: "°C",
                toBase: (v) => v,
                fromBase: (v) => v,
            },
            {
                id: "f",
                name: "Fahrenheit",
                nameEn: "Fahrenheit",
                symbol: "°F",
                toBase: (v) => ((v - 32) * 5) / 9,
                fromBase: (v) => (v * 9) / 5 + 32,
            },
            {
                id: "k",
                name: "Kelvin",
                nameEn: "Kelvin",
                symbol: "K",
                toBase: (v) => v - 273.15,
                fromBase: (v) => v + 273.15,
            },
            {
                id: "r",
                name: "Reamur",
                nameEn: "Reaumur",
                symbol: "°R",
                toBase: (v) => (v * 5) / 4,
                fromBase: (v) => (v * 4) / 5,
            },
        ],
    },
    time: {
        label: "Waktu",
        icon: Clock,
        baseUnit: "Detik",
        list: [
            {
                id: "s",
                name: "Detik (Second)",
                nameEn: "Seconds",
                symbol: "s",
                toBase: (v) => v,
                fromBase: (v) => v,
            },
            {
                id: "min",
                name: "Menit (Minute)",
                nameEn: "Minutes",
                symbol: "min",
                toBase: (v) => v * 60,
                fromBase: (v) => v / 60,
            },
            {
                id: "hr",
                name: "Jam (Hour)",
                nameEn: "Hours",
                symbol: "h",
                toBase: (v) => v * 3600,
                fromBase: (v) => v / 3600,
            },
            {
                id: "day",
                name: "Hari (Day)",
                nameEn: "Days",
                symbol: "d",
                toBase: (v) => v * 86400,
                fromBase: (v) => v / 86400,
            },
            {
                id: "week",
                name: "Minggu (Week)",
                nameEn: "Weeks",
                symbol: "wk",
                toBase: (v) => v * 604800,
                fromBase: (v) => v / 604800,
            },
            {
                id: "month",
                name: "Bulan (30 hari)",
                nameEn: "Months (30 days)",
                symbol: "mo",
                toBase: (v) => v * 2592000,
                fromBase: (v) => v / 2592000,
            },
            {
                id: "year",
                name: "Tahun (365 hari)",
                nameEn: "Years (365 days)",
                symbol: "yr",
                toBase: (v) => v * 31536000,
                fromBase: (v) => v / 31536000,
            },
        ],
    },
};

export const UnitConverter: React.FC = () => {
    const { t, locale } = useTranslation();
    const [category, setCategory] = useState<UnitCategory>("length");
    const [inputValue, setInputValue] = useState<number>(1);
    const [fromUnitId, setFromUnitId] = useState<string>("km");
    const [toUnitId, setToUnitId] = useState<string>("m");

    const categoryLabels: Record<UnitCategory, string> = {
        length: t.converter.categories.length,
        weight: t.converter.categories.weight,
        temperature: t.converter.categories.temperature,
        time: t.converter.categories.time,
    };

    const getUnitName = (u: UnitOption) =>
        locale === "en" && u.nameEn ? u.nameEn : u.name;

    const currentCategory = UNITS[category];
    const categoryTitle = categoryLabels[category];
    const fromUnit =
        currentCategory.list.find((u) => u.id === fromUnitId) ||
        currentCategory.list[0];
    const toUnit =
        currentCategory.list.find((u) => u.id === toUnitId) ||
        currentCategory.list[1];

    const handleCategoryChange = (cat: UnitCategory) => {
        setCategory(cat);
        setFromUnitId(UNITS[cat].list[0].id);
        setToUnitId(UNITS[cat].list[1].id);
    };

    const handleSwap = () => {
        setFromUnitId(toUnitId);
        setToUnitId(fromUnitId);
    };

    // Convert input -> base -> target
    const convertedValue = useMemo(() => {
        if (isNaN(inputValue)) return 0;
        const base = fromUnit.toBase(inputValue);
        return toUnit.fromBase(base);
    }, [inputValue, fromUnit, toUnit]);

    // All other units table
    const allConversions = useMemo(() => {
        if (isNaN(inputValue)) return [];
        const base = fromUnit.toBase(inputValue);
        return currentCategory.list.map((u) => ({
            ...u,
            converted: u.fromBase(base),
        }));
    }, [inputValue, fromUnit, currentCategory]);

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Category Pills */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                {(Object.keys(UNITS) as UnitCategory[]).map((catKey) => {
                    const item = UNITS[catKey];
                    const Icon = item.icon;
                    const isActive = category === catKey;
                    return (
                        <button
                            key={catKey}
                            type="button"
                            onClick={() => handleCategoryChange(catKey)}
                            className={clsx(
                                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all calc-btn whitespace-nowrap",
                                isActive
                                    ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md border border-slate-200/80 dark:border-slate-700"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{categoryLabels[catKey]}</span>
                        </button>
                    );
                })}
            </div>

            {/* Main Conversion Card */}
            <Card className="p-5 sm:p-7 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
                    <h3 className="font-bold text-slate-800 dark:text-white text-base">
                        {locale === "en"
                            ? `${categoryTitle} Conversion`
                            : `Konversi ${categoryTitle}`}
                    </h3>
                    <CopyButton
                        textToCopy={`${formatNumber(convertedValue, 6)} ${toUnit.symbol}`}
                        size="sm"
                        label={`${t.common.copy} ${t.converter.output}`}
                    />
                </div>

                {/* Inputs Layout */}
                <div className="grid grid-cols-1 md:grid-cols-9 gap-3 items-center">
                    {/* FROM */}
                    <div className="md:col-span-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-slate-400">
                                {t.converter.from}
                            </span>
                            <select
                                value={fromUnit.id}
                                onChange={(e) => setFromUnitId(e.target.value)}
                                className="bg-transparent font-bold text-sm text-slate-800 dark:text-white focus:outline-none cursor-pointer"
                            >
                                {currentCategory.list.map((u) => (
                                    <option
                                        key={u.id}
                                        value={u.id}
                                        className="dark:bg-slate-900"
                                    >
                                        {getUnitName(u)} ({u.symbol})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <input
                            type="number"
                            value={inputValue || ""}
                            onChange={(e) =>
                                setInputValue(Number(e.target.value))
                            }
                            step="any"
                            className="w-full bg-transparent font-mono font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white focus:outline-none"
                        />
                    </div>

                    {/* SWAP */}
                    <div className="md:col-span-1 flex justify-center">
                        <button
                            type="button"
                            onClick={handleSwap}
                            className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:scale-110 transition-transform calc-btn shadow-sm"
                            title={t.converter.swap}
                            aria-label={t.converter.swap}
                        >
                            <ArrowUpDown className="w-4 h-4" />
                        </button>
                    </div>

                    {/* TO */}
                    <div className="md:col-span-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-slate-400">
                                {t.converter.to}
                            </span>
                            <select
                                value={toUnit.id}
                                onChange={(e) => setToUnitId(e.target.value)}
                                className="bg-transparent font-bold text-sm text-slate-800 dark:text-white focus:outline-none cursor-pointer"
                            >
                                {currentCategory.list.map((u) => (
                                    <option
                                        key={u.id}
                                        value={u.id}
                                        className="dark:bg-slate-900"
                                    >
                                        {getUnitName(u)} ({u.symbol})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full bg-transparent font-mono font-bold text-2xl sm:text-3xl text-indigo-600 dark:text-indigo-400 overflow-x-auto whitespace-nowrap no-scrollbar">
                            {formatNumber(convertedValue, 6)}
                        </div>
                    </div>
                </div>

                {/* Formula Summary Box */}
                <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2">
                    <div className="text-sm font-semibold text-slate-800 dark:text-white">
                        {formatNumber(inputValue)} {fromUnit.symbol} ={" "}
                        <span className="text-indigo-600 dark:text-indigo-400 font-mono text-base font-bold">
                            {formatNumber(convertedValue, 6)} {toUnit.symbol}
                        </span>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                        1 {fromUnit.symbol} ={" "}
                        {formatNumber(toUnit.fromBase(fromUnit.toBase(1)), 6)}{" "}
                        {toUnit.symbol}
                    </span>
                </div>

                {/* Multi-unit Matrix Table (Comprehensive view) */}
                <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{t.converter.quickMatrix}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                        {allConversions.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setToUnitId(item.id)}
                                className={clsx(
                                    "p-3 rounded-xl border text-left cursor-pointer transition-all",
                                    toUnitId === item.id
                                        ? "bg-indigo-50/80 dark:bg-indigo-950/50 border-indigo-500/50 text-indigo-900 dark:text-indigo-200"
                                        : "bg-slate-50/50 dark:bg-slate-900/40 border-slate-200/70 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/60",
                                )}
                            >
                                <div className="text-[11px] text-slate-400 truncate">
                                    {getUnitName(item)}
                                </div>
                                <div className="font-mono font-bold text-sm text-slate-800 dark:text-slate-100 truncate mt-0.5">
                                    {formatNumber(item.converted, 4)}{" "}
                                    <span className="text-xs font-normal text-slate-400">
                                        {item.symbol}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
};
