import { createReactOidc } from "oidc-spa/react";
import { createMockReactOidc } from "oidc-spa/mock/react";
import { z } from "zod";

export const { OidcProvider, useOidc, prOidc } = import.meta.env.VITE_OIDC_ISSUER
    ? createReactOidc({
          issuerUri: import.meta.env.VITE_OIDC_ISSUER,
          clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
          publicUrl: import.meta.env.BASE_URL,
          decodedIdTokenSchema: z.object({
              sub: z.string(),
              preferred_username: z.string()
          })
      })
    : createMockReactOidc({ isUserInitiallyLoggedIn: false });
