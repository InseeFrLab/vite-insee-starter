import React from "react";
import ReactDOM from "react-dom/client";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { OidcProvider } from "oidc";
import { RouterProvider, createRouter, Link, type LinkProps } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { I18nFetchingSuspense } from "i18n";
import { createDsfrCustomBrandingProvider } from "@codegouvfr/react-dsfr/mui";
import { createTheme } from "@mui/material/styles";
import { useLang } from "i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalStyles } from "tss";
import { fr } from "@codegouvfr/react-dsfr";
import logoInseePngUrl from "assets/logo-insee.png";
import { useTheme } from "@mui/material/styles";
import { darken } from "@mui/material/styles";

import "assets/geist/main.css";

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

const { DsfrCustomBrandingProvider } = createDsfrCustomBrandingProvider({
    createMuiTheme: ({ isDark, theme_gov }) => {
        if (import.meta.env.VITE_IS_GOV_INSTANCE === "true") {
            return { theme: theme_gov };
        }

        const theme = createTheme({
            palette: {
                mode: isDark ? "dark" : "light"
                /*
                primary: {
                    main: isDark?"#02AFFF" :"#3467AE",
                    
                },
                secondary: {
                    main: "#FFC403"
                }
                */
            },
            typography: {
                fontFamily: '"Geist"'
            }
        });

        return { theme, faviconUrl: logoInseePngUrl };
    }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <DsfrCustomBrandingProvider>
                <OidcProvider>
                    <I18nFetchingSuspense>
                        <>
                            <Global />
                            <RouterProvider router={router} />
                        </>
                    </I18nFetchingSuspense>
                </OidcProvider>
            </DsfrCustomBrandingProvider>
        </QueryClientProvider>
    </React.StrictMode>
);

function Global() {
    const theme = useTheme();

    return (
        <GlobalStyles
            styles={{
                [`.${fr.cx("fr-btn")}`]: {
                    "--hover-tint": theme.palette.primary.dark,
                    "--active-tint": darken(theme.palette.primary.main, 0.24),
                    "&:hover, &:active": {
                        color: theme.palette.primary.contrastText
                    }
                },
                [`.${fr.cx("fr-input")}`]: {
                    "&&&": {
                        borderTopLeftRadius: `0px`
                    }
                }
            }}
        />
    );
}
