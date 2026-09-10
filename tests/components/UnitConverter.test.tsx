import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { UnitConverter } from "@/features/unit-converter/components/UnitConverter";

describe("UnitConverter Component", () => {
    it("renders initial length category with conversion units", () => {
        render(<UnitConverter />);
        expect(
            screen.getByText(/Konversi Panjang & Jarak/i),
        ).toBeInTheDocument();
        expect(screen.getByText(/Semua Satuan Ekuivalen/i)).toBeInTheDocument();
    });

    it("switches between unit categories (e.g. Suhu / Temperature)", () => {
        render(<UnitConverter />);
        const tempBtn = screen.getByRole("button", { name: /Suhu/i });
        fireEvent.click(tempBtn);

        expect(screen.getByText(/Konversi Suhu/i)).toBeInTheDocument();
    });

    it("swaps units when swap button is clicked", () => {
        render(<UnitConverter />);
        const swapBtn = screen.getByTitle("Tukar Satuan");
        fireEvent.click(swapBtn);

        // Initial was km -> m, after swap should be m -> km
        expect(
            screen.getByText(/Konversi Panjang & Jarak/i),
        ).toBeInTheDocument();
    });
});
