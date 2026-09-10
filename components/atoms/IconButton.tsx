"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode;
    "aria-label": string;
    size?: "sm" | "md" | "lg";
    variant?: "ghost" | "secondary" | "primary" | "danger";
}

/**
 * Atomic IconButton component for compact action triggers.
 */
export const IconButton: React.FC<IconButtonProps> = ({
    icon,
    size = "md",
    variant = "ghost",
    className,
    "aria-label": ariaLabel,
    ...props
}) => {
    const sizeClasses = {
        sm: "p-1.5 rounded-lg text-xs",
        md: "p-2 rounded-xl text-sm",
        lg: "p-2.5 rounded-xl text-base",
    };

    const variantClasses = {
        ghost: "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800",
        secondary:
            "bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700",
        primary:
            "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20",
        danger: "text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-700",
    };

    return (
        <button
            type="button"
            aria-label={ariaLabel}
            title={ariaLabel}
            className={twMerge(
                clsx(
                    "inline-flex items-center justify-center transition-colors calc-btn select-none",
                    sizeClasses[size],
                    variantClasses[variant],
                    className,
                ),
            )}
            {...props}
        >
            {icon}
        </button>
    );
};
