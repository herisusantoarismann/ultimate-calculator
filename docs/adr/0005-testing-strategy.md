# 5. Strategi Pengujian dengan Vitest dan React Testing Library

Date: 2026-09-09

## Status

Accepted

## Context

Aplikasi kalkulator memproses banyak logika perhitungan presisi tinggi (matematika, rumus finansial seperti amortisasi pinjaman, indeks kesehatan BMI/BMR, dan konversi satuan matriks). Kegagalan akurasi numerik atau regresi saat refactoring komponen UI akan berdampak langsung pada kepercayaan pengguna.

Sebelumnya, pengujian hanya memiliki 1 file unit test untuk `StandardCalculator`. Kami membutuhkan ekosistem testing modern yang cepat, terisolasi, dan mudah dijalankan di local maupun pipeline CI/CD.

## Decision

1. **Runner**: Memilih **Vitest** dengan environment `jsdom`.
    - Mengapa Vitest: Sangat cepat, integrasi native dengan ekosistem modern Vite, kompatibel dengan API Jest (`describe`, `it`, `expect`).
2. **Library Pengujian UI**: **React Testing Library** (`@testing-library/react`, `@testing-library/jest-dom`).
    - Pendekatan pengujian berfokus pada perilaku pengguna (_user-centric testing_), bukan implementasi internal komponen.
3. **Struktur Direktori**:
    ```
    tests/
      ├── setup.ts               # Inisialisasi matchers jest-dom & mocking browser API
      ├── components/            # Pengujian interaksi komponen kalkulator per fitur
      └── utils/                 # Unit test untuk fungsi murni matematika & formatters
    ```
4. Seluruh test cases mengacu pada dokumen spesifikasi resmi di `TEST_CASES.md`.

## Consequences

### Positif:

- Waktu eksekusi pengujian sangat singkat (< 5 detik untuk puluhan test cases).
- Memastikan akurasi tinggi pada fungsi matematika (trigonometri, precision handling, pembulatan mata uang).
- Memberikan rasa aman saat melakukan perombakan arsitektur atau migrasi file.

### Negatif / Biaya:

- Diperlukan mock untuk beberapa Web API tertentu jika digunakan di masa depan (misal: Clipboard API atau ResizeObserver).
