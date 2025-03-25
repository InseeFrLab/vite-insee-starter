import React from "react";
import ReactDOM from "react-dom/client";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { OidcProvider } from "oidc";
import { RouterProvider, createRouter, Link, type LinkProps } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { I18nFetchingSuspense } from "i18n";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
import { useLang } from "i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createRouter({ routeTree, context: { queryClient }, defaultPreload: "intent" });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

declare module "@codegouvfr/react-dsfr/spa" {
    interface RegisterLink {
        Link: (props: LinkProps) => React.ReactElement;
    }
}

startReactDsfr({
    defaultColorScheme: "system",
    Link,
    useLang: function useLangDsfr() {
        const { lang } = useLang();
        return lang;
    }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <MuiDsfrThemeProvider>
                <OidcProvider>
                    <I18nFetchingSuspense>
                        <RouterProvider router={router} />
                    </I18nFetchingSuspense>
                </OidcProvider>
            </MuiDsfrThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
