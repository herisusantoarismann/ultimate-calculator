// Formatting utilities for Numbers, Currencies, and Dates

export function formatCurrency(
    amount: number,
    currencyCode: string = "IDR",
): string {
    if (isNaN(amount)) return "0";

    if (currencyCode === "IDR") {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(amount);
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyCode,
        maximumFractionDigits: 2,
    }).format(amount);
}

export function formatNumber(val: number, maxDecimals: number = 4): string {
    if (isNaN(val)) return "0";
    if (!isFinite(val)) return val.toString();

    // If integer
    if (Number.isInteger(val)) {
        return new Intl.NumberFormat("id-ID").format(val);
    }

    // Float
    return new Intl.NumberFormat("id-ID", {
        maximumFractionDigits: maxDecimals,
    }).format(val);
}

export function formatDateLocale(
    date: Date,
    locale: "id" | "en" = "id",
): string {
    const intlLocale = locale === "en" ? "en-US" : "id-ID";
    return new Intl.DateTimeFormat(intlLocale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
}

export function formatDateIndo(date: Date): string {
    return formatDateLocale(date, "id");
}

export function calculateDateDiff(
    startDate: Date,
    endDate: Date,
    includeEndDay: boolean = false,
) {
    // Normalize to UTC midnight
    const start = new Date(
        Date.UTC(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate(),
        ),
    );
    const end = new Date(
        Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()),
    );

    const isReverse = start > end;
    const from = isReverse ? end : start;
    const to = isReverse ? start : end;

    const msPerDay = 1000 * 60 * 60 * 24;
    let totalDays = Math.round((to.getTime() - from.getTime()) / msPerDay);
    if (includeEndDay) {
        totalDays += 1;
    }

    // Breakdown in Years, Months, Days
    let years = to.getUTCFullYear() - from.getUTCFullYear();
    let months = to.getUTCMonth() - from.getUTCMonth();
    let days = to.getUTCDate() - from.getUTCDate();

    if (days < 0) {
        months -= 1;
        // Days in previous month
        const prevMonth = new Date(
            Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), 0),
        );
        days += prevMonth.getUTCDate();
    }

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    const weeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;

    // Weekdays (Monday-Friday)
    let weekdaysCount = 0;
    const cur = new Date(from);
    const endLimit = new Date(to);
    if (includeEndDay) {
        endLimit.setDate(endLimit.getDate() + 1);
    }
    while (cur < endLimit) {
        const dayOfWeek = cur.getUTCDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            weekdaysCount++;
        }
        cur.setDate(cur.getDate() + 1);
    }

    return {
        totalDays,
        years,
        months,
        days,
        weeks,
        remainingDays,
        weekdaysCount,
        isReverse,
    };
}

export function addSubtractDate(
    baseDate: Date,
    amount: number,
    operation: "add" | "subtract",
    unit: "days" | "weeks" | "months" | "years",
): Date {
    const result = new Date(baseDate);
    const factor = operation === "add" ? 1 : -1;
    const value = amount * factor;

    switch (unit) {
        case "days":
            result.setDate(result.getDate() + value);
            break;
        case "weeks":
            result.setDate(result.getDate() + value * 7);
            break;
        case "months":
            result.setMonth(result.getMonth() + value);
            break;
        case "years":
            result.setFullYear(result.getFullYear() + value);
            break;
    }

    return result;
}
