# 4. Manajemen State Lokal & Persistensi Browser (Local Storage)

Date: 2026-09-09

## Status

Accepted

## Context

Kalkulator dalam aplikasi ini memerlukan persistensi data sisi klien:

1. Riwayat perhitungan aritmatika (_history calculation_).
2. Pilihan tema tampilan (_dark mode_ vs _light mode_).

Tantangan di Next.js App Router:

- Komponen dieksekusi di server terlebih dahulu (SSR / hydration). Mengakses `window.localStorage` secara langsung saat rendering akan memicu _Hydration Mismatch Error_.
- Sebelumnya terdapat implementasi ganda untuk hook persistensi di `hooks/useLocalStorage.ts` dan `lib/useLocalStorage.ts`.

## Decision

1. Menggunakan hook tunggal yang aman terhadap SSR di `lib/useLocalStorage.ts`:
    - Melakukan pembacaan `localStorage` di dalam hook `useEffect` setelah komponen ter-mount di browser.
    - Menyediakan flag `isHydrated` agar nilai default server tidak bentrok dengan nilai lokal browser.
2. Menghapus hook duplikat di folder `hooks/` agar arsitektur `lib/` menjadi tempat resmi helper dan kustom hooks non-UI global.
3. Mendefinisikan konstanta storage key terpusat di `lib/constants.ts` (`STORAGE_KEYS`).

## Consequences

### Positif:

- Bebas dari hydration error pada client components di Next.js App Router.
- Kunci penyimpanan terorganisir di satu tempat (`lib/constants.ts`), mencegah _typo_ atau bentrok nama key.
- Hook bersifat generic dan type-safe (`useLocalStorage<T>(key, initialValue)`).

### Negatif / Biaya:

- Konten yang bergantung pada `localStorage` (seperti jumlah riwayat) akan terisi setelah hydration cycle pertama selesai.
