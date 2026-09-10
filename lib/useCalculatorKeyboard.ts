"use client";

import { useEffect } from "react";

interface KeyPressOptions {
    onNumber?: (num: string) => void;
    onOperator?: (op: string) => void;
    onEquals?: () => void;
    onBackspace?: () => void;
    onClear?: () => void;
    onParenthesis?: (paren: string) => void;
    enabled?: boolean;
}

export function useCalculatorKeyboard({
    onNumber,
    onOperator,
    onEquals,
    onBackspace,
    onClear,
    onParenthesis,
    enabled = true,
}: KeyPressOptions) {
    useEffect(() => {
        if (!enabled) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't intercept if user is typing inside an input or textarea
            const target = e.target as HTMLElement;
            if (
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.isContentEditable
            ) {
                return;
            }

            const key = e.key;

            if (/^[0-9]$/.test(key) || key === ".") {
                e.preventDefault();
                onNumber?.(key);
            } else if (
                key === "+" ||
                key === "-" ||
                key === "*" ||
                key === "/" ||
                key === "%"
            ) {
                e.preventDefault();
                const mapped =
                    key === "*"
                        ? "×"
                        : key === "/"
                          ? "÷"
                          : key === "-"
                            ? "−"
                            : key;
                onOperator?.(mapped);
            } else if (key === "Enter" || key === "=") {
                e.preventDefault();
                onEquals?.();
            } else if (key === "Backspace") {
                e.preventDefault();
                onBackspace?.();
            } else if (key === "Escape" || key.toLowerCase() === "c") {
                e.preventDefault();
                onClear?.();
            } else if (key === "(" || key === ")") {
                e.preventDefault();
                onParenthesis?.(key);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [
        enabled,
        onNumber,
        onOperator,
        onEquals,
        onBackspace,
        onClear,
        onParenthesis,
    ]);
}
