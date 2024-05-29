import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// This enables absolute imports like `import { useOidc } from "oidc";`
// instead of `import { useOidc } from "../../oidc";`
// You also need to add "compilerOptions": { "baseUrl": "src" } in your tsconfig.json for it to work
import tsconfigPaths from "vite-tsconfig-paths";
import { viteEnvs } from "vite-envs";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        viteEnvs({
            declarationFile: ".env"
        }),
        TanStackRouterVite()
    ]
});
