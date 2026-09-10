"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/atoms/Card";
import { CopyButton } from "@/components/molecules/CopyButton";
import { evaluateExpression } from "@/utils/mathUtils";
import { logErrorToSentry } from "@/lib/sentry";
import { useCalculatorKeyboard } from "@/lib/useCalculatorKeyboard";
import { Delete } from "lucide-react";
import { clsx } from "clsx";

export const ScientificCalculator: React.FC = () => {
    const [expression, setExpression] = useState("");
    const [displayValue, setDisplayValue] = useState("0");
    const [isNewNumber, setIsNewNumber] = useState(true);
    const [angleUnit, setAngleUnit] = useState<"DEG" | "RAD">("DEG");
    const [isInverse, setIsInverse] = useState(false);

    // Physical keyboard support
    useCalculatorKeyboard({
        onNumber: (num) => appendText(num),
        onOperator: (op) => appendOperator(op),
        onEquals: () => handleCalculate(),
        onBackspace: () => handleBackspace(),
        onClear: () => handleClear(),
        onParenthesis: (paren) => appendText(paren),
    });

    const appendText = (text: string) => {
        if (isNewNumber || displayValue === "0" || displayValue === "Error") {
            setDisplayValue(text);
            setIsNewNumber(false);
        } else {
            setDisplayValue(displayValue + text);
        }
    };

    const appendOperator = (op: string) => {
        if (displayValue === "Error") return;
        setDisplayValue(displayValue + " " + op + " ");
        setIsNewNumber(false);
    };

    const appendFunction = (fn: string) => {
        if (isNewNumber || displayValue === "0" || displayValue === "Error") {
            setDisplayValue(`${fn}(`);
            setIsNewNumber(false);
        } else {
            setDisplayValue(`${displayValue}${fn}(`);
        }
    };

    const handleCalculate = () => {
        if (displayValue === "Error") return;
        setExpression(displayValue);
        const { result, error } = evaluateExpression(displayValue, angleUnit);
        if (error || isNaN(result)) {
            if (error) {
                logErrorToSentry(
                    new Error(`Scientific calculation error: ${error}`),
                    {
                        tags: {
                            feature: "scientific-calculator",
                            angleUnit,
                        },
                        extra: { expression: displayValue },
                        level: "warning",
                    },
                );
            }
            setDisplayValue("Error");
            setIsNewNumber(true);
        } else {
            setDisplayValue(result.toString());
            setIsNewNumber(true);
        }
    };

    const handleClear = () => {
        setDisplayValue("0");
        setExpression("");
        setIsNewNumber(true);
    };

    const handleBackspace = () => {
        if (isNewNumber) return;
        if (displayValue.length <= 1 || displayValue === "Error") {
            setDisplayValue("0");
            setIsNewNumber(true);
        } else {
            setDisplayValue(displayValue.slice(0, -1));
        }
    };

    const handleToggleSign = () => {
        if (displayValue === "0" || displayValue === "Error") return;
        if (displayValue.startsWith("-")) {
            setDisplayValue(displayValue.slice(1));
        } else {
            setDisplayValue("-" + displayValue);
        }
    };

    const handleKeypadAction = (
        action: "fn" | "text" | "op" | "calc" | "clear" | "toggleSign",
        value?: string,
    ) => {
        switch (action) {
            case "fn":
                if (value) appendFunction(value);
                break;
            case "text":
                if (value) appendText(value);
                break;
            case "op":
                if (value) appendOperator(value);
                break;
            case "calc":
                handleCalculate();
                break;
            case "clear":
                handleClear();
                break;
            case "toggleSign":
                handleToggleSign();
                break;
        }
    };

    const scientificButtons = useMemo(
        () => [
            // Row 1
            {
                label: isInverse ? "sin⁻¹" : "sin",
                action: "fn" as const,
                value: isInverse ? "asin" : "sin",
                ariaLabel: isInverse ? "Arkus sinus" : "Sinus",
                className:
                    "p-2.5 sm:p-3 font-medium text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/70 hover:bg-slate-200/90 dark:hover:bg-slate-700",
            },
            {
                label: isInverse ? "cos⁻¹" : "cos",
                action: "fn" as const,
                value: isInverse ? "acos" : "cos",
                ariaLabel: isInverse ? "Arkus kosinus" : "Kosinus",
                className:
                    "p-2.5 sm:p-3 font-medium text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/70 hover:bg-slate-200/90 dark:hover:bg-slate-700",
            },
            {
                label: isInverse ? "tan⁻¹" : "tan",
                action: "fn" as const,
                value: isInverse ? "atan" : "tan",
                ariaLabel: isInverse ? "Arkus tangen" : "Tangen",
                className:
                    "p-2.5 sm:p-3 font-medium text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/70 hover:bg-slate-200/90 dark:hover:bg-slate-700",
            },
            {
                label: "π",
                action: "text" as const,
                value: "π",
                ariaLabel: "Pi",
                className:
                    "p-2.5 sm:p-3 font-medium text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/70 hover:bg-slate-200/90 dark:hover:bg-slate-700",
            },
            {
                label: "e",
                action: "text" as const,
                value: "e",
                ariaLabel: "Konstanta Euler",
                className:
                    "p-2.5 sm:p-3 font-medium text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/70 hover:bg-slate-200/90 dark:hover:bg-slate-700",
            },

            // Row 2
            {
                label: isInverse ? "eˣ" : "ln",
                action: "fn" as const,
                value: isInverse ? "exp" : "ln",
                ariaLabel: isInverse
                    ? "Eksponen e pangkat x"
                    : "Logaritma natural",
                className:
                    "p-2.5 sm:p-3 font-medium text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/70 hover:bg-slate-200/90 dark:hover:bg-slate-700",
            },
            {
                label: "log₁₀",
                action: "fn" as const,
                value: "log",
                ariaLabel: "Logaritma basis sepuluh",
                className:
                    "p-2.5 sm:p-3 font-medium text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/70 hover:bg-slate-200/90 dark:hover:bg-slate-700",
            },
            {
                label: "√x",
                action: "fn" as const,
                value: "sqrt",
                ariaLabel: "Akar kuadrat",
                className:
                    "p-2.5 sm:p-3 font-medium text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/70 hover:bg-slate-200/90 dark:hover:bg-slate-700",
            },
            {
                label: "xʸ",
                action: "op" as const,
                value: "^",
                ariaLabel: "Pangkat y",
                className:
                    "p-2.5 sm:p-3 font-medium text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/70 hover:bg-slate-200/90 dark:hover:bg-slate-700",
            },
            {
                label: "x!",
                action: "text" as const,
                value: "!",
                ariaLabel: "Faktorial",
                className:
                    "p-2.5 sm:p-3 font-medium text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/70 hover:bg-slate-200/90 dark:hover:bg-slate-700",
            },

            // Row 3
            {
                label: "(",
                action: "text" as const,
                value: "(",
                ariaLabel: "Buka kurung",
                className:
                    "p-2.5 sm:p-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/70 hover:bg-slate-200/90 dark:hover:bg-slate-700",
            },
            {
                label: ")",
                action: "text" as const,
                value: ")",
                ariaLabel: "Tutup kurung",
                className:
                    "p-2.5 sm:p-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/70 hover:bg-slate-200/90 dark:hover:bg-slate-700",
            },
            {
                label: "mod",
                action: "op" as const,
                value: "%",
                ariaLabel: "Modulus",
                className:
                    "p-2.5 sm:p-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/70 hover:bg-slate-200/90 dark:hover:bg-slate-700",
            },
            {
                label: "AC",
                action: "clear" as const,
                ariaLabel: "Hapus semua",
                className:
                    "p-2.5 sm:p-3 font-bold text-rose-600 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/60 hover:bg-rose-100",
            },
            {
                label: "÷",
                action: "op" as const,
                value: "÷",
                ariaLabel: "Bagi",
                className:
                    "p-2.5 sm:p-3 font-bold text-base text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/60 hover:bg-indigo-100",
            },

            // Row 4
            {
                label: "|x|",
                action: "fn" as const,
                value: "abs",
                ariaLabel: "Nilai mutlak",
                className:
                    "p-2.5 sm:p-3 font-medium text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/70 hover:bg-slate-200/90 dark:hover:bg-slate-700",
            },
            {
                label: "7",
                action: "text" as const,
                value: "7",
                ariaLabel: "Angka 7",
                className:
                    "p-3 font-semibold text-base text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:bg-slate-50",
            },
            {
                label: "8",
                action: "text" as const,
                value: "8",
                ariaLabel: "Angka 8",
                className:
                    "p-3 font-semibold text-base text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:bg-slate-50",
            },
            {
                label: "9",
                action: "text" as const,
                value: "9",
                ariaLabel: "Angka 9",
                className:
                    "p-3 font-semibold text-base text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:bg-slate-50",
            },
            {
                label: "×",
                action: "op" as const,
                value: "×",
                ariaLabel: "Kali",
                className:
                    "p-2.5 sm:p-3 font-bold text-base text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/60 hover:bg-indigo-100",
            },

            // Row 5
            {
                label: "³√x",
                action: "fn" as const,
                value: "cbrt",
                ariaLabel: "Akar kubik",
                className:
                    "p-2.5 sm:p-3 font-medium text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/70 hover:bg-slate-200/90 dark:hover:bg-slate-700",
            },
            {
                label: "4",
                action: "text" as const,
                value: "4",
                ariaLabel: "Angka 4",
                className:
                    "p-3 font-semibold text-base text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:bg-slate-50",
            },
            {
                label: "5",
                action: "text" as const,
                value: "5",
                ariaLabel: "Angka 5",
                className:
                    "p-3 font-semibold text-base text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:bg-slate-50",
            },
            {
                label: "6",
                action: "text" as const,
                value: "6",
                ariaLabel: "Angka 6",
                className:
                    "p-3 font-semibold text-base text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:bg-slate-50",
            },
            {
                label: "−",
                action: "op" as const,
                value: "−",
                ariaLabel: "Kurang",
                className:
                    "p-2.5 sm:p-3 font-bold text-base text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/60 hover:bg-indigo-100",
            },

            // Row 6
            {
                label: "±",
                action: "toggleSign" as const,
                ariaLabel: "Ubah tanda plus minus",
                className:
                    "p-2.5 sm:p-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/70 hover:bg-slate-200/90 dark:hover:bg-slate-700",
            },
            {
                label: "1",
                action: "text" as const,
                value: "1",
                ariaLabel: "Angka 1",
                className:
                    "p-3 font-semibold text-base text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:bg-slate-50",
            },
            {
                label: "2",
                action: "text" as const,
                value: "2",
                ariaLabel: "Angka 2",
                className:
                    "p-3 font-semibold text-base text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:bg-slate-50",
            },
            {
                label: "3",
                action: "text" as const,
                value: "3",
                ariaLabel: "Angka 3",
                className:
                    "p-3 font-semibold text-base text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:bg-slate-50",
            },
            {
                label: "+",
                action: "op" as const,
                value: "+",
                ariaLabel: "Tambah",
                className:
                    "p-2.5 sm:p-3 font-bold text-base text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/60 hover:bg-indigo-100",
            },

            // Row 7
            {
                label: "x²",
                action: "text" as const,
                value: "^2",
                ariaLabel: "Kuadrat",
                className:
                    "p-2.5 sm:p-3 font-medium text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/70 hover:bg-slate-200/90 dark:hover:bg-slate-700",
            },
            {
                label: "0",
                action: "text" as const,
                value: "0",
                ariaLabel: "Angka 0",
                className:
                    "col-span-2 p-3 font-semibold text-base text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:bg-slate-50 text-left pl-5",
            },
            {
                label: ".",
                action: "text" as const,
                value: ".",
                ariaLabel: "Koma desimal",
                className:
                    "p-3 font-bold text-base text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:bg-slate-50",
            },
            {
                label: "=",
                action: "calc" as const,
                ariaLabel: "Sama dengan",
                className:
                    "p-3 font-bold text-lg text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-lg shadow-indigo-500/30",
            },
        ],
        [isInverse],
    );

    return (
        <div className="max-w-2xl mx-auto">
            <Card className="p-4 sm:p-6">
                {/* Top Controls: DEG/RAD, 2nd, and Copy */}
                <div className="flex items-center justify-between mb-3 text-sm">
                    <div className="flex items-center gap-2">
                        {/* Angle Toggle */}
                        <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700">
                            <button
                                type="button"
                                onClick={() => setAngleUnit("DEG")}
                                aria-label="Mode sudut derajat"
                                className={clsx(
                                    "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all calc-btn",
                                    angleUnit === "DEG"
                                        ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                                        : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200",
                                )}
                            >
                                DEG
                            </button>
                            <button
                                type="button"
                                onClick={() => setAngleUnit("RAD")}
                                aria-label="Mode sudut radian"
                                className={clsx(
                                    "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all calc-btn",
                                    angleUnit === "RAD"
                                        ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                                        : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200",
                                )}
                            >
                                RAD
                            </button>
                        </div>

                        {/* 2nd Function Toggle */}
                        <button
                            type="button"
                            onClick={() => setIsInverse(!isInverse)}
                            aria-label="Fungsi inversi kedua"
                            aria-pressed={isInverse}
                            className={clsx(
                                "px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all calc-btn",
                                isInverse
                                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-500/30"
                                    : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700",
                            )}
                        >
                            2nd
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <CopyButton textToCopy={displayValue} size="sm" />
                        <button
                            type="button"
                            onClick={handleBackspace}
                            aria-label="Hapus satu digit"
                            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors calc-btn"
                            title="Hapus digit"
                        >
                            <Delete className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Display Screen */}
                <div
                    role="region"
                    aria-label="Layar kalkulator ilmiah"
                    className="bg-slate-100/80 dark:bg-slate-950/80 rounded-2xl p-4 sm:p-5 mb-5 border border-slate-200/80 dark:border-slate-800/80 text-right shadow-inner"
                >
                    <div
                        aria-hidden="true"
                        className="min-h-[22px] text-xs sm:text-sm font-mono text-slate-400 dark:text-slate-500 tracking-wide overflow-x-auto whitespace-nowrap no-scrollbar"
                    >
                        {expression ? `${expression} =` : "\u00A0"}
                    </div>
                    <div
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                        className={clsx(
                            "font-bold font-mono tracking-tight text-slate-900 dark:text-white overflow-x-auto whitespace-nowrap no-scrollbar leading-none mt-1",
                            displayValue.length > 14
                                ? "text-xl sm:text-2xl"
                                : "text-3xl sm:text-4xl",
                        )}
                    >
                        {displayValue}
                    </div>
                </div>

                {/* Scientific Keypad Grid: 5 columns */}
                <div className="grid grid-cols-5 gap-2 sm:gap-2.5 text-xs sm:text-sm">
                    {scientificButtons.map((btn) => (
                        <button
                            key={btn.label}
                            type="button"
                            onClick={() =>
                                handleKeypadAction(btn.action, btn.value)
                            }
                            aria-label={btn.ariaLabel}
                            className={clsx(
                                "calc-btn rounded-xl transition-all duration-150",
                                btn.className,
                            )}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </Card>
        </div>
    );
};
