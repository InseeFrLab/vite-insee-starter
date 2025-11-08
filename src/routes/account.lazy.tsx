import { createLazyFileRoute } from "@tanstack/react-router";
import { useOidc } from "oidc";
import { createKeycloakUtils } from "oidc-spa/keycloak";
import { useLang } from "i18n";
import { fr } from "@codegouvfr/react-dsfr";
import { useStyles } from "tss";

export const Route = createLazyFileRoute("/account")({
    component: Page
});

function Page() {
    const { issuerUri, clientId, validRedirectUri } = useOidc({ assert: "user logged in" });

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
                href={createKeycloakUtils({ issuerUri }).getAccountUrl({
                    clientId,
                    validRedirectUri,
                    locale: lang
                })}
            >
                Go to Keycloak Account Management Page
            </a>
        </>
    );
}
