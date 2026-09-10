import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DateTimeCalculator } from "@/features/date-time-calculator/components/DateTimeCalculator";
import { DateDiffCalculator } from "@/features/date-time-calculator/components/DateDiffCalculator";
import { DateAddSubCalculator } from "@/features/date-time-calculator/components/DateAddSubCalculator";

describe("DateTimeCalculator Suite", () => {
    it("switches between date diff and add-sub tabs", () => {
        render(<DateTimeCalculator />);
        expect(screen.getByText(/Rentang Dua Tanggal/i)).toBeInTheDocument();

        const addSubTab = screen.getByRole("tab", {
            name: /Tambah \/ Kurang Hari/i,
        });
        fireEvent.click(addSubTab);

        expect(
            screen.getByText(/Tambah atau Kurang Tanggal/i),
        ).toBeInTheDocument();
    });

    describe("DateDiffCalculator", () => {
        it("renders dates and displays duration in days and weekdays", () => {
            render(<DateDiffCalculator />);
            expect(
                screen.getByText(/Total Selisih Hari:/i),
            ).toBeInTheDocument();
            expect(
                screen.getByText(/Hari Kerja \(Sen-Jum\)/i),
            ).toBeInTheDocument();
        });

        it("toggles include end day option", () => {
            render(<DateDiffCalculator />);
            const checkbox = screen.getByRole("checkbox");
            expect(checkbox).not.toBeChecked();

            fireEvent.click(checkbox);
            expect(checkbox).toBeChecked();
        });
    });

    describe("DateAddSubCalculator", () => {
        it("toggles between addition and subtraction of dates", () => {
            render(<DateAddSubCalculator />);
            const subBtn = screen.getByRole("button", { name: /Kurang/i });
            fireEvent.click(subBtn);

            expect(subBtn.className).toContain("bg-rose-600");
        });
    });
});
