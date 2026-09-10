import React from "react";
import { Card } from "@/components/atoms/Card";

export interface CalculatorSkeletonProps {
    className?: string;
}

/**
 * Lightweight skeleton placeholder rendered while dynamic calculator modules load,
 * preventing Cumulative Layout Shift (CLS) on category transitions.
 */
export const CalculatorSkeleton: React.FC<CalculatorSkeletonProps> = ({
    className = "max-w-md mx-auto",
}) => {
    return (
        <div
            className={className}
            role="status"
            aria-label="Memuat kalkulator..."
        >
            <Card className="p-4 sm:p-6 animate-pulse space-y-4">
                {/* Header bar skeleton */}
                <div className="flex items-center justify-between mb-3">
                    <div className="h-7 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                    <div className="flex gap-2">
                        <div className="h-7 w-16 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                        <div className="h-7 w-7 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                    </div>
                </div>

                {/* Display screen skeleton */}
                <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-800/60 h-28 flex flex-col justify-end items-end gap-2">
                    <div className="h-4 w-28 bg-slate-200/70 dark:bg-slate-800/70 rounded-md" />
                    <div className="h-9 w-44 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                </div>

                {/* Keypad grid skeleton */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3 pt-2">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className={`h-12 sm:h-14 bg-slate-100 dark:bg-slate-800/60 rounded-2xl ${
                                i === 16 ? "col-span-2" : ""
                            }`}
                        />
                    ))}
                </div>
            </Card>
        </div>
    );
};
