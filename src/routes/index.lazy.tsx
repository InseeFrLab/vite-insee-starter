import { createLazyFileRoute } from "@tanstack/react-router";
import YouTube from "react-youtube";

export const Route = createLazyFileRoute("/")({
    component: Index
});

function Index() {
    return (
        <div className="p-2">
            <h3>Welcome Home!</h3>
            <YouTube
                videoId="5q88JgXUAY4"
                opts={{
                    height: "390",
                    width: "640"
                }}
            />
        </div>
    );
}
