import { Todo } from "./Todo";
import { AddTodo } from "./AddTodo";
import { tss } from "tss";
import type { TodoItem } from "./type";
import { fr } from "@codegouvfr/react-dsfr";
import CircularProgress from "@mui/material/CircularProgress";

/*
NOTE: This component is abstracted away from the actual API calls in order
to make it easily testable in tools like Storybook.
*/

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
                        onUpdateTodoText={text => onUpdateTodoText(todo.id, text)}
                        onToggleTodo={() => onToggleTodo(todo.id)}
                        onDeleteTodo={() => onDeleteTodo(todo.id)}
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
