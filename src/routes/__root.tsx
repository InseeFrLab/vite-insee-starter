import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Footer } from "components/Footer";
import { Header } from "components/Header";
import { fr } from "@codegouvfr/react-dsfr";
import { QueryClient } from "@tanstack/react-query";
import { AutoLogoutCountdown } from "components/AutoLogoutCountdown";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
    component: () => (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Header />
            <div
                style={{
                    flex: 1,
                    margin: "auto",
                    maxWidth: 1000,
                    ...fr.spacing("padding", { topBottom: "10v" })
                }}
            >
                <Outlet />
            </div>
            <AutoLogoutCountdown />
            <Footer />
        </div>
    ),
    notFoundComponent: () => <>The route is not defined</>
});
