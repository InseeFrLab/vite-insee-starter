import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/todo/edit")({
    component: () => <>Hello /todo/edit! </>
});
