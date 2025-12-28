import { Evt, type StatefulReadonlyEvt } from "evt";
import { Deferred } from "evt/tools/Deferred";
import { getOidc } from "oidc";
import { assert } from "tsafe";

export type Chat = {
    evtMessages: StatefulReadonlyEvt<Chat.Message[]>;
    sendMessage: (message: string) => void;
};

export namespace Chat {
    export type Message = {
        origin: "client" | "server";
        message: string;
    };
}

function createChat(): Chat {
    const evtMessages = Evt.create<Chat.Message[]>([]);

    const dSocket = new Deferred<WebSocket>();

    (async () => {
        const oidc = await getOidc();

        assert(oidc.isUserLoggedIn);

        const url = new URL(import.meta.env.VITE_TODOS_API_URL);

        url.protocol = url.protocol === "https:" ? "wss" : "ws";

        url.pathname += "ws";

        const socket = new WebSocket(url.href, [
            // NOTE: This is a common workaround to the fact that the WebSocket API
            // does not allow to set custom headers to the UPGRADE request.
            // So we use the protocol and on the server read the Sec-WebSocket-Protocol header.
            `authorization_bearer_${await oidc.getAccessToken()}`
        ]);

        socket.addEventListener("message", event => {
            evtMessages.state = [
                ...evtMessages.state,
                {
                    origin: "server",
                    message: event.data
                }
            ];
        });

        socket.addEventListener("error", err => {
            console.error("socket error", err);
        });

        const onOpen = () => {
            dSocket.resolve(socket);
            socket.removeEventListener("open", onOpen);
        };

        socket.addEventListener("open", onOpen);
    })();

    return {
        evtMessages,
        sendMessage: async message => {
            evtMessages.state = [
                ...evtMessages.state,
                {
                    origin: "client",
                    message
                }
            ];
            const socket = await dSocket.pr;
            socket.send(message);
        }
    };
}

let chat: Chat | undefined = undefined;

export function getChat() {
    if (chat === undefined) {
        chat = createChat();
    }
    return chat;
}
