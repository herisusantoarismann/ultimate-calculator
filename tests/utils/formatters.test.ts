import { describe, it, expect } from "vitest";
import {
    formatCurrency,
    formatNumber,
    calculateDateDiff,
    addSubtractDate,
} from "@/utils/formatters";

describe("formatters", () => {
    describe("formatCurrency", () => {
        it("formats IDR currency with symbol and separators", () => {
            const formatted = formatCurrency(500000, "IDR");
            expect(formatted).toContain("500.000");
            expect(formatted).toMatch(/Rp/i);
        });

        it("formats USD currency with symbol", () => {
            const formatted = formatCurrency(1250.5, "USD");
            expect(formatted).toContain("1,250.50");
            expect(formatted).toContain("$");
        });

        it("handles NaN or zero gracefully", () => {
            expect(formatCurrency(NaN)).toBe("0");
            expect(formatCurrency(0, "IDR")).toContain("0");
        });
    });

    describe("formatNumber", () => {
        it("formats integers with thousands separators", () => {
            const formatted = formatNumber(1000000);
            expect(formatted).toBe("1.000.000");
        });

        it("formats floating point numbers up to maximum decimals", () => {
            const formatted = formatNumber(12.34567, 3);
            expect(formatted).toBe("12,346");
        });

        it("handles NaN and Infinity", () => {
            expect(formatNumber(NaN)).toBe("0");
            expect(formatNumber(Infinity)).toBe("Infinity");
        });
    });

    describe("calculateDateDiff", () => {
        it("calculates exact difference in days between two dates", () => {
            const d1 = new Date("2026-01-01");
            const d2 = new Date("2026-01-11");
            const res = calculateDateDiff(d1, d2, false);
            expect(res.totalDays).toBe(10);
        });

        it("includes end day when includeEndDay is true", () => {
            const d1 = new Date("2026-01-01");
            const d2 = new Date("2026-01-11");
            const res = calculateDateDiff(d1, d2, true);
            expect(res.totalDays).toBe(11);
        });

        it("calculates weekdays (Monday-Friday) accurately", () => {
            // 2026-01-05 is Monday, 2026-01-09 is Friday (5 weekdays)
            const monday = new Date("2026-01-05");
            const friday = new Date("2026-01-09");
            const res = calculateDateDiff(monday, friday, true);
            expect(res.weekdaysCount).toBe(5);
        });

        it("handles reverse order of dates correctly", () => {
            const d1 = new Date("2026-05-15");
            const d2 = new Date("2026-05-01");
            const res = calculateDateDiff(d1, d2, false);
            expect(res.totalDays).toBe(14);
            expect(res.isReverse).toBe(true);
        });
    });

    describe("addSubtractDate", () => {
        it("adds days correctly", () => {
            const base = new Date("2026-03-01T00:00:00Z");
            const result = addSubtractDate(base, 10, "add", "days");
            expect(result.getUTCDate()).toBe(11);
            expect(result.getUTCMonth()).toBe(2); // March
        });

        it("subtracts days across month boundary", () => {
            const base = new Date("2026-03-05T00:00:00Z");
            const result = addSubtractDate(base, 10, "subtract", "days");
            expect(result.getUTCMonth()).toBe(1); // February
        });

        it("adds weeks correctly", () => {
            const base = new Date("2026-04-01T00:00:00Z");
            const result = addSubtractDate(base, 2, "add", "weeks");
            expect(result.getUTCDate()).toBe(15);
        });

        it("adds months and handles year rollover", () => {
            const base = new Date("2026-11-15T00:00:00Z");
            const result = addSubtractDate(base, 3, "add", "months");
            expect(result.getUTCFullYear()).toBe(2027);
            expect(result.getUTCMonth()).toBe(1); // February
        });
    });
});
