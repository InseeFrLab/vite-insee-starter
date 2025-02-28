import Button from "@codegouvfr/react-dsfr/Button";
import { createFileRoute } from "@tanstack/react-router";
import { useOidc, withLoginRequired } from "oidc";
import { parseKeycloakIssuerUri } from "oidc-spa/tools/parseKeycloakIssuerUri";
import { decodeJwt } from "oidc-spa/tools/decodeJwt";
import { useLang } from "i18n";
import { fr } from "@codegouvfr/react-dsfr";
import { useStyles } from "tss";

export const Route = createFileRoute("/account")({
    component: withLoginRequired(Page)
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
                    backToAppFromAccountUrl: location.href
                })}
            >
                Go to Keycloak Account Management Page
            </a>
            <div>
                <p>OpenID-Connect Access Token:</p>
                <p>{tokens.accessToken}</p>
                <Button onClick={() => renewTokens()}>Renew token</Button>
                <br />
                <br />
                <h3>Decoded Access Token:</h3>
                <pre>{JSON.stringify(decodeJwt(tokens.accessToken), null, 2)}</pre>
            </div>
        </>
    );
}
