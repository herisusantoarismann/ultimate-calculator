import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type BadgeVariant =
    "default" | "primary" | "success" | "warning" | "danger";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
    variant?: BadgeVariant;
}

/**
 * Atomic Badge component for status, tags, and metrics labels.
 */
export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = "default",
    className,
    ...props
}) => {
    const variantStyles: Record<BadgeVariant, string> = {
        default:
            "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700",
        primary:
            "bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border-indigo-200/60 dark:border-indigo-800/60",
        success:
            "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60",
        warning:
            "bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/60",
        danger: "bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border-rose-200/60 dark:border-rose-900/60",
    };

    return (
        <span
            className={twMerge(
                clsx(
                    "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border",
                    variantStyles[variant],
                    className,
                ),
            )}
            {...props}
        >
            {children}
        </span>
    );
};
