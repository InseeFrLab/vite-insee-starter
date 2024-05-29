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

    const { classes, cx } = useStyles();

    /*
    If we use this custom hook instead of just doing:  
      onToggleTodo={()=> onToggleTodo(todo.id)}
    It is because we want to avoid all <Todo /> to be re-rendered every time this component is re-rendered.  
    For that we use memo() on the Todo component but we also need to make sure that the references of the callbacks
    are stable.  
    Learn more: https://stackblitz.com/edit/react-ts-fyrwng?file=index.tsx

    Hot take: The builtin useCallback() hook should never be used. In any scenario.  
    It almost never enables to avoid rerender and is very error prone. It shouldn't exist in the first place.  

    Note: This is the state of the art for React 18. React 19 shuffles the deck with it's pre-compiler.  
    */
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

const useStyles = tss.withName({ TodoApp }).create({
    root: {},
    addTodo: {},
    todoListWrapper: {}
});
