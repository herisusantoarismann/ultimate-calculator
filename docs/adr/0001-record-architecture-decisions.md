# 1. Pencatatan Architecture Decision Records (ADR)

Date: 2026-09-09

## Status

Accepted

## Context

Seiring berkembangnya aplikasi web Ultimate Calculator yang memiliki 6 kalkulator fungsional kompleks, berbagai keputusan struktural, styling, pemisahan dependensi, dan pengujian diambil oleh tim engineer. Tanpa dokumentasi formal, konteks mengapa keputusan tersebut diambil berisiko hilang saat onboarding developer baru atau saat refactoring lanjutan.

Dokumentasi ini harus bersifat murni informasi teknis tanpa memengaruhi proses kompilasi (`next build`), bundling client side, unit test (`vitest`), atau linting (`next lint`).

## Decision

Kami memutuskan untuk menggunakan **Architecture Decision Records (ADR)** yang disimpan di dalam direktori `docs/adr/`.

- File ADR ditulis dalam format Markdown (`.md`).
- File ditempatkan di luar jalur kode yang dikompilasi Next.js (`app/`, `components/`, `features/`, `lib/`).
- Hanya berisi teks dokumentasi tanpa kode eksekusi yang mempengaruhi runtime.

## Consequences

### Positif:

- Setiap keputusan arsitektural terdokumentasikan secara kronologis dan terstruktur.
- Onboarding developer baru menjadi jauh lebih cepat dan terarah.
- Mencegah perdebatan berulang tentang keputusan desain yang sudah disepakati sebelumnya.
- Tidak menambah beban performa, ukuran bundle JavaScript, atau waktu build aplikasi.

### Negatif / Biaya:

- Menuntut kedisiplinan tim untuk memperbarui ADR atau membuat ADR baru saat terjadi perubahan arsitektur besar.
