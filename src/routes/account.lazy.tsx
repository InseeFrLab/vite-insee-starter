import { createLazyFileRoute } from "@tanstack/react-router";
import { useOidc, withLoginEnforced } from "oidc";
import { parseKeycloakIssuerUri } from "oidc-spa/tools/parseKeycloakIssuerUri";
import { useLang } from "i18n";
import { fr } from "@codegouvfr/react-dsfr";
import { useStyles } from "tss";

export const Route = createLazyFileRoute("/account")({
    // NOTE: Here we use withLoginEnforced instead of before: enforceLogin
    // because we are in a lazy route and lazy routes do not have loaders.
    component: withLoginEnforced(Page)
});

function Page() {
    const {
        params: { issuerUri, clientId }
    } = useOidc({ assert: "user logged in" });

    const { lang } = useLang();

    const { cx, css } = useStyles();

    return (
        <>
            <a
                className={cx(
                    fr.cx("fr-mt-5w", "fr-mb-5w"),
                    css({
                        display: "inline-block"
                    })
                )}
                href={parseKeycloakIssuerUri(issuerUri)!.getAccountUrl({
                    locale: lang,
                    clientId,
                    backToAppFromAccountUrl: location.href
                })}
            >
                Go to Keycloak Account Management Page
            </a>
        </>
    );
}
