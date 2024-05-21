import { Todo } from "./Todo";
import { AddTodo } from "./AddTodo";
import { tss } from "tss-react";
import { useListCallbacks } from "tools/useListCallbacks";

type Props = {
    className?: string;
    todos: Todo[];
    onAddTodo: (text: string) => void;
    onUpdateTodoText: (id: string, text: string) => void;
    onToggleTodo: (id: string) => void;
    onDeleteTodo: (id: string) => void;
};

export function TodoApp(props: Props) {
    const { className, todos, onAddTodo, onUpdateTodoText, onToggleTodo, onDeleteTodo } = props;

    const { classes, cx } = useState();

    const getOnUpdateTodoText = useListCallbacks(([todoId]: [string], [text]: [string]) =>
        onUpdateTodoText(todoId, text)
    );
    const getOnToggleTodo = useListCallbacks(([todoId]: [string]) => onToggleTodo(todoId));
    const getOnDeleteTodo = useListCallbacks(([todoId]: [string]) => onDeleteTodo(todoId));

    return (
        <div className={cx(classes.root, className)}>
            <AddTodo className={classes.addTodo} onAddTodo={onAddTodo} />
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

const useState = tss.withName({ TodoApp }).create({
    root: {},
    addTodo: {},
    todoListWrapper: {}
});
