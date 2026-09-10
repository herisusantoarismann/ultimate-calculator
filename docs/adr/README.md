# Architecture Decision Records (ADR)

Repositori ini mencatat keputusan-keputusan arsitektur penting (_Architecture Decision Records_) yang dibuat selama pengembangan **Ultimate Calculator**. Setiap ADR mencakup konteks, keputusan yang diambil, serta konsekuensi dan alasannya.

---

## 📑 Daftar Rekaman Keputusan (ADR Index)

| ID                                                              | Judul Keputusan                                                | Status       | Tanggal    |
| --------------------------------------------------------------- | -------------------------------------------------------------- | ------------ | ---------- |
| [ADR-001](0001-record-architecture-decisions.md)                | Pencatatan Architecture Decision Records (ADR)                 | **Accepted** | 2026-09-09 |
| [ADR-002](0002-feature-driven-architecture.md)                  | Penerapan Feature-Driven Architecture                          | **Accepted** | 2026-09-09 |
| [ADR-003](0003-atomic-design-system.md)                         | Penerapan Atomic Design System untuk Komponen UI               | **Accepted** | 2026-09-09 |
| [ADR-004](0004-state-management-and-persistence.md)             | Manajemen State Lokal & Persistensi Browser (Local Storage)    | **Accepted** | 2026-09-09 |
| [ADR-005](0005-testing-strategy.md)                             | Strategi Pengujian dengan Vitest dan React Testing Library     | **Accepted** | 2026-09-09 |
| [ADR-006](0006-upgrade-next16-storybook10.md)                   | Upgrade ke Next.js 16, React 19, dan Storybook 10              | **Accepted** | 2026-09-09 |
| [ADR-007](0007-github-actions-ci.md)                            | Penerapan Pipeline Continuous Integration (CI) GitHub Actions  | **Accepted** | 2026-09-10 |
| [ADR-008](0008-dependabot-and-security-review.md)               | Otomasi Dependensi & Keamanan dengan Dependabot & Human Review | **Accepted** | 2026-09-10 |
| [ADR-009](0009-performance-optimization-and-core-web-vitals.md) | Optimasi Performa, Core Web Vitals (LCP/INP/CLS) & Efisiensi   | **Accepted** | 2026-09-10 |
| [ADR-010](0010-internationalization-dual-language-i18n.md)      | Sistem Internasionalisasi Ringan & Type-Safe (Dual Language)   | **Accepted** | 2026-09-10 |

---

## 🎯 Format ADR

Setiap ADR menggunakan format standar:

1. **Title**: Nomor dan ringkasan keputusan singkat.
2. **Status**: `Proposed`, `Accepted`, `Superseded`, atau `Deprecated`.
3. **Context**: Masalah atau latar belakang yang mendasari keputusan.
4. **Decision**: Keputusan teknis atau arsitektur yang diambil.
5. **Consequences**: Dampak positif, negatif, atau trade-off dari keputusan tersebut.
