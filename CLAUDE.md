# CLAUDE.md

## Commands

```bash
yarn dev          # Start dev server (runs react-dsfr update-icons first)
yarn build        # Type-check then bundle for production
yarn lint         # ESLint on src/
yarn format       # Prettier write on all TS/JSON/MD files
yarn test         # Run Vitest (single run)
yarn test:watch   # Vitest in watch mode
yarn generate-todos-api-client  # Regenerate Orval API client from OpenAPI spec
```

Run a single test file:

```bash
yarn vitest run src/components/MyComponent.test.tsx
```

## Architecture

### Routing — TanStack Router (file-based)

Routes live in `src/routes/`. `src/routeTree.gen.ts` is **auto-generated** by the Vite plugin — never edit it manually. The root layout (`src/routes/__root.tsx`) wraps all pages with `<Header>`, `<Footer>`, and `<AutoLogoutWarningOverlay>`. The `QueryClient` is passed through router context so loaders can prefetch React Query data.

Protected routes use `beforeLoad: enforceLogin` from `@/oidc`.

### Authentication — oidc-spa

`src/oidc.ts` bootstraps OIDC. When `VITE_OIDC_ISSUER_URI` is not set, a **mock OIDC** is used automatically — no Keycloak needed for local dev. The Axios instance at `src/todos-api/axiosInstance.ts` automatically attaches Bearer tokens from OIDC on every request.

### API Client — Orval (generated)

`src/todos-api/client.gen.ts` is **auto-generated** from the OpenAPI spec. Run `yarn generate-todos-api-client` to regenerate. Import hooks from `@/todos-api` (the barrel re-exports the generated client). The custom Axios mutator in `src/todos-api/axiosInstance.ts` injects auth tokens and sets the base URL from `VITE_TODOS_API_URL`.

### Internationalization — i18nifty

Languages: `en` (fallback) and `fr`. Each component that needs translations calls `declareComponentKeys` and exports an `I18n` type. That type must be added to the `ComponentKey` union in `src/i18n/types.ts`. Translation strings for each language live in `src/i18n/resources/en.tsx` and `src/i18n/resources/fr.tsx`.

Use `useTranslation("ComponentName")` inside components. For use outside React, use `getTranslation`.

### Styling — tss-react

The shared `tss` instance is created in `src/tss.ts`. It provides `theme` (MUI), `isGov`, `windowInnerWidth`, `windowInnerHeight`, `breakpointsValues`, and `customColors` as styling context. Use `tss.withName({ ComponentName }).create(...)` for named styles. Import `tss`, `GlobalStyles`, and `keyframes` from `@/tss`.

### Branding

The app supports two modes: French government branding (DSFR colors/logos) and white-label. Controlled by `VITE_IS_GOV_INSTANCE` env var (default `true`), overridable at runtime via `sessionStorage` through `src/govBrandingPreference.ts`.

### Environment Variables (vite-envs)

Declared in `.env`. They are injectable at container runtime without a rebuild. Copy `.env` to `.env.local` for local overrides. Key vars:

| Variable               | Purpose                              |
| ---------------------- | ------------------------------------ |
| `VITE_TODOS_API_URL`   | REST API base URL (empty = mock)     |
| `VITE_OIDC_ISSUER_URI` | OIDC issuer (empty = mock OIDC)      |
| `VITE_OIDC_CLIENT_ID`  | OIDC client ID                       |
| `VITE_IS_GOV_INSTANCE` | Enable gov branding (`true`/`false`) |

### Path Aliases

`@/` resolves to `src/`. Always import from `@/` instead of relative paths when crossing component boundaries.

### Component Conventions

Components are pure presentational where possible; data fetching happens in route files. tss-react `useStyles` is defined at the bottom of the file with `tss.create(...)`. Test files live alongside the component they test (`*.test.tsx`).
