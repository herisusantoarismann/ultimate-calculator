"use client";

import React from "react";
import { HistoryItem } from "@/types/common";
import { Trash2, X, Clock, ArrowLeft } from "lucide-react";
import { CopyButton } from "@/components/molecules/CopyButton";

interface HistoryDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    history: HistoryItem[];
    onSelectHistory: (item: HistoryItem) => void;
    onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
    isOpen,
    onClose,
    history,
    onSelectHistory,
    onClearHistory,
}) => {
    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 z-20 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col transition-all duration-300 animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-semibold text-slate-800 dark:text-white text-base">
                        Riwayat Perhitungan
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                        {history.length}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {history.length > 0 && (
                        <button
                            type="button"
                            onClick={onClearHistory}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors calc-btn"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Hapus Semua</span>
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup riwayat"
                        className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto py-3 space-y-2.5 pr-1">
                {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 p-6">
                        <Clock className="w-10 h-10 mb-2 stroke-1 text-slate-300 dark:text-slate-600" />
                        <p className="text-sm font-medium">Belum ada riwayat</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                            Hasil perhitungan Anda akan otomatis tersimpan di
                            sini.
                        </p>
                    </div>
                ) : (
                    history.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => onSelectHistory(item)}
                            className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 hover:border-indigo-400/60 dark:hover:border-indigo-500/60 transition-all cursor-pointer group"
                        >
                            <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 mb-1">
                                <span className="font-mono text-[11px] truncate max-w-[200px]">
                                    {item.expression}
                                </span>
                                <span>
                                    {new Date(
                                        item.timestamp,
                                    ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white font-mono tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    = {item.result}
                                </span>
                                <CopyButton
                                    textToCopy={item.result}
                                    size="sm"
                                    label="Salin"
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer Back */}
            <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 text-center">
                <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Kembali ke Kalkulator</span>
                </button>
            </div>
        </div>
    );
};
