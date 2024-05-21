import { createFileRoute } from "@tanstack/react-router";
import { prOidc } from "oidc";

export const Route = createFileRoute("/account")({
    component: () => <div>Hello account!</div>,
    beforeLoad: async () => {
        const oidc = await prOidc;

        if (oidc.isUserLoggedIn) {
            return null;
        }

        await oidc.login({
            doesCurrentHrefRequiresAuth: true
        });
    }
});
