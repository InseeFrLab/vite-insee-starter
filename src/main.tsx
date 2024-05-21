import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "App";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { OidcProvider } from "oidc";
startReactDsfr({ defaultColorScheme: "system" });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <OidcProvider>
            <App />
        </OidcProvider>
    </React.StrictMode>
);
