import { createFileRoute } from "@tanstack/react-router";
import { enforceLogin } from "oidc";
import { Evt, type StatefulReadonlyEvt } from "evt";
import { useRerenderOnStateChange } from "evt/hooks";
import { Deferred } from "evt/tools/Deferred";
import { getOidc } from "oidc";
import { assert } from "tsafe";
import { useState } from "react";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { fr } from "@codegouvfr/react-dsfr";
import { tss } from "tss";
import { declareComponentKeys, useTranslation } from "i18n";

export const Route = createFileRoute("/websocket")({
    component: RouteComponent,
    beforeLoad: enforceLogin
});

function RouteComponent() {
    const chat = getChat();

    useRerenderOnStateChange(chat.evtMessages);

    const messages = chat.evtMessages.state;

    const [draft, setDraft] = useState("");

    const { t } = useTranslation("WebsocketPage");
    const { classes, cx } = useStyles();

    const onSend = () => {
        const trimmed = draft.trim();

        if (trimmed === "") {
            return;
        }

        chat.sendMessage(trimmed);
        setDraft("");
    };

    return (
        <div className={classes.root}>
            <div className={classes.messages}>
                {messages.length === 0 ? (
                    <p className={classes.placeholder}>{t("waiting for server messages")}</p>
                ) : (
                    messages.map((message, index) => (
                        <div
                            key={`${message.origin}-${index}`}
                            className={cx(
                                classes.messageRow,
                                message.origin === "client" ? classes.client : classes.server
                            )}
                        >
                            <span className={classes.originLabel}>
                                {message.origin === "client" ? t("you") : t("server")}
                            </span>
                            <span className={classes.bubble}>{message.message}</span>
                        </div>
                    ))
                )}
            </div>
            <Input
                label={t("message label")}
                hideLabel
                className={classes.input}
                addon={
                    <Button iconId="ri-send-plane-2-fill" onClick={onSend}>
                        {t("send")}
                    </Button>
                }
                nativeInputProps={{
                    value: draft,
                    onChange: event => setDraft(event.target.value),
                    onKeyDown: event => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            onSend();
                        }
                    }
                }}
            />
        </div>
    );
}

const useStyles = tss.withName({ RouteComponent }).create({
    root: {
        display: "flex",
        flexDirection: "column",
        gap: fr.spacing("4w"),
        padding: fr.spacing("4w"),
        border: `1px solid ${fr.colors.decisions.border.actionLow.blueFrance.default}`,
        borderRadius: fr.spacing("1v")
    },
    messages: {
        display: "flex",
        flexDirection: "column",
        gap: fr.spacing("2w"),
        minHeight: "40vh",
        padding: fr.spacing("2w"),
        backgroundColor: fr.colors.decisions.background.alt.grey.default,
        overflow: "auto",
        borderRadius: fr.spacing("1v")
    },
    messageRow: {
        display: "flex",
        alignItems: "center",
        gap: fr.spacing("2w")
    },
    originLabel: {
        minWidth: fr.spacing("10v"),
        color: fr.colors.decisions.text.actionHigh.blueFrance.default,
        fontWeight: 600,
        textTransform: "capitalize"
    },
    bubble: {
        padding: fr.spacing("2w"),
        borderRadius: fr.spacing("1v"),
        backgroundColor: fr.colors.decisions.background.contrast.grey.default,
        boxShadow: `0 1px 3px ${fr.colors.decisions.border.default.grey.default}` // subtle separation
    },
    client: {
        flexDirection: "row-reverse"
    },
    server: {},
    input: {
        alignSelf: "stretch"
    },
    placeholder: {
        margin: 0,
        color: fr.colors.decisions.text.default.grey.default
    }
});

const { i18n } = declareComponentKeys<
    "waiting for server messages" | "you" | "server" | "message label" | "send"
>()("WebsocketPage");

export type Chat = {
    evtMessages: StatefulReadonlyEvt<Chat.Message[]>;
    sendMessage: (message: string) => void;
};

export type I18n = typeof i18n;

namespace Chat {
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

        url.protocol = "ws:";

        url.pathname += "ws";

        const socket = new WebSocket(url.href, [`authorization_bearer_${await oidc.getAccessToken()}`]);

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

function getChat() {
    if (chat === undefined) {
        chat = createChat();
    }
    return chat;
}
