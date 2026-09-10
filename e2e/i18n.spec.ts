import { test, expect } from "@playwright/test";

test.describe("Dual Language (i18n) E2E", () => {
    test.beforeEach(async ({ page }) => {
        // Clear storage to start with default locale
        await page.goto("/");
        await page.evaluate(() => localStorage.clear());
        await page.reload();
    });

    test("should load default Indonesian interface", async ({ page }) => {
        // HTML lang attribute
        const html = page.locator("html");
        await expect(html).toHaveAttribute("lang", "id");

        // Check Indonesian navigation and header text
        await expect(
            page.getByText("Kategori", { exact: true }).first(),
        ).toBeVisible();
        await expect(
            page.getByRole("heading", { name: "Kalkulator Standar" }),
        ).toBeVisible();

        // Language toggle shows ID
        const langBtn = page.getByRole("button", {
            name: /ganti bahasa/i,
        });
        await expect(langBtn).toBeVisible();
        await expect(langBtn).toContainText("ID");
    });

    test("should toggle language from Indonesian to English and persist on reload", async ({
        page,
    }) => {
        const langBtn = page.getByRole("button", {
            name: /ganti bahasa/i,
        });
        await langBtn.click();

        // Check English UI changes
        const html = page.locator("html");
        await expect(html).toHaveAttribute("lang", "en");

        await expect(
            page.getByText("Categories", { exact: true }).first(),
        ).toBeVisible();
        await expect(
            page.getByRole("heading", { name: "Standard Calculator" }),
        ).toBeVisible();

        const enLangBtn = page.getByRole("button", {
            name: /switch language/i,
        });
        await expect(enLangBtn).toBeVisible();
        await expect(enLangBtn).toContainText("EN");

        // Reload page to test localStorage persistence
        await page.reload();

        await expect(html).toHaveAttribute("lang", "en");
        await expect(
            page.getByText("Categories", { exact: true }).first(),
        ).toBeVisible();
        await expect(
            page.getByRole("heading", { name: "Standard Calculator" }),
        ).toBeVisible();
        await expect(
            page.getByRole("button", { name: /switch language/i }),
        ).toContainText("EN");

        // Switch back to Indonesian
        await page.getByRole("button", { name: /switch language/i }).click();

        await expect(html).toHaveAttribute("lang", "id");
        await expect(
            page.getByText("Kategori", { exact: true }).first(),
        ).toBeVisible();
        await expect(
            page.getByRole("heading", { name: "Kalkulator Standar" }),
        ).toBeVisible();
        await expect(
            page.getByRole("button", { name: /ganti bahasa/i }),
        ).toContainText("ID");
    });

    test("should translate calculator features when navigating in English", async ({
        page,
    }) => {
        // Toggle to English
        const langBtn = page.getByRole("button", {
            name: /ganti bahasa/i,
        });
        await langBtn.click();

        // Navigate to Financial calculator
        await page
            .getByRole("button", { name: /Financial & Business/i })
            .click();
        await expect(page.getByText("Loan Parameters")).toBeVisible();
        await expect(page.getByText("Estimated Installment")).toBeVisible();

        // Navigate to Unit Converter
        await page.getByRole("button", { name: /Unit Converter/i }).click();
        await expect(
            page.getByText(/Length & Distance Conversion/i),
        ).toBeVisible();
        await expect(
            page.getByText(/Quick Conversion Matrix/i),
        ).toBeVisible();
    });
});
