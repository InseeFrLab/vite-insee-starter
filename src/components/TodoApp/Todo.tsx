import { memo, useState, useEffect, useReducer } from "react";
import { tss } from "tss-react";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import Checkbox from "@mui/material/Checkbox";
import { useEvent } from "tools/useEvent";
import { deepEqual } from "tools/deepEqual";

export type Todo = {
    id: string;
    text: string;
    isDone: boolean;
};

type TodoProps = {
    className?: string;
    todo: Todo;
    onUpdateTodoText: (text: string) => void;
    onToggleTodo: () => void;
    onDeleteTodo: () => void;
};

export const Todo = memo((props: TodoProps) => {
    const { className, todo, onToggleTodo, onDeleteTodo } = props;

    // NOTE: Make sure it's not stale for when used in the reducer.
    // We know it's constant because we also used useListEvent() in the parent component
    // but this component is not supposed to be aware of that.
    const onUpdateTodoText = useEvent(props.onUpdateTodoText);

    const [isEditing, setIsEditing] = useReducer((isEditing: boolean, isEditing_new: boolean) => {
        if (isEditing_new === isEditing) {
            return isEditing;
        }

        if (!isEditing_new) {
            onUpdateTodoText(text);
        }

        return isEditing_new;
    }, false);

    const { classes, cx } = useStyles({ isEditing });

    const [text, setText] = useState(todo.text);

    useEffect(() => {
        setText(todo.text);
    }, [todo.text]);

    return (
        <div className={cx(classes.root, className)}>
            <Checkbox checked={todo.isDone} onChange={() => onToggleTodo()} />

            <div className={classes.textWrapper}>
                {isEditing ? (
                    <input
                        className={cx(fr.cx("fr-input"), classes.input)}
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onBlur={() => setIsEditing(false)}
                    />
                ) : (
                    <span className={classes.text}>{todo.text}</span>
                )}
            </div>

            <div className={classes.buttonsWrapper}>
                <Button
                    iconId={isEditing ? "ri-check-line" : "ri-pencil-line"}
                    onClick={() => setIsEditing(!isEditing)}
                    priority="secondary"
                    title="Edit"
                />
                <Button
                    iconId="ri-delete-bin-line"
                    onClick={onDeleteTodo}
                    priority="primary"
                    title="Delete"
                />
            </div>
        </div>
    );
}, deepEqual);
// NOTE: We use deepEqual above to avoid having the component re-render if the ref of the todo has changed but it's actually the same todo.

const useStyles = tss
    .withName({ Todo })
    .withParams<{ isEditing: boolean }>()
    .create(({ isEditing }) => ({
        root: {
            backgroundColor: isEditing
                ? fr.colors.decisions.background.alt.blueFrance.active
                : fr.colors.decisions.background.alt.blueFrance.default,
            "&:hover": {
                backgroundColor: fr.colors.decisions.background.alt.blueFrance.hover
            },
            display: "flex",
            alignItems: "center",
            padding: fr.spacing("2w")
        },
        textWrapper: {
            flex: 1
        },
        input: {},
        text: {},
        buttonsWrapper: {}
    }));
