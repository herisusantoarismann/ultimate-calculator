import { test, expect } from "@playwright/test";

test.describe("Standard Calculator E2E", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("should perform basic arithmetic calculation: 12 + 8 = 20", async ({
        page,
    }) => {
        // Click 1, 2
        await page.getByRole("button", { name: "Angka 1" }).click();
        await page.getByRole("button", { name: "Angka 2" }).click();

        // Click +
        await page.getByRole("button", { name: "Tambah" }).click();

        // Click 8
        await page.getByRole("button", { name: "Angka 8" }).click();

        // Click =
        await page.getByRole("button", { name: "Sama dengan" }).click();

        // Check display
        const display = page.getByRole("status");
        await expect(display).toHaveText("20");
    });

    test("should clear display when AC is clicked", async ({ page }) => {
        await page.getByRole("button", { name: "Angka 9" }).click();
        await page.getByRole("button", { name: "Angka 5" }).click();

        await page.getByRole("button", { name: "Hapus semua" }).click();

        const display = page.getByRole("status");
        await expect(display).toHaveText("0");
    });

    test("should support physical keyboard typing", async ({ page }) => {
        // Focus somewhere in the page
        await page.locator("body").click();

        // Type 5 * 6 =
        await page.keyboard.press("5");
        await page.keyboard.press("*");
        await page.keyboard.press("6");
        await page.keyboard.press("Enter");

        const display = page.getByRole("status");
        await expect(display).toHaveText("30");
    });

    test("should open and close history drawer", async ({ page }) => {
        // Perform calculation
        await page.getByRole("button", { name: "Angka 4" }).click();
        await page.getByRole("button", { name: "Tambah" }).click();
        await page.getByRole("button", { name: "Angka 3" }).click();
        await page.getByRole("button", { name: "Sama dengan" }).click();

        // Open history
        await page
            .getByRole("button", { name: "Lihat riwayat perhitungan" })
            .click();

        // Verify history drawer is visible
        await expect(page.getByText("Riwayat Perhitungan")).toBeVisible();
        await expect(page.getByText("4 + 3")).toBeVisible();

        // Close history drawer
        await page.getByRole("button", { name: /tutup riwayat/i }).click();
        await expect(page.getByText("Riwayat Perhitungan")).not.toBeVisible();
    });
});
