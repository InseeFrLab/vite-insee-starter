import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/todo")({
    component: Layout
});

function Layout() {
    return (
        <>
            <h3>Todo App</h3>

            {(
                [
                    ["/todo", "Summary"],
                    ["/todo/edit", "Edit"]
                ] as const
            ).map(([to, label]) => (
                <Link key={to} to={to}>
                    {label}
                </Link>
            ))}
            <Outlet />
        </>
    );
}
