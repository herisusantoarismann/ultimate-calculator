import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HealthCalculator } from "@/features/health-calculator/components/HealthCalculator";
import { BMICalculator } from "@/features/health-calculator/components/BMICalculator";
import { CalorieCalculator } from "@/features/health-calculator/components/CalorieCalculator";

describe("HealthCalculator Suite", () => {
    it("switches between BMI and Calorie tabs", () => {
        render(<HealthCalculator />);
        expect(
            screen.getAllByText(/Indeks Massa Tubuh/i).length,
        ).toBeGreaterThan(0);

        const calorieTab = screen.getByRole("tab", {
            name: /Kalori Harian/i,
        });
        fireEvent.click(calorieTab);

        expect(
            screen.getByText(/Kebutuhan Kalori Harian/i),
        ).toBeInTheDocument();
    });

    describe("BMICalculator", () => {
        it("calculates BMI and shows category and healthy weight range", () => {
            render(<BMICalculator />);
            expect(
                screen.getByText(/Rentang Berat Ideal Anda:/i),
            ).toBeInTheDocument();
            expect(
                screen.getByText(/Status Indeks Massa Tubuh/i),
            ).toBeInTheDocument();
        });

        it("switches gender selection", () => {
            render(<BMICalculator />);
            const femaleBtn = screen.getByRole("button", {
                name: /Perempuan/i,
            });
            fireEvent.click(femaleBtn);
            expect(femaleBtn.className).toContain("bg-pink-600");
        });
    });

    describe("CalorieCalculator", () => {
        it("calculates BMR and TDEE based on activity level", () => {
            render(<CalorieCalculator />);
            expect(
                screen.getByText(/Total Pengeluaran Energi Harian \(TDEE\)/i),
            ).toBeInTheDocument();
            expect(
                screen.getByText(/Pemeliharaan \(Maintenance\)/i),
            ).toBeInTheDocument();
            expect(screen.getByText(/Turun Berat Badan/i)).toBeInTheDocument();
            expect(screen.getByText(/Naik Berat \/ Otot/i)).toBeInTheDocument();
        });
    });
});
