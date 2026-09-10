"use client";

import React, { useState } from "react";
import { HealthSubTab } from "@/types/common";
import { TabPills, TabPillItem } from "@/components/molecules/TabPills";
import { BMICalculator } from "./BMICalculator";
import { CalorieCalculator } from "./CalorieCalculator";
import { HeartPulse, Flame } from "lucide-react";

import { useTranslation } from "@/hooks/useTranslation";

export const HealthCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<HealthSubTab>("bmi");

    const tabs: TabPillItem<HealthSubTab>[] = [
        {
            id: "bmi",
            label: t.health.tabs.bmi,
            icon: <HeartPulse className="w-4 h-4" />,
        },
        {
            id: "calorie",
            label: t.health.tabs.calorie,
            icon: <Flame className="w-4 h-4" />,
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
                {activeTab === "bmi" && <BMICalculator />}
                {activeTab === "calorie" && <CalorieCalculator />}
            </div>
        </div>
    );
};
