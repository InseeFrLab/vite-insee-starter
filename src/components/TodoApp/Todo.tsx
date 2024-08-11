import { memo, useState, useEffect } from "react";
import { tss } from "tss";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import Checkbox from "@mui/material/Checkbox";
import { useEvent } from "tools/useEvent";
import { deepEqual } from "tools/deepEqual";
import type { TodoItem } from "./type";
import { assert } from "tsafe/assert";
import { declareComponentKeys, useTranslation } from "i18n";

// Todo item but without the id, we don't need it.
export type TodoItemLike = {
    text: string;
    isDone: boolean;
};

// Make sure that the type `TodoItemLike` is a subset of `TodoItem`
// This will give us red squiggles if we forget to update `TodoItemLike` when we update `TodoItem`
assert<TodoItem extends TodoItemLike ? true : false>();

type TodoProps = {
    className?: string;
    todo: TodoItemLike;
    onUpdateTodoText: (text: string) => void;
    onToggleTodo: () => void;
    onDeleteTodo: () => void;
};

export const Todo = memo((props: TodoProps) => {
    const { t } = useTranslation("Todo");

    const { className, todo, onToggleTodo, onDeleteTodo, onUpdateTodoText } = props;

    const [text, setText] = useState(todo.text);

    useEffect(() => {
        setText(todo.text);
    }, [todo.text]);

    const [isEditing, setIsEditing] = useState(false);

    const onEditButtonClick = useEvent(() => {
        if (isEditing) {
            onUpdateTodoText(text);
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    });

    const { classes, cx } = useStyles({ isEditing });

    return (
        <div className={cx(classes.root, className)}>
            <Checkbox checked={todo.isDone} onChange={() => onToggleTodo()} />

            <div className={classes.textWrapper}>
                {isEditing ? (
                    <input
                        className={cx(fr.cx("fr-input"), classes.input)}
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                ) : (
                    <span className={classes.text}>{todo.text}</span>
                )}
            </div>

            <div className={classes.buttonsWrapper}>
                <Button
                    iconId={isEditing ? "ri-check-line" : "ri-pencil-line"}
                    onClick={onEditButtonClick}
                    priority="secondary"
                    title={t("edit")}
                />
                <Button
                    iconId="ri-delete-bin-line"
                    onClick={onDeleteTodo}
                    priority="primary"
                    title={t("delete")}
                />
            </div>
        </div>
    );
}, deepEqual);
// NOTE: We use deepEqual above to avoid having the component re-render if the ref of the todo has changed but it's actually the same todo.

const { i18n } = declareComponentKeys<"edit" | "delete">()("Todo");

export type I18n = typeof i18n;

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
