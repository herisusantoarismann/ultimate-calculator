"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
            Sentry.captureException(error);
        }
        console.error("Global Layout Error:", error);
    }, [error]);

    return (
        <html lang="id">
            <body className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-6">
                <div
                    role="alert"
                    className="max-w-md w-full p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center shadow-2xl"
                >
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 mx-auto flex items-center justify-center mb-4 border border-rose-500/20 font-bold text-xl">
                        !
                    </div>
                    <h1 className="text-xl font-bold mb-2">
                        Kesalahan Fatal Sistem
                    </h1>
                    <p className="text-sm text-slate-400 mb-6">
                        Terjadi kegagalan kritis pada antarmuka aplikasi. Kami
                        telah meneruskan laporan ke sistem pemantauan (Sentry).
                    </p>
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all shadow-md shadow-indigo-500/20"
                    >
                        Muat Ulang Halaman
                    </button>
                </div>
            </body>
        </html>
    );
}
