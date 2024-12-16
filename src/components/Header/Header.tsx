import { Header as DsfrHeader } from "@codegouvfr/react-dsfr/Header";
import logoInsee from "assets/logo-insee.png";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { declareComponentKeys, useTranslation } from "i18n";
import { LanguageSelect } from "./LanguageSelect";
import { AuthButtons } from "./AuthButtons";

export function Header() {
    const { t } = useTranslation({ Header });

    return (
        <DsfrHeader
            brandTop={
                <>
                    République
                    <br />
                    Française
                </>
            }
            homeLinkProps={{
                to: "/",
                title: t("home link title")
            }}
            quickAccessItems={[<LanguageSelect />, headerFooterDisplayItem, <AuthButtons />]}
            serviceTagline="Vite + TypeScript + React + react-dsfr"
            serviceTitle={t("service title")}
            operatorLogo={{
                alt: t("operator logo alt"),
                imgUrl: logoInsee,
                orientation: "vertical"
            }}
            navigation={(() =>
                (
                    [
                        ["/", t("page title home")],
                        ["/mui", t("page title mui")],
                        ["/todo", t("page title todo")]
                    ] as const
                ).map(([to, label]) => ({
                    text: label,
                    linkProps: {
                        to
                    }
                })))()}
        />
    );
}

const { i18n } = declareComponentKeys<
    | "home link title"
    | "service title"
    | "operator logo alt"
    | "page title home"
    | "page title mui"
    | "page title todo"
>()({ Header });

export type I18n = typeof i18n;
