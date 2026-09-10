import type { Metadata } from "next";
import "./globals.css";
import { WebVitalsMonitor } from "@/components/analytics/WebVitalsMonitor";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
    title: "Ultimate Calculator - Kalkulator Serba Bisa Modern",
    description:
        "Aplikasi web multi-kalkulator serba bisa: Kalkulator Standar, Ilmiah, Finansial (KPR & Kurs), Kesehatan (BMI & Kalori), Konversi Satuan, dan Tanggal.",
    keywords: [
        "kalkulator",
        "kalkulator online",
        "calculator",
        "kpr calculator",
        "bmi calculator",
        "scientific calculator",
        "unit converter",
        "nextjs",
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="id" className="dark" suppressHydrationWarning>
            <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen antialiased selection:bg-indigo-500 selection:text-white">
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-indigo-600 focus:text-white focus:rounded-xl focus:shadow-xl focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-semibold text-sm transition-all"
                >
                    Lewati ke Konten Utama
                </a>
                <WebVitalsMonitor />
                <LanguageProvider>{children}</LanguageProvider>
            </body>
        </html>
    );
}
