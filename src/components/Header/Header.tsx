import { Header as DsfrHeader } from "@codegouvfr/react-dsfr/Header";
import logoInsee from "assets/logo_insee.svg";
import logoInseeDark from "assets/logo_insee_dark.svg";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { declareComponentKeys, useTranslation } from "i18n";
import { LanguageSelect } from "./LanguageSelect";
import { AuthButtons } from "./AuthButtons";
import { useMatchRoute } from "@tanstack/react-router";
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { useStyles } from "tss";

export function Header() {
    const { t } = useTranslation("Header");

    const matchRoute = useMatchRoute();

    const { isDark } = useIsDark();

    const { css } = useStyles();

    return (
        <DsfrHeader
            classes={{
                operator: css({
                    "& img": {
                        width: "7rem !important"
                    }
                })
            }}
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
            serviceTagline="Vite / react-dsfr / oidc-spa"
            serviceTitle={t("service title")}
            operatorLogo={{
                alt: t("operator logo alt"),
                imgUrl: isDark ? logoInseeDark : logoInsee,
                orientation: "vertical"
            }}
            navigation={(() =>
                (
                    [
                        ["/", t("page title home")],
                        ["/mui", t("page title mui")],
                        ["/todo", t("page title todo")],
                        ["/chat", t("page title chat")]
                    ] as const
                ).map(([to, label]) => ({
                    text: label,
                    linkProps: {
                        to
                    },
                    isActive: matchRoute({ to }) !== false
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
    | "page title chat"
>()("Header");

export type I18n = typeof i18n;
