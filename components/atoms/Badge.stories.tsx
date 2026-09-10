import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "./Badge";
import { Sparkles } from "lucide-react";

const meta: Meta<typeof Badge> = {
    title: "Atoms/Badge",
    component: Badge,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "primary", "success", "warning", "danger"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    args: {
        children: "Default Badge",
        variant: "default",
    },
};

export const Primary: Story = {
    args: {
        children: "Pro Web",
        variant: "primary",
    },
};

export const Success: Story = {
    args: {
        children: "Ideal (18.5 - 24.9)",
        variant: "success",
    },
};

export const Warning: Story = {
    args: {
        children: "Kelebihan Berat Badan",
        variant: "warning",
    },
};

export const Danger: Story = {
    args: {
        children: "Obesitas",
        variant: "danger",
    },
};

export const WithIcon: Story = {
    args: {
        children: (
            <>
                <Sparkles className="w-3 h-3 mr-1" />
                Featured
            </>
        ),
        variant: "primary",
    },
};
