/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from "@tanstack/react-router";

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as AccountImport } from "./routes/account";

// Create Virtual Routes

const MuiLazyImport = createFileRoute("/mui")();
const IndexLazyImport = createFileRoute("/")();

// Create/Update Routes

const MuiLazyRoute = MuiLazyImport.update({
    path: "/mui",
    getParentRoute: () => rootRoute
} as any).lazy(() => import("./routes/mui.lazy").then(d => d.Route));

const AccountRoute = AccountImport.update({
    path: "/account",
    getParentRoute: () => rootRoute
} as any);

const IndexLazyRoute = IndexLazyImport.update({
    path: "/",
    getParentRoute: () => rootRoute
} as any).lazy(() => import("./routes/index.lazy").then(d => d.Route));

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
    interface FileRoutesByPath {
        "/": {
            id: "/";
            path: "/";
            fullPath: "/";
            preLoaderRoute: typeof IndexLazyImport;
            parentRoute: typeof rootRoute;
        };
        "/account": {
            id: "/account";
            path: "/account";
            fullPath: "/account";
            preLoaderRoute: typeof AccountImport;
            parentRoute: typeof rootRoute;
        };
        "/mui": {
            id: "/mui";
            path: "/mui";
            fullPath: "/mui";
            preLoaderRoute: typeof MuiLazyImport;
            parentRoute: typeof rootRoute;
        };
    }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
    IndexLazyRoute,
    AccountRoute,
    MuiLazyRoute
});

/* prettier-ignore-end */
