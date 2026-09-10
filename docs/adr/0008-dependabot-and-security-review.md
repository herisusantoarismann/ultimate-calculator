# 8. Otomasi Dependensi & Keamanan dengan Dependabot dan Human Review Enforcement

Date: 2026-09-10

## Status

Accepted

## Context

Aplikasi memiliki lebih dari 1.000 dependensi (langsung maupun transitif) yang mencakup runtime Next.js 16, React 19, Storybook 10, Vitest, dan Playwright. Dependensi pihak ketiga secara berkala memiliki pembaruan versi, perbaikan bug, dan patch kerentanan keamanan (_security vulnerabilities_).

Memantau dan memperbarui dependensi secara manual membutuhkan banyak waktu dan rentan terlewat. Di sisi lain, menerapkan _auto-merge_ pada pembaruan dependensi tanpa pengawasan manusia sangat berisiko menyebabkan kerusakan aplikasi (_breaking changes_) atau regresi fungsi matematika.

Oleh karena itu, kami membutuhkan mekanisme otomatis untuk:

1. Mendeteksi versi baru dan kerentanan keamanan secara berkala.
2. Membuka Pull Request (PR) otomatis dengan pengelompokan yang rapi agar tidak membanjiri daftar PR.
3. Terintegrasi penuh dengan pipeline CI (Lint, Typecheck, Vitest, Storybook, Playwright E2E).
4. Mewajibkan peninjauan manual oleh manusia (_human review_) sebelum penggabungan ke branch utama.

## Decision

1. **Konfigurasi Dependabot (`.github/dependabot.yml`)**:
    - Memantau dependensi ekosistem `npm` setiap minggu (Senin pukul 03:00 WIB).
    - Memantau aksi workflow `github-actions` setiap bulan.
    - **Pengelompokan Pintar (Grouped Updates)**: Pembaruan `minor` dan `patch` untuk `dev-dependencies` dan `prod-dependencies` dikelompokkan ke dalam 1 PR terpadu. Pembaruan `major` tetap dibuatkan PR terpisah untuk isolasi risiko _breaking change_.
    - Menyematkan label otomatis `dependencies` dan `needs-human-review`.

2. **Workflow Pendamping Dependabot (`.github/workflows/dependabot-automation.yml`)**:
    - Mengekstrak metadata dependensi menggunakan aksi resmi `dependabot/fetch-metadata@v2`.
    - Menambahkan label dinamis (`patch-update`, `minor-update`, `breaking-change`, atau `security-fix`).
    - Menyematkan komentar interaktif berisi **Human Review & Verification Checklist** pada PR baru.
    - **Kebijakan Tanpa Auto-Merge**: Secara eksplisit tidak mengaktifkan auto-merge; setiap PR Dependabot mewajibkan persetujuan (_review approval_) dari pengembang setelah status CI dinyatakan hijau.

3. **Sinergi dengan CI Pipeline (`.github/workflows/ci.yml`)**:
    - Setiap PR dari Dependabot akan otomatis memicu seluruh pengujian CI (Lint, TypeScript Check, Vitest, Storybook static build, dan Playwright E2E).
    - Pengembang dapat langsung melihat apakah paket baru kompatibel sebelum menyetujui merge.

## Consequences

### Positif:

- Kerentanan keamanan dan versi pustaka usang terdeteksi secara proaktif.
- Risiko banjir notifikasi PR diminimalkan berkat fitur grouping `minor` & `patch`.
- Kualitas dan stabilitas kode terjaga karena penggabungan kode tetap berada di bawah kendali manusia setelah lulus uji CI.

### Negatif / Biaya:

- Memerlukan waktu bagi pengembang untuk meninjau changelog dan memberikan approval pada PR berkala yang dibuat oleh Dependabot.
