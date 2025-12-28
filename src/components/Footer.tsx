import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { Footer as DSFRFooter } from "@codegouvfr/react-dsfr/Footer";
import logoInsee from "assets/logo_insee.svg";
import logoInseeDark from "assets/logo_insee_dark.svg";
import { declareComponentKeys, useTranslation } from "i18n";
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { useStyles } from "tss";

export function Footer() {
    const { t } = useTranslation("Footer");

    const { isDark } = useIsDark();

    const { css } = useStyles();

    return (
        <DSFRFooter
            classes={{
                brandLink: css({
                    "& img": {
                        width: "7rem !important"
                    }
                })
            }}
            accessibility="fully compliant"
            contentDescription={t("content description")}
            operatorLogo={{
                alt: t("operator logo alt"),
                imgUrl: isDark ? logoInseeDark : logoInsee,
                orientation: "vertical"
            }}
            bottomItems={[headerFooterDisplayItem]}
        />
    );
}

const { i18n } = declareComponentKeys<"content description" | "operator logo alt">()("Footer");

export type I18n = typeof i18n;
