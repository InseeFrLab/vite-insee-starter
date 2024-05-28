import { defineConfig } from "orval";

export default defineConfig({
    openapi: {
        input: "./openApi.json",
        output: {
            mode: "tags",
            target: "src/api/endpoints",
            schemas: "src/api/model",
            client: "react-query",
            override: {
                mutator: {
                    path: "./src/api/mutator/customInstance.ts",
                    name: "customInstance"
                }
            }
        },
        hooks: {
            afterAllFilesWrite: "yarn format"
        }
    }
});
