import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { Footer as DSFRFooter } from "@codegouvfr/react-dsfr/Footer";
import logoInsee from "assets/logo-insee.png";
import { declareComponentKeys, useTranslation } from "i18n";

export function Footer() {
    const { t } = useTranslation("Footer");

    return (
        <DSFRFooter
            accessibility="fully compliant"
            contentDescription={t("content description")}
            operatorLogo={{
                alt: t("operator logo alt"),
                imgUrl: logoInsee,
                orientation: "vertical"
            }}
            bottomItems={[headerFooterDisplayItem]}
        />
    );
}

const { i18n } = declareComponentKeys<"content description" | "operator logo alt">()("Footer");

export type I18n = typeof i18n;
