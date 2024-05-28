import { createFileRoute } from "@tanstack/react-router";
import { protectedLoader } from "oidc";

export const Route = createFileRoute("/account")({
    component: () => <div>Hello account!</div>,
    beforeLoad: protectedLoader
});
