import { Todo } from "./Todo";
import { AddTodo } from "./AddTodo";
import { tss } from "tss";
import { usePartiallyAppliedEvent } from "tools/usePartiallyAppliedEvent";
import type { TodoItem } from "./type";
import { fr } from "@codegouvfr/react-dsfr";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
    className?: string;
    isPending: boolean;
    todos: TodoItem[];
    onAddTodo: (text: string) => void;
    onUpdateTodoText: (id: string, text: string) => void;
    onToggleTodo: (id: string) => void;
    onDeleteTodo: (id: string) => void;
};

export function TodoApp(props: Props) {
    const { className, isPending, todos, onAddTodo, onDeleteTodo, onToggleTodo, onUpdateTodoText } =
        props;

    const { classes, cx } = useStyles();

    /*

    Example:  

    ```ts
    const todoId= "123"

    const onUpdateEvent =  getOnUpdateTodoText(todoId);

    const text = "Hello"

    onUpdateEvent(text) // Will call onUpdateTodoText(todoId, text);
    ```

    Why is it useful? Because:  

        `getOnUpdateTodoText(todoId) === getOnUpdateTodoText(todoId)` // is true

    The function reference returned by `getOnUpdateTodoText(todoId)` is stable across re-renders.  

    If we use this custom hook instead of just doing:  
      onUpdateTodoText={()=> onUpdateTodoText(todo.id, todo.text)}
    It is because we want to avoid all <Todo /> to be re-rendered every time this component is re-rendered.  
    For that we use memo() on the Todo component but we also need to make sure that the references of the callbacks
    are stable.  
    Learn more: https://stackblitz.com/edit/react-ts-fyrwng?file=index.tsx

    Hot take: The builtin useCallback() hook should never be used. In any scenario.  
    It almost never enables to avoid rerender and is very error prone. It shouldn't exist in the first place.  
    https://stackoverflow.com/questions/65890278/why-cant-usecallback-always-return-the-same-ref

    Note: This is the state of the art for React 18. React 19 shuffles the deck with it's pre-compiler
    however there's only so much the compiler will be able to infer. It's important to be able to manually
    manage our re-rendering strategy.  
    */
    const getOnUpdateTodoText = usePartiallyAppliedEvent(([todoId]: [string], [text]: [string]) =>
        onUpdateTodoText(todoId, text)
    );
    const getOnToggleTodo = usePartiallyAppliedEvent(([todoId]: [string]) => onToggleTodo(todoId));
    const getOnDeleteTodo = usePartiallyAppliedEvent(([todoId]: [string]) => onDeleteTodo(todoId));

    return (
        <div className={cx(classes.root, className)}>
            <AddTodo onAddTodo={onAddTodo} />
            {isPending && (
                <CircularProgress className={classes.circularProgress} size={fr.spacing("7v")} />
            )}
            <div className={classes.todoListWrapper}>
                {todos.map(todo => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        onUpdateTodoText={getOnUpdateTodoText(todo.id)}
                        onToggleTodo={getOnToggleTodo(todo.id)}
                        onDeleteTodo={getOnDeleteTodo(todo.id)}
                    />
                ))}
            </div>
        </div>
    );
}

const useStyles = tss.withName({ TodoApp }).create({
    root: {
        border: `1px solid ${fr.colors.decisions.border.actionLow.blueFrance.default}`,
        padding: fr.spacing("5w"),
        position: "relative"
    },
    circularProgress: {
        position: "absolute",
        top: fr.spacing("2v"),
        right: fr.spacing("2v")
    },
    todoListWrapper: {
        display: "flex",
        flexDirection: "column",
        gap: fr.spacing("2w")
    }
});
