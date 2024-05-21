import { memo, useState } from "react";
import { tss } from "tss-react";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import Checkbox from "@mui/material/Checkbox";

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
    const { className, todo, onUpdateTodoText, onToggleTodo, onDeleteTodo } = props;

    const [isEditing, setIsEditing] = useState(false);

    const { classes, cx } = useStyles({ isEditing });

    return (
        <div className={cx(classes.root, className)}>
            <Checkbox checked={todo.isDone} onChange={() => onToggleTodo()} />

            <div className={classes.textWrapper}>
                {isEditing ? (
                    <input
                        className={cx(fr.cx("fr-input"), classes.input)}
                        value={todo.text}
                        onChange={e => onUpdateTodoText(e.target.value)}
                        onBlur={() => setIsEditing(false)}
                    />
                ) : (
                    <span className={classes.text}>{todo.text}</span>
                )}
            </div>

            <div className={classes.buttonsWrapper}>
                <Button
                    iconId="ri-pencil-line"
                    onClick={() => setIsEditing(!isEditing)}
                    priority="secondary"
                    title="Edit"
                />
                <Button
                    iconId="ri-delete-bin-line"
                    onClick={() => onDeleteTodo()}
                    priority="primary"
                    title="Delete"
                />
            </div>
        </div>
    );
});

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
