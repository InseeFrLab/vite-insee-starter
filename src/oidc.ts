import { createReactOidc } from "oidc-spa/react";
import { createMockReactOidc } from "oidc-spa/mock/react";
import { z } from "zod";
import { getIsDark } from "@codegouvfr/react-dsfr/useIsDark";

const decodedIdTokenSchema = z.object({
    sub: z.string(),
    preferred_username: z.string()
});

const issuerUri = import.meta.env.VITE_OIDC_ISSUER;
const clientId = import.meta.env.VITE_OIDC_CLIENT_ID;
const homeUrl = import.meta.env.BASE_URL;

console.log({ issuerUri, clientId, homeUrl });

export const { OidcProvider, useOidc, getOidc } = issuerUri
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

export const beforeLoadProtectedRoute = async () => {
    const oidc = await getOidc();

    if (oidc.isUserLoggedIn) {
        return null;
    }

    await oidc.login({
        doesCurrentHrefRequiresAuth: true
    });
};

export function getKeycloakAccountUrl(params: { locale: string; accountPage: "home" | "password" }) {
    const { locale, accountPage } = params;

    const accountUrl = new URL(
        `${issuerUri}/account${(() => {
            switch (accountPage) {
                case "home":
                    return "";
                case "password":
                    return "/password";
            }
        })()}`
    );

    const searchParams = new URLSearchParams();

    searchParams.append("kc_locale", locale);
    searchParams.append("referrer", clientId);
    searchParams.append("referrer_uri", window.location.href);

    accountUrl.search = searchParams.toString();

    return accountUrl.toString();
}
