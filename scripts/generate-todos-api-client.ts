import * as fs from "fs";
import { join as pathJoin } from "path";
import { assert } from "tsafe/assert";
import fetch from "node-fetch";
import * as child_process from "child_process";
import type { defineConfig } from "orval";
import type { Param0 } from "tsafe";

const projectDirPath = process.cwd();

(async () => {
    const todosApiUrl = (() => {
        const line = fs
            .readFileSync(pathJoin(projectDirPath, ".env.sample"))
            .toString("utf-8")
            .split("\n")
            .find(line => line.startsWith("VITE_TODOS_API_URL="));

        assert(line !== undefined);

        return line.split("=")[1].replace(/"/g, "");
    })();

    console.log(`todosApiUrl: ${todosApiUrl}`);

    const cacheDirPath = pathJoin(projectDirPath, "node_modules", ".cache", "scripts");

    if (!fs.existsSync(cacheDirPath)) {
        fs.mkdirSync(cacheDirPath, { recursive: true });
    }

    const todosOpenApiJsonFilePath = pathJoin(cacheDirPath, "todos-open-api.json");

    fs.writeFileSync(
        todosOpenApiJsonFilePath,
        await fetch(`${todosApiUrl}/doc`).then(response => response.text())
    );

    const orvalConfigFilePath = pathJoin(cacheDirPath, "orval.config.ts");

    const todosApiSrcDirPath = pathJoin(projectDirPath, "src", "todos-api");

    const generatedFilePath = pathJoin(todosApiSrcDirPath, "client.gen.ts");

    const orvalConfig: Param0<typeof defineConfig> = {
        todos: {
            input: todosOpenApiJsonFilePath,
            output: {
                target: generatedFilePath,
                override: {
                    mutator: {
                        path: pathJoin(todosApiSrcDirPath, "axiosInstance.ts"),
                        name: "fetch"
                    }
                }
            }
        }
    };

    fs.writeFileSync(
        orvalConfigFilePath,
        Buffer.from(
            [
                `import { defineConfig } from "orval";`,
                `export default defineConfig(${JSON.stringify(orvalConfig)});`
            ].join("\n"),
            "utf8"
        )
    );

    run(`npx orval --config ${orvalConfigFilePath}`);

    run(`npx prettier --write ${generatedFilePath}`);
})();

function run(command: string) {
    console.log(`$ ${command}`);
    child_process.execSync(command, { stdio: "inherit" });
}
