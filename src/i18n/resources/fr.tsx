import type { Translations } from "../types";

export const translations: Translations<"fr"> = {
    /* spell-checker: disable */
    Header: {
        "home link title": "Accueil - Nom de l'entité (ministère, secrétariat d'état, gouvernement)",
        "service title": "Modèle d'Application Web de l'Insee",
        "operator logo alt": "Insee, mesurer pour comprendre",
        "page title home": "Acceuil",
        "page title mui": "Jouer avec Mui",
        "page title todo": "Application liste de tâches"
    },
    AuthButtons: {
        login: "Se connecter",
        register: "Créer un compte",
        logout: "Se déconnecter",
        "my account": "Mon compte"
    },
    Footer: {
        "operator logo alt": "Insee, mesurer pour comprendre",
        "content description": `
      Ce site est une démonstration de l'utilisation de Vite + TypeScript + React + react-dsfr.
      Il est destiné à être utilisé comme base pour un les projets de développement a l'Insee.
    `
    },
    Todo: {
        edit: "Modifier",
        delete: "Supprimer"
    },
    AddTodo: {
        "add a todo": "Ajouter une tâche",
        validate: "Valider"
    },
    DefaultPage: {
        welcome: ({ name }) => <>Bienvenue {name === undefined ? "" : <strong>{name}</strong>}!</>,
        "video aria label": "Video de démonstration de react-dsfr"
    },
    TodoPage: {
        "waking up container": "Le conteneur de l'API REST est en cours de démarrage ..."
    }
    /* spell-checker: enable */
};
