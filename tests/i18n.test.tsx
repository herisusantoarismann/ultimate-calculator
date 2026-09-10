import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { id, en } from "@/locales";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "@/components/molecules/LanguageToggle";
import { STORAGE_KEYS } from "@/lib/constants";

// Helper to recursively collect all keys of an object
function getDeepKeys(obj: Record<string, unknown>, prefix = ""): string[] {
    return Object.keys(obj).reduce((res: string[], el) => {
        const fullKey = prefix ? `${prefix}.${el}` : el;
        const val = obj[el];
        if (typeof val === "object" && val !== null && !Array.isArray(val)) {
            res.push(...getDeepKeys(val as Record<string, unknown>, fullKey));
        } else {
            res.push(fullKey);
        }
        return res;
    }, []);
}

describe("i18n Dictionary Parity", () => {
    it("has identical keys between Indonesian (id) and English (en)", () => {
        const idKeys = getDeepKeys(
            id as unknown as Record<string, unknown>,
        ).sort();
        const enKeys = getDeepKeys(
            en as unknown as Record<string, unknown>,
        ).sort();

        expect(idKeys).toEqual(enKeys);
    });

    it("has non-empty string values for all keys in Indonesian", () => {
        const idKeys = getDeepKeys(id as unknown as Record<string, unknown>);
        for (const key of idKeys) {
            const val = key
                .split(".")
                .reduce(
                    (o: Record<string, unknown> | undefined, k) =>
                        o
                            ? (o[k] as Record<string, unknown> | undefined)
                            : undefined,
                    id as unknown as Record<string, unknown>,
                );
            expect(typeof val).toBe("string");
            expect((val as unknown as string).trim().length).toBeGreaterThan(0);
        }
    });

    it("has non-empty string values for all keys in English", () => {
        const enKeys = getDeepKeys(en as unknown as Record<string, unknown>);
        for (const key of enKeys) {
            const val = key
                .split(".")
                .reduce(
                    (o: Record<string, unknown> | undefined, k) =>
                        o
                            ? (o[k] as Record<string, unknown> | undefined)
                            : undefined,
                    en as unknown as Record<string, unknown>,
                );
            expect(typeof val).toBe("string");
            expect((val as unknown as string).trim().length).toBeGreaterThan(0);
        }
    });
});

describe("LanguageContext and Hooks", () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.lang = "id";
    });

    const TestConsumer: React.FC = () => {
        const { locale, setLocale, toggleLocale, t } = useLanguage();
        return (
            <div>
                <span data-testid="current-locale">{locale}</span>
                <span data-testid="brand-name">{t.common.brand}</span>
                <span data-testid="select-calc">{t.nav.selectCalculator}</span>
                <button
                    data-testid="btn-toggle"
                    type="button"
                    onClick={toggleLocale}
                >
                    Toggle
                </button>
                <button
                    data-testid="btn-set-en"
                    type="button"
                    onClick={() => setLocale("en")}
                >
                    Set EN
                </button>
                <button
                    data-testid="btn-set-id"
                    type="button"
                    onClick={() => setLocale("id")}
                >
                    Set ID
                </button>
            </div>
        );
    };

    it("initializes with default locale 'id' when no storage exists", () => {
        render(
            <LanguageProvider>
                <TestConsumer />
            </LanguageProvider>,
        );

        expect(screen.getByTestId("current-locale").textContent).toBe("id");
        expect(screen.getByTestId("select-calc").textContent).toBe(
            "Pilih Kalkulator",
        );
        expect(document.documentElement.lang).toBe("id");
    });

    it("restores locale from localStorage if set to 'en'", () => {
        localStorage.setItem(STORAGE_KEYS.LANGUAGE, "en");

        render(
            <LanguageProvider>
                <TestConsumer />
            </LanguageProvider>,
        );

        expect(screen.getByTestId("current-locale").textContent).toBe("en");
        expect(screen.getByTestId("select-calc").textContent).toBe(
            "Select Calculator",
        );
        expect(document.documentElement.lang).toBe("en");
    });

    it("switches language when toggled and persists to localStorage & document.documentElement.lang", () => {
        render(
            <LanguageProvider>
                <TestConsumer />
            </LanguageProvider>,
        );

        expect(screen.getByTestId("current-locale").textContent).toBe("id");

        // Toggle to EN
        fireEvent.click(screen.getByTestId("btn-toggle"));

        expect(screen.getByTestId("current-locale").textContent).toBe("en");
        expect(screen.getByTestId("select-calc").textContent).toBe(
            "Select Calculator",
        );
        expect(localStorage.getItem(STORAGE_KEYS.LANGUAGE)).toBe("en");
        expect(document.documentElement.lang).toBe("en");

        // Toggle back to ID
        fireEvent.click(screen.getByTestId("btn-toggle"));

        expect(screen.getByTestId("current-locale").textContent).toBe("id");
        expect(screen.getByTestId("select-calc").textContent).toBe(
            "Pilih Kalkulator",
        );
        expect(localStorage.getItem(STORAGE_KEYS.LANGUAGE)).toBe("id");
        expect(document.documentElement.lang).toBe("id");
    });

    it("allows direct setLocale calls", () => {
        render(
            <LanguageProvider>
                <TestConsumer />
            </LanguageProvider>,
        );

        fireEvent.click(screen.getByTestId("btn-set-en"));
        expect(screen.getByTestId("current-locale").textContent).toBe("en");

        fireEvent.click(screen.getByTestId("btn-set-id"));
        expect(screen.getByTestId("current-locale").textContent).toBe("id");
    });
});

describe("LanguageToggle Component", () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.lang = "id";
    });

    it("renders toggle button with current locale indicator and toggles on click", () => {
        render(
            <LanguageProvider>
                <LanguageToggle />
            </LanguageProvider>,
        );

        const button = screen.getByRole("button");
        expect(button).toBeDefined();
        expect(button.textContent).toContain("ID");

        fireEvent.click(button);
        expect(button.textContent).toContain("EN");
        expect(button.getAttribute("aria-label")).toContain("Bahasa Indonesia");

        fireEvent.click(button);
        expect(button.textContent).toContain("ID");
        expect(button.getAttribute("aria-label")).toContain("English");
    });
});
