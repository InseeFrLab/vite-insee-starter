import { useState } from "react";
import { tss } from "tss";
import { fr } from "@codegouvfr/react-dsfr";

type Props = {
    className?: string;
};

export function MyComponent(props: Props) {
    const { className } = props;

    const [clickCount, setClickCount] = useState(0);

    const { classes, cx } = useStyles({
        isBigger: clickCount >= 2
    });

    return (
        <div className={cx(classes.root, className)} onClick={() => setClickCount(clickCount + 1)}>
            <span className={classes.text}>Click count: {clickCount}</span>
        </div>
    );
}

const useStyles = tss.withParams<{ isBigger: boolean }>().create(({ isBigger }) => ({
    root: {
        width: 150,
        height: isBigger ? 500 : 100,
        backgroundColor: fr.colors.decisions.background.active.redMarianne.default,
        "&:hover": {
            backgroundColor: fr.colors.decisions.background.active.redMarianne.hover
        },
        [fr.breakpoints.down("md")]: {
            border: "2px solid pink"
        },
        cursor: "pointer"
    },
    text: {
        margin: "auto",
        color: fr.colors.decisions.background.contrast.redMarianne.default
    }
}));
