# ADR 0010: Sistem Internasionalisasi Ringan & Type-Safe (Dual Language i18n)

## Status

Diterima (Accepted)

## Konteks & Latar Belakang

Aplikasi Ultimate Calculator dirancang untuk mendukung multi-kategori kalkulator secara fleksibel dan ramah pengguna. Untuk memperluas jangkauan pengguna ke skala internasional, dibutuhkan fitur dwibahasa (dual language) yaitu **Bahasa Indonesia (`id`, default)** dan **English (`en`)**.

Dalam ekosistem Next.js 16 (Turbopack) dan React 19, opsi implementasi i18n umum sering melibatkan:

1. Pustaka routing dinamis seperti `next-intl` dengan format folder `app/[locale]/...` dan middleware rewrite URL.
2. Solusi client-side type-safe React Context dengan kamus (dictionaries) berbasis TypeScript.

Setelah mengevaluasi arsitektur Single Page Application multi-kalkulator pada root `/`, pendekatan routing dinamis `/[locale]` memiliki sejumlah kekurangan:

- Mengubah struktur URL dan routing yang memicu reload/hop halaman saat berganti bahasa.
- Kompleksitas middleware tambahan di Edge runtime Next.js 16.
- Risiko konflik resolusi dependency npm (seperti yang pernah terjadi pada peer dependency React 19).

## Keputusan Arsitektur

Kami memutuskan untuk mengimplementasikan sistem internasionalisasi khusus berbasis **Type-Safe React Context & TypeScript Dictionaries** tanpa pustaka eksternal pihak ketiga:

1. **Skema Kamus Berlapis (Strict Parity)**:
    - Didefinisikan interface [`TranslationSchema`](file:///c:/Project/next-calculator/types/i18n.ts) yang mengikat setiap kunci teks antarmuka (common, navigation, standard, scientific, financial, health, converter, dateTime).
    - Kamus [`locales/id.ts`](file:///c:/Project/next-calculator/locales/id.ts) dan [`locales/en.ts`](file:///c:/Project/next-calculator/locales/en.ts) mengimplementasikan skema tersebut, menjamin 100% keselarasan kunci saat waktu kompilasi (compile-time safety).

2. **Language Provider & Context**:
    - [`LanguageProvider`](file:///c:/Project/next-calculator/context/LanguageContext.tsx) membungkus root layout aplikasi.
    - Mengelola state bahasa aktif, fungsi toggle (`toggleLocale`), dan pemilih langsung (`setLocale`).
    - Tersedia custom hook ringkas [`useTranslation()`](file:///c:/Project/next-calculator/hooks/useTranslation.ts).

3. **Sinkronisasi & Aksesibilitas DOM**:
    - Preferensi bahasa disimpan ke `localStorage` dengan kunci `calc-language`.
    - Otomatis memperbarui atribut HTML `document.documentElement.lang = locale` setiap kali bahasa berganti untuk mendukung SEO dan screen reader.

4. **Komponen Pengalih Bahasa (LanguageToggle)**:
    - Dibuat molekul [`LanguageToggle`](file:///c:/Project/next-calculator/components/molecules/LanguageToggle.tsx) yang disematkan di [`Header`](file:///c:/Project/next-calculator/components/organisms/Header.tsx) berdampingan dengan `ThemeToggle`.
    - Dilengkapi `aria-label` dwibahasa dan indikator status aktif uppercase (`ID` / `EN`).

## Konsekuensi

### Positif:

- **Zero Bundle Bloat**: Nol dependensi pihak ketiga, ukuran bundle JavaScript tetap minimalis.
- **Transisi Instan**: Pergantian bahasa terjadi seketika di sisi client tanpa jeda navigasi atau reload halaman.
- **Kompatibilitas Penuh**: Berjalan mulus di Vitest, Storybook (`LanguageToggle.stories.tsx`), dan Playwright E2E tanpa perlu mocking middleware Next.js.
- **Type-Safety Penuh**: Menghilangkan kemungkinan typo kunci atau teks terjemahan yang terlewat berkat compiler TypeScript.

### Negatif / Mitigasi:

- Penambahan teks terjemahan baru mewajibkan pembaruan di kedua file (`id.ts` dan `en.ts`).
  _Mitigasi_: Telah disediakan unit test otomatis [`tests/i18n.test.tsx`](file:///c:/Project/next-calculator/tests/i18n.test.tsx) yang secara rekursif memeriksa keselarasan kunci 1:1.
