"use client";

import React, { useState } from "react";
import { FinancialSubTab } from "@/types/common";
import { TabPills, TabPillItem } from "@/components/molecules/TabPills";
import { LoanCalculator } from "./LoanCalculator";
import { CurrencyConverter } from "./CurrencyConverter";
import { TaxDiscountCalculator } from "./TaxDiscountCalculator";
import { Landmark, ArrowLeftRight, Tag } from "lucide-react";

const FINANCIAL_TABS: TabPillItem<FinancialSubTab>[] = [
    {
        id: "loan",
        label: "Pinjaman / KPR",
        icon: <Landmark className="w-4 h-4" />,
    },
    {
        id: "currency",
        label: "Konversi Mata Uang",
        icon: <ArrowLeftRight className="w-4 h-4" />,
        badge: "Live",
    },
    {
        id: "tax-discount",
        label: "Pajak & Diskon",
        icon: <Tag className="w-4 h-4" />,
    },
];

export const FinancialCalculator: React.FC = () => {
    const [activeTab, setActiveTab] = useState<FinancialSubTab>("loan");

    return (
        <div className="space-y-6">
            {/* Sub-tab Switcher */}
            <div className="flex justify-center">
                <TabPills
                    tabs={FINANCIAL_TABS}
                    activeTab={activeTab}
                    onChange={(tabId) => setActiveTab(tabId)}
                />
            </div>

            {/* Render Active Sub-Calculator */}
            <div className="animate-in fade-in duration-200">
                {activeTab === "loan" && <LoanCalculator />}
                {activeTab === "currency" && <CurrencyConverter />}
                {activeTab === "tax-discount" && <TaxDiscountCalculator />}
            </div>
        </div>
    );
};
