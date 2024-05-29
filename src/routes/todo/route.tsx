import { createFileRoute, Outlet } from "@tanstack/react-router";
import { protectedLoader } from "oidc";

export const Route = createFileRoute("/todo")({
    component: Layout,
    beforeLoad: protectedLoader,
    errorComponent: () => <>An error occurred</>,
    pendingComponent: () => <>Loading ...</>
});

function Layout() {
    return (
        <>
            <h2>Todo App</h2>
            <Outlet />
        </>
    );
}
