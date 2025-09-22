import { createI18nApi, declareComponentKeys } from "i18nifty";
import { languages, fallbackLanguage } from "./types";
import type { ComponentKey } from "./types";
export { declareComponentKeys };

export type LocalizedString = Parameters<typeof resolveLocalizedString>[0];

export const {
    useTranslation,
    resolveLocalizedString,
    useLang,
    $lang,
    useResolveLocalizedString,
    /** For use outside of React */
    getTranslation
} = createI18nApi<ComponentKey>()(
    { languages, fallbackLanguage },
    {
        en: () => import("./resources/en").then(({ translations }) => translations),
        fr: () => import("./resources/fr").then(({ translations }) => translations)
    }
);
