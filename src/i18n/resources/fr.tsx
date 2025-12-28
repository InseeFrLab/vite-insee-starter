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
        "gov branding disabled": "Habillage gouvernemental français désactivé",
        "hero strapline": "Kit de démarrage SPA",
        "hero title": "Starter pour des applications web modernes et riches en fonctionnalités",
        "hero subtitle":
            "Stack DSFR + React opinionée pour livrer des apps sécurisées et cohérentes rapidement.",
        "hero body": (
            <>
                Ce starter suit les bonnes pratiques recommandées pour construire des applications web
                sécurisées, riches en fonctionnalités, visuellement cohérentes, accessibles et
                maintenables. Il est fortement inspiré de l&apos;architecture d&apos;Onyxia (
                <a href="https://www.onyxia.sh/" target="_blank" rel="noreferrer">
                    onyxia.sh
                </a>
                ).
            </>
        ),
        "cta github": "Dépôt GitHub",
        "cta docker": "Image Docker",
        "cta api repo": "Code de l'API Todo",
        "cta api doc": "Documentation de l'API Todo",
        "gov branding sticky note":
            "Utilisez ce basculeur pour prévisualiser l'habillage officiel et le mode marque blanche. Seuls les déploiements sous .gouv.fr sont autorisés à activer l'habillage officiel de l'État.",
        "stack section title": "Pile technologique",
        "stack section intro":
            "Voici la pile technologique utilisée dans ce starter, avec des liens pour explorer chaque couche.",
        "stack docker": "Docker : exécution des conteneurs en dev et en déploiement",
        "stack nginx": "Nginx : hébergement statique et reverse proxy pour la SPA",
        "stack vite": "Vite : serveur de dev rapide et bundler",
        "stack typescript": "TypeScript : typage pour React et les outils",
        "stack react": "React : runtime SPA",
        "stack tanstack router": "TanStack Router : navigation et chargement des données",
        "stack react dsfr": "react-dsfr : composants DSFR pour l'habillage État",
        "stack mui": "MUI : composants de secours alignés sur le thème DSFR",
        "stack vite envs": "vite-envs : variables d'environnement sans rebuild",
        "stack tss react": "tss-react : stylage dynamique avec les jetons DSFR",
        "stack i18nifty": "i18nifty : traductions et gestion locale",
        "stack react query": "React Query : état serveur et cache",
        "stack oidc spa": "oidc-spa : intégration OIDC (prêt pour Keycloak)",
        "stack tsafe": "tsafe : utilitaires de sécurité de typage",
        "stack ts ci": "ts-ci : aides CI pour publier les images Docker",
        "stack prettier": "Prettier : formatage",
        "stack orval": "Orval : génération de client OpenAPI pour l'API Todo",
        "demo section title": "Explorer les pages de démonstration",
        "demo section intro":
            "Chaque route illustre le comportement du starter avec de vrais flux UI et données.",
        "demo mui title": "MUI",
        "demo mui detail": "Exemples MUI thémés DSFR pour compléter les composants react-dsfr.",
        "demo todo title": "Liste de tâches",
        "demo todo detail":
            "Une todo list CRUD appuyée sur l'API REST distante, authentifiée avec des jetons OIDC OAuth et DPoP.",
        "demo chat title": "Discussion",
        "demo chat detail":
            "Un chat en websocket adapté aux interfaces temps réel type LLM, sécurisé avec les mêmes jetons.",
        "custom component title": "Composant sur-mesure compatible DSFR",
        "custom component body":
            "Le carré rouge ci-dessous est un composant tss-react sensible au mode sombre. Il utilise les jetons DSFR, change de taille au clic et reste réactif pour montrer comment un composant custom s'intègre au design system.",
        "keycloak title": "Expérience Keycloak cohérente",
        "keycloak body":
            "L'authentification repose sur Keycloak. Les pages de connexion reprennent le visuel DSFR grâce au thème officiel keycloak-theme-dsfr pour conserver une UX uniforme.",
        "keycloak cta": "Voir le thème Keycloak"
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
