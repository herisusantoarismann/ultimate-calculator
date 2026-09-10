import type { Meta, StoryObj } from "@storybook/nextjs";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
    title: "Atoms/Input",
    component: Input,
    tags: ["autodocs"],
    argTypes: {
        label: { control: "text" },
        placeholder: { control: "text" },
        helperText: { control: "text" },
        prefixText: { control: "text" },
        suffixText: { control: "text" },
        error: { control: "text" },
        disabled: { control: "boolean" },
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        label: "Nominal",
        placeholder: "0",
        helperText: "Masukkan angka yang valid.",
    },
};

export const WithPrefix: Story = {
    args: {
        label: "Pinjaman Pokok",
        prefixText: "Rp",
        placeholder: "100.000.000",
        helperText: "Masukkan jumlah pinjaman pokok dalam Rupiah.",
    },
};

export const WithSuffix: Story = {
    args: {
        label: "Suku Bunga Tahunan",
        suffixText: "%",
        placeholder: "5.5",
        helperText: "Suku bunga efektif per tahun.",
    },
};

export const WithPrefixAndSuffix: Story = {
    args: {
        label: "Diskon",
        prefixText: "Rp",
        suffixText: "IDR",
        placeholder: "25.000",
    },
};

export const WithError: Story = {
    args: {
        label: "Jangka Waktu",
        suffixText: "Bulan",
        placeholder: "0",
        value: "0",
        error: "Jangka waktu harus lebih dari 0 bulan.",
    },
};

export const Disabled: Story = {
    args: {
        label: "Nilai Terkunci",
        placeholder: "Tidak bisa diubah",
        disabled: true,
        value: "Fixed Value 100",
    },
};
