import {
    LanguageSelect as LanguageSelect_base,
    addLanguageSelectTranslations
} from "@codegouvfr/react-dsfr/LanguageSelect";
import { useLang, languages } from "i18n";

type Props = {
    id?: string;
};

export function LanguageSelect(props: Props) {
    const { id } = props;

    const { lang, setLang } = useLang();

    return (
        <LanguageSelect_base
            id={id}
            supportedLangs={languages}
            lang={lang}
            setLang={setLang}
            fullNameByLang={{
                en: "English",
                fr: "Français"
            }}
        />
    );
}

languages.forEach(lang =>
    addLanguageSelectTranslations({
        lang: lang,
        messages: {
            "select language": (() => {
                switch (lang) {
                    case "en":
                        return "Select language";
                    /* spell-checker: disable */
                    case "fr":
                        return "Choisir la langue";
                    /* spell-checker: enable */
                }
            })()
        }
    })
);
