import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Footer } from "components/Footer";
import { Header } from "components/Header";
import { fr } from "@codegouvfr/react-dsfr";
import { AutoLogoutCountdown } from "components/AutoLogoutCountdown";
import { tss, GlobalStyles } from "tss";

export const Route = createRootRouteWithContext()({
    component: RootComponent,
    notFoundComponent: () => <>The route is not defined</>
});

function RootComponent() {
    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            <GlobalStyles
                styles={{
                    body: {
                        margin: 0,
                        padding: 0
                    },
                    "*": {
                        boxSizing: "border-box"
                    }
                }}
            />
            <Header />
            <main className={classes.main}>
                <Outlet />
            </main>
            <AutoLogoutCountdown />
            <Footer />
        </div>
    );
}

const useStyles = tss.withName({ RootComponent }).create(({ breakpointsValues, windowInnerWidth }) => ({
    root: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    main: {
        flex: 1,
        margin: "auto",
        ...fr.spacing("padding", { topBottom: "10v" }),
        width: (() => {
            if (windowInnerWidth < breakpointsValues.sm) {
                return `calc(100vw - ${fr.spacing("3v")})`;
            }

            if (windowInnerWidth < breakpointsValues.md) {
                return `calc(100vw - ${fr.spacing("10v")})`;
            }

            if (windowInnerWidth < breakpointsValues.xl) {
                return "80vw";
            }

            return "60vw";
        })()
    }
}));
