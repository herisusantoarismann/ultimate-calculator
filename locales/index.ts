import { id } from "./id";
import { en } from "./en";
import { Locale, TranslationSchema } from "@/types/i18n";

export const translations: Record<Locale, TranslationSchema> = {
    id,
    en,
};

export const DEFAULT_LOCALE: Locale = "id";

export { id, en };
