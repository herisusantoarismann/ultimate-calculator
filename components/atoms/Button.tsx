"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type ButtonVariant =
    "primary" | "secondary" | "danger" | "ghost" | "outline" | "gradient";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual style variant */
    variant?: ButtonVariant;
    /** Size modifier */
    size?: ButtonSize;
    /** Optional icon to display before the label */
    icon?: React.ReactNode;
    /** Optional full width modifier */
    fullWidth?: boolean;
}

/**
 * Atomic Button component with glassmorphism support and tactile feedback.
 * Adheres to strict TypeScript and clean Tailwind CSS styling.
 */
export const Button: React.FC<ButtonProps> = ({
    children,
    variant = "secondary",
    size = "md",
    icon,
    fullWidth = false,
    className,
    disabled,
    ...props
}) => {
    const baseClasses =
        "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 calc-btn select-none disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950";

    const sizeClasses: Record<ButtonSize, string> = {
        sm: "px-2.5 py-1.5 text-xs gap-1.5",
        md: "px-3.5 py-2 text-xs sm:text-sm gap-2",
        lg: "px-5 py-2.5 text-sm sm:text-base gap-2.5",
    };

    const variantClasses: Record<ButtonVariant, string> = {
        primary:
            "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20 border border-indigo-500",
        secondary:
            "bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/80",
        danger: "bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/60 hover:bg-rose-100 dark:hover:bg-rose-900/60",
        ghost: "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white",
        outline:
            "bg-transparent border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800",
        gradient:
            "text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-lg shadow-indigo-500/25 border border-indigo-400/30",
    };

    return (
        <button
            type="button"
            disabled={disabled}
            className={twMerge(
                clsx(
                    baseClasses,
                    sizeClasses[size],
                    variantClasses[variant],
                    fullWidth && "w-full",
                    className,
                ),
            )}
            {...props}
        >
            {icon && <span className="shrink-0">{icon}</span>}
            {children}
        </button>
    );
};
