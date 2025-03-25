import { useQuery, useMutation, useIsMutating, useIsFetching, QueryClient } from "@tanstack/react-query";

import { getTodos, putTodo, putTodoId, deleteTodoId, getGetTodosQueryOptions } from "./client.gen";

const queryKey = ["todos"];

const queryClient = new QueryClient();

export function useTodosApi() {
    const { data: todos } = useQuery(
        {
            queryKey,
            queryFn: getTodos
        },
        queryClient
    );

    const { mutate: createTodo } = useMutation(
        {
            mutationFn: async (text: string) => {
                await putTodo({ text });
            },
            onSuccess: () => queryClient.invalidateQueries({ queryKey })
        },
        queryClient
    );

    const { mutate: updateTodo } = useMutation(
        {
            mutationFn: async (params: { id: string; text?: string; isDone?: boolean }) => {
                const { id, text, isDone } = params;

                await putTodoId(id, { text, isDone });
            },
            onSuccess: () => queryClient.invalidateQueries({ queryKey })
        },
        queryClient
    );

    const { mutate: deleteTodo } = useMutation(
        {
            mutationFn: async (id: string) => {
                await deleteTodoId(id);
            },
            onSuccess: () => queryClient.invalidateQueries({ queryKey })
        },
        queryClient
    );

    const mutationCount = useIsMutating({}, queryClient);
    const fetchingCount = useIsFetching({}, queryClient);

    return {
        todos,
        isPending: fetchingCount !== 0 || mutationCount !== 0,
        createTodo,
        updateTodo,
        deleteTodo
    };
}

export async function prefetchTodos(params: { abortController: AbortController }) {
    const { abortController } = params;

    await queryClient.prefetchQuery(
        getGetTodosQueryOptions({ request: { signal: abortController.signal } })
    );
}
