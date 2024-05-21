import { useOidc } from "oidc";
import { Header as DsfrHeader } from "@codegouvfr/react-dsfr/Header";
import logoInsee from "assets/logo-insee.png";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";

export function Header() {
    const { isUserLoggedIn, logout, login } = useOidc();

    return (
        <DsfrHeader
            brandTop={
                <>
                    République
                    <br />
                    Française
                </>
            }
            homeLinkProps={{
                to: "/",
                title: "Accueil - Nom de l’entité (ministère, secrétariat d'état, gouvernement)"
            }}
            quickAccessItems={[
                headerFooterDisplayItem,
                ...(!isUserLoggedIn
                    ? [
                          {
                              iconId: "fr-icon-lock-line",
                              buttonProps: {
                                  onClick: () => login({ doesCurrentHrefRequiresAuth: isUserLoggedIn })
                              },
                              text: "Se connecter"
                          } as const
                      ]
                    : [
                          {
                              iconId: "ri-account-box-line",
                              buttonProps: {
                                  onClick: () =>
                                      logout({
                                          redirectTo: "home"
                                      })
                              },
                              text: "Se déconnecter"
                          } as const,
                          {
                              iconId: "fr-icon-account-fill",
                              linkProps: {
                                  to: "/account"
                              },
                              text: "Mon Compte"
                          } as const
                      ])
            ]}
            serviceTagline="Vite + TypeScript + React + react-dsfr"
            serviceTitle={"Séminaire du développement"}
            operatorLogo={{
                alt: "Insee, mesurer pour comprendre",
                imgUrl: logoInsee,
                orientation: "vertical"
            }}
            navigation={(() =>
                (
                    [
                        ["/", "Home"],
                        ["/mui", "Mui Playground"]
                    ] as const
                ).map(([to, label]) => ({
                    text: label,
                    linkProps: {
                        to
                    }
                })))()}
        />
    );
}
