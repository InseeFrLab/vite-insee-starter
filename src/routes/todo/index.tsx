import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getGetTodosQueryOptions } from "api/endpoints/default";
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
    const todo = todoQuery.data;

    const test = (params: unknown) => console.log(params);

    const todos = [
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
    return (
        <TodoApp
            onAddTodo={test}
            onDeleteTodo={test}
            onToggleTodo={test}
            onUpdateTodoText={test}
            todos={todos}
        />
    );
}
