import { createLazyFileRoute } from "@tanstack/react-router";
import YouTube from "react-youtube";
import { declareComponentKeys, useTranslation } from "i18n";
import { useOidc } from "oidc";
import { tss } from "tss";
import { MyComponent } from "components/MyComponent";
import { fr } from "@codegouvfr/react-dsfr";

export const Route = createLazyFileRoute("/")({
    component: Index
});

function Index() {
    const { t } = useTranslation("Index");

    const { isUserLoggedIn, oidcTokens } = useOidc();

    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <h3>
                    {t("welcome", {
                        name: isUserLoggedIn ? oidcTokens.decodedIdToken.preferred_username : undefined
                    })}
                </h3>
                <YouTube
                    aria-label={t("video aria label")}
                    videoId="5q88JgXUAY4"
                    opts={{
                        height: "390",
                        width: "640"
                    }}
                />
                <MyComponent className={classes.myComponent} />
            </div>
        </div>
    );
}

const useStyles = tss.withName({ Index }).create({
    root: {
        display: "flex",
        justifyContent: "center"
    },
    content: {
        textAlign: "center"
    },
    myComponent: {
        margin: "auto",
        marginTop: fr.spacing("5w")
    }
});

const { i18n } = declareComponentKeys<
    | {
          K: "welcome";
          P: {
              name: string | undefined;
          };
          R: JSX.Element;
      }
    | "video aria label"
>()("Index");

export type I18n = typeof i18n;
