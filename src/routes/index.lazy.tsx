import { useCallback, type ReactElement } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { declareComponentKeys, useTranslation } from "i18n";
import { useOidc } from "oidc";
import { tss } from "tss";
import { MyComponent } from "components/MyComponent";
import { fr } from "@codegouvfr/react-dsfr";
import { ToggleSwitch } from "@codegouvfr/react-dsfr/ToggleSwitch";
import { Highlight } from "@codegouvfr/react-dsfr/Highlight";
import type { ButtonProps } from "@codegouvfr/react-dsfr/Button";
import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup";
import { Summary } from "@codegouvfr/react-dsfr/Summary";
import { Tile } from "@codegouvfr/react-dsfr/Tile";
import { CallOut } from "@codegouvfr/react-dsfr/CallOut";
import { Tag } from "@codegouvfr/react-dsfr/Tag";
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

    const quickLinks = [
        {
            label: t("cta github"),
            href: "https://github.com/InseeFrLab/vite-insee-starter"
        }
    ];

    const buttons: [ButtonProps, ...ButtonProps[]] = quickLinks.map(({ href, label }) => ({
        children: label,
        linkProps: {
            href,
            target: "_blank",
            rel: "noreferrer"
        }
    })) as [ButtonProps, ...ButtonProps[]];

    const stackSummaryLinks = [
        {
            text: t("stack docker"),
            linkProps: { href: "https://www.docker.com/", target: "_blank", rel: "noreferrer" }
        },
        {
            text: t("stack nginx"),
            linkProps: { href: "https://www.nginx.com/", target: "_blank", rel: "noreferrer" }
        },
        {
            text: t("stack vite"),
            linkProps: { href: "https://vitejs.dev/", target: "_blank", rel: "noreferrer" }
        },
        {
            text: t("stack typescript"),
            linkProps: {
                href: "https://www.typescriptlang.org/",
                target: "_blank",
                rel: "noreferrer"
            }
        },
        {
            text: t("stack react"),
            linkProps: { href: "https://react.dev/", target: "_blank", rel: "noreferrer" }
        },
        {
            text: t("stack tanstack router"),
            linkProps: { href: "https://tanstack.com/router/v1", target: "_blank", rel: "noreferrer" }
        },
        {
            text: t("stack react dsfr"),
            linkProps: {
                href: "https://react-dsfr.codegouv.studio/",
                target: "_blank",
                rel: "noreferrer"
            }
        },
        {
            text: t("stack mui"),
            linkProps: { href: "https://mui.com/material-ui/", target: "_blank", rel: "noreferrer" }
        },
        {
            text: t("stack vite envs"),
            linkProps: {
                href: "https://github.com/garronej/vite-envs",
                target: "_blank",
                rel: "noreferrer"
            }
        },
        {
            text: t("stack tss react"),
            linkProps: { href: "https://www.tss-react.dev/", target: "_blank", rel: "noreferrer" }
        },
        {
            text: t("stack i18nifty"),
            linkProps: { href: "https://www.i18nifty.dev/", target: "_blank", rel: "noreferrer" }
        },
        {
            text: t("stack react query"),
            linkProps: { href: "https://tanstack.com/query/latest", target: "_blank", rel: "noreferrer" }
        },
        {
            text: t("stack oidc spa"),
            linkProps: { href: "https://www.oidc-spa.dev/", target: "_blank", rel: "noreferrer" }
        },
        {
            text: t("stack tsafe"),
            linkProps: { href: "https://github.com/garronej/tsafe", target: "_blank", rel: "noreferrer" }
        },
        {
            text: t("stack ts ci"),
            linkProps: { href: "https://github.com/garronej/ts-ci", target: "_blank", rel: "noreferrer" }
        },
        {
            text: t("stack prettier"),
            linkProps: { href: "https://prettier.io/", target: "_blank", rel: "noreferrer" }
        },
        {
            text: t("stack orval"),
            linkProps: { href: "https://orval.dev/", target: "_blank", rel: "noreferrer" }
        }
    ];

    return (
        <div className={classes.root}>
            <Highlight size="lg" className={classes.heroHighlight}>
                <div className={classes.heroContent}>
                    <div className={classes.heroHeader}>
                        <Tag small>{t("hero strapline")}</Tag>
                        <span className={classes.welcome}>
                            {t("welcome", {
                                name: isUserLoggedIn ? decodedIdToken.preferred_username : undefined
                            })}
                        </span>
                    </div>
                    <h1 className={classes.title}>{t("hero title")}</h1>
                    <p className={classes.subtitle}>{t("hero subtitle")}</p>
                    <p className={classes.body}>{t("hero body")}</p>
                    <ButtonsGroup inlineLayoutWhen="md and up" alignment="left" buttons={buttons} />
                </div>
            </Highlight>
            <div className={classes.cardsRow}>
                <div className={classes.toggleCard}>
                    <div className={classes.toggleHeader}>
                        <p className={classes.toggleTitle}>{t("gov branding toggle label")}</p>
                        <span className={classes.toggleStatus}>
                            {t(isGov ? "gov branding enabled" : "gov branding disabled")}
                        </span>
                    </div>
                    <ToggleSwitch
                        checked={isGov}
                        onChange={handleGovBrandingChange}
                        label={t("gov branding toggle label")}
                        helperText={t("gov branding toggle helper")}
                        inputTitle={t("gov branding toggle title")}
                    />
                    <p className={classes.toggleNote}>{t("gov branding sticky note")}</p>
                </div>
                <div className={classes.calloutCard}>
                    <CallOut
                        title={t("keycloak title")}
                        iconId="fr-icon-lock-line"
                        buttonProps={{
                            linkProps: {
                                href: "https://github.com/codegouvfr/keycloak-theme-dsfr",
                                target: "_blank",
                                rel: "noreferrer"
                            },
                            children: t("keycloak cta")
                        }}
                    >
                        {t("keycloak body")}
                    </CallOut>
                </div>
            </div>
            <section className={classes.section}>
                <div className={classes.sectionHeading}>
                    <h2 className={classes.sectionTitle}>{t("demo section title")}</h2>
                    <p className={classes.sectionIntro}>{t("demo section intro")}</p>
                </div>
                <div className={classes.tiles}>
                    <Tile
                        title={t("demo mui title")}
                        desc={t("demo mui detail")}
                        linkProps={{ href: "/mui" }}
                        orientation="vertical"
                        small
                        noIcon
                    />
                    <Tile
                        title={t("demo todo title")}
                        desc={t("demo todo detail")}
                        linkProps={{ href: "/todo" }}
                        orientation="vertical"
                        small
                        noIcon
                    />
                    <Tile
                        title={t("demo chat title")}
                        desc={t("demo chat detail")}
                        linkProps={{ href: "/chat" }}
                        orientation="vertical"
                        small
                        noIcon
                    />
                </div>
            </section>
            <section className={classes.customSection}>
                <div>
                    <h3 className={classes.sectionTitle}>{t("custom component title")}</h3>
                    <p className={classes.sectionIntro}>{t("custom component body")}</p>
                </div>
                <div className={classes.componentPreview}>
                    <MyComponent className={classes.myComponent} />
                </div>
            </section>
            <section className={classes.section}>
                <div className={classes.sectionHeading}>
                    <h2 className={classes.sectionTitle}>{t("stack section title")}</h2>
                    <p className={classes.sectionIntro}>{t("stack section intro")}</p>
                </div>
                <Summary links={stackSummaryLinks} />
            </section>
        </div>
    );
}

const useStyles = tss.create(({ isGov, breakpointsValues, windowInnerWidth }) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        gap: fr.spacing("6w")
    },
    heroHighlight: {
        height: "100%",
        padding: fr.spacing("6w")
    },
    heroContent: {
        display: "flex",
        flexDirection: "column",
        gap: fr.spacing("2w")
    },
    heroHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: fr.spacing("2w")
    },
    welcome: {
        fontWeight: "bold",
        color: fr.colors.decisions.text.label.grey.default,
        textAlign: "right"
    },
    title: {
        margin: 0,
        fontSize: windowInnerWidth < breakpointsValues.md ? "1.75rem" : "2.25rem"
    },
    subtitle: {
        margin: 0,
        fontSize: "1.1rem",
        color: fr.colors.decisions.text.default.grey.default
    },
    body: {
        margin: 0,
        color: fr.colors.decisions.text.default.grey.default,
        lineHeight: 1.6
    },
    cardsRow: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: fr.spacing("3w"),
        alignItems: "stretch"
    },
    toggleCard: {
        borderRadius: 0,
        padding: fr.spacing("4w"),
        backgroundColor: fr.colors.decisions.background.alt.grey.default,
        border: `1px solid ${fr.colors.decisions.border.default.grey.default}`,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
        display: "flex",
        flexDirection: "column",
        gap: fr.spacing("2w")
    },
    toggleHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: fr.spacing("2w")
    },
    toggleTitle: {
        margin: 0,
        fontWeight: 700
    },
    toggleStatus: {
        color: isGov
            ? fr.colors.decisions.text.actionHigh.blueFrance.default
            : fr.colors.decisions.text.default.grey.default,
        fontWeight: 600
    },
    toggleNote: {
        marginTop: fr.spacing("2w"),
        marginBottom: 0,
        color: fr.colors.decisions.text.label.grey.default
    },
    calloutCard: {
        borderRadius: 0,
        padding: 0,
        backgroundColor: "transparent",
        boxShadow: "none",
        "& .fr-callout": {
            height: "100%",
            margin: 0
        },
        "& .fr-callout__text": {
            marginBottom: 0
        }
    },
    section: {
        display: "flex",
        flexDirection: "column",
        gap: fr.spacing("2w")
    },
    sectionHeading: {
        display: "flex",
        flexDirection: "column",
        gap: fr.spacing("1w")
    },
    sectionTitle: {
        margin: 0
    },
    sectionIntro: {
        margin: 0,
        color: fr.colors.decisions.text.default.grey.default
    },
    tiles: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: fr.spacing("3w")
    },
    customSection: {
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr",
        gap: fr.spacing("3w"),
        alignItems: "center",
        [fr.breakpoints.down("md")]: {
            gridTemplateColumns: "1fr"
        }
    },
    componentPreview: {
        borderRadius: 12,
        padding: fr.spacing("4w"),
        backgroundColor: fr.colors.decisions.background.alt.grey.default,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    myComponent: {
        margin: "auto"
    }
}));

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
    | "hero strapline"
    | "hero title"
    | "hero subtitle"
    | {
          K: "hero body";
          R: ReactElement;
      }
    | "cta github"
    | "cta docker"
    | "cta api repo"
    | "cta api doc"
    | "gov branding sticky note"
    | "stack section title"
    | "stack section intro"
    | "demo section title"
    | "demo section intro"
    | "demo mui title"
    | "demo mui detail"
    | "demo todo title"
    | "demo todo detail"
    | "demo chat title"
    | "demo chat detail"
    | "custom component title"
    | "custom component body"
    | "keycloak title"
    | "keycloak body"
    | "keycloak cta"
    | "stack section title"
    | "stack section intro"
    | "stack docker"
    | "stack nginx"
    | "stack vite"
    | "stack typescript"
    | "stack react"
    | "stack tanstack router"
    | "stack react dsfr"
    | "stack mui"
    | "stack vite envs"
    | "stack tss react"
    | "stack i18nifty"
    | "stack react query"
    | "stack oidc spa"
    | "stack tsafe"
    | "stack ts ci"
    | "stack prettier"
    | "stack orval"
>()("HomePage");

export type I18n = typeof i18n;
