"use client";

import React, { useState } from "react";
import { DateTimeSubTab } from "@/types/common";
import { TabPills, TabPillItem } from "@/components/molecules/TabPills";
import { DateDiffCalculator } from "./DateDiffCalculator";
import { DateAddSubCalculator } from "./DateAddSubCalculator";
import { CalendarDays, CalendarPlus } from "lucide-react";

const DATE_TABS: TabPillItem<DateTimeSubTab>[] = [
    {
        id: "diff",
        label: "Selisih Dua Tanggal",
        icon: <CalendarDays className="w-4 h-4" />,
    },
    {
        id: "add-sub",
        label: "Tambah / Kurang Hari",
        icon: <CalendarPlus className="w-4 h-4" />,
    },
];

export const DateTimeCalculator: React.FC = () => {
    const [activeTab, setActiveTab] = useState<DateTimeSubTab>("diff");

    return (
        <div className="space-y-6">
            <div className="flex justify-center">
                <TabPills
                    tabs={DATE_TABS}
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
