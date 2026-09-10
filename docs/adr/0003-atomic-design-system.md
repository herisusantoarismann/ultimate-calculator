# 3. Penerapan Atomic Design System untuk Komponen UI

Date: 2026-09-09

## Status

Accepted

## Context

Sebelum refactoring, komponen UI reusable berada di tempat yang tumpang-tindih: sebagian ada di `components/ui/` (misal `Card.tsx`, `CopyButton.tsx`), sebagian di `components/layout/` (`Header.tsx`, `Sidebar.tsx`, `TabNav.tsx`), dan sebagian di `components/atoms/` serta `components/molecules/`.

Kondisi tersebut menyebabkan:

- Duplikasi kode yang persis sama di multiple folder (misal `components/ui/Card.tsx` vs `components/atoms/Card.tsx`).
- Ketidakjelasan bagi engineer di mana komponen baru harus dibuat.
- Inkonsistensi implementasi desain (varian warna, padding, accessibility).

## Decision

Kami memutuskan untuk membakukan seluruh komponen UI global di bawah direktori `components/` menggunakan metodologi **Atomic Design**:

```
components/
  ├── atoms/       # Komponen dasar terkecil tanpa dependensi komponen lain
  │   ├── Badge.tsx
  │   ├── Button.tsx
  │   ├── Card.tsx
  │   ├── IconButton.tsx
  │   └── Input.tsx
  ├── molecules/   # Gabungan beberapa atom yang membentuk satu kesatuan UI interaktif
  │   ├── CopyButton.tsx
  │   ├── TabPills.tsx
  │   └── ThemeToggle.tsx
  └── organisms/   # Struktur UI kompleks yang menggabungkan molekul & atom untuk bagian layout utama
      ├── Header.tsx
      └── Sidebar.tsx
```

Langkah konsolidasi yang diambil:

1. Menghapus folder `components/ui/` dan `components/layout/`.
2. Menghapus `TabNav` dan menggunakan molekul tunggal kanonikal `TabPills`.
3. Komponen atom dibuat mendukung varian Tailwind CSS yang konsisten dengan tema Dark & Light mode serta glassmorphism styling.

## Consequences

### Positif:

- Single Source of Truth untuk semua komponen visual UI.
- Hirarki visual jelas dan terprediksi (_predictable component composition_).
- Menghilangkan duplikasi komponen dan dependensi circular.
- Komponen atoms siap diuji secara independen melalui Storybook (`.stories.tsx`).

### Negatif / Biaya:

- Engineer harus memahami klasifikasi Atomic Design (membedakan mana atom vs molekul vs organisme).
