import { createFileRoute } from "@tanstack/react-router";
import { enforceLogin } from "oidc";
import { useTodosApi } from "todos-api";
import { TodoApp } from "components/TodoApp";
import { tss, keyframes } from "tss";
import { fr } from "@codegouvfr/react-dsfr";
import { assert } from "tsafe/assert";
import CircularProgress from "@mui/material/CircularProgress";
import { declareComponentKeys, useTranslation } from "i18n";

export const Route = createFileRoute("/todo")({
    component: Page,
    beforeLoad: async params => {
        await enforceLogin(params);
    }
});

function Page() {
    const { todos, createTodo, deleteTodo, updateTodo, isPending } = useTodosApi();

    const { classes } = useStyles();

    const { t } = useTranslation("TodoPage");

    if (todos === undefined) {
        return (
            <div className={classes.circularProgressWrapper}>
                <CircularProgress />
                <br />
                <h5 className={classes.delayedMessage}>{t("waking up container")}</h5>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <TodoApp
                className={classes.todoApp}
                todos={todos}
                isPending={isPending}
                onAddTodo={createTodo}
                onDeleteTodo={deleteTodo}
                onUpdateTodoText={(id, text) => updateTodo({ id, text })}
                onToggleTodo={id => {
                    const todo = todos.find(todo => todo.id === id);

                    assert(todo !== undefined);

                    updateTodo({
                        id,
                        isDone: !todo.isDone
                    });
                }}
            />
        </div>
    );
}

const { i18n } = declareComponentKeys<"waking up container">()("TodoPage");

export type I18n = typeof i18n;

const useStyles = tss.create({
    root: {
        display: "flex",
        justifyContent: "center",
        animation: `${keyframes({
            "0%": {
                opacity: 0
            },
            "100%": {
                opacity: 1
            }
        })} 0.2s forwards`
    },
    todoApp: {
        width: `min(100%, ${fr.breakpoints.emValues.lg}em)`
    },
    circularProgressWrapper: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    delayedMessage: {
        animation: `${keyframes({
            "0%": {
                opacity: 0
            },
            "80%": {
                opacity: 0
            },
            "100%": {
                opacity: 1
            }
        })} 1s forwards`
    }
});
