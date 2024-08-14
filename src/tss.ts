import { createTss, GlobalStyles, keyframes } from "tss-react";
import { useTheme } from "@mui/material/styles";
import { useWindowInnerSize } from "@codegouvfr/react-dsfr/tools/useWindowInnerSize";
import { useBreakpointsValuesPx } from "@codegouvfr/react-dsfr/useBreakpointsValuesPx";

const customColors = {
    myCustomColor: "#ff0000"
};

// Here you put all the things that you might need for styling.
function useContext() {
    const muiTheme = useTheme();

    const { windowInnerWidth, windowInnerHeight } = useWindowInnerSize();

    const { breakpointsValues } = useBreakpointsValuesPx();

    return {
        muiTheme,
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
