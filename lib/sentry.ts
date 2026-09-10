import * as Sentry from "@sentry/nextjs";

/**
 * Capture an exception safely with Sentry, logging to console in development
 * if Sentry DSN is not configured.
 */
export function logErrorToSentry(
    error: unknown,
    context?: {
        tags?: Record<string, string>;
        extra?: Record<string, unknown>;
        level?: Sentry.SeverityLevel;
    },
) {
    if (process.env.NODE_ENV === "development") {
        console.error("[Sentry Error Log]:", error, context);
    }

    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
        Sentry.withScope((scope) => {
            if (context?.tags) {
                scope.setTags(context.tags);
            }
            if (context?.extra) {
                scope.setExtras(context.extra);
            }
            if (context?.level) {
                scope.setLevel(context.level);
            }
            Sentry.captureException(error);
        });
    }
}

/**
 * Add a breadcrumb to Sentry for tracing user actions leading up to an issue.
 */
export function addSentryBreadcrumb(
    message: string,
    category: string,
    data?: Record<string, unknown>,
) {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
        Sentry.addBreadcrumb({
            category,
            message,
            data,
            level: "info",
        });
    }
}

/**
 * Triggers a test exception to verify that Sentry captures and reports it.
 */
export function triggerTestException() {
    try {
        throw new Error(
            "Test Sentry Error: Verification exception from Ultimate Calculator",
        );
    } catch (err) {
        logErrorToSentry(err, {
            tags: { test: "true", environment: process.env.NODE_ENV || "development" },
            extra: { timestamp: new Date().toISOString() },
            level: "info",
        });
        return err;
    }
}

