import type { GenericTranslations } from "i18nifty";

//List the languages you with to support
export const languages = ["en", "fr"] as const;

//If the user's browser language doesn't match any
//of the languages above specify the language to fallback to:
export const fallbackLanguage = "en";

export type Language = (typeof languages)[number];

export type ComponentKey =
    | import("components/Header/Header").I18n
    | import("components/Header/AuthButtons").I18n
    | import("components/Footer").I18n
    | import("components/TodoApp/Todo").I18n
    | import("components/TodoApp/AddTodo").I18n
    | import("components/AutoLogoutCountdown").I18n
    | import("routes/index.lazy").I18n
    | import("routes/todo").I18n;

export type Translations<L extends Language> = GenericTranslations<
    ComponentKey,
    Language,
    typeof fallbackLanguage,
    L
>;
