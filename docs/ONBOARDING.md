# 🚀 Panduan Onboarding Developer (Onboarding Guide)

Selamat datang di proyek **Ultimate Calculator**! Dokumen ini dirancang untuk membantu Anda memahami arsitektur, standar penulisan kode, alur kerja, dan cara berkontribusi di repositori ini secara cepat dan efisien.

---

## 📌 Ringkasan Proyek

Ultimate Calculator adalah aplikasi kalkulator multi-guna modern berbasis web yang menggabungkan 6 kategori kalkulator esensial dalam satu pengalaman pengguna yang mulus:

1. **Standard Calculator** (Aritmatika dasar & riwayat perhitungan)
2. **Scientific Calculator** (Trigonometri, logaritma, akar, pangkat, faktorial)
3. **Financial & Business Calculator** (Simulasi pinjaman/KPR, konversi kurs valuta, kalkulator diskon & pajak)
4. **Health & Fitness Calculator** (Indeks massa tubuh / BMI & kebutuhan kalori harian BMR/TDEE)
5. **Unit Converter** (Panjang, massa, suhu, waktu)
6. **Date & Time Calculator** (Selisih dua tanggal, tambah/kurang hari kerja & kalender)

---

## 🛠️ Stack Teknologi

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack) + React 19
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/) dengan tema Dark/Light & Glassmorphism
- **Komponen Ikon**: [Lucide React](https://lucide.dev/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/) (Strict mode, no `any`)
- **Testing**: [Vitest](https://vitest.dev/) (Unit/Integration) + [Playwright](https://playwright.dev/) (E2E) + JSDOM
- **Design System Explorer**: [Storybook 10](https://storybook.js.org/)
- **Monitoring & Logging**: [Sentry for Next.js](https://sentry.io/) + Core Web Vitals reporting
- **CI/CD & Security**: [GitHub Actions](https://github.com/features/actions) + [Dependabot](https://github.com/dependabot)

---

## 🏛️ Arsitektur Proyek

Proyek ini menerapkan perpaduan **Feature-Driven Architecture** dan **Atomic Design System**:

```
next-calculator/
├── app/                  # Next.js App Router (Hanya routing & layout tipis)
│   ├── globals.css       # Tailwind directives & tema global
│   ├── layout.tsx        # Root HTML shell & viewport metadata
│   └── page.tsx          # Dynamic import & orchestrator untuk fitur kalkulator
│
├── components/           # Generic UI Components berbasis Atomic Design
│   ├── atoms/            # Komponen dasar (Badge, Button, Card, IconButton, Input)
│   ├── molecules/        # Komponen fungsional kecil (CopyButton, TabPills, ThemeToggle)
│   └── organisms/        # Struktur layout besar (Header, Sidebar)
│
├── features/             # Modul Bisnis per Fitur (Feature-Driven)
│   ├── standard-calculator/components/     # StandardCalculator, HistoryDrawer
│   ├── scientific-calculator/components/   # ScientificCalculator
│   ├── financial-calculator/components/    # FinancialCalculator, LoanCalculator, dll.
│   ├── health-calculator/components/       # HealthCalculator, BMICalculator, dll.
│   ├── date-time-calculator/components/    # DateTimeCalculator, DateDiffCalculator, dll.
│   └── unit-converter/components/          # UnitConverter
│
├── lib/                  # Helper global, hook fungsional non-UI, konstanta
│   ├── constants.ts      # Kategori menu, storage keys
│   ├── useCalculatorKeyboard.ts  # Keyboard listener hook
│   └── useLocalStorage.ts        # SSR-safe local storage persistence hook
│
├── types/                # TypeScript definitions terpusat
│   └── common.ts         # Single source of truth untuk semua types & interfaces
│
├── utils/                # Pure utility functions (tanpa state UI)
│   ├── formatters.ts     # Format mata uang, angka, tanggal Indonesia
│   └── mathUtils.ts      # Engine evaluasi ekspresi matematika & trigonometri
│
├── tests/                # Unit & Integration Tests (Vitest)
│   ├── setup.ts          # Setup jest-dom matchers
│   ├── components/       # Pengujian UI per fitur
│   └── utils/            # Pengujian fungsi murni matematika & formatting
│
└── docs/                 # Dokumentasi Teknis & ADR
    ├── ONBOARDING.md     # Panduan onboarding developer ini
    └── adr/              # Architecture Decision Records
```

---

## 🚀 Memulai Pengembangan (Local Setup)

### 1. Prasyarat

- **Node.js** versi 18.17+ atau 20+
- **npm** versi 9+

### 2. Instalasi Dependensi

```bash
npm install
```

### 3. Menjalankan Server Pengembangan

```bash
npm run dev
```

Akses aplikasi melalui peramban di [http://localhost:3000](http://localhost:3000).

### 4. Menjalankan Storybook (Opsional)

Untuk melihat dan menguji komponen UI atoms/molecules secara terisolasi:

```bash
npm run storybook
```

Akses Storybook di [http://localhost:6006](http://localhost:6006).

---

## 🧪 Panduan Menjalankan Pengujian & Verifikasi

Sebelum mengajukan perubahan kode (pull request), pastikan perintah-perintah berikut berhasil:

### 1. Menjalankan Unit Tests

```bash
# Menjalankan seluruh test suite satu kali
npm test

# Menjalankan test dalam mode watch (aktif saat koding)
npm run test:watch
```

### 2. Memeriksa Type Safety & Build Produksi

```bash
npm run build
```

Pastikan kompilasi TypeScript dan Next.js production build selesai dengan kode exit 0 tanpa error tipe.

### 3. Menjalankan End-to-End Tests (Playwright)

```bash
# Menjalankan seluruh pengujian E2E headless
npm run test:e2e

# Menjalankan pengujian E2E dengan UI interaktif
npx playwright test --ui
```

### 4. Linting & Type Safety

```bash
# Memeriksa standar kode dengan ESLint
npm run lint

# Memeriksa integritas tipe TypeScript
npx tsc --noEmit
```

### 5. Continuous Integration (GitHub Actions)

Setiap commit dan pull request ke branch `main`, `master`, atau `develop` akan secara otomatis diverifikasi melalui GitHub Actions (`.github/workflows/ci.yml`), mencakup:

- **Lint & Typecheck**: ESLint + `tsc --noEmit`
- **Unit & Integration Tests**: Vitest
- **Storybook Build**: Kompilasi statis Storybook
- **E2E Tests**: Playwright test suite pada server produksi Next.js

### 6. Kebijakan Dependabot & Human Review

- Dependabot (`.github/dependabot.yml`) secara otomatis memindai dependensi `npm` (mingguan) dan `github-actions` (bulanan) serta memantau kerentanan keamanan (_security alerts_).
- **Human Review Enforcement**: Seluruh PR Dependabot mewajibkan peninjauan manusia (_approval_) setelah seluruh cek CI berstatus hijau. Auto-merge sengaja dinonaktifkan untuk menjaga stabilitas sistem.
- Workflow helper (`.github/workflows/dependabot-automation.yml`) akan otomatis menyematkan label tipe update dan checklist review pengembang.

### 7. Panduan Internasionalisasi (i18n & Dual Language)

Ultimate Calculator menerapkan sistem dwibahasa (**Bahasa Indonesia `id` (default)** & **English `en`**) yang berbasis Type-Safe React Context dan kamus TypeScript (lihat [ADR-0010](./adr/0010-internationalization-dual-language-i18n.md)):

- **Struktur Kamus**:
    - [`types/i18n.ts`](../types/i18n.ts): Kontrak antarmuka `TranslationSchema` yang mengikat semua string teks.
    - [`locales/id.ts`](../locales/id.ts) & [`locales/en.ts`](../locales/en.ts): Implementasi kamus untuk masing-masing bahasa.
- **Cara Menggunakan di Komponen**:
    ```tsx
    import { useTranslation } from "@/hooks/useTranslation";

    export const MyComponent: React.FC = () => {
        const { t, locale, toggleLocale } = useTranslation();
        return <button onClick={toggleLocale}>{t.common.results}</button>;
    };
    ```
- **Aturan Menambahkan Teks Baru**:
    1. Daftarkan kunci baru pada interface `TranslationSchema` di `types/i18n.ts`.
    2. Tambahkan string terjemahan di `locales/id.ts` dan `locales/en.ts`. TypeScript compiler akan langsung memvalidasi jika ada kunci yang tertinggal.
    3. Jalankan `npm test` untuk memverifikasi keselarasan kunci otomatis melalui suite `tests/i18n.test.tsx`.

---

## 📐 Standar Penulisan Kode (Coding Guidelines)

1. **TypeScript Strict Type**:
    - Dilarang menggunakan tipe `any`. Gunakan `unknown`, generics, atau definisikan antarmuka eksplisit di `types/common.ts`.
2. **Penamaan Berkas & Simbol**:
    - Komponen React: `PascalCase.tsx` (misal: `StandardCalculator.tsx`, `TabPills.tsx`).
    - Hooks & Utilities: `camelCase.ts` (misal: `useLocalStorage.ts`, `mathUtils.ts`).
    - Konstanta: `UPPER_SNAKE_CASE` (misal: `CATEGORY_ITEMS`).
3. **Pemisahan Perhatian (Separation of Concerns)**:
    - Komponen UI di `components/` tidak boleh mengimpor fitur dari `features/`.
    - Modul di `features/` boleh mengimpor generic components dari `components/atoms/`, `components/molecules/`, `components/organisms/`, serta helper dari `lib/` dan `utils/`.
    - Logika perhitungan murni diletakkan di `utils/` agar dapat diuji secara terisolasi tanpa perlu me-render DOM.
4. **Dokumentasi Keputusan Arsitektur**:
    - Jika Anda melakukan perubahan desain arsitektur besar (menambah teknologi baru, mengubah state management, atau merestrukturisasi folder), catat keputusan tersebut di folder `docs/adr/`.
5. **Standar Efisiensi & Core Web Vitals (CWV)**:
    - **LCP**: Komponen kalkulator default pada halaman awal tidak boleh di-lazy load tanpa alasan kuat agar shell langsung tersedia di HTML awal.
    - **CLS**: Modul kalkulator sekunder yang dimuat dinamis wajib menyertakan `CalculatorSkeleton` sebagai properti `loading`.
    - **INP & Memory**: Jangan mendefinisikan array konfigurasi tombol keypad di dalam render body. Pindahkan ke module scope atau gunakan `useMemo` agar pengetikan tidak memicu alokasi memori berulang.

---

## 📚 Referensi Lanjutan

- [Architecture Decision Records (ADRs)](./adr/README.md)
- [Spesifikasi Test Cases Lengkap](../TEST_CASES.md)
- [README Proyek](../README.md)
