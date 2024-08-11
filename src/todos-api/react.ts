import {
    useQuery,
    useQueryClient,
    useMutation,
    useIsMutating,
    useIsFetching
} from "@tanstack/react-query";
import { getTodos, putTodo, putTodoId, deleteTodoId } from "./client.gen";

const queryKey = ["todos"];

export function useTodosApi() {
    const { data: todos } = useQuery({
        queryKey,
        queryFn: getTodos
    });

    const queryClient = useQueryClient();

    const { mutate: createTodo } = useMutation({
        mutationFn: async (text: string) => {
            await putTodo({ text });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey })
    });

    const { mutate: updateTodo } = useMutation({
        mutationFn: async (params: { id: string; text?: string; isDone?: boolean }) => {
            const { id, text, isDone } = params;

            await putTodoId(id, { text, isDone });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey })
    });

    const { mutate: deleteTodo } = useMutation({
        mutationFn: async (id: string) => {
            await deleteTodoId(id);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey })
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
