import * as fs from "fs";
import { join as pathJoin, resolve } from "path";
import { assert } from "tsafe/assert";
import fetch from "node-fetch";
import * as child_process from "child_process";

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

    const originalOrvalConfigPath = pathJoin(projectDirPath, "orval.config.ts");
    const orvalConfigFilePath = pathJoin(cacheDirPath, "orval.config.ts");

    const configContent = fs
        .readFileSync(originalOrvalConfigPath, "utf-8")
        .replace(/(path|target):\s*['"]([^'"]+)['"]/g, (_, key, relativePath) => {
            const absolutePath = resolve(projectDirPath, relativePath);
            return `${key}: '${absolutePath.replace(/\\/g, "\\\\")}'`;
        })
        .replace(/todos:\s*{/, match => {
            return `${match}\n    input: '${todosOpenApiJsonFilePath.replace(/\\/g, "\\\\")}',`;
        });

    fs.writeFileSync(orvalConfigFilePath, configContent, "utf-8");

    run(`npx orval --config ${orvalConfigFilePath}`);
})();

function run(command: string) {
    console.log(`$ ${command}`);
    child_process.execSync(command, { stdio: "inherit" });
}
