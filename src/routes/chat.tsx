import { createFileRoute } from "@tanstack/react-router";
import { enforceLogin } from "oidc";
import { useRerenderOnStateChange } from "evt/hooks";
import { useState } from "react";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { fr } from "@codegouvfr/react-dsfr";
import { tss } from "tss";
import { declareComponentKeys, useTranslation } from "i18n";
import { getChat } from "chat";

export const Route = createFileRoute("/chat")({
    component: RouteComponent,
    beforeLoad: enforceLogin
});

function RouteComponent() {
    const chat = getChat();

    useRerenderOnStateChange(chat.evtMessages);

    const messages = chat.evtMessages.state;

    const [draft, setDraft] = useState("");

    const { t } = useTranslation("ChatPage");
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
                    autoFocus: true,
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
>()("ChatPage");

export type I18n = typeof i18n;
