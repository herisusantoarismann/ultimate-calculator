"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { clsx } from "clsx";
import { Button } from "@/components/atoms/Button";
import { useTranslation } from "@/context/LanguageContext";

export interface CopyButtonProps {
    /** The text string to copy to clipboard */
    textToCopy: string;
    /** Label to display when idle */
    label?: string;
    className?: string;
    size?: "sm" | "md" | "lg";
}

/**
 * Molecule CopyButton component that wraps clipboard interactions
 * with visual feedback ("Tersalin!") and standard fallback.
 */
export const CopyButton: React.FC<CopyButtonProps> = ({
    textToCopy,
    label,
    className,
    size = "md",
}) => {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);
    const displayLabel = label ?? t.common.copy;

    const handleCopy = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!textToCopy) return;

        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback for non-secure contexts or legacy browsers
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand("copy");
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Clipboard copy failed:", err);
            }
            document.body.removeChild(textArea);
        }
    };

    return (
        <Button
            variant="secondary"
            size={size}
            onClick={handleCopy}
            aria-label={
                copied
                    ? t.common.copiedToClipboard
                    : label
                      ? `${t.common.copy} ${label}`
                      : t.common.copyToClipboard
            }
            className={clsx(
                copied &&
                    "bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400",
                className,
            )}
            icon={
                copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500 animate-in zoom-in duration-200" />
                ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                )
            }
        >
            <span>{copied ? t.common.copied : displayLabel}</span>
        </Button>
    );
};
