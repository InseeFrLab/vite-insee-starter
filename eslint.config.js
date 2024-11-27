import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import tssUnusedClasses from "eslint-plugin-tss-unused-classes";

export default tseslint.config(
    { ignores: ["dist"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            "tss-unused-classes": tssUnusedClasses
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "tss-unused-classes/unused-classes": "warn",
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
            "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "i18n" }],
            "@typescript-eslint/no-namespace": ["off"],
            "@typescript-eslint/no-explicit-any": ["off"]
        }
    }
);
