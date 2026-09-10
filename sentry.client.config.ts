import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
    Sentry.init({
        dsn: SENTRY_DSN,
        // Performance Monitoring
        tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,
        // Enable debug logging only when diagnosing in development
        debug: false,
        // Don't report non-actionable client errors like ResizeObserver loop
        ignoreErrors: [
            "ResizeObserver loop limit exceeded",
            "ResizeObserver loop completed with undelivered notifications",
            "Non-Error promise rejection captured",
        ],
    });
}
