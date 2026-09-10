# 6. Upgrade ke Next.js 16, React 19, dan Storybook 10

Date: 2026-09-09

## Status

Accepted

## Context

Aplikasi sebelumnya menggunakan Next.js 14, React 18, dan Storybook 8. Saat menjalankan `yarn storybook`, terjadi error kegagalan kompilasi Webpack (`Cannot read properties of undefined (reading 'tap')`) karena inkompatibilitas internal plugin Webpack Storybook 8 terhadap dependensi Next.js.

Selain itu, terdapat kebutuhan untuk memperbarui dependensi utama ke **Next.js 16** guna memanfaatkan performa Turbopack terbaru, optimasi React 19, dan fitur-fitur App Router termutakhir.

## Decision

1. **Framework & Runtime**:
    - Upgrade Next.js ke versi stabil terbaru `next@16.3.4`.
    - Upgrade React ke `react@19.2.8` dan `react-dom@19.2.8`.
    - Menyesuaikan `@types/react@19.2.18` dan `@types/react-dom@19.2.7`.
2. **Storybook**:
    - Upgrade Storybook ke `storybook@10.6.0`, `@storybook/nextjs@10.6.0`, `@storybook/react@10.6.0`, `@storybook/addon-docs@10.6.0`, dan `@storybook/addon-mcp@10.6.0`.
    - Mengatasi error kompilasi Storybook sehingga Storybook berhasil dibangun (`build-storybook`) dan siap dijalankan.
3. **Linting & Code Quality**:
    - Migrasi sistem linting ke ESLint Flat Config (`eslint.config.mjs`) menggunakan `@eslint/js`, `typescript-eslint`, dan `eslint@10`.
    - Memperbaiki seluruh peringatan dan error static analysis pada seluruh fitur kalkulator.
4. **Turbopack Configuration**:
    - Menambahkan konfigurasi `turbopack: { root: __dirname }` di `next.config.mjs` untuk memastikan resolusi monorepo/multi-lockfile berjalan bersih tanpa warning.

## Consequences

### Positif:

- Kompilasi dan build produksi jauh lebih cepat dengan Turbopack (`next build` sukses dalam ~12 detik).
- Storybook 10 kompatibel penuh dengan Next.js 16 dan React 19.
- Seluruh 59 test cases di Vitest lulus 100% tanpa regresi.
- Seluruh script di `package.json` (`dev`, `build`, `lint`, `test`, `storybook`, `build-storybook`) berjalan dengan status sukses (exit code 0).

### Negatif / Biaya:

- Diperlukan konfigurasi flat ESLint (`eslint.config.mjs`) menggantikan format legacy `.eslintrc.json`.
