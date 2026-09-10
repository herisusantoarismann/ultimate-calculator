import { describe, it, expect, vi, beforeEach } from "vitest";
import { logErrorToSentry, addSentryBreadcrumb } from "@/lib/sentry";
import * as Sentry from "@sentry/nextjs";

vi.mock("@sentry/nextjs", () => ({
    captureException: vi.fn(),
    addBreadcrumb: vi.fn(),
    setMeasurement: vi.fn(),
    withScope: vi.fn((cb) =>
        cb({
            setTags: vi.fn(),
            setExtras: vi.fn(),
            setLevel: vi.fn(),
        }),
    ),
}));

describe("Sentry and Monitoring utilities", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("gracefully handles error logging when NEXT_PUBLIC_SENTRY_DSN is not configured", () => {
        delete process.env.NEXT_PUBLIC_SENTRY_DSN;
        expect(() => {
            logErrorToSentry(new Error("Test error without DSN"));
        }).not.toThrow();
        expect(Sentry.captureException).not.toHaveBeenCalled();
    });

    it("captures exception with scope tags and extras when NEXT_PUBLIC_SENTRY_DSN is set", () => {
        process.env.NEXT_PUBLIC_SENTRY_DSN = "https://mock@sentry.io/123";

        logErrorToSentry(new Error("Database connection error"), {
            tags: { feature: "database" },
            extra: { retryCount: 3 },
            level: "error",
        });

        expect(Sentry.withScope).toHaveBeenCalled();
        expect(Sentry.captureException).toHaveBeenCalled();
    });

    it("adds breadcrumb when DSN is configured", () => {
        process.env.NEXT_PUBLIC_SENTRY_DSN = "https://mock@sentry.io/123";

        addSentryBreadcrumb("User clicked calculate", "ui.click", {
            button: "equals",
        });

        expect(Sentry.addBreadcrumb).toHaveBeenCalledWith({
            category: "ui.click",
            message: "User clicked calculate",
            data: { button: "equals" },
            level: "info",
        });
    });

    it("triggers a test exception and logs it to Sentry", async () => {
        process.env.NEXT_PUBLIC_SENTRY_DSN = "https://mock@sentry.io/123";
        const { triggerTestException } = await import("@/lib/sentry");

        const err = triggerTestException();
        expect(err).toBeInstanceOf(Error);
        expect((err as Error).message).toContain("Test Sentry Error");
        expect(Sentry.captureException).toHaveBeenCalled();
    });
});
