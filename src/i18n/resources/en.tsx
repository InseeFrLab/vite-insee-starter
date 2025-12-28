import type { Translations } from "../types";

export const translations: Translations<"en"> = {
    /* spell-checker: disable */
    Header: {
        "home link title": "Home - Entity name (ministry, state secretariat, government)",
        "service title": "Web Application Template",
        "operator logo alt": "Insee, measure to understand",
        "page title home": "Home",
        "page title mui": "Playing with Mui",
        "page title todo": "Todo list",
        "page title chat": "Chat"
    },
    AuthButtons: {
        login: "Log in",
        register: "Register",
        logout: "Log out",
        "my account": "My account"
    },
    Footer: {
        "operator logo alt": "Insee, measure to understand",
        "content description": `
      This site is a demonstration of the use of Vite + TypeScript + React + react-dsfr.
      It is intended to be used as a base for development projects at Insee.
    `
    },
    Todo: {
        edit: "Edit",
        delete: "Delete"
    },
    AddTodo: {
        "add a todo": "Add a task",
        validate: "Validate"
    },
    HomePage: {
        welcome: ({ name }) => <>Welcome {name === undefined ? "" : <strong>{name}</strong>}!</>,
        "video aria label": "Demonstration video of react-dsfr",
        "gov branding toggle label": "French Government branding",
        "gov branding toggle helper":
            "Enable or disable the default French Government theme for this app.",
        "gov branding toggle title": "Toggle French Government branding",
        "gov branding enabled": "French Government branding enabled",
        "gov branding disabled": "French Government branding disabled",
        "hero strapline": "SPA starter kit",
        "hero title": "Starter for modern, feature-heavy web applications",
        "hero subtitle": "Opinionated DSFR + React stack to ship secure, consistent apps quickly.",
        "hero body": (
            <>
                This starter follows recommended practices to build secure, feature-rich, visually
                consistent, accessible, and maintainable web apps. It is heavily influenced by the Onyxia
                architecture (
                <a href="https://www.onyxia.sh/" target="_blank" rel="noreferrer">
                    onyxia.sh
                </a>
                ).
            </>
        ),
        "cta github": "GitHub repository",
        "cta docker": "Docker image",
        "cta api repo": "Todo API source",
        "cta api doc": "Todo API documentation",
        "gov branding sticky note":
            "Use this switch to preview both official government branding and white-label mode. Only deployments under .gouv.fr are allowed to enable the official French Government skin.",
        "stack section title": "Tech stack",
        "stack section intro":
            "Here is the tech stack used in this starter, with links to explore each layer.",
        "stack docker": "Docker: container runtime for local dev and deployments",
        "stack nginx": "Nginx: static hosting and reverse proxy for the SPA",
        "stack vite": "Vite: fast dev server and bundler",
        "stack typescript": "TypeScript: typed React and tooling",
        "stack react": "React: SPA runtime",
        "stack tanstack router": "TanStack Router: navigation and data loading",
        "stack react dsfr": "react-dsfr: DSFR components for French Government styling",
        "stack mui": "MUI: fallback components aligned to the DSFR theme",
        "stack vite envs": "vite-envs: runtime environment variables without rebuilds",
        "stack tss react": "tss-react: dynamic styling with DSFR tokens",
        "stack i18nifty": "i18nifty: translations and locale management",
        "stack react query": "React Query: server state and caching",
        "stack oidc spa": "oidc-spa: OIDC integration (Keycloak ready)",
        "stack tsafe": "tsafe: type-safety utilities",
        "stack ts ci": "ts-ci: CI helpers to publish Docker images",
        "stack prettier": "Prettier: formatting",
        "stack orval": "Orval: OpenAPI client generation for the Todo API",
        "demo section title": "Explore the demo pages",
        "demo section intro":
            "These routes showcase how the starter behaves with real UI and data flows.",
        "demo mui title": "MUI",
        "demo mui detail": "DSFR-themed MUI examples to complement the core react-dsfr components.",
        "demo todo title": "Todo list",
        "demo todo detail":
            "A CRUD todo list backed by the remote REST API, authenticated with OIDC OAuth tokens and DPoP.",
        "demo chat title": "Chat",
        "demo chat detail":
            "A websocket-powered chat suitable for realtime LLM-like interfaces, secured with the same tokens.",
        "custom component title": "Custom DSFR-aware component",
        "custom component body":
            "The red square below is a bespoke, dark-mode-aware tss-react component. It uses DSFR tokens, responds to clicks with dynamic sizing, and stays responsive so you can see how custom styling fits alongside the design system.",
        "keycloak title": "Consistent Keycloak experience",
        "keycloak body":
            "Authentication runs on Keycloak. The login pages reuse the DSFR visuals thanks to the official keycloak-theme-dsfr package, keeping the UX consistent end-to-end.",
        "keycloak cta": "View the Keycloak theme"
    },
    TodoPage: {
        "waking up container": "The REST API container is waking up ..."
    },
    ChatPage: {
        "waiting for server messages": "Waiting for server messages...",
        you: "You",
        server: "Server",
        "message label": "Message",
        send: "Send"
    },
    AutoLogoutWarningOverlay: {
        "paragrah still there": "Are you still there?",
        "paragrah will be logged out": ({ secondsLeft }) =>
            `You will be logged out in ${secondsLeft} seconds.`
    }
    /* spell-checker: enable */
};
