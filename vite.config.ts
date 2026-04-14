import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteEnvs } from "vite-envs";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { oidcSpa } from "oidc-spa/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        viteEnvs({
            declarationFile: ".env"
        }),
        oidcSpa({
            browserRuntimeFreeze: { enabled: true },
            DPoP: { enabled: true, mode: "auto" }
        }),
        tanstackRouter()
    ]
});
