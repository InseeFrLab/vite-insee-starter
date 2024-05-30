import { protectedLoader } from "oidc";
import { useSuspenseQuery, useIsFetching, useIsMutating } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
    getGetTodosQueryKey,
    getGetTodosQueryOptions,
    useDeleteTodoId,
    usePutTodo,
    usePutTodoId
} from "api/endpoints/default";
import { TodoApp } from "components/TodoApp";
import { queryClient } from "main";
import { tss } from "tss";
import { fr } from "@codegouvfr/react-dsfr";

export const Route = createFileRoute("/todo")({
    component: TodoIndex,
    beforeLoad: protectedLoader
});

function TodoIndex() {
    const todoQuery = useSuspenseQuery(getGetTodosQueryOptions());
    const todos = todoQuery.data;

    const mutationPutTodo = usePutTodoId({
        mutation: {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: getGetTodosQueryKey() });
            }
        }
    });
    const mutationAddTodo = usePutTodo({
        mutation: {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: getGetTodosQueryKey() });
            }
        }
    });
    const mutationDeleteTodo = useDeleteTodoId({
        mutation: {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: getGetTodosQueryKey() });
            }
        }
    });

    const addTodo = (text: string) =>
        mutationAddTodo.mutate({
            data: { text }
        });

    const deleteTodo = (id: string) => mutationDeleteTodo.mutate({ id });

    const toggleTodo = (id: string) => {
        const todo = todos.find(todo => todo.id === id);

        mutationPutTodo.mutate({
            id,
            data: { isDone: !todo?.isDone }
        });
    };

    const updateTodo = (id: string, text: string) =>
        mutationPutTodo.mutate({
            id,
            data: { text }
        });

    const { classes } = useStyles();

    const isPending = (function useClosure() {
        const fetchingCount = useIsFetching();
        const mutatingCount = useIsMutating();

        return fetchingCount !== 0 || mutatingCount !== 0;
    })();

    return (
        <div className={classes.root}>
            <TodoApp
                className={classes.todoApp}
                isPending={isPending}
                onAddTodo={addTodo}
                onDeleteTodo={deleteTodo}
                onToggleTodo={toggleTodo}
                onUpdateTodoText={updateTodo}
                todos={todos}
            />
        </div>
    );
}

const useStyles = tss.withName({ TodoIndex }).create({
    root: {
        display: "flex",
        justifyContent: "center"
    },
    todoApp: {
        width: `min(100%, ${fr.breakpoints.emValues.lg}em)`
    }
});
