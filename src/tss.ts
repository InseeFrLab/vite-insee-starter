import { createTss, GlobalStyles, keyframes } from "tss-react";
import { useTheme } from "@mui/material/styles";
import { useWindowInnerSize } from "@codegouvfr/react-dsfr/tools/useWindowInnerSize";
import { useBreakpointsValuesPx } from "@codegouvfr/react-dsfr/useBreakpointsValuesPx";
import { useIsGov } from "react-dsfr/mui-white-label";

const customColors = {
    myCustomColor: "#ff0000"
};

// Here you put all the things that you might need for styling.
function useContext() {
    const theme = useTheme();

    const { windowInnerWidth, windowInnerHeight } = useWindowInnerSize();

    const { breakpointsValues } = useBreakpointsValuesPx();

    const { isGov } = useIsGov();

    return {
        theme,
        isGov,
        windowInnerWidth,
        windowInnerHeight,
        customColors,
        breakpointsValues
    };
}

export const { tss } = createTss({
    useContext
});

export const useStyles = tss.create({});

export { GlobalStyles, keyframes };
