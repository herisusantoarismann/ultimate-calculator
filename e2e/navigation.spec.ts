import { test, expect } from "@playwright/test";

test.describe("Category Navigation E2E", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("should display header brand and default to standard calculator", async ({
        page,
    }) => {
        await expect(page.getByText("Ultimate Calculator")).toBeVisible();
        await expect(
            page.getByRole("heading", { name: "Kalkulator Standar" }),
        ).toBeVisible();
    });

    test("should navigate between categories via desktop sidebar", async ({
        page,
    }) => {
        // Switch to Scientific Calculator
        await page
            .getByRole("button", { name: /Kalkulator Ilmiah/i })
            .first()
            .click();
        await expect(
            page.getByRole("heading", { name: "Kalkulator Ilmiah" }),
        ).toBeVisible();
        await expect(
            page.getByRole("button", { name: "Sinus", exact: true }),
        ).toBeVisible();

        // Switch to Financial Calculator
        await page
            .getByRole("button", { name: /Finansial & Bisnis/i })
            .first()
            .click();
        await expect(
            page.getByRole("heading", { name: "Finansial & Bisnis" }),
        ).toBeVisible();
        await expect(page.getByText("Parameter Pinjaman")).toBeVisible();

        // Switch to Health Calculator
        await page
            .getByRole("button", { name: /Kesehatan & Kebugaran/i })
            .first()
            .click();
        await expect(
            page.getByRole("heading", { name: "Kesehatan & Kebugaran" }),
        ).toBeVisible();
        await expect(page.getByText("Data Fisik & Antropometri")).toBeVisible();

        // Switch to Unit Converter
        await page
            .getByRole("button", { name: /Konversi Satuan/i })
            .first()
            .click();
        await expect(
            page.getByRole("heading", { name: "Konversi Satuan" }),
        ).toBeVisible();

        // Switch to Date & Time Calculator
        await page
            .getByRole("button", { name: /Waktu & Tanggal/i })
            .first()
            .click();
        await expect(
            page.getByRole("heading", { name: "Waktu & Tanggal" }),
        ).toBeVisible();
    });
});
