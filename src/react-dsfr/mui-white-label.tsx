import { useMemo, createContext, useContext, type ReactNode } from "react";
import { useBreakpointsValuesPx } from "@codegouvfr/react-dsfr/useBreakpointsValuesPx";
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { createMuiDsfrTheme } from "./mui";
import * as mui from "@mui/material/styles";

export function createMuiThemeProvider(params: {
    createMuiTheme: (params: {
        isDark: boolean;
        /**
         * WARNING: The types can be lying here if you have augmented the theme.
         * It's a Theme as defined in `import type { Theme } from "@mui/material/styles";`
         * That is to say before augmentation.
         * Make sure to set your custom properties if any are declared at the type level.
         **/
        muiTheme_gov: mui.Theme;
    }) => mui.Theme;
}) {
    const { createMuiTheme } = params;

    function useMuiTheme() {
        const { isDark } = useIsDark();
        const { breakpointsValues } = useBreakpointsValuesPx();

        const { muiTheme, isGov } = useMemo(() => {
            const muiTheme_gov = createMuiDsfrTheme({ isDark, breakpointsValues });

            // @ts-expect-error: Technic to detect if user is using the government theme
            muiTheme_gov.palette.isGov = true;

            const muiTheme = createMuiTheme({
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
                muiTheme.spacing = muiTheme_gov.spacing;
                muiTheme.breakpoints = muiTheme_gov.breakpoints;
            }

            return { muiTheme, isGov };
        }, [isDark, breakpointsValues]);

        return { muiTheme, isGov };
    }

    function MuiThemeProvider(props: { children: ReactNode }) {
        const { children } = props;

        const { muiTheme, isGov } = useMuiTheme();

        return (
            <context_isGov.Provider value={isGov}>
                <mui.ThemeProvider theme={muiTheme}>{children}</mui.ThemeProvider>
            </context_isGov.Provider>
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
