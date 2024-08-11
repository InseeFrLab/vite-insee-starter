import { HeaderQuickAccessItem } from "@codegouvfr/react-dsfr/Header";
import { declareComponentKeys, useTranslation } from "i18n";
import { useOidc } from "oidc";

type Props = {
    id?: string;
};

export function AuthButtons(props: Props) {
    const { id } = props;

    const { isUserLoggedIn, login, logout } = useOidc();

    const { t } = useTranslation("AuthButtons");

    if (!isUserLoggedIn) {
        return (
            <>
                <HeaderQuickAccessItem
                    id={`login-${id}`}
                    quickAccessItem={{
                        iconId: "fr-icon-lock-line",
                        buttonProps: {
                            onClick: () => login({ doesCurrentHrefRequiresAuth: false })
                        },
                        text: t("login")
                    }}
                />
                <HeaderQuickAccessItem
                    id={`register-${id}`}
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
                id={`account-${id}`}
                quickAccessItem={{
                    iconId: "fr-icon-account-fill",
                    linkProps: {
                        to: "/account"
                    },
                    text: t("my account")
                }}
            />
            <HeaderQuickAccessItem
                id={`logout-${id}`}
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

const { i18n } = declareComponentKeys<"login" | "register" | "logout" | "my account">()("AuthButtons");

export type I18n = typeof i18n;