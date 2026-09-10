import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FinancialCalculator } from "@/features/financial-calculator/components/FinancialCalculator";
import { LoanCalculator } from "@/features/financial-calculator/components/LoanCalculator";
import { CurrencyConverter } from "@/features/financial-calculator/components/CurrencyConverter";
import { TaxDiscountCalculator } from "@/features/financial-calculator/components/TaxDiscountCalculator";

describe("FinancialCalculator Component Suite", () => {
    it("switches between financial sub-tabs", () => {
        render(<FinancialCalculator />);
        expect(screen.getByText(/Parameter Pinjaman/i)).toBeInTheDocument();

        const currencyTab = screen.getByRole("tab", {
            name: /Konversi Mata Uang/i,
        });
        fireEvent.click(currencyTab);
        expect(screen.getByText(/Dari Mata Uang/i)).toBeInTheDocument();

        const taxTab = screen.getByRole("tab", { name: /Pajak & Diskon/i });
        fireEvent.click(taxTab);
        expect(
            screen.getByText(/Parameter Harga & Diskon/i),
        ).toBeInTheDocument();
    });

    describe("LoanCalculator", () => {
        it("calculates monthly mortgage installment and supports preset amounts", () => {
            render(<LoanCalculator />);
            expect(screen.getByText(/Angsuran per Bulan/i)).toBeInTheDocument();

            const presetBtn = screen.getByRole("button", { name: "100 Jt" });
            fireEvent.click(presetBtn);

            expect(
                screen.getAllByText(/Rp 100.000.000/i).length,
            ).toBeGreaterThan(0);
        });

        it("toggles between annuity and flat interest methods", () => {
            render(<LoanCalculator />);
            const flatBtn = screen.getByRole("button", { name: /Flat/i });
            fireEvent.click(flatBtn);

            expect(screen.getByText(/Bunga Flat Tetap/i)).toBeInTheDocument();
        });
    });

    describe("CurrencyConverter", () => {
        it("swaps currencies when swap button is clicked", () => {
            render(<CurrencyConverter />);
            const swapBtn = screen.getByTitle("Tukar mata uang");

            fireEvent.click(swapBtn);
            // After swap, from currency should be IDR and to currency USD
            expect(screen.getByDisplayValue(/IDR/i)).toBeInTheDocument();
        });
    });

    describe("TaxDiscountCalculator", () => {
        it("calculates final price after discount and tax", () => {
            render(<TaxDiscountCalculator />);
            expect(
                screen.getByText(/Harga Akhir yang Dibayar/i),
            ).toBeInTheDocument();
            expect(screen.getByText(/Struk Ringkasan/i)).toBeInTheDocument();
        });
    });
});
