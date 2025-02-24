import Button from "@codegouvfr/react-dsfr/Button";
import { createFileRoute } from "@tanstack/react-router";
import { beforeLoadProtectedRoute, useOidc } from "oidc";
import { parseKeycloakIssuerUri } from "oidc-spa/tools/parseKeycloakIssuerUri";
import { decodeJwt } from "oidc-spa/tools/decodeJwt";
import { useLang } from "i18n";
import { fr } from "@codegouvfr/react-dsfr";
import { useStyles } from "tss";

export const Route = createFileRoute("/account")({
    component: Page,
    beforeLoad: beforeLoadProtectedRoute
});

function Page() {
    const {
        tokens,
        renewTokens,
        params: { issuerUri, clientId }
    } = useOidc({ assert: "user logged in" });

    const { lang } = useLang();

    const { cx, css } = useStyles();

    if (tokens === undefined) {
        return null;
    }

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
                    backToAppFromAccountUrl: import.meta.env.BASE_URL
                })}
            >
                Go to Keycloak Account Management Page
            </a>
            <div>
                <p>OpenID-Connect Access Token:</p>
                <p>{tokens.accessToken}</p>
                <p>Decoded Access Token:</p>
                <pre>{JSON.stringify(decodeJwt(tokens.accessToken), null, 2)}</pre>
                <Button onClick={() => renewTokens()}>Renew token</Button>
            </div>
        </>
    );
}
