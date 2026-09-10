"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helperText?: string;
    prefixText?: string;
    suffixText?: string;
    error?: string;
}

/**
 * Atomic Input field with label, prefixes, suffixes, and error states.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            helperText,
            prefixText,
            suffixText,
            error,
            className,
            id,
            ...props
        },
        ref,
    ) => {
        const inputId =
            id ||
            (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                        {label}
                    </label>
                )}

                <div className="relative flex items-center">
                    {prefixText && (
                        <span className="absolute left-3.5 text-slate-400 font-bold text-sm pointer-events-none">
                            {prefixText}
                        </span>
                    )}

                    <input
                        id={inputId}
                        ref={ref}
                        className={twMerge(
                            clsx(
                                "w-full py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border text-slate-800 dark:text-slate-100 font-mono text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all",
                                prefixText ? "pl-11" : "pl-3.5",
                                suffixText ? "pr-12" : "pr-3.5",
                                error
                                    ? "border-rose-500 focus:ring-rose-500"
                                    : "border-slate-200 dark:border-slate-700",
                                className,
                            ),
                        )}
                        {...props}
                    />

                    {suffixText && (
                        <span className="absolute right-3.5 text-xs text-slate-400 font-medium pointer-events-none">
                            {suffixText}
                        </span>
                    )}
                </div>

                {error ? (
                    <p className="text-[11px] text-rose-500 font-medium">
                        {error}
                    </p>
                ) : helperText ? (
                    <p className="text-[11px] text-slate-400">{helperText}</p>
                ) : null}
            </div>
        );
    },
);

Input.displayName = "Input";
