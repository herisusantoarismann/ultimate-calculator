# 🚀 Ultimate Calculator (Kalkulator Serba Bisa)

Aplikasi web modern, presisi tinggi, dan berperforma maksimal yang memadukan 6 kategori kalkulator esensial dalam satu pengalaman pengguna berbasis **Next.js 16 (Turbopack)**, **React 19**, **TypeScript**, dan **Tailwind CSS**.

Dilengkapi dengan pemantauan performa **Core Web Vitals**, logging exception berlapis via **Sentry**, pengujian menyeluruh (**Vitest** & **Playwright E2E**), penjelajah komponen **Storybook 10**, serta pipeline **GitHub Actions CI** dan otomasi **Dependabot**.

---

## 🛠️ Stack Teknologi

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Library UI**: [React 19](https://react.dev/)
- **Bahasa**: [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) dengan Glassmorphism & Dark/Light mode
- **Ikon**: [Lucide React](https://lucide.dev/)
- **Unit & Integration Testing**: [Vitest](https://vitest.dev/) + React Testing Library + JSDOM
- **End-to-End (E2E) Testing**: [Playwright](https://playwright.dev/)
- **Design System Explorer**: [Storybook 10](https://storybook.js.org/)
- **Monitoring & Error Tracking**: [Sentry for Next.js](https://sentry.io/) + Core Web Vitals reporting
- **CI/CD & Security**: [GitHub Actions](https://github.com/features/actions) + [Dependabot](https://github.com/dependabot)

---

## ✨ Fitur Utama

1. **🧮 Kalkulator Standar**
    - Operasi aritmatika dasar (`+`, `−`, `×`, `÷`, `%`, `±`).
    - Riwayat perhitungan (_History_) otomatis tersimpan ke `localStorage`.
    - Tombol panggil riwayat dan bersihkan riwayat.
    - Dukungan keyboard fisik lengkap (Numpad, Enter, Backspace, Esc).

2. **🔬 Kalkulator Ilmiah (Scientific)**
    - Trigonometri (`sin`, `cos`, `tan`) dan fungsi invers (`sin⁻¹`, `cos⁻¹`, `tan⁻¹`).
    - Toggle satuan sudut: **DEG** (Derajat) dan **RAD** (Radian).
    - Logaritma (`log₁₀`, `ln`), eksponensial (`eˣ`, `10ˣ`, `x²`, `xʸ`).
    - Akar kuadrat & kubik (`√x`, `³√x`), modulus (`mod`), nilai mutlak (`|x|`), faktorial (`x!`), konstanta `π` dan `e`.

3. **💼 Kalkulator Finansial & Bisnis**
    - **Simulasi Pinjaman / KPR**: Angsuran bulanan, total bunga, rasio pokok vs bunga, dan tabel jadwal amortisasi tahunan (Metode Bunga Efektif/Anuitas vs Flat).
    - **Konversi Mata Uang**: Kurs USD, IDR, EUR, JPY, GBP, SGD, AUD, CNY, MYR, SAR dengan swap, live fetch, dan fallback offline ter-cache 24 jam.
    - **Kalkulator Pajak & Diskon**: Diskon utama (%), diskon bertingkat (+%), dan PPN (%) dengan struk belanja interaktif.

4. **🏃 Kalkulator Kesehatan & Kebugaran**
    - **Kalkulator BMI**: Skor indeks massa tubuh, kategori berat badan, rentang berat ideal, dan meteran visual interaktif.
    - **Kebutuhan Kalori Harian (BMR & TDEE)**: Formula medis **Mifflin-St Jeor** dengan target pemeliharaan, cutting lemak, dan bulking otot.

5. **📐 Konversi Satuan**
    - **Panjang**: Meter, Kilometer, Sentimeter, Milimeter, Mil, Yard, Kaki, Inci.
    - **Massa / Berat**: Kilogram, Gram, Miligram, Ton Metrik, Pound, Ons.
    - **Suhu**: Celsius, Fahrenheit, Kelvin, Reamur.
    - **Waktu**: Detik, Menit, Jam, Hari, Minggu, Bulan, Tahun.
    - Matriks konversi instan untuk semua satuan sejenis.

6. **📅 Kalkulator Waktu & Tanggal**
    - **Selisih Tanggal**: Total hari, rincian Tahun-Bulan-Hari, jumlah minggu, dan pemisahan Hari Kerja vs Akhir Pekan.
    - **Tambah / Kurang Hari**: Hitung tanggal target berdasarkan penambahan atau pengurangan hari kalender.

7. **🌐 Dukungan Dwibahasa (Dual Language i18n)**
    - Mendukung **Bahasa Indonesia (`id`, default)** dan **English (`en`)**.
    - Transisi instan tanpa reload halaman melalui type-safe React Context & TypeScript dictionaries.
    - Sinkronisasi otomatis ke `document.documentElement.lang` (a11y/SEO) dan persistensi ke `localStorage`.
    - Tombol pengalih bahasa (`LanguageToggle`) terintegrasi langsung di Header.

8. **⚡ Aksesibilitas & Performa Maksimal**
    - Skor LCP cepat dengan static shell import pada landing page.
    - Zero layout shift (CLS = 0) dengan `CalculatorSkeleton` saat memuat kategori dinamis.
    - Keyboard navigation, ARIA live region polite screen reader, dan tombol lewati ke konten utama.
    - Desain responsif mobile dengan drawer samping dan tema Dark/Light.

---

## 🚀 Panduan Menjalankan Perintah (Scripts)

Pastikan **Node.js v20+** atau **v22+** telah terinstal di lingkungan Anda.

```bash
# 1. Instalasi dependensi
npm install

# 2. Menjalankan server pengembangan (Next.js Turbopack)
npm run dev

# 3. Menjalankan kompilasi produksi
npm run build

# 4. Menjalankan server produksi lokal
npm run start

# 5. Menjalankan linter (ESLint 9 Flat Config)
npm run lint

# 6. Menjalankan Unit & Integration Tests (Vitest)
npm test

# 7. Menjalankan Playwright End-to-End Tests
npm run test:e2e

# 8. Menjalankan Storybook interaktif
npm run storybook

# 9. Membangun Storybook statis
npm run build-storybook
```

---

## 🔒 Keamanan, Monitoring & CI/CD

- **GitHub Actions CI** (`.github/workflows/ci.yml`):
  Menjalankan 4 job paralel pada setiap push dan pull request:
    1. `lint-and-typecheck`: ESLint + `tsc --noEmit`
    2. `unit-tests`: Vitest
    3. `storybook`: Kompilasi statis Storybook
    4. `e2e-tests`: Playwright Chromium testing pada Next.js production build
- **Dependabot & Human Review Enforcement** (`.github/dependabot.yml` & `.github/workflows/dependabot-automation.yml`):
  Memantau celah keamanan berkala, mengelompokkan update minor/patch, dan mewajibkan review manual sebelum merge.
- **Sentry Exception Catching**:
  Menangkap uncaught client errors, server request errors, React Error Boundaries (`app/error.tsx`, `app/global-error.tsx`), serta penanganan error kalkulasi di tingkat event handler. Kunci rahasia dikelola secara aman via GitHub Repository Secrets.

---

## 📖 Dokumentasi Lengkap

- **[Developer Onboarding Guide](docs/ONBOARDING.md)**: Panduan arsitektur, struktur Atomic Design, standar kode, dan cara setup.
- **[Architecture Decision Records (ADRs)](docs/adr/README.md)**: Riwayat keputusan arsitektur (ADR-001 s/d ADR-010).
- **[Spesifikasi Test Cases](TEST_CASES.md)**: Dokumentasi matriks pengujian matematis dan alur E2E.
