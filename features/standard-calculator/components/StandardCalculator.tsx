// "use client" ensures client component
"use client";

import React, { useState } from "react";
import { Card } from "@/components/atoms/Card";
import { CopyButton } from "@/components/molecules/CopyButton";
import { HistoryDrawer } from "@/features/standard-calculator/components/HistoryDrawer";
import { History, Delete } from "lucide-react";
import { evaluateExpression } from "@/utils/mathUtils";
import { HistoryItem } from "@/types/common";
import { logErrorToSentry } from "@/lib/sentry";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { useCalculatorKeyboard } from "@/lib/useCalculatorKeyboard";
import { clsx } from "clsx";

interface KeypadButtonConfig {
    label: string;
    action:
        "clear" | "toggleSign" | "percent" | "operator" | "digit" | "equals";
    value?: string;
    ariaLabel: string;
    className: string;
}

const KEYPAD_BUTTONS: readonly KeypadButtonConfig[] = [
    {
        label: "AC",
        action: "clear",
        ariaLabel: "Hapus semua",
        className:
            "font-semibold text-sm sm:text-base text-rose-600 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/60 hover:bg-rose-100 dark:hover:bg-rose-900/60",
    },
    {
        label: "±",
        action: "toggleSign",
        ariaLabel: "Ubah tanda plus minus",
        className:
            "font-semibold text-sm sm:text-base text-slate-700 dark:text-slate-200 bg-slate-100/80 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-200/80 dark:hover:bg-slate-700",
    },
    {
        label: "%",
        action: "percent",
        ariaLabel: "Persen",
        className:
            "font-semibold text-sm sm:text-base text-slate-700 dark:text-slate-200 bg-slate-100/80 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-200/80 dark:hover:bg-slate-700",
    },
    {
        label: "÷",
        action: "operator",
        value: "÷",
        ariaLabel: "Bagi",
        className:
            "font-bold text-lg sm:text-xl text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60",
    },
    {
        label: "7",
        action: "digit",
        value: "7",
        ariaLabel: "Angka 7",
        className:
            "font-semibold text-lg sm:text-xl text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/70 hover:bg-slate-50 dark:hover:bg-slate-700/90 shadow-sm",
    },
    {
        label: "8",
        action: "digit",
        value: "8",
        ariaLabel: "Angka 8",
        className:
            "font-semibold text-lg sm:text-xl text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/70 hover:bg-slate-50 dark:hover:bg-slate-700/90 shadow-sm",
    },
    {
        label: "9",
        action: "digit",
        value: "9",
        ariaLabel: "Angka 9",
        className:
            "font-semibold text-lg sm:text-xl text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/70 hover:bg-slate-50 dark:hover:bg-slate-700/90 shadow-sm",
    },
    {
        label: "×",
        action: "operator",
        value: "×",
        ariaLabel: "Kali",
        className:
            "font-bold text-lg sm:text-xl text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60",
    },
    {
        label: "4",
        action: "digit",
        value: "4",
        ariaLabel: "Angka 4",
        className:
            "font-semibold text-lg sm:text-xl text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/70 hover:bg-slate-50 dark:hover:bg-slate-700/90 shadow-sm",
    },
    {
        label: "5",
        action: "digit",
        value: "5",
        ariaLabel: "Angka 5",
        className:
            "font-semibold text-lg sm:text-xl text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/70 hover:bg-slate-50 dark:hover:bg-slate-700/90 shadow-sm",
    },
    {
        label: "6",
        action: "digit",
        value: "6",
        ariaLabel: "Angka 6",
        className:
            "font-semibold text-lg sm:text-xl text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/70 hover:bg-slate-50 dark:hover:bg-slate-700/90 shadow-sm",
    },
    {
        label: "−",
        action: "operator",
        value: "−",
        ariaLabel: "Kurang",
        className:
            "font-bold text-lg sm:text-xl text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60",
    },
    {
        label: "1",
        action: "digit",
        value: "1",
        ariaLabel: "Angka 1",
        className:
            "font-semibold text-lg sm:text-xl text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/70 hover:bg-slate-50 dark:hover:bg-slate-700/90 shadow-sm",
    },
    {
        label: "2",
        action: "digit",
        value: "2",
        ariaLabel: "Angka 2",
        className:
            "font-semibold text-lg sm:text-xl text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/70 hover:bg-slate-50 dark:hover:bg-slate-700/90 shadow-sm",
    },
    {
        label: "3",
        action: "digit",
        value: "3",
        ariaLabel: "Angka 3",
        className:
            "font-semibold text-lg sm:text-xl text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/70 hover:bg-slate-50 dark:hover:bg-slate-700/90 shadow-sm",
    },
    {
        label: "+",
        action: "operator",
        value: "+",
        ariaLabel: "Tambah",
        className:
            "font-bold text-lg sm:text-xl text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60",
    },
    {
        label: "0",
        action: "digit",
        value: "0",
        ariaLabel: "Angka 0",
        className:
            "col-span-2 font-semibold text-lg sm:text-xl text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/70 hover:bg-slate-50 dark:hover:bg-slate-700/90 text-left pl-6",
    },
    {
        label: ".",
        action: "digit",
        value: ".",
        ariaLabel: "Koma desimal",
        className:
            "font-bold text-lg sm:text-xl text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/70 hover:bg-slate-50 dark:hover:bg-slate-700/90",
    },
    {
        label: "=",
        action: "equals",
        ariaLabel: "Sama dengan",
        className:
            "font-bold text-xl text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-lg shadow-indigo-500/30",
    },
];

export const StandardCalculator: React.FC = () => {
    const [expression, setExpression] = useState("");
    const [displayValue, setDisplayValue] = useState("0");
    const [isNewNumber, setIsNewNumber] = useState(true);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [history, setHistory] = useLocalStorage<HistoryItem[]>(
        "calc-standard-history",
        [],
    );

    // Keyboard support
    useCalculatorKeyboard({
        onNumber: (num) => handleDigit(num),
        onOperator: (op) => handleOperator(op),
        onEquals: () => handleEquals(),
        onBackspace: () => handleBackspace(),
        onClear: () => handleClear(),
        onParenthesis: (paren) => handleParenthesis(paren),
        enabled: !isHistoryOpen,
    });

    const handleDigit = (digit: string) => {
        if (digit === ".") {
            if (isNewNumber) {
                setDisplayValue("0.");
                setIsNewNumber(false);
            } else if (!displayValue.includes(".")) {
                setDisplayValue(displayValue + ".");
            }
            return;
        }

        if (isNewNumber || displayValue === "0") {
            setDisplayValue(digit);
            setIsNewNumber(false);
        } else {
            if (displayValue.length < 15) {
                setDisplayValue(displayValue + digit);
            }
        }
    };

    const handleOperator = (op: string) => {
        // If we already have an expression and user presses operator, compute or append
        if (expression && !isNewNumber) {
            const fullExpr = `${expression} ${displayValue}`;
            const { result, error } = evaluateExpression(fullExpr);
            if (!error && !isNaN(result)) {
                setExpression(`${result} ${op}`);
                setDisplayValue(result.toString());
            } else {
                setExpression(`${displayValue} ${op}`);
            }
        } else {
            setExpression(`${displayValue} ${op}`);
        }
        setIsNewNumber(true);
    };

    const handleParenthesis = (paren: string) => {
        if (isNewNumber) {
            setDisplayValue(paren);
            setIsNewNumber(false);
        } else {
            setDisplayValue(displayValue + paren);
        }
    };

    const handleEquals = () => {
        if (!expression && isNewNumber) return;

        const fullExpr = expression
            ? `${expression} ${displayValue}`
            : displayValue;
        const { result, error } = evaluateExpression(fullExpr);

        if (error || isNaN(result)) {
            if (error) {
                logErrorToSentry(new Error(`Calculation error: ${error}`), {
                    tags: { feature: "standard-calculator" },
                    extra: { expression: fullExpr },
                    level: "warning",
                });
            }
            setDisplayValue("Error");
            setIsNewNumber(true);
            return;
        }

        const resStr = result.toString();
        setDisplayValue(resStr);

        // Save to history
        const newHistoryItem: HistoryItem = {
            id: Date.now().toString(),
            expression: fullExpr,
            result: resStr,
            timestamp: Date.now(),
            category: "standard",
        };
        setHistory((prev) => [newHistoryItem, ...(prev || []).slice(0, 49)]);

        setExpression("");
        setIsNewNumber(true);
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

    const handlePercent = () => {
        const val = parseFloat(displayValue);
        if (isNaN(val)) return;
        const result = val / 100;
        setDisplayValue(result.toString());
        setIsNewNumber(true);
    };

    const handleSelectHistory = (item: HistoryItem) => {
        setDisplayValue(item.result);
        setExpression(item.expression);
        setIsNewNumber(true);
        setIsHistoryOpen(false);
    };

    const handleButtonClick = (btn: KeypadButtonConfig) => {
        switch (btn.action) {
            case "clear":
                handleClear();
                break;
            case "toggleSign":
                handleToggleSign();
                break;
            case "percent":
                handlePercent();
                break;
            case "operator":
                if (btn.value) handleOperator(btn.value);
                break;
            case "digit":
                if (btn.value) handleDigit(btn.value);
                break;
            case "equals":
                handleEquals();
                break;
        }
    };

    return (
        <div className="max-w-md mx-auto relative">
            <Card className="p-4 sm:p-6 overflow-hidden">
                {/* History Drawer Modal */}
                <HistoryDrawer
                    isOpen={isHistoryOpen}
                    onClose={() => setIsHistoryOpen(false)}
                    history={history || []}
                    onSelectHistory={handleSelectHistory}
                    onClearHistory={() => setHistory([])}
                />

                {/* Top Control Bar */}
                <div className="flex items-center justify-between mb-3 text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setIsHistoryOpen(true)}
                            aria-label="Lihat riwayat perhitungan"
                            aria-expanded={isHistoryOpen}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors calc-btn"
                            title="Lihat riwayat perhitungan"
                        >
                            <History className="w-3.5 h-3.5 text-indigo-500" />
                            <span>Riwayat</span>
                            {(history || []).length > 0 && (
                                <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
                                    {(history || []).length}
                                </span>
                            )}
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <CopyButton textToCopy={displayValue} size="sm" />
                        <button
                            type="button"
                            onClick={handleBackspace}
                            aria-label="Hapus satu karakter"
                            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors calc-btn"
                            title="Hapus digit terakhir"
                        >
                            <Delete className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Display Screen */}
                <div
                    role="region"
                    aria-label="Layar kalkulator"
                    className="bg-slate-100/80 dark:bg-slate-950/80 rounded-2xl p-4 sm:p-5 mb-5 border border-slate-200/80 dark:border-slate-800/80 text-right shadow-inner"
                >
                    <div
                        aria-hidden="true"
                        className="min-h-[22px] text-xs sm:text-sm font-mono text-slate-400 dark:text-slate-500 tracking-wide overflow-x-auto whitespace-nowrap no-scrollbar"
                    >
                        {expression || "\u00A0"}
                    </div>
                    <div
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                        className={clsx(
                            "font-bold font-mono tracking-tight text-slate-900 dark:text-white overflow-x-auto whitespace-nowrap no-scrollbar leading-none mt-1",
                            displayValue.length > 10
                                ? "text-2xl sm:text-3xl"
                                : "text-4xl sm:text-5xl",
                        )}
                    >
                        {displayValue}
                    </div>
                </div>

                {/* Keypad Grid */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {KEYPAD_BUTTONS.map((btn) => (
                        <button
                            key={btn.label}
                            type="button"
                            onClick={() => handleButtonClick(btn)}
                            aria-label={btn.ariaLabel}
                            className={clsx(
                                "calc-btn p-3 sm:p-4 rounded-2xl transition-colors",
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
