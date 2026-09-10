/**
 * Global shared types for Ultimate Calculator application.
 * Single source of truth — follows strict TypeScript guidelines (no `any`).
 */

// ---------------------------------------------------------------------------
// Navigation & Layout
// ---------------------------------------------------------------------------

export type CalculatorCategory =
    | "standard"
    | "scientific"
    | "financial"
    | "health"
    | "converter"
    | "date-time";

export interface NavCategoryItem {
    id: CalculatorCategory;
    name: string;
    description: string;
    badge?: string;
}

// ---------------------------------------------------------------------------
// History
// ---------------------------------------------------------------------------

export interface HistoryItem {
    id: string;
    expression: string;
    result: string;
    timestamp: number;
    category: CalculatorCategory;
}

// ---------------------------------------------------------------------------
// Sub-tab types
// ---------------------------------------------------------------------------

export type FinancialSubTab = "loan" | "currency" | "tax-discount";
export type HealthSubTab = "bmi" | "calorie";
export type DateTimeSubTab = "diff" | "add-sub";

// ---------------------------------------------------------------------------
// Currency
// ---------------------------------------------------------------------------

export interface CurrencyInfo {
    code: string;
    name: string;
    symbol: string;
    flag: string;
    rateToUSD: number; // 1 USD = X Currency
}

// ---------------------------------------------------------------------------
// Unit Converter
// ---------------------------------------------------------------------------

export type UnitType = "length" | "weight" | "temperature" | "time";

export interface UnitDefinition {
    id: string;
    name: string;
    symbol: string;
    toBase: (val: number) => number;
    fromBase: (val: number) => number;
}

// ---------------------------------------------------------------------------
// Health
// ---------------------------------------------------------------------------

export interface BMIResult {
    bmi: number;
    category: "Underweight" | "Normal" | "Overweight" | "Obese";
    categoryLabel: string;
    color: string;
    healthyWeightRange: [number, number];
    advice: string;
}

export interface CalorieResult {
    bmr: number;
    tdee: number;
    deficitAggressive: number;
    deficitModerate: number;
    maintenance: number;
    surplusModerate: number;
}

// ---------------------------------------------------------------------------
// Loan / Financial
// ---------------------------------------------------------------------------

export interface LoanResult {
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    yearlySchedule: {
        year: number;
        principalPaid: number;
        interestPaid: number;
        remainingBalance: number;
    }[];
}
