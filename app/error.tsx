"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/atoms/Button";

export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log to Sentry
        if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
            Sentry.captureException(error);
        }
        console.error("App Segment Error:", error);
    }, [error]);

    return (
        <div
            role="alert"
            className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center"
        >
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-4 border border-rose-500/20">
                <AlertTriangle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                Terjadi Kesalahan Aplikasi
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6">
                Mohon maaf, kalkulator mengalami gangguan tak terduga. Error
                telah dicatat untuk perbaikan.
            </p>
            <Button
                variant="primary"
                onClick={() => reset()}
                icon={<RefreshCw className="w-4 h-4" />}
            >
                Coba Muat Ulang
            </Button>
        </div>
    );
}
