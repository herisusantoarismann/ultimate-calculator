import type { Meta, StoryObj } from "@storybook/nextjs";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
    title: "Atoms/Card",
    component: Card,
    tags: ["autodocs"],
    argTypes: {
        glow: {
            control: "boolean",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
    args: {
        children: (
            <div className="p-6">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    Kartu Standar
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Ini adalah konten di dalam kartu dengan glassmorphism
                    styling dan border halus.
                </p>
            </div>
        ),
    },
};

export const WithGlow: Story = {
    args: {
        glow: true,
        children: (
            <div className="p-6">
                <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    Kartu dengan Glow Hover
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Arahkan kursor (hover) di atas kartu ini untuk melihat efek
                    glow border dan shadow indigo.
                </p>
            </div>
        ),
    },
};
