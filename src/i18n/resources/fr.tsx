import type { Translations } from "../types";

export const translations: Translations<"fr"> = {
    /* spell-checker: disable */
    Header: {
        "home link title": "Accueil - Nom de l'entité (ministère, secrétariat d'état, gouvernement)",
        "service title": "Modèle d'Application Web",
        "operator logo alt": "Insee, mesurer pour comprendre",
        "page title home": "Acceuil",
        "page title mui": "Jouer avec Mui",
        "page title todo": "Liste de tâches",
        "page title chat": "Discussion"
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
    HomePage: {
        welcome: ({ name }) => <>Bienvenue {name === undefined ? "" : <strong>{name}</strong>}!</>,
        "video aria label": "Video de démonstration de react-dsfr",
        "gov branding toggle label": "Habillage gouvernemental français",
        "gov branding toggle helper":
            "Activez ou désactivez le thème gouvernemental français par défaut pour cette application.",
        "gov branding toggle title": "Basculer l'habillage gouvernemental français",
        "gov branding enabled": "Habillage gouvernemental français activé",
        "gov branding disabled": "Habillage gouvernemental français désactivé"
    },
    TodoPage: {
        "waking up container": "Le conteneur de l'API REST est en cours de démarrage ..."
    },
    ChatPage: {
        "waiting for server messages": "En attente des messages du serveur...",
        you: "Vous",
        server: "Serveur",
        "message label": "Message",
        send: "Envoyer"
    },
    AutoLogoutWarningOverlay: {
        "paragrah still there": "Êtes-vous toujours là ?",
        "paragrah will be logged out": ({ secondsLeft }) =>
            `Vous serez déconnecté dans ${secondsLeft} secondes.`
    }
    /* spell-checker: enable */
};
