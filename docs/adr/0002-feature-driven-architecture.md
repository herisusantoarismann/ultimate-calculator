# 2. Penerapan Feature-Driven Architecture

Date: 2026-09-09

## Status

Accepted

## Context

Aplikasi Ultimate Calculator memiliki domain fungsional yang sangat beragam, antara lain:

1. Standard Calculator
2. Scientific Calculator
3. Financial Calculator (Loan, Currency Converter, Tax & Discount)
4. Health Calculator (BMI, Calorie / TDEE)
5. Unit Converter (Length, Weight, Temp, Time)
6. Date-Time Calculator (Date Diff, Add/Sub Days)

Sebelumnya, seluruh kalkulator diletakkan di dalam folder `components/calculators/*`. Pendekatan ini mencampuradukkan antara komponen UI presentasional global dengan modul bisnis domain-spesifik. Hal ini berakibat pada sulitnya navigasi kode, tingginya potensi duplikasi fungsi/komponen, dan melanggar prinsip _Separation of Concerns_.

## Decision

Kami memutuskan untuk mengadopsi **Feature-Driven Architecture** di bawah folder `features/`:

```
features/
  ├── standard-calculator/
  │   └── components/
  ├── scientific-calculator/
  │   └── components/
  ├── financial-calculator/
  │   └── components/
  ├── health-calculator/
  │   └── components/
  ├── date-time-calculator/
  │   └── components/
  └── unit-converter/
      └── components/
```

Prinsip-prinsip yang diterapkan:

1. Komponen yang hanya relevan untuk satu kalkulator tertentu (misal: `HistoryDrawer`, `LoanCalculator`, `BMICalculator`) harus berada di folder fiturnya masing-masing.
2. `app/page.tsx` bertindak sebagai _thin orchestration layer_ yang me-load fitur kalkulator secara asinkron menggunakan `next/dynamic` dengan code-splitting otomatis.
3. Menghapus folder `components/calculators/` untuk mencegah duplikasi file dan re-export wrapper yang tidak diperlukan.

## Consequences

### Positif:

- Setiap domain kalkulator terisolasi rapi (_high cohesion, loose coupling_).
- Pengembangan fitur baru atau perbaikan bug pada satu kalkulator tidak mengganggu kalkulator lainnya.
- Ukuran bundle awal (initial JS bundle) tetap kecil karena fitur kalkulator di-split secara dinamis.
- Struktur folder mudah dieksplorasi oleh pengembang baru.

### Negatif / Biaya:

- Import antar fitur (jika ada komponen yang ingin digunakan bersama di masa depan) memerlukan pertimbangan untuk dipromosikan ke level generic components (`components/`).
