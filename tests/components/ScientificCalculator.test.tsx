import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ScientificCalculator } from "@/features/scientific-calculator/components/ScientificCalculator";

describe("ScientificCalculator Component", () => {
    it("renders scientific controls and initial display", () => {
        render(<ScientificCalculator />);
        expect(
            screen.getByRole("button", { name: "Mode sudut derajat" }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Mode sudut radian" }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Fungsi inversi kedua" }),
        ).toBeInTheDocument();
    });

    it("switches angle units between DEG and RAD", () => {
        render(<ScientificCalculator />);
        const radBtn = screen.getByRole("button", {
            name: "Mode sudut radian",
        });
        const degBtn = screen.getByRole("button", {
            name: "Mode sudut derajat",
        });

        fireEvent.click(radBtn);
        expect(radBtn.className).toContain("text-indigo-600");

        fireEvent.click(degBtn);
        expect(degBtn.className).toContain("text-indigo-600");
    });

    it("toggles inverse trigonometric functions with 2nd button", () => {
        render(<ScientificCalculator />);
        const secondBtn = screen.getByRole("button", {
            name: "Fungsi inversi kedua",
        });

        expect(
            screen.getByRole("button", { name: "Sinus" }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Logaritma natural" }),
        ).toBeInTheDocument();

        fireEvent.click(secondBtn);

        expect(
            screen.getByRole("button", { name: "Arkus sinus" }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Eksponen e pangkat x" }),
        ).toBeInTheDocument();
    });

    it("evaluates sqrt function", () => {
        render(<ScientificCalculator />);
        const sqrtBtn = screen.getByRole("button", { name: "Akar kuadrat" });
        const btn9 = screen.getByRole("button", { name: "Angka 9" });
        const closeParen = screen.getByRole("button", { name: "Tutup kurung" });
        const equalsBtn = screen.getByRole("button", { name: "Sama dengan" });

        fireEvent.click(sqrtBtn);
        fireEvent.click(btn9);
        fireEvent.click(closeParen);
        fireEvent.click(equalsBtn);

        expect(
            screen.getByText("3", { selector: ".font-mono" }),
        ).toBeInTheDocument();
    });
});
