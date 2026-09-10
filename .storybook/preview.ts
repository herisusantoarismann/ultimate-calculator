import type { Preview } from "@storybook/nextjs";
import "../app/globals.css";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            options: {
                dark: { name: "dark", value: "#090d16" },
                light: { name: "light", value: "#f8fafc" }
            }
        },
    },

    initialGlobals: {
        backgrounds: {
            value: "dark"
        }
    }
};

export default preview;
