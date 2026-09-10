import { describe, it, expect } from "vitest";
import {
    evaluateExpression,
    factorial,
    degToRad,
    radToDeg,
} from "@/utils/mathUtils";

describe("mathUtils", () => {
    describe("Helper Functions", () => {
        it("calculates factorial correctly", () => {
            expect(factorial(0)).toBe(1);
            expect(factorial(1)).toBe(1);
            expect(factorial(5)).toBe(120);
            expect(factorial(6)).toBe(720);
            expect(Number.isNaN(factorial(-1))).toBe(true);
        });

        it("converts degrees and radians", () => {
            expect(degToRad(180)).toBeCloseTo(Math.PI);
            expect(degToRad(90)).toBeCloseTo(Math.PI / 2);
            expect(radToDeg(Math.PI)).toBeCloseTo(180);
            expect(radToDeg(Math.PI / 2)).toBeCloseTo(90);
        });
    });

    describe("evaluateExpression: Arithmetic & Precedence", () => {
        it("evaluates basic arithmetic", () => {
            expect(evaluateExpression("2 + 3").result).toBe(5);
            expect(evaluateExpression("10 - 4").result).toBe(6);
            expect(evaluateExpression("6 * 7").result).toBe(42);
            expect(evaluateExpression("20 / 4").result).toBe(5);
        });

        it("handles unicode symbols (×, ÷, −)", () => {
            expect(evaluateExpression("5 × 5").result).toBe(25);
            expect(evaluateExpression("15 ÷ 3").result).toBe(5);
            expect(evaluateExpression("10 − 3").result).toBe(7);
        });

        it("respects operator precedence (PEMDAS/BODMAS)", () => {
            expect(evaluateExpression("2 + 3 * 4").result).toBe(14);
            expect(evaluateExpression("10 - 2 * 3").result).toBe(4);
            expect(evaluateExpression("12 / 2 * 3").result).toBe(18);
        });

        it("handles parentheses properly", () => {
            expect(evaluateExpression("(2 + 3) * 4").result).toBe(20);
            expect(evaluateExpression("((5 + 3) * 2) - 6").result).toBe(10);
        });

        it("handles unary minus and negative numbers", () => {
            expect(evaluateExpression("-5 + 8").result).toBe(3);
            expect(evaluateExpression("10 + -3").result).toBe(7);
            expect(evaluateExpression("-4 * -2").result).toBe(8);
        });

        it("handles percentage", () => {
            expect(evaluateExpression("50%").result).toBe(0.5);
            expect(evaluateExpression("200 * 15%").result).toBe(30);
        });

        it("handles division by zero", () => {
            const res = evaluateExpression("10 / 0");
            expect(res.error).toBeDefined();
            expect(res.error).toContain("nol");
        });
    });

    describe("evaluateExpression: Scientific Functions", () => {
        it("evaluates powers and roots", () => {
            expect(evaluateExpression("2 ^ 3").result).toBe(8);
            expect(evaluateExpression("sqrt(16)").result).toBe(4);
            expect(evaluateExpression("sqrt(144)").result).toBe(12);
            expect(evaluateExpression("cbrt(27)").result).toBe(3);
        });

        it("evaluates logarithms", () => {
            expect(evaluateExpression("log(100)").result).toBe(2);
            expect(evaluateExpression("log(1000)").result).toBe(3);
            expect(evaluateExpression("ln(e)").result).toBeCloseTo(1);
        });

        it("evaluates trigonometry in DEG mode", () => {
            expect(evaluateExpression("sin(90)", "DEG").result).toBeCloseTo(1);
            expect(evaluateExpression("sin(30)", "DEG").result).toBeCloseTo(
                0.5,
            );
            expect(evaluateExpression("cos(0)", "DEG").result).toBeCloseTo(1);
            expect(evaluateExpression("cos(60)", "DEG").result).toBeCloseTo(
                0.5,
            );
            expect(evaluateExpression("tan(45)", "DEG").result).toBeCloseTo(1);
        });

        it("evaluates inverse trigonometry in DEG mode", () => {
            expect(evaluateExpression("asin(1)", "DEG").result).toBeCloseTo(90);
            expect(evaluateExpression("acos(1)", "DEG").result).toBeCloseTo(0);
            expect(evaluateExpression("atan(1)", "DEG").result).toBeCloseTo(45);
        });

        it("evaluates trigonometry in RAD mode", () => {
            expect(evaluateExpression("sin(pi / 2)", "RAD").result).toBeCloseTo(
                1,
            );
            expect(evaluateExpression("cos(pi)", "RAD").result).toBeCloseTo(-1);
        });

        it("evaluates constants (π and e)", () => {
            expect(evaluateExpression("π").result).toBeCloseTo(Math.PI);
            expect(evaluateExpression("e").result).toBeCloseTo(Math.E);
            expect(evaluateExpression("2 * π").result).toBeCloseTo(2 * Math.PI);
        });

        it("evaluates factorial in expression", () => {
            expect(evaluateExpression("5!").result).toBe(120);
            expect(evaluateExpression("3! + 4!").result).toBe(30);
        });
    });

    describe("evaluateExpression: Error Handling & Edge Cases", () => {
        it("returns error for unbalanced parentheses", () => {
            const res = evaluateExpression("(2 + 3 * 4");
            expect(res.error).toBeDefined();
        });

        it("returns error for negative square root", () => {
            const res = evaluateExpression("sqrt(-4)");
            expect(res.error).toBeDefined();
        });

        it("returns 0 for empty or whitespace expression", () => {
            expect(evaluateExpression("").result).toBe(0);
            expect(evaluateExpression("   ").result).toBe(0);
        });
    });
});
