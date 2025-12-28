import { useCallback, type ReactElement } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { declareComponentKeys, useTranslation } from "i18n";
import { useOidc } from "oidc";
import { tss } from "tss";
import { MyComponent } from "components/MyComponent";
import { fr } from "@codegouvfr/react-dsfr";
import { ToggleSwitch } from "@codegouvfr/react-dsfr/ToggleSwitch";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { persistGovBrandingPreference } from "govBrandingPreference";

export const Route = createLazyFileRoute("/")({
    component: Page
});

function Page() {
    const { t } = useTranslation("HomePage");

    const { isUserLoggedIn, decodedIdToken } = useOidc();

    const { classes, isGov } = useStyles();

    const handleGovBrandingChange = useCallback((checked: boolean) => {
        persistGovBrandingPreference(checked);
        window.location.reload();
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Typography variant="h3">
                    {t("welcome", {
                        name: isUserLoggedIn ? decodedIdToken.preferred_username : undefined
                    })}
                </Typography>
                <div className={classes.toggle}>
                    <ToggleSwitch
                        checked={isGov}
                        onChange={handleGovBrandingChange}
                        label={t("gov branding toggle label")}
                        helperText={t("gov branding toggle helper")}
                        inputTitle={t("gov branding toggle title")}
                    />
                </div>
                <Typography variant="body1" className={classes.brandingStatus}>
                    {t(isGov ? "gov branding enabled" : "gov branding disabled")}
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
    toggle: {
        marginTop: fr.spacing("3w"),
        display: "flex",
        justifyContent: "center"
    },
    brandingStatus: {
        marginBottom: fr.spacing("3w")
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
    | "gov branding toggle label"
    | "gov branding toggle helper"
    | "gov branding toggle title"
    | "gov branding enabled"
    | "gov branding disabled"
>()("HomePage");

export type I18n = typeof i18n;
