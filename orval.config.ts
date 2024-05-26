import { defineConfig } from "orval";

export default defineConfig({
    openapi: {
        input: "./openApi.json",
        output: {
            mode: "tags",
            target: "src/api/",
            schemas: "src/model/api",
            client: "react-query",
            override: {
                mutator: {
                    path: "./src/api/axiosInstance.ts",
                    name: "axiosInstance"
                }
            }
        },
        hooks: {
            afterAllFilesWrite: "yarn format"
        }
    }
});
