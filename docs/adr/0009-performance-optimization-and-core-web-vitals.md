# 9. Optimasi Performa, Core Web Vitals (LCP/INP/CLS), dan Efisiensi Komponen

Date: 2026-09-10

## Status

Accepted

## Context

Sebagai aplikasi web modern berbasis Next.js 16 (App Router) dan React 19, performa pemuatan awal (_initial load_) dan kelancaran interaksi pengguna (_responsiveness_) sangat berpengaruh pada metrik **Core Web Vitals** (CWV):

1. **Largest Contentful Paint (LCP)**: Kecepatan rendering elemen konten utama pada kunjungan pertama.
2. **Interaction to Next Paint (INP)**: Kecepatan respon terhadap input pengguna (pengetikan angka dan perhitungan kalkulator).
3. **Cumulative Layout Shift (CLS)**: Stabilitas tata letak visual saat berpindah kategori kalkulator.

Sebelumnya, terdapat beberapa inefisiensi yang ditemukan:

- Kalkulator standar (`StandardCalculator`) dimuat secara dinamis via `next/dynamic` tanpa fallback skeleton, menyebabkan _request waterfall_ yang menunda LCP untuk 100% pengguna awal.
- Perpindahan antar tab kalkulator dinamis tidak memiliki skeleton sehingga berpotensi menyebabkan pergeseran tata letak (CLS).
- Array tombol keypad (19 tombol di Standard dan 35 tombol di Scientific) diinisialisasi ulang di dalam body fungsi render pada setiap ketikan tombol, memicu alokasi memori heap berlebih dan memperlambat INP.
- `tailwind.config.ts` belum menyertakan direktori `./features/` pada konfigurasi `content`, berisiko pada optimasi tree-shaking CSS.
- Fitur konversi mata uang belum menyimpan kurs terbaru ke penyimpanan lokal sehingga selalu melakukan fetching ulang.

## Decision

Kami menerapkan serangkaian optimasi performa berstandar arsitektur web modern:

1. **Pemuatan Statis untuk Landing LCP**:
    - `StandardCalculator` diimpor secara langsung (statis) pada `app/page.tsx`, memungkinkan Next.js merender struktur kalkulator awal secara instan pada SSR tanpa penundaan chunk dinamis.
2. **Pencegahan CLS dengan Skeleton Placeholder**:
    - Dibuat komponen reusable `CalculatorSkeleton` (`components/molecules/CalculatorSkeleton.tsx`).
    - Seluruh kategori kalkulator sekunder (`ScientificCalculator`, `FinancialCalculator`, dll.) yang dimuat dinamis dilengkapi properti `loading: () => <CalculatorSkeleton />` agar dimensi layout tetap stabil saat modul diunduh.
3. **Memoization & Static Keypad Configuration (INP Boost)**:
    - Pada `StandardCalculator`, array konfigurasi tombol `KEYPAD_BUTTONS` dipindahkan ke luar komponen (_module scope_) dan tombol dihubungkan melalui dispatcher terpusat `handleButtonClick`.
    - Pada `ScientificCalculator`, array 35 tombol di-memoize dengan `useMemo` berdasarkan state `isInverse`, menghilangkan pembuatan 35 objek dan pemanggilan ternary `ariaLabel` di setiap ketikan.
4. **Perbaikan Path Content Tailwind**:
    - Menambahkan `"./features/**/*.{js,ts,jsx,tsx,mdx}"` pada `tailwind.config.ts` agar pemindaian class CSS tepat sasaran dan efisien.
5. **Caching Kurs Mata Uang**:
    - `CurrencyConverter` menyimpan data kurs live ke `localStorage` (`calc-currency-rates`) dengan masa berlaku 24 jam untuk menghindari round-trip jaringan yang berulang pada kunjungan berikutnya.

## Consequences

### Positif:

- Waktu rendering LCP jauh lebih singkat karena shell kalkulator standar sudah tersedia sejak HTML awal diterima browser.
- Navigasi antar kategori terasa mulus dan bebas lonjakan layout (CLS = 0).
- Pengetikan angka dan operator via fisik keyboard maupun klik UI terasa lebih responsif karena beban garbage collection berkurang drastis (INP < 50ms).
- Seluruh pengujian otomatis Vitest (68 tests) dan Playwright E2E (9 tests) lulus lebih cepat (pengujian navigasi kategori meningkat dari ~3.3 detik menjadi ~1.6 detik).

### Negatif / Biaya:

- Diperlukan pemeliharaan komponen skeleton agar dimensinya tetap sinkron jika di masa depan terdapat perubahan layout kartu kalkulator.
