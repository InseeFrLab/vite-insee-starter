import { useOidc } from "oidc";
import { Header as DsfrHeader } from "@codegouvfr/react-dsfr/Header";
import logoInsee from "assets/logo-insee.png";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { declareComponentKeys, useTranslation, useLang } from "i18n";
import { LanguageSelector } from "components/LanguageSelector";
import { fr } from "@codegouvfr/react-dsfr";

export function Header() {
    const { isUserLoggedIn, logout, login } = useOidc();

    const { t } = useTranslation("Header");

    const { lang, setLang } = useLang();

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
            quickAccessItems={[
                {
                    buttonProps: {
                        "aria-controls": "translate-select",
                        "aria-expanded": false,
                        title: t("select language"),
                        className: fr.cx("fr-btn--tertiary", "fr-translate", "fr-nav")
                    },
                    iconId: "fr-icon-translate-2",
                    text: <LanguageSelector lang={lang} setLang={setLang} />
                },
                headerFooterDisplayItem,
                ...(!isUserLoggedIn
                    ? [
                          {
                              iconId: "fr-icon-lock-line",
                              buttonProps: {
                                  onClick: () => login({ doesCurrentHrefRequiresAuth: false })
                              },
                              text: t("login")
                          } as const
                      ]
                    : [
                          {
                              iconId: "ri-account-box-line",
                              buttonProps: {
                                  onClick: () =>
                                      logout({
                                          redirectTo: "home"
                                      })
                              },
                              text: t("logout")
                          } as const,
                          {
                              iconId: "fr-icon-account-fill",
                              linkProps: {
                                  to: "/account"
                              },
                              text: t("my account")
                          } as const
                      ])
            ]}
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
    | "select language"
    | "home link title"
    | "login"
    | "logout"
    | "my account"
    | "service title"
    | "operator logo alt"
    | "page title home"
    | "page title mui"
    | "page title todo"
>()("Header");

export type I18n = typeof i18n;
