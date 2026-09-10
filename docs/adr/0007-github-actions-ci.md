# 7. Penerapan Pipeline Continuous Integration (CI) dengan GitHub Actions

Date: 2026-09-10

## Status

Accepted

## Context

Dengan meningkatnya kompleksitas aplikasi kalkulator (Next.js 16, React 19, Storybook 10, Vitest, Playwright E2E, dan integrasi Sentry), setiap perubahan kode atau pull request membutuhkan mekanisme verifikasi otomatis yang cepat, andal, dan konsisten sebelum digabungkan (_merged_) ke branch utama.

Verifikasi manual secara lokal rentan terhadap inkonsistensi lingkungan pengembangan, regresi tak terduga, atau human-error saat menjalankan serangkaian pengujian.

## Decision

Kami mengimplementasikan pipeline Continuous Integration (CI) berbasis **GitHub Actions** yang berlokasi di `.github/workflows/ci.yml`. Pipeline ini terbagi menjadi 4 pekerjaan (_jobs_) terisolasi yang dapat dieksekusi secara paralel:

1. **`lint-and-typecheck`**:
    - Memastikan standar penulisan kode via **ESLint Flat Config** (`npm run lint`).
    - Memeriksa integritas tipe data TypeScript secara menyeluruh via `tsc --noEmit`.
2. **`unit-tests`**:
    - Menjalankan 68+ unit & integration test cases via **Vitest** (`npm test`).
    - Memverifikasi akurasi matematis, formatters, dan interaksi komponen UI.
3. **`storybook`**:
    - Menjalankan kompilasi statis Storybook (`npm run build-storybook`).
    - Memastikan tidak ada stories atau komponen atom/molekul yang rusak.
4. **`e2e-tests`**:
    - Mempersiapkan binary browser Chromium headless via `npx playwright install --with-deps chromium`.
    - Melakukan kompilasi produksi Next.js (`npm run build`).
    - Menjalankan pengujian fungsional dan aksesibilitas end-to-end via **Playwright** (`npm run test:e2e`).
    - Mengunggah artefak laporan pengujian (`playwright-report`) secara otomatis jika terjadi kegagalan (`if: failure()`).

### Konfigurasi Efisiensi:

- Menggunakan Node.js v22 dengan caching npm bawaan (`actions/setup-node@v4` dengan `cache: 'npm'`).
- Menggunakan GitHub Secrets (`${{ secrets.NEXT_PUBLIC_SENTRY_DSN }}` dan `${{ secrets.SENTRY_AUTH_TOKEN }}`) untuk menyuntikkan kredensial pihak ketiga secara aman dan terenkripsi tanpa hardcode di file repositori.
- Aplikasi dirancang aman (graceful degradation) saat rahasia/DSN tidak diisi, sehingga build dan test tetap dapat berjalan sukses.

## Consequences

### Positif:

- Setiap pull request atau commit pada branch utama diuji secara otomatis dan menyeluruh.
- Deteksi regresi terjadi lebih awal (_fail-fast_), baik di tingkat tipe data, unit test, visual stories, maupun alur E2E pengguna.
- Eksekusi paralel memangkas waktu tunggu developer.
- Laporan Playwright otomatis tersimpan sebagai artifact jika ada kegagalan browser.

### Negatif / Biaya:

- Diperlukan koneksi jaringan untuk mengunduh browser Chromium pada runner GitHub Actions untuk job E2E.
