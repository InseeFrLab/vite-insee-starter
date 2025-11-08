import { useOidc } from "oidc";
import { useStyles } from "tss";
import { declareComponentKeys } from "i18nifty";
import { useTranslation } from "i18n";

export function AutoLogoutWarningOverlay() {
    const { autoLogoutState } = useOidc();

    const { css } = useStyles();

    const { t } = useTranslation("AutoLogoutWarningOverlay");

    if (!autoLogoutState.shouldDisplayWarning) {
        return null;
    }

    return (
        <div
            // Full screen overlay, blurred background
            className={css({
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(10px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000
            })}
        >
            <div className={css({ textAlign: "center" })}>
                <p>{t("paragrah still there")}</p>
                <p>
                    {t("paragrah will be logged out", {
                        secondsLeft: autoLogoutState.secondsLeftBeforeAutoLogout
                    })}
                </p>
            </div>
        </div>
    );
}

const { i18n } = declareComponentKeys<
    "paragrah still there" | { K: "paragrah will be logged out"; P: { secondsLeft: number } }
>()("AutoLogoutWarningOverlay");

export type I18n = typeof i18n;
