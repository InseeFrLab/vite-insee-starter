import { createReactOidc } from "oidc-spa/react";
import { createMockReactOidc } from "oidc-spa/mock/react";
import { z } from "zod";
import { getIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { $lang } from "i18n";

const decodedIdTokenSchema = z.object({
    sub: z.string(),
    preferred_username: z.string()
});

const issuerUri = import.meta.env.VITE_OIDC_ISSUER_URI;
const clientId = import.meta.env.VITE_OIDC_CLIENT_ID;
const homeUrl = import.meta.env.BASE_URL;

if (!issuerUri) {
    console.log("=============  VITE_OIDC_ISSUER_URI not set, USING MOCK OIDC =============");
}

export const { OidcProvider, useOidc, getOidc, enforceLogin, withLoginEnforced } = issuerUri
    ? createReactOidc({
          issuerUri,
          clientId,
          homeUrl,
          decodedIdTokenSchema: decodedIdTokenSchema,
          extraQueryParams: ({ isSilent }) => ({
              dark: isSilent ? undefined : getIsDark() ? "true" : "false",
              ui_locales: isSilent ? undefined : $lang.current
          }),
          debugLogs: true
      })
    : createMockReactOidc({
          isUserInitiallyLoggedIn: false,
          homeUrl,
          mockedTokens: {
              decodedIdToken: {
                  sub: "123",
                  preferred_username: "john doe"
              } satisfies z.infer<typeof decodedIdTokenSchema>
          }
      });
