import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StandardCalculator } from "@/features/standard-calculator/components/StandardCalculator";
import { ScientificCalculator } from "@/features/scientific-calculator/components/ScientificCalculator";
import { TabPills } from "@/components/molecules/TabPills";
import { CopyButton } from "@/components/molecules/CopyButton";

describe("Accessibility (a11y) Verification", () => {
    it("StandardCalculator has an accessible live region for screen readers", () => {
        render(<StandardCalculator />);

        // Display screen live region
        const statusElement = screen.getByRole("status");
        expect(statusElement).toBeDefined();
        expect(statusElement.getAttribute("aria-live")).toBe("polite");
        expect(statusElement.getAttribute("aria-atomic")).toBe("true");

        // Region landmark for calculator display
        const regionElement = screen.getByRole("region", {
            name: /layar kalkulator/i,
        });
        expect(regionElement).toBeDefined();
    });

    it("StandardCalculator keypad buttons have descriptive aria-labels", () => {
        render(<StandardCalculator />);

        expect(
            screen.getByRole("button", { name: "Hapus semua" }),
        ).toBeDefined();
        expect(
            screen.getByRole("button", { name: "Ubah tanda plus minus" }),
        ).toBeDefined();
        expect(screen.getByRole("button", { name: "Persen" })).toBeDefined();
        expect(screen.getByRole("button", { name: "Bagi" })).toBeDefined();
        expect(screen.getByRole("button", { name: "Kali" })).toBeDefined();
        expect(screen.getByRole("button", { name: "Kurang" })).toBeDefined();
        expect(screen.getByRole("button", { name: "Tambah" })).toBeDefined();
        expect(
            screen.getByRole("button", { name: "Sama dengan" }),
        ).toBeDefined();
        expect(screen.getByRole("button", { name: "Angka 7" })).toBeDefined();
        expect(
            screen.getByRole("button", { name: "Lihat riwayat perhitungan" }),
        ).toBeDefined();
    });

    it("ScientificCalculator has accessible labels for scientific operators and angles", () => {
        render(<ScientificCalculator />);

        expect(
            screen.getByRole("region", { name: /layar kalkulator ilmiah/i }),
        ).toBeDefined();
        expect(
            screen.getByRole("button", { name: "Mode sudut derajat" }),
        ).toBeDefined();
        expect(
            screen.getByRole("button", { name: "Mode sudut radian" }),
        ).toBeDefined();
        expect(
            screen.getByRole("button", { name: "Fungsi inversi kedua" }),
        ).toBeDefined();
        expect(screen.getByRole("button", { name: "Pi" })).toBeDefined();
        expect(screen.getByRole("button", { name: "Sinus" })).toBeDefined();
    });

    it("TabPills complies with WAI-ARIA tablist and tab roles", () => {
        const tabs = [
            { id: "tab1", label: "Tab Satu" },
            { id: "tab2", label: "Tab Dua" },
        ];

        render(<TabPills tabs={tabs} activeTab="tab1" onChange={() => {}} />);

        const tablist = screen.getByRole("tablist");
        expect(tablist).toBeDefined();

        const activeTab = screen.getByRole("tab", { name: /tab satu/i });
        expect(activeTab.getAttribute("aria-selected")).toBe("true");

        const inactiveTab = screen.getByRole("tab", { name: /tab dua/i });
        expect(inactiveTab.getAttribute("aria-selected")).toBe("false");
    });

    it("CopyButton provides accessible aria-label", () => {
        render(<CopyButton textToCopy="12345" label="Salin Hasil" />);
        const button = screen.getByRole("button", {
            name: "Salin Salin Hasil",
        });
        expect(button).toBeDefined();
    });
});
