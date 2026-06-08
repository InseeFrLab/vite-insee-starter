import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteEnvs } from "vite-envs";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { oidcSpa } from "oidc-spa/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tanstackRouter({
            target: "react"
        }),
        react(),
        viteEnvs({
            declarationFile: ".env"
        }),
        oidcSpa({
            browserRuntimeFreeze: { enabled: true },
            DPoP: { enabled: true, mode: "auto" }
        })
    ],
    resolve: {
        tsconfigPaths: true
    }
});
