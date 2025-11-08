import { oidcSpa } from "oidc-spa/react-spa";
import { z } from "zod";
import { getIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { $lang } from "i18n";

export const { bootstrapOidc, OidcInitializationGate, enforceLogin, getOidc, useOidc } = oidcSpa
    .withExpectedDecodedIdTokenShape({
        decodedIdTokenSchema: z.object({
            sub: z.string(),
            preferred_username: z.string()
        }),
        decodedIdToken_mock: {
            sub: "123",
            preferred_username: "john doe"
        }
    })
    .createUtils();

const issuerUri = import.meta.env.VITE_OIDC_ISSUER_URI;

if (!issuerUri) {
    console.log("=============  VITE_OIDC_ISSUER_URI not set, USING MOCK OIDC =============");
}

bootstrapOidc(
    issuerUri
        ? {
              implementation: "real",
              issuerUri,
              clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
              extraQueryParams: () => ({
                  dark: getIsDark() ? "true" : "false",
                  ui_locales: $lang.current
              }),
              debugLogs: true
          }
        : {
              implementation: "mock",
              isUserInitiallyLoggedIn: false
          }
);
