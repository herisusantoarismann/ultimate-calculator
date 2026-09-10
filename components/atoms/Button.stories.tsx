import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./Button";
import { Calculator } from "lucide-react";

const meta: Meta<typeof Button> = {
    title: "Atoms/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: [
                "primary",
                "secondary",
                "danger",
                "ghost",
                "outline",
                "gradient",
            ],
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: "Hitung Sekarang",
        variant: "primary",
    },
};

export const Gradient: Story = {
    args: {
        children: "Hasil Perhitungan (=)",
        variant: "gradient",
    },
};

export const Secondary: Story = {
    args: {
        children: "Batal",
        variant: "secondary",
    },
};

export const Danger: Story = {
    args: {
        children: "Hapus Semua",
        variant: "danger",
    },
};

export const WithIcon: Story = {
    args: {
        children: "Kalkulator",
        variant: "primary",
        icon: <Calculator className="w-4 h-4" />,
    },
};
