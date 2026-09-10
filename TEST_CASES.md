# 📋 Dokumen Spesifikasi Test Cases: Ultimate Calculator

Dokumen ini mendefinisikan seluruh matriks pengujian manual, automated, serta skenario pengujian fungsional dan non-fungsional untuk aplikasi web **Ultimate Calculator (Kalkulator Serba Bisa)**.

---

## 📑 Daftar Isi

- [📋 Dokumen Spesifikasi Test Cases: Ultimate Calculator](#-dokumen-spesifikasi-test-cases-ultimate-calculator)
    - [📑 Daftar Isi](#-daftar-isi)
    - [1. Kalkulator Standar (TC-STD)](#1-kalkulator-standar-tc-std)
    - [2. Kalkulator Ilmiah (TC-SCI)](#2-kalkulator-ilmiah-tc-sci)
    - [3. Kalkulator Finansial \& Bisnis (TC-FIN)](#3-kalkulator-finansial--bisnis-tc-fin)
        - [A. Pinjaman / KPR](#a-pinjaman--kpr)
        - [B. Konversi Mata Uang](#b-konversi-mata-uang)
        - [C. Pajak \& Diskon](#c-pajak--diskon)
    - [4. Kalkulator Kesehatan \& Kebugaran (TC-HLT)](#4-kalkulator-kesehatan--kebugaran-tc-hlt)
    - [5. Kalkulator Konversi Satuan (TC-UNT)](#5-kalkulator-konversi-satuan-tc-unt)
    - [6. Kalkulator Waktu \& Tanggal (TC-DTE)](#6-kalkulator-waktu--tanggal-tc-dte)
    - [7. Fitur Global, UI/UX, \& Edge Cases (TC-GLB)](#7-fitur-global-uiux--edge-cases-tc-glb)

---

## 1. Kalkulator Standar (TC-STD)

| ID Test        | Skenario Pengujian                        | Langkah Pengujian / Input                                | Hasil yang Diharapkan (Expected Result)                                                                          |
| :------------- | :---------------------------------------- | :------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| **TC-STD-001** | Operasi Penjumlahan Dasar                 | Klik `5`, `+`, `8`, `=`                                  | Layar menampilkan `13`. Ekspresi riwayat atas menampilkan `5 + 8`.                                               |
| **TC-STD-002** | Operasi Pengurangan & Negatif             | Klik `10`, `−`, `25`, `=`                                | Layar menampilkan `-15`.                                                                                         |
| **TC-STD-003** | Perkalian Desimal                         | Klik `12.5`, `×`, `4`, `=`                               | Layar menampilkan `50`.                                                                                          |
| **TC-STD-004** | Pembagian Standar                         | Klik `100`, `÷`, `8`, `=`                                | Layar menampilkan `12.5`.                                                                                        |
| **TC-STD-005** | Pembagian dengan Nol (_Division by Zero_) | Klik `50`, `÷`, `0`, `=`                                 | Layar menampilkan pesan `Error` atau penanganan terdefinisi, aplikasi tidak crash.                               |
| **TC-STD-006** | Tombol Persentase (%)                     | Input `200`, klik `%`                                    | Layar menampilkan `2` (200 / 100).                                                                               |
| **TC-STD-007** | Toggle Tanda Positif/Negatif (±)          | Input `45`, klik `±` lalu klik `±` lagi                  | Nilai berganti menjadi `-45`, lalu kembali menjadi `45`.                                                         |
| **TC-STD-008** | Tombol Backspace (⌫)                      | Input `1234`, klik tombol Backspace                      | Angka menjadi `123`. Jika hanya 1 digit dihapus, display kembali ke `0`.                                         |
| **TC-STD-009** | Reset Total (AC - All Clear)              | Lakukan kalkulasi `99 × 99`, lalu klik `AC`              | Display utama kembali ke `0` dan ekspresi atas bersih.                                                           |
| **TC-STD-010** | Penyimpanan Riwayat (_History_)           | Lakukan 3 perhitungan berbeda, klik tombol `Riwayat`     | Drawer terbuka, menampilkan 3 perhitungan dengan ekspresi, hasil, dan timestamp. Badge jumlah counter bertambah. |
| **TC-STD-011** | Panggil Kembali Riwayat                   | Buka Drawer Riwayat, klik salah satu baris riwayat       | Drawer tertutup otomatis, hasil riwayat dimuat kembali ke layar kalkulator.                                      |
| **TC-STD-012** | Hapus Semua Riwayat (_Clear History_)     | Buka Drawer Riwayat, klik tombol `Hapus Semua`           | Seluruh daftar riwayat terhapus dari memori dan `localStorage`. Muncul status kosong.                            |
| **TC-STD-013** | Input via Keyboard Fisik                  | Ketik angka `7`, `*`, `6`, `Enter` di keyboard laptop/PC | Kalkulator merespons seperti penekanan tombol fisik di layar, menghasilkan `42`.                                 |
| **TC-STD-014** | Salin Hasil (_Copy Result_)               | Setelah hasil muncul, klik tombol `Salin`                | Angka tersalin ke clipboard peramban, tombol berubah menjadi "Tersalin!" dengan ikon centang selama 2 detik.     |

---

## 2. Kalkulator Ilmiah (TC-SCI)

| ID Test        | Skenario Pengujian                       | Langkah Pengujian / Input                                 | Hasil yang Diharapkan (Expected Result)   |
| :------------- | :--------------------------------------- | :-------------------------------------------------------- | :---------------------------------------- |
| **TC-SCI-001** | Sinus Sudut Derajat (DEG)                | Pastikan mode `DEG` aktif. Input `sin(90)`, klik `=`      | Hasil tepat `1`.                          |
| **TC-SCI-002** | Cosinus Sudut Derajat (DEG)              | Mode `DEG`. Input `cos(60)`, klik `=`                     | Hasil tepat `0.5`.                        |
| **TC-SCI-003** | Tangen Sudut Derajat (DEG)               | Mode `DEG`. Input `tan(45)`, klik `=`                     | Hasil tepat `1`.                          |
| **TC-SCI-004** | Mode Radian (RAD)                        | Alihkan ke mode `RAD`. Input `sin(π / 2)`, klik `=`       | Hasil tepat `1`.                          |
| **TC-SCI-005** | Fungsi Invers Trigonometri (2nd)         | Klik tombol `2nd`, lalu klik `sin⁻¹(0.5)` pada mode `DEG` | Hasil menampilkan `30` (derajat).         |
| **TC-SCI-006** | Logaritma Basis 10 (`log₁₀`)             | Input `log(1000)`, klik `=`                               | Hasil menampilkan `3`.                    |
| **TC-SCI-007** | Logaritma Natural (`ln`)                 | Input `ln(e)`, klik `=`                                   | Hasil menampilkan `1`.                    |
| **TC-SCI-008** | Akar Kuadrat (`√x`) & Akar Kubik (`³√x`) | Input `sqrt(144)` dan `cbrt(27)`                          | Menghasilkan berturut-turut `12` dan `3`. |
| **TC-SCI-009** | Pangkat Kustom (`xʸ`)                    | Input `2 ^ 8`, klik `=`                                   | Hasil menampilkan `256`.                  |
| **TC-SCI-010** | Faktorial (`n!`)                         | Input `5!`, klik `=`                                      | Hasil menampilkan `120`.                  |
| **TC-SCI-011** | Nilai Mutlak (`\|x\|`)                   | Input `abs(-42)`, klik `=`                                | Hasil menampilkan `42`.                   |
| **TC-SCI-012** | Konstanta Pi (π) & Euler (e)             | Input `2 * π`, klik `=`                                   | Menghasilkan `6.283185...`.               |

---

## 3. Kalkulator Finansial & Bisnis (TC-FIN)

### A. Pinjaman / KPR

| ID Test        | Skenario Pengujian                 | Langkah Pengujian / Input                                            | Hasil yang Diharapkan (Expected Result)                                                |
| :------------- | :--------------------------------- | :------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| **TC-FIN-001** | Simulasi KPR Bunga Efektif/Anuitas | Plafon: Rp 300.000.000, Bunga: 8%, Tenor: 15 Tahun                   | Cicilan bulanan terhitung tepat (~Rp 2.866.908/bln). Grafik pokok vs bunga ter-update. |
| **TC-FIN-002** | Metode Bunga Flat                  | Pilih Bunga Flat, Plafon: Rp 100.000.000, Bunga: 10%, Tenor: 2 Tahun | Total bunga: Rp 20.000.000, Cicilan: Rp 5.000.000/bln.                                 |
| **TC-FIN-003** | Tombol Preset Plafon Cepat         | Klik tombol `250 Jt` atau `1 Milyar`                                 | Nilai input plafon otomatis berubah dan perhitungan langsung diperbarui secara instan. |
| **TC-FIN-004** | Jadwal Amortisasi Tahunan          | Klik tombol "Lihat Simulasi Jadwal Tahunan"                          | Tabel muncul menampilkan breakdown Pokok, Bunga, dan Sisa Pinjaman per tahun.          |

### B. Konversi Mata Uang

| ID Test        | Skenario Pengujian           | Langkah Pengujian / Input        | Hasil yang Diharapkan (Expected Result)                                                                     |
| :------------- | :--------------------------- | :------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| **TC-FIN-005** | Konversi USD ke IDR          | Masukkan jumlah `100` USD ke IDR | Hasil menampilkan ekuivalen Rupiah (misal Rp 1.585.000).                                                    |
| **TC-FIN-006** | Tukar Arah Kurs (_Swap_)     | Klik tombol Swap                 | Posisi mata uang asal dan tujuan tertukar seketika, hasil konversi terhitung ulang.                         |
| **TC-FIN-007** | Tombol Update Kurs           | Klik tombol `Update Kurs`        | Ikon berputar (animasi loading) dan timestamp "Diperbarui" muncul. Jika offline, fallback lokal tetap aman. |
| **TC-FIN-008** | Pasangan Populer Sekali Klik | Klik badge `EUR → IDR`           | Input From menjadi EUR dan To menjadi IDR secara otomatis.                                                  |

### C. Pajak & Diskon

| ID Test        | Skenario Pengujian            | Langkah Pengujian / Input                         | Hasil yang Diharapkan (Expected Result)                                                                   |
| :------------- | :---------------------------- | :------------------------------------------------ | :-------------------------------------------------------------------------------------------------------- |
| **TC-FIN-009** | Diskon Tunggal                | Harga: Rp 1.000.000, Diskon: 30%, PPN: Non-aktif  | Total hemat: Rp 300.000, Harga akhir: Rp 700.000.                                                         |
| **TC-FIN-010** | Diskon Bertingkat (50% + 20%) | Harga: Rp 1.000.000, Diskon 1: 50%, Diskon 2: 20% | Diskon 1 memotong Rp 500.000. Diskon 2 memotong 20% dari Rp 500.000 (= Rp 100.000). Subtotal: Rp 400.000. |
| **TC-FIN-011** | Penambahan Pajak PPN (11%)    | Aktifkan centang PPN 11%                          | PPN dihitung dari harga setelah diskon dan ditambahkan ke total akhir pada struk ringkasan.               |

---

## 4. Kalkulator Kesehatan & Kebugaran (TC-HLT)

| ID Test        | Skenario Pengujian             | Langkah Pengujian / Input                                               | Hasil yang Diharapkan (Expected Result)                                                                               |
| :------------- | :----------------------------- | :---------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| **TC-HLT-001** | BMI Normal / Ideal             | Laki-laki, Berat: 68 kg, Tinggi: 172 cm                                 | BMI ~23.0. Status: "Berat Badan Ideal / Normal" (Warna Hijau). Indikator bar menunjuk ke zona hijau.                  |
| **TC-HLT-002** | BMI Kurus (Underweight)        | Berat: 45 kg, Tinggi: 175 cm                                            | BMI ~14.7 (< 18.5). Status: "Kekurangan Berat Badan" (Warna Biru). Muncul saran nutrisi.                              |
| **TC-HLT-003** | BMI Kelebihan Berat & Obesitas | Berat: 95 kg, Tinggi: 165 cm                                            | BMI ~34.9 (≥ 30.0). Status: "Obesitas" (Warna Merah).                                                                 |
| **TC-HLT-004** | Rentang Berat Badan Ideal      | Masukkan tinggi badan 170 cm                                            | Rentang berat ideal menampilkan `53.5 - 72.0 kg`.                                                                     |
| **TC-HLT-005** | BMR & TDEE (Mifflin-St Jeor)   | Pria, Usia: 25 thn, Berat: 70 kg, Tinggi: 175 cm, Aktivitas: Sedang     | Menghitung BMR dan TDEE secara tepat beserta target kalori Maintenance, Defisit (-500 kcal), dan Surplus (+500 kcal). |
| **TC-HLT-006** | Perbedaan Gender pada BMR      | Ganti jenis kelamin dari Laki-laki ke Perempuan dengan input fisik sama | Rumus otomatis menyesuaikan selisih konstanta (+5 vs -161) dan memperbarui TDEE.                                      |

---

## 5. Kalkulator Konversi Satuan (TC-UNT)

| ID Test        | Skenario Pengujian                  | Langkah Pengujian / Input             | Hasil yang Diharapkan (Expected Result)                                                  |
| :------------- | :---------------------------------- | :------------------------------------ | :--------------------------------------------------------------------------------------- |
| **TC-UNT-001** | Konversi Panjang Metrik ke Imperial | 1 Meter ke Inci                       | Hasil menampilkan `39.3701 in`.                                                          |
| **TC-UNT-002** | Konversi Jarak Kilometer ke Mil     | 10 Kilometer ke Mil                   | Hasil menampilkan `6.2137 mi`.                                                           |
| **TC-UNT-003** | Konversi Massa Kilogram ke Pound    | 5 Kilogram ke Pound (lbs)             | Hasil menampilkan `11.0231 lb`.                                                          |
| **TC-UNT-004** | Konversi Suhu Celsius ke Fahrenheit | 100 °C ke °F                          | Hasil tepat `212 °F`.                                                                    |
| **TC-UNT-005** | Konversi Suhu Titik Beku ke Kelvin  | 0 °C ke K                             | Hasil tepat `273.15 K`.                                                                  |
| **TC-UNT-006** | Konversi Waktu Hari ke Detik        | 1 Hari ke Detik                       | Hasil tepat `86.400 s`.                                                                  |
| **TC-UNT-007** | Matriks Seluruh Satuan Sejenis      | Input angka `5` pada kategori Panjang | Kartu matriks menampilkan konversi serentak ke km, m, cm, mm, mil, yard, kaki, dan inci. |

---

## 6. Kalkulator Waktu & Tanggal (TC-DTE)

| ID Test        | Skenario Pengujian                | Langkah Pengujian / Input                    | Hasil yang Diharapkan (Expected Result)                               |
| :------------- | :-------------------------------- | :------------------------------------------- | :-------------------------------------------------------------------- |
| **TC-DTE-001** | Selisih Hari Dua Tanggal          | Tanggal A: 2026-01-01, Tanggal B: 2026-01-31 | Menampilkan `30 Hari` (atau `31 Hari` jika hari terakhir disertakan). |
| **TC-DTE-002** | Rincian Tahun, Bulan, Hari        | Tanggal A: 2024-01-01, Tanggal B: 2026-07-15 | Menampilkan rincian `2 Tahun, 6 Bulan, 14 Hari`.                      |
| **TC-DTE-003** | Hitung Hari Kerja (_Workdays_)    | Rentang 1 minggu penuh (Senin sampai Minggu) | Menampilkan `5 Hari Kerja` dan `2 Akhir Pekan`.                       |
| **TC-DTE-004** | Tambah Hari dari Tanggal Tertentu | Tanggal: 2026-01-01, Tambah `45 Hari`        | Tanggal hasil: `15 Februari 2026` lengkap dengan nama hari.           |
| **TC-DTE-005** | Kurang Bulan Melintasi Tahun      | Tanggal: 2026-02-15, Kurang `3 Bulan`        | Tanggal hasil: `15 November 2025`.                                    |

---

## 7. Fitur Global, UI/UX, & Edge Cases (TC-GLB)

| ID Test        | Skenario Pengujian                         | Langkah Pengujian / Input                                      | Hasil yang Diharapkan (Expected Result)                                                                                    |
| :------------- | :----------------------------------------- | :------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| **TC-GLB-001** | Alih Mode Gelap / Terang (_Theme Toggle_)  | Klik tombol matahari/bulan di pojok kanan atas Header          | Kelas `dark` pada dokumen HTML diaktifkan/dinonaktifkan, latar dan teks beralih secara mulus. Tersimpan di `localStorage`. |
| **TC-GLB-002** | Responsivitas Tampilan Mobile (< 640px)    | Perkecil lebar layar hingga ukuran smartphone                  | Sidebar desktop disembunyikan. Tombol hamburger muncul. Mengetuk hamburger membuka slide drawer dari kiri secara mulus.    |
| **TC-GLB-003** | Tombol Salin (_Clipboard Fallback_)        | Matikan izin clipboard peramban atau gunakan konteks non-HTTPS | Komponen menjalankan fallback `execCommand` tanpa menimbulkan error runtime.                                               |
| **TC-GLB-004** | Ketahanan Terhadap String Tak Valid        | Ketik karakter acak atau formula ganda di kalkulator ilmiah    | Aplikasi menampilkan pesan peringatan sintaks ramah pengguna dan tidak mengalami crash (_white screen of death_).          |
| **TC-GLB-005** | Persistensi State Antar Muat Ulang Halaman | Lakukan perhitungan standar, lalu refresh browser (`F5`)       | Riwayat sebelumnya tetap utuh dan dapat diakses kembali.                                                                   |

---

## 8. Otomasi End-to-End, Aksesibilitas & Core Web Vitals (TC-E2E)

Pengujian otomatis end-to-end dijalankan menggunakan **Playwright** (`npm run test:e2e`) pada browser Chromium headless:

| ID Test        | Skenario Pengujian                          | Langkah Pengujian / Otomasi                                     | Hasil yang Diharapkan (Expected Result)                                                                             |
| :------------- | :------------------------------------------ | :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| **TC-E2E-001** | Navigasi Kategori Desktop & Sidebar         | Klik item menu Scientific, Financial, Health, Converter, Date   | Konten kalkulator berganti sesuai kategori, header breadcrumb diperbarui, dan skeleton transisi merender tanpa CLS. |
| **TC-E2E-002** | Alur Aritmatika & Riwayat End-to-End        | Klik `12 + 8 =`, verifikasi `20`, buka History Drawer           | Hasil perhitungan `20` muncul di display dan tercatat di History Drawer.                                            |
| **TC-E2E-003** | Reset Tampilan All Clear (AC)               | Klik `5 × 9 = 45`, lalu klik tombol `AC`                        | Display langsung ter-reset kembali ke `0`.                                                                          |
| **TC-E2E-004** | Dukungan Keyboard Fisik E2E                 | Kirim keystrokes keyboard fisik `2`, `5`, `*`, `4`, `Enter`     | Display menampilkan hasil `100`.                                                                                    |
| **TC-E2E-005** | Aksesibilitas Skip-Link                     | Fokus pada link "Lewati ke Konten Utama", tekan Enter           | Fokus halaman berpindah langsung ke kontainer `<main id="main-content">`.                                           |
| **TC-E2E-006** | Zero Unhandled Console Errors               | Pantau console errors selama interaksi pengguna di seluruh page | Nol runtime JavaScript exceptions atau console errors tak tertangani.                                               |
| **TC-E2E-007** | Live Region Screen Reader                   | Evaluasi ekspresi `10 + 5 =`                                    | Elemen dengan atribut `aria-live="polite"` dan `role="status"` memuat nilai `15` secara real-time.                  |
| **TC-E2E-008** | Verifikasi Core Web Vitals & Skeleton State | Alihkan tab kalkulator di bawah koneksi jaringan normal         | `CalculatorSkeleton` muncul sesaat tanpa layout shift, modul ter-render mulus.                                      |
