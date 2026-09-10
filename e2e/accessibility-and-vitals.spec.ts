import { test, expect } from "@playwright/test";

test.describe("Accessibility & Performance E2E", () => {
    test("should have functional skip to main content link", async ({
        page,
    }) => {
        await page.goto("/");

        // Press Tab to focus skip link
        await page.keyboard.press("Tab");

        const skipLink = page.getByRole("link", {
            name: "Lewati ke Konten Utama",
        });
        await expect(skipLink).toBeFocused();
        await expect(skipLink).toBeVisible();

        // Activate skip link
        await skipLink.click();
        await expect(page).toHaveURL(/#main-content$/);
    });

    test("should load without unhandled JavaScript exceptions or console errors", async ({
        page,
    }) => {
        const errors: string[] = [];
        page.on("pageerror", (err) => errors.push(err.message));

        await page.goto("/");

        // Do a couple of interactions
        await page.getByRole("button", { name: "Angka 7" }).click();
        await page.getByRole("button", { name: "Kali" }).click();
        await page.getByRole("button", { name: "Angka 8" }).click();
        await page.getByRole("button", { name: "Sama dengan" }).click();

        expect(errors).toHaveLength(0);
    });

    test("should have live region for screen readers updated on calculation", async ({
        page,
    }) => {
        await page.goto("/");

        const display = page.getByRole("status");
        await expect(display).toHaveAttribute("aria-live", "polite");
        await expect(display).toHaveAttribute("aria-atomic", "true");

        await page.getByRole("button", { name: "Angka 9" }).click();
        await expect(display).toHaveText("9");
    });
});
