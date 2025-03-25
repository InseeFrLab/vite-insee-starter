import { createFileRoute } from "@tanstack/react-router";
import { enforceLogin } from "oidc";
import { TodoApp } from "components/TodoApp";
import { tss, keyframes } from "tss";
import { fr } from "@codegouvfr/react-dsfr";
import { assert } from "tsafe/assert";
import CircularProgress from "@mui/material/CircularProgress";
import { declareComponentKeys, useTranslation } from "i18n";
import {
    getGetTodosQueryKey,
    getGetTodosQueryOptions,
    useDeleteTodoId,
    useGetTodos,
    usePutTodo,
    usePutTodoId
} from "todos-api";
import { useIsMutating, useIsFetching, useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/todo")({
    component: Page,
    pendingComponent: PendingTodo,
    beforeLoad: enforceLogin,
    loader: ({ context: { queryClient }, abortController }) => {
        queryClient.prefetchQuery(
            getGetTodosQueryOptions({ request: { signal: abortController.signal } })
        );
    }
});

function PendingTodo() {
    const { classes } = useStyles();
    const { t } = useTranslation("TodoPage");

    return (
        <div className={classes.circularProgressWrapper}>
            <CircularProgress />
            <br />
            <h5 className={classes.delayedMessage}>{t("waking up container")}</h5>
        </div>
    );
}
function Page() {
    const queryClient = useQueryClient();

    const { data: todos } = useGetTodos();

    const { mutate: createTodo } = usePutTodo({
        mutation: {
            onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetTodosQueryKey() })
        }
    });

    const { mutate: updateTodo } = usePutTodoId({
        mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetTodosQueryKey() }) }
    });

    const { mutate: deleteTodo } = useDeleteTodoId({
        mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetTodosQueryKey() }) }
    });

    const mutationCount = useIsMutating();
    const fetchingCount = useIsFetching();

    const isPending = fetchingCount !== 0 || mutationCount !== 0;

    const { classes } = useStyles();

    if (todos === undefined) {
        return <PendingTodo />;
    }

    return (
        <div className={classes.root}>
            <TodoApp
                className={classes.todoApp}
                todos={todos}
                isPending={isPending}
                onAddTodo={text => createTodo({ data: { text } })}
                onDeleteTodo={id => deleteTodo({ id })}
                onUpdateTodoText={(id, text) => updateTodo({ id, data: { text } })}
                onToggleTodo={id => {
                    const todo = todos.find(todo => todo.id === id);

                    assert(todo !== undefined);

                    updateTodo({
                        id,
                        data: { isDone: !todo.isDone }
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
