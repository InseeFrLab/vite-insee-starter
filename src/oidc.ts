import { createReactOidc } from "oidc-spa/react";
import { createMockReactOidc } from "oidc-spa/mock/react";
import { z } from "zod";
import { getIsDark } from "@codegouvfr/react-dsfr/useIsDark";

const decodedIdTokenSchema = z.object({
    sub: z.string(),
    preferred_username: z.string()
});

const issuerUri = import.meta.env.VITE_OIDC_ISSUER_URI;
const clientId = import.meta.env.VITE_OIDC_CLIENT_ID;
const homeUrl = import.meta.env.BASE_URL;

export const { OidcProvider, useOidc, getOidc, withLoginRequired } = issuerUri
    ? createReactOidc({
          issuerUri,
          clientId,
          homeUrl,
          decodedIdTokenSchema: decodedIdTokenSchema,
          extraQueryParams: () => ({
              dark: getIsDark() ? "true" : "false"
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
