import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { Footer as DSFRFooter } from "@codegouvfr/react-dsfr/Footer";
import logoInsee from "assets/logo-insee.png";

export function Footer() {
    return (
        <DSFRFooter
            accessibility="fully compliant"
            contentDescription={`
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                        eu fugiat nulla pariatur. 
                    `}
            operatorLogo={{
                alt: "Insee, mesurer pour comprendre",
                imgUrl: logoInsee,
                orientation: "vertical"
            }}
            bottomItems={[headerFooterDisplayItem]}
        />
    );
}
