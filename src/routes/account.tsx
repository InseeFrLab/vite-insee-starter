import Button from "@codegouvfr/react-dsfr/Button";
import { createFileRoute } from "@tanstack/react-router";
import { protectedLoader, useOidc } from "oidc";

export const Route = createFileRoute("/account")({
    component: Account,
    beforeLoad: protectedLoader
});

function Account() {
    const { oidcTokens, renewTokens } = useOidc({ assertUserLoggedIn: true });

    return (
        <>
            <h2>Hello {oidcTokens.decodedIdToken.preferred_username}</h2>
            <div>
                <p>{JSON.stringify(oidcTokens.accessToken)}</p>
                <Button onClick={renewTokens}>Renouveler le token</Button>
            </div>
        </>
    );
}
