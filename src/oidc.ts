import { createReactOidc } from "oidc-spa/react";
import { createMockReactOidc } from "oidc-spa/mock/react";
import { z } from "zod";

const decodedIdTokenSchema = z.object({
    sub: z.string(),
    preferred_username: z.string()
});

export const { OidcProvider, useOidc, prOidc } = import.meta.env.VITE_OIDC_ISSUER
    ? createReactOidc({
          issuerUri: import.meta.env.VITE_OIDC_ISSUER,
          clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
          publicUrl: import.meta.env.BASE_URL,
          decodedIdTokenSchema: decodedIdTokenSchema
      })
    : createMockReactOidc({
          isUserInitiallyLoggedIn: false,
          mockedTokens: {
              decodedIdToken: {
                  sub: "123",
                  preferred_username: "john doe"
              } satisfies z.infer<typeof decodedIdTokenSchema>
          }
      });

export const protectedLoader = async () => {
    const oidc = await prOidc;

    if (oidc.isUserLoggedIn) {
        return null;
    }

    await oidc.login({
        doesCurrentHrefRequiresAuth: true
    });
};
