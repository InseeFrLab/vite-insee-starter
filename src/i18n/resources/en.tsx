import type { Translations } from "../types";

export const translations: Translations<"en"> = {
    /* spell-checker: disable */
    Header: {
        "home link title": "Home - Entity name (ministry, state secretariat, government)",
        "service title": "Development Seminar",
        "operator logo alt": "Insee, measure to understand",
        "page title home": "Home",
        "page title mui": "Playing with Mui",
        "page title todo": "Task List Application"
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
    DefaultPage: {
        welcome: ({ name }) => <>Welcome {name === undefined ? "" : <strong>{name}</strong>}!</>,
        "video aria label": "Demonstration video of react-dsfr"
    },
    TodoPage: {
        "waking up container": "The REST API container is waking up ..."
    }
    /* spell-checker: enable */
};
