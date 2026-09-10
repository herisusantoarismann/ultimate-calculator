"use client";

import React, { useState } from "react";
import { DateTimeSubTab } from "@/types/common";
import { TabPills, TabPillItem } from "@/components/molecules/TabPills";
import { DateDiffCalculator } from "./DateDiffCalculator";
import { DateAddSubCalculator } from "./DateAddSubCalculator";
import { CalendarDays, CalendarPlus } from "lucide-react";

import { useTranslation } from "@/hooks/useTranslation";

export const DateTimeCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<DateTimeSubTab>("diff");

    const tabs: TabPillItem<DateTimeSubTab>[] = [
        {
            id: "diff",
            label: t.dateTime.tabs.difference,
            icon: <CalendarDays className="w-4 h-4" />,
        },
        {
            id: "add-sub",
            label: t.dateTime.tabs.addSubtract,
            icon: <CalendarPlus className="w-4 h-4" />,
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-center">
                <TabPills
                    tabs={tabs}
                    activeTab={activeTab}
                    onChange={(tabId) => setActiveTab(tabId)}
                />
            </div>

            <div className="animate-in fade-in duration-200">
                {activeTab === "diff" && <DateDiffCalculator />}
                {activeTab === "add-sub" && <DateAddSubCalculator />}
            </div>
        </div>
    );
};
