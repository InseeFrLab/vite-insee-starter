import { useIsMutating, useIsFetching, useQueryClient } from "@tanstack/react-query";

import {
    usePutTodo,
    getGetTodosQueryKey,
    usePutTodoId,
    useDeleteTodoId,
    useGetTodos
} from "./client.gen";

const queryKey = getGetTodosQueryKey();

export function useTodosApi() {
    const queryClient = useQueryClient();

    const { data: todos } = useGetTodos();

    const { mutate: createTodo } = usePutTodo({
        mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
    });

    const { mutate: updateTodo } = usePutTodoId({
        mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
    });

    const { mutate: deleteTodo } = useDeleteTodoId({
        mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey }) }
    });

    const mutationCount = useIsMutating();
    const fetchingCount = useIsFetching();

    return {
        todos,
        isPending: fetchingCount !== 0 || mutationCount !== 0,
        createTodo,
        updateTodo,
        deleteTodo
    };
}
