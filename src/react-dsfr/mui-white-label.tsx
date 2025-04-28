import { useMemo, createContext, useContext, useEffect, type ReactNode } from "react";
import { useBreakpointsValuesPx } from "@codegouvfr/react-dsfr/useBreakpointsValuesPx";
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { createMuiDsfrTheme } from "./mui";
import * as mui from "@mui/material/styles";
import { fr } from "@codegouvfr/react-dsfr";
import { Global, css } from "@emotion/react";
import marianneFaviconSvgUrl from "@codegouvfr/react-dsfr/favicon/favicon.svg";
import blankFaviconSvgUrl from "./blank-favicon.svg";
import { deepAssign } from "./tools/deepAssign";
import { structuredCloneButFunctions } from "./tools/structuredCloneButFunctions";

export function createMuiThemeProviderWithOptionalGovernmentalBranding(params: {
    createMuiTheme: (params: {
        isDark: boolean;
        /**
         * WARNING: The types can be lying here if you have augmented the theme.
         * It's a Theme as defined in `import type { Theme } from "@mui/material/styles";`
         * That is to say before augmentation.
         * Make sure to set your custom properties if any are declared at the type level.
         **/
        muiTheme_gov: mui.Theme;
    }) => { muiTheme: mui.Theme; faviconUrl?: string };
}) {
    const { createMuiTheme } = params;

    function useMuiTheme() {
        const { isDark } = useIsDark();
        const { breakpointsValues } = useBreakpointsValuesPx();

        const { muiTheme, isGov, faviconUrl_userProvided } = useMemo(() => {
            const muiTheme_gov = createMuiDsfrTheme({ isDark, breakpointsValues });

            // @ts-expect-error: Technic to detect if user is using the government theme
            muiTheme_gov.palette.isGov = true;

            const { muiTheme, faviconUrl: faviconUrl_userProvided } = createMuiTheme({
                isDark,
                muiTheme_gov
            });

            let isGov: boolean;

            // @ts-expect-error: We know what we are doing
            if (muiTheme.palette.isGov) {
                isGov = true;
                // @ts-expect-error: We know what we are doing
                delete muiTheme.palette.isGov;
            } else {
                isGov = false;
            }

            // NOTE: We do not allow customization of the spacing and breakpoints
            if (!isGov) {
                muiTheme.spacing = structuredCloneButFunctions(muiTheme_gov.spacing);
                muiTheme.breakpoints = structuredCloneButFunctions(muiTheme_gov.breakpoints);

                muiTheme.components ??= {};

                deepAssign({
                    target: muiTheme.components as any,
                    source: structuredCloneButFunctions({
                        MuiTablePagination: muiTheme_gov.components!.MuiTablePagination
                    }) as any
                });

                muiTheme.typography = structuredCloneButFunctions(
                    muiTheme_gov.typography,
                    ({ key, value }) => (key !== "fontFamily" ? value : muiTheme.typography.fontFamily)
                );
            }

            return { muiTheme, isGov, faviconUrl_userProvided };
        }, [isDark, breakpointsValues]);

        return { muiTheme, isGov, faviconUrl_userProvided };
    }

    function useFavicon(params: { faviconUrl: string }) {
        const { faviconUrl } = params;

        useEffect(() => {
            document
                .querySelectorAll(
                    'link[rel="apple-touch-icon"], link[rel="icon"], link[rel="shortcut icon"]'
                )
                .forEach(link => link.remove());

            const link = document.createElement("link");
            link.rel = "icon";
            link.href = faviconUrl;
            link.type = (() => {
                if (faviconUrl.startsWith("data:")) {
                    return faviconUrl.split("data:")[1].split(",")[0];
                }
                switch (faviconUrl.split(".").pop()?.toLowerCase()) {
                    case "svg":
                        return "image/svg+xml";
                    case "png":
                        return "image/png";
                    case "ico":
                        return "image/x-icon";
                    default:
                        throw new Error("Unsupported favicon file type");
                }
            })();
            document.head.appendChild(link);

            return () => {
                link.remove();
            };
        }, [faviconUrl]);
    }

    function MuiThemeProvider(props: { children: ReactNode }) {
        const { children } = props;

        const { muiTheme, isGov, faviconUrl_userProvided } = useMuiTheme();

        useFavicon({
            faviconUrl: faviconUrl_userProvided ?? (isGov ? marianneFaviconSvgUrl : blankFaviconSvgUrl)
        });

        return (
            <>
                {!isGov && (
                    <Global
                        styles={css({
                            ":root": {
                                "--text-active-blue-france": muiTheme.palette.primary.main,
                                "--background-active-blue-france": muiTheme.palette.primary.main,
                                "--text-action-high-blue-france": muiTheme.palette.primary.main,
                                "--border-plain-blue-france": muiTheme.palette.primary.main,
                                "--text-title-grey": muiTheme.palette.text.primary

                                // options:

                                /*
                                "--blue-france-sun-113-625": muiTheme.palette.primary.main,
                                "--blue-france-sun-113-625-active": muiTheme.palette.primary.light,
                                "--blue-france-sun-113-625-hover": muiTheme.palette.primary.dark,
                                "--blue-france-975-sun-113": muiTheme.palette.primary.contrastText,

                                "--blue-france-950-100": muiTheme.palette.secondary.main,
                                "--blue-france-950-100-active": muiTheme.palette.secondary.light,
                                "--blue-france-950-100-hover": muiTheme.palette.secondary.dark,
                                //"--blue-france-sun-113-625": muiTheme.palette.secondary.contrastText,

                                "--grey-50-1000": muiTheme.palette.text.primary,
                                "--grey-200-850": muiTheme.palette.text.secondary,
                                "--grey-625-425": muiTheme.palette.text.disabled,

                                "--grey-900-175": muiTheme.palette.divider,

                                //"--grey-200-850": muiTheme.palette.action.active,
                                "--grey-975-100": muiTheme.palette.action.hover,
                                "--blue-france-925-125-active": muiTheme.palette.action.selected,
                                //"--grey-625-425": muiTheme.palette.action.disabled,
                                "--grey-925-125": muiTheme.palette.action.disabledBackground,
                                //"--blue-france-sun-113-625-active": muiTheme.palette.action.focus,

                                "--grey-1000-50": muiTheme.palette.background.default,
                                "--grey-1000-100": muiTheme.palette.background.paper
                                */
                            },
                            body: {
                                fontFamily: muiTheme.typography.fontFamily,
                                fontSize: muiTheme.typography.fontSize,
                                //"lineHeight": muiTheme.typography.lineHeight,

                                color: muiTheme.palette.text.primary,
                                backgroundColor: muiTheme.palette.background.default
                            },
                            [`.${fr.cx("fr-header__logo")}`]: {
                                display: "none"
                            },
                            [`.${fr.cx("fr-footer__brand")} .${fr.cx("fr-logo")}`]: {
                                display: "none"
                            },
                            [`.${fr.cx("fr-footer__content-list")}`]: {
                                display: "none"
                            },
                            [`.${fr.cx("fr-footer__bottom-copy")}`]: {
                                display: "none"
                            }
                        })}
                    />
                )}
                <context_isGov.Provider value={isGov}>
                    <mui.ThemeProvider theme={muiTheme}>{children}</mui.ThemeProvider>
                </context_isGov.Provider>
            </>
        );
    }

    return { MuiThemeProvider };
}

const context_isGov = createContext<boolean | undefined>(undefined);

export function useIsGov() {
    const isGov = useContext(context_isGov);

    if (isGov === undefined) {
        throw new Error("useIsGov must be used within a MuiThemeProvider");
    }

    return { isGov };
}
