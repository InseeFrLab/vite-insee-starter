import { defineConfig } from "orval";
export default defineConfig({
    todos: {
        output: {
            target: "src/todos-api/client.gen.ts",
            client: "react-query",
            override: {
                mutator: {
                    path: "src/todos-api/axiosInstance.ts",
                    name: "fetch"
                }
            }
        },
        hooks: {
            afterAllFilesWrite: "yarn format"
        }
    }
});
