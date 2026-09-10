export type Locale = "id" | "en";

export interface TranslationSchema {
    common: {
        brand: string;
        proWeb: string;
        skipToContent: string;
        themeLight: string;
        themeDark: string;
        langSwitch: string;
        loading: string;
        copy: string;
        copied: string;
        copiedToClipboard: string;
        copyToClipboard: string;
        delete: string;
        clear: string;
        close: string;
        results: string;
        calculate: string;
        reset: string;
        history: string;
        viewHistory: string;
        noHistory: string;
        clearHistory: string;
        deleteDigit: string;
        backspace: string;
        keyboardReady: string;
        keyboardHint: string;
        footerNote: string;
        version: string;
    };
    nav: {
        categories: string;
        selectCalculator: string;
        closeMenu: string;
        openMenu: string;
        standard: {
            name: string;
            description: string;
        };
        scientific: {
            name: string;
            description: string;
        };
        financial: {
            name: string;
            description: string;
        };
        health: {
            name: string;
            description: string;
        };
        converter: {
            name: string;
            description: string;
        };
        dateTime: {
            name: string;
            description: string;
        };
    };
    standard: {
        title: string;
        displayLabel: string;
        historyTitle: string;
        historyEmpty: string;
        historyClose: string;
        backToCalculator: string;
        clearHistoryConfirm: string;
        buttons: {
            clear: string;
            delete: string;
            divide: string;
            multiply: string;
            subtract: string;
            add: string;
            equals: string;
            percent: string;
            negate: string;
            decimal: string;
        };
    };
    scientific: {
        title: string;
        displayLabel: string;
        deg: string;
        rad: string;
        mode: string;
        degMode: string;
        radMode: string;
        inverse: string;
        inverseToggle: string;
        deleteDigit: string;
        memoryClear: string;
        memoryRecall: string;
        memoryAdd: string;
        memorySubtract: string;
        errorInvalidExpr: string;
    };
    financial: {
        title: string;
        tabs: {
            mortgage: string;
            currency: string;
            discount: string;
        };
        mortgage: {
            paramsTitle: string;
            annuity: string;
            flat: string;
            principalLabel: string;
            interestRate: string;
            loanTerm: string;
            estimatedInstallment: string;
            monthlyPayment: string;
            totalInterest: string;
            totalPayment: string;
            years: string;
            months: string;
            breakdown: string;
            amortizationSchedule: string;
            hideSchedule: string;
            showSchedule: string;
            yearCol: string;
            principalCol: string;
            interestCol: string;
            balanceCol: string;
        };
        currency: {
            paramsTitle: string;
            amount: string;
            from: string;
            to: string;
            swap: string;
            convertedResult: string;
            rateInfo: string;
            lastUpdated: string;
            ratesLive: string;
            ratesOffline: string;
            popularPairs: string;
        };
        discount: {
            paramsTitle: string;
            originalPrice: string;
            mainDiscount: string;
            extraDiscount: string;
            taxPercentage: string;
            applyTax: string;
            receiptTitle: string;
            priceAfterDiscount: string;
            finalPrice: string;
            totalNet: string;
            savings: string;
            taxAmount: string;
        };
    };
    health: {
        title: string;
        tabs: {
            bmi: string;
            calorie: string;
        };
        bmi: {
            physicalData: string;
            weight: string;
            height: string;
            age: string;
            gender: string;
            male: string;
            female: string;
            bmiResultTitle: string;
            yourBmi: string;
            statusLabel: string;
            underweight: string;
            normal: string;
            overweight: string;
            obese: string;
            healthyRange: string;
            idealRange: string;
            adviceUnderweight: string;
            adviceNormal: string;
            adviceOverweight: string;
            adviceObese: string;
        };
        calorie: {
            paramsTitle: string;
            age: string;
            activityLevel: string;
            tdeeTitle: string;
            bmrResult: string;
            tdeeResult: string;
            maintenance: string;
            cutting: string;
            bulking: string;
            deficitNote: string;
            surplusNote: string;
            sedentary: string;
            light: string;
            moderate: string;
            heavy: string;
            athlete: string;
        };
    };
    converter: {
        title: string;
        paramsTitle: string;
        from: string;
        to: string;
        input: string;
        output: string;
        swap: string;
        quickMatrix: string;
        categories: {
            length: string;
            weight: string;
            temperature: string;
            time: string;
        };
    };
    dateTime: {
        title: string;
        tabs: {
            difference: string;
            addSubtract: string;
        };
        difference: {
            title: string;
            startDate: string;
            endDate: string;
            includeEndDay: string;
            totalDays: string;
            workdays: string;
            weekends: string;
            calendarBreakdown: string;
            days: string;
            months: string;
            years: string;
        };
        addSubtract: {
            title: string;
            baseDate: string;
            operation: string;
            add: string;
            subtract: string;
            amount: string;
            timeUnit: string;
            targetDate: string;
            days: string;
            weeks: string;
            months: string;
            years: string;
        };
    };
}
