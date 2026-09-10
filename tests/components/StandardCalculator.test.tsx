import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { StandardCalculator } from "@/features/standard-calculator/components/StandardCalculator";

describe("StandardCalculator Component", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it("renders initial display with 0", () => {
        render(<StandardCalculator />);
        expect(
            screen.getByText("0", { selector: ".font-mono" }),
        ).toBeInTheDocument();
    });

    it("handles digit inputs", () => {
        render(<StandardCalculator />);
        const btn7 = screen.getByRole("button", { name: /7/ });
        const btn5 = screen.getByRole("button", { name: /5/ });

        fireEvent.click(btn7);
        fireEvent.click(btn5);

        expect(
            screen.getByText("75", { selector: ".font-mono" }),
        ).toBeInTheDocument();
    });

    it("performs addition and displays result", () => {
        render(<StandardCalculator />);
        const btn8 = screen.getByRole("button", { name: /8/ });
        const btnPlus = screen.getByRole("button", { name: /\+|tambah/i });
        const btn2 = screen.getByRole("button", { name: /2/ });
        const btnEquals = screen.getByRole("button", {
            name: /=|sama dengan/i,
        });

        fireEvent.click(btn8);
        fireEvent.click(btnPlus);
        fireEvent.click(btn2);
        fireEvent.click(btnEquals);

        expect(
            screen.getByText("10", { selector: ".font-mono" }),
        ).toBeInTheDocument();
    });

    it("resets display when AC (Clear) is clicked", () => {
        render(<StandardCalculator />);
        const btn9 = screen.getByRole("button", { name: /9/ });
        const btnClear = screen.getByRole("button", {
            name: /AC|hapus semua/i,
        });

        fireEvent.click(btn9);
        expect(
            screen.getByText("9", { selector: ".font-mono" }),
        ).toBeInTheDocument();

        fireEvent.click(btnClear);
        expect(
            screen.getByText("0", { selector: ".font-mono" }),
        ).toBeInTheDocument();
    });

    it("toggles sign with ± button", () => {
        render(<StandardCalculator />);
        const btn5 = screen.getByRole("button", { name: /5/ });
        const btnToggle = screen.getByRole("button", { name: /±|ubah tanda/i });

        fireEvent.click(btn5);
        fireEvent.click(btnToggle);
        expect(
            screen.getByText("-5", { selector: ".font-mono" }),
        ).toBeInTheDocument();

        fireEvent.click(btnToggle);
        expect(
            screen.getByText("5", { selector: ".font-mono" }),
        ).toBeInTheDocument();
    });

    it("opens and closes history drawer", () => {
        render(<StandardCalculator />);
        const historyBtn = screen.getByRole("button", { name: /riwayat/i });
        fireEvent.click(historyBtn);

        expect(screen.getByText(/Riwayat Perhitungan/i)).toBeInTheDocument();

        const closeBtn = screen.getByRole("button", {
            name: /tutup riwayat/i,
        });
        fireEvent.click(closeBtn);

        expect(
            screen.queryByText(/Riwayat Perhitungan/i),
        ).not.toBeInTheDocument();
    });
});
