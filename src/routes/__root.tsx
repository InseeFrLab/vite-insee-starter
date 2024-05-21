import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Footer } from "components/Footer";
import { Header } from "components/Header";
import { fr } from "@codegouvfr/react-dsfr";

export const Route = createRootRoute({
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
                {" "}
                <Outlet />
            </div>
            <Footer />
        </div>
    )
});
