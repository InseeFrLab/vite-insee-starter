import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
    getGetTodosQueryOptions,
    useDeleteTodoId,
    usePutTodo,
    usePutTodoId
} from "api/endpoints/default";
import { TodoApp } from "components/TodoApp";

export const Route = createFileRoute("/todo/")({
    component: TodoIndex,
    loader: ({ context: { queryClient }, abortController }) =>
        queryClient.ensureQueryData(
            getGetTodosQueryOptions({ request: { signal: abortController.signal } })
        )
});

function TodoIndex() {
    const todoQuery = useSuspenseQuery(getGetTodosQueryOptions());
    const todos = todoQuery.data;

    const mutationPutTodo = usePutTodoId();
    const mutationAddTodo = usePutTodo();
    const mutationDeleteTodo = useDeleteTodoId();

    const addTodo = (text: string) =>
        mutationAddTodo.mutate({
            data: { text }
        });

    const deleteTodo = (id: string) => mutationDeleteTodo.mutate({ id });

    const toggleTodo = (id: string) =>
        mutationPutTodo.mutate({
            id,
            data: { isDone: true }
        });

    const updateTodo = (id: string, text: string) =>
        mutationPutTodo.mutate({
            id,
            data: { text }
        });

    return (
        <TodoApp
            onAddTodo={addTodo}
            onDeleteTodo={deleteTodo}
            onToggleTodo={toggleTodo}
            onUpdateTodoText={updateTodo}
            todos={todos}
        />
    );
}

const mockTodos = [
    {
        id: "1",
        text: "test1",
        isDone: false
    },

    {
        id: "2",
        text: "test2",
        isDone: false
    },
    {
        id: "3",
        text: "test3",
        isDone: true
    },
    {
        id: "4",
        text: "test4",
        isDone: true
    }
];
