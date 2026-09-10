import { NavCategoryItem } from "@/types/common";

/**
 * Storage keys used across the application for client persistence.
 */
export const STORAGE_KEYS = {
    THEME: "calc-theme",
    STANDARD_HISTORY: "calc-standard-history",
} as const;

/**
 * Categories metadata for navigation and app header.
 */
export const CATEGORY_ITEMS: NavCategoryItem[] = [
    {
        id: "standard",
        name: "Kalkulator Standar",
        description: "Aritmatika dasar & riwayat",
    },
    {
        id: "scientific",
        name: "Kalkulator Ilmiah",
        description: "Trigonometri, log & akar",
        badge: "Sci",
    },
    {
        id: "financial",
        name: "Finansial & Bisnis",
        description: "KPR, Kurs valuta, Pajak & Diskon",
        badge: "3-in-1",
    },
    {
        id: "health",
        name: "Kesehatan & Kebugaran",
        description: "BMI, BMR & Kalori Harian (TDEE)",
    },
    {
        id: "converter",
        name: "Konversi Satuan",
        description: "Panjang, Berat, Suhu & Waktu",
    },
    {
        id: "date-time",
        name: "Waktu & Tanggal",
        description: "Selisih hari & kalender",
    },
];
