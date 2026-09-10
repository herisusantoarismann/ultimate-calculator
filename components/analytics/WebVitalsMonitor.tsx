"use client";

import { useReportWebVitals } from "next/web-vitals";
import * as Sentry from "@sentry/nextjs";

export function WebVitalsMonitor() {
    useReportWebVitals((metric) => {
        // Pretty console output in development
        if (process.env.NODE_ENV === "development") {
            console.log(
                `%c[Web Vitals] ${metric.name}: ${Math.round(metric.value * 100) / 100} (${metric.rating})`,
                `color: ${
                    metric.rating === "good"
                        ? "#10b981"
                        : metric.rating === "needs-improvement"
                          ? "#f59e0b"
                          : "#ef4444"
                }; font-weight: bold;`,
                metric,
            );
        }

        // Forward to Sentry if DSN is configured
        if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
            Sentry.addBreadcrumb({
                category: "web-vitals",
                message: `${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`,
                level: metric.rating === "poor" ? "warning" : "info",
                data: {
                    id: metric.id,
                    name: metric.name,
                    value: metric.value,
                    rating: metric.rating,
                },
            });

            // Set custom measurement for performance monitoring
            Sentry.setMeasurement(
                metric.name,
                metric.value,
                metric.name === "CLS" ? "" : "millisecond",
            );
        }
    });

    return null;
}
