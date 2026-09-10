import type { Meta, StoryObj } from "@storybook/nextjs";
import { IconButton } from "./IconButton";
import { Trash2, Copy, Settings, Check } from "lucide-react";

const meta: Meta<typeof IconButton> = {
    title: "Atoms/IconButton",
    component: IconButton,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["ghost", "secondary", "primary", "danger"],
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Ghost: Story = {
    args: {
        "aria-label": "Salin ke papan klip",
        icon: <Copy className="w-4 h-4" />,
        variant: "ghost",
        size: "md",
    },
};

export const Secondary: Story = {
    args: {
        "aria-label": "Pengaturan",
        icon: <Settings className="w-4 h-4" />,
        variant: "secondary",
        size: "md",
    },
};

export const Primary: Story = {
    args: {
        "aria-label": "Konfirmasi",
        icon: <Check className="w-4 h-4" />,
        variant: "primary",
        size: "md",
    },
};

export const Danger: Story = {
    args: {
        "aria-label": "Hapus item",
        icon: <Trash2 className="w-4 h-4" />,
        variant: "danger",
        size: "md",
    },
};

export const Small: Story = {
    args: {
        "aria-label": "Salin kecil",
        icon: <Copy className="w-3.5 h-3.5" />,
        variant: "secondary",
        size: "sm",
    },
};

export const Large: Story = {
    args: {
        "aria-label": "Pengaturan besar",
        icon: <Settings className="w-5 h-5" />,
        variant: "ghost",
        size: "lg",
    },
};
