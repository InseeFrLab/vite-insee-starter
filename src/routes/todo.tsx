import { beforeLoadProtectedRoute } from "oidc";
import { createFileRoute } from "@tanstack/react-router";
import { useTodosApi } from "todos-api";
import { TodoApp } from "components/TodoApp";
import { tss } from "tss";
import { fr } from "@codegouvfr/react-dsfr";
import { assert } from "tsafe/assert";
import CircularProgress from "@mui/material/CircularProgress";

export const Route = createFileRoute("/todo")({
    component: Page,
    beforeLoad: beforeLoadProtectedRoute
});

function Page() {
    const { todos, createTodo, deleteTodo, updateTodo, isPending } = useTodosApi();

    const { classes } = useStyles();

    if (todos === undefined) {
        return (
            <div className={classes.circularProgressWrapper}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <TodoApp
                className={classes.todoApp}
                todos={todos}
                isPending={isPending}
                onAddTodo={createTodo}
                onDeleteTodo={deleteTodo}
                onUpdateTodoText={(id, text) => updateTodo({ id, text })}
                onToggleTodo={id => {
                    const todo = todos.find(todo => todo.id === id);

                    assert(todo !== undefined);

                    updateTodo({
                        id,
                        isDone: !todo.isDone
                    });
                }}
            />
        </div>
    );
}

const useStyles = tss.create({
    root: {
        display: "flex",
        justifyContent: "center"
    },
    todoApp: {
        width: `min(100%, ${fr.breakpoints.emValues.lg}em)`
    },
    circularProgressWrapper: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
});
