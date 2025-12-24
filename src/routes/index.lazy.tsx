import type { ReactElement } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { declareComponentKeys, useTranslation } from "i18n";
import { useOidc } from "oidc";
import { tss } from "tss";
import { MyComponent } from "components/MyComponent";
import { fr } from "@codegouvfr/react-dsfr";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export const Route = createLazyFileRoute("/")({
    component: Page
});

function Page() {
    const { t } = useTranslation("HomePage");

    const { isUserLoggedIn, decodedIdToken } = useOidc();

    const { classes, isGov } = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Typography variant="h3">
                    {t("welcome", {
                        name: isUserLoggedIn ? decodedIdToken.preferred_username : undefined
                    })}
                </Typography>
                <Typography variant="body1">
                    {isGov
                        ? "French Government Branding Enabled"
                        : "French Government Branding disabled, using custom branding"}
                </Typography>
                <Link href="https://github.com/InseeFrLab/vite-insee-starter" target="_blank">
                    GitHub
                </Link>
                <Link href="https://hub.docker.com/r/inseefrlab/vite-insee-starter" target="_blank">
                    DockerHub
                </Link>
                <Link href="https://github.com/InseeFrLab/todo-rest-api" target="_blank">
                    GitHub API
                </Link>
                <Link href="https://hub.docker.com/r/inseefrlab/todo-rest-api" target="_blank">
                    DockerHub API
                </Link>
                <MyComponent className={classes.myComponent} />
            </div>
        </div>
    );
}

const useStyles = tss.create({
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
          R: ReactElement;
      }
    | "video aria label"
>()("HomePage");

export type I18n = typeof i18n;
