import { memo, useState } from "react";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { Button } from "@codegouvfr/react-dsfr/Button";

type Props = {
    className?: string;
    onAddTodo: (text: string) => void;
};

export const AddTodo = memo((props: Props) => {
    const { className } = props;

    const [text, setText] = useState("");

    return (
        <Input
            className={className}
            label="Add a todo"
            addon={
                <Button iconId="ri-add-line" onClick={() => props.onAddTodo("todo")}>
                    Validate
                </Button>
            }
            nativeInputProps={{
                value: text,
                onChange: e => setText(e.target.value)
            }}
        />
    );
});
