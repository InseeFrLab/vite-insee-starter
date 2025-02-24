import { HeaderQuickAccessItem } from "@codegouvfr/react-dsfr/Header";
import { declareComponentKeys, useTranslation } from "i18n";
import { useOidc } from "oidc";
import { tss } from "tss";
import { fr } from "@codegouvfr/react-dsfr";
import { useMatchRoute } from "@tanstack/react-router";

export function AuthButtons() {
    const { isUserLoggedIn, login, logout } = useOidc();

    const { t } = useTranslation({ AuthButtons });

    const matchRoute = useMatchRoute();

    const { cx, classes } = useStyles({ isOnAccountPage: matchRoute({ to: "/account" }) !== false });

    if (!isUserLoggedIn) {
        return (
            <>
                <HeaderQuickAccessItem
                    quickAccessItem={{
                        iconId: "fr-icon-lock-line",
                        buttonProps: {
                            onClick: () => login({ doesCurrentHrefRequiresAuth: false })
                        },
                        text: t("login")
                    }}
                />
                <HeaderQuickAccessItem
                    quickAccessItem={{
                        iconId: "ri-id-card-line",
                        buttonProps: {
                            onClick: () =>
                                login({
                                    doesCurrentHrefRequiresAuth: false,
                                    transformUrlBeforeRedirect: url => {
                                        const urlObj = new URL(url);

                                        urlObj.pathname = urlObj.pathname.replace(
                                            /\/auth$/,
                                            "/registrations"
                                        );

                                        return urlObj.href;
                                    }
                                })
                        },
                        text: t("register")
                    }}
                />
            </>
        );
    }

    return (
        <>
            <HeaderQuickAccessItem
                quickAccessItem={{
                    iconId: "fr-icon-account-fill",
                    linkProps: {
                        to: "/account",
                        className: cx(fr.cx("fr-btn--tertiary"), classes.myAccountButton)
                    },
                    text: t("my account")
                }}
            />
            <HeaderQuickAccessItem
                quickAccessItem={{
                    iconId: "ri-logout-box-line",
                    buttonProps: {
                        onClick: () =>
                            logout({
                                redirectTo: "home"
                            })
                    },
                    text: t("logout")
                }}
            />
        </>
    );
}

const useStyles = tss
    .withName({ AuthButtons })
    .withParams<{ isOnAccountPage: boolean }>()
    .create(({ isOnAccountPage }) => ({
        myAccountButton: {
            "&&": {
                backgroundColor: !isOnAccountPage
                    ? undefined
                    : fr.colors.decisions.background.default.grey.hover
            }
        }
    }));

const { i18n } = declareComponentKeys<"login" | "register" | "logout" | "my account">()({ AuthButtons });

export type I18n = typeof i18n;
