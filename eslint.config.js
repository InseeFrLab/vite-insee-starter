import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import tssUnusedClasses from "eslint-plugin-tss-unused-classes";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores(["dist", "src/**/*.gen.ts", "src/vite-env.d.ts"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite
        ],
        languageOptions: {
            globals: globals.browser
        },
        plugins: {
            "tss-unused-classes": tssUnusedClasses
        },
        rules: {
            "tss-unused-classes/unused-classes": "warn",
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
            "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "i18n" }],
            "@typescript-eslint/no-namespace": "off"
        }
    },
    {
        files: ["*.config.ts", "scripts/**/*.ts"],
        languageOptions: {
            globals: globals.node
        }
    },
    {
        files: ["src/routes/**/*.{ts,tsx}"],
        rules: {
            "react-refresh/only-export-components": "off"
        }
    }
]);
