import React from "react";
import ReactDOM from "react-dom/client";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { OidcProvider } from "oidc";
import { RouterProvider, createRouter, Link, type LinkProps } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { I18nFetchingSuspense } from "i18n";
import { createMuiThemeProvider } from "react-dsfr/mui-white-label";
import { createTheme } from "@mui/material/styles";
import { useLang } from "i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: "intent",
    // Since we're using React Query, we don't want loader calls to ever be stale
    // This will ensure that the loader is always called when the route is preloaded or visited
    defaultPreloadStaleTime: 0,
    scrollRestoration: true
});

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

const IS_GOVERNMENT_BRANDING_ENABLED: boolean = false;

const { MuiThemeProvider } = createMuiThemeProvider({
    createMuiTheme: ({ isDark, muiTheme_gov }) => {
        if (IS_GOVERNMENT_BRANDING_ENABLED) {
            return muiTheme_gov;
        }

        return createTheme({
            palette: {
                mode: isDark ? "dark" : "light"
            }
        });
    }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <MuiThemeProvider>
                <OidcProvider>
                    <I18nFetchingSuspense>
                        <RouterProvider router={router} />
                    </I18nFetchingSuspense>
                </OidcProvider>
            </MuiThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
