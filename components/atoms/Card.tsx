import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    /** Add subtle glow effect on hover */
    glow?: boolean;
}

/**
 * Atomic Card component providing glassmorphism aesthetics and consistent borders.
 */
export const Card: React.FC<CardProps> = ({
    children,
    className,
    glow = false,
    ...props
}) => {
    return (
        <div
            className={twMerge(
                clsx(
                    "relative rounded-2xl sm:rounded-3xl border transition-all duration-300",
                    "bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl",
                    "border-slate-200/80 dark:border-slate-800/80",
                    "shadow-xl shadow-slate-200/40 dark:shadow-black/40",
                    glow &&
                        "hover:border-indigo-500/40 hover:shadow-indigo-500/10",
                    className,
                ),
            )}
            {...props}
        >
            {children}
        </div>
    );
};
