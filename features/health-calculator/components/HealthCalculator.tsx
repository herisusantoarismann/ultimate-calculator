"use client";

import React, { useState } from "react";
import { HealthSubTab } from "@/types/common";
import { TabPills, TabPillItem } from "@/components/molecules/TabPills";
import { BMICalculator } from "./BMICalculator";
import { CalorieCalculator } from "./CalorieCalculator";
import { HeartPulse, Flame } from "lucide-react";

const HEALTH_TABS: TabPillItem<HealthSubTab>[] = [
    {
        id: "bmi",
        label: "Indeks Massa Tubuh (BMI)",
        icon: <HeartPulse className="w-4 h-4" />,
    },
    {
        id: "calorie",
        label: "Kalori Harian (BMR & TDEE)",
        icon: <Flame className="w-4 h-4" />,
    },
];

export const HealthCalculator: React.FC = () => {
    const [activeTab, setActiveTab] = useState<HealthSubTab>("bmi");

    return (
        <div className="space-y-6">
            <div className="flex justify-center">
                <TabPills
                    tabs={HEALTH_TABS}
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
