import type { Meta, StoryObj } from "@storybook/nextjs";
import { LanguageToggle } from "./LanguageToggle";
import { LanguageProvider } from "@/context/LanguageContext";

const meta: Meta<typeof LanguageToggle> = {
    title: "Molecules/LanguageToggle",
    component: LanguageToggle,
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <LanguageProvider>
                <div className="p-4 flex items-center gap-4">
                    <Story />
                </div>
            </LanguageProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof LanguageToggle>;

export const Default: Story = {};
