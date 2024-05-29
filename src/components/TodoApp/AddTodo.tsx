import { memo, useState } from "react";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { declareComponentKeys, useTranslation } from "i18n";

type Props = {
    className?: string;
    onAddTodo: (text: string) => void;
};

export const AddTodo = memo((props: Props) => {
    const { className } = props;

    const { t } = useTranslation("AddTodo");

    const [text, setText] = useState("");

    return (
        <Input
            className={className}
            label={t("add a todo")}
            addon={
                <Button
                    iconId="ri-add-line"
                    onClick={() => {
                        if (text === "") {
                            return;
                        }
                        props.onAddTodo(text);
                    }}
                >
                    {t("validate")}
                </Button>
            }
            nativeInputProps={{
                value: text,
                onChange: e => setText(e.target.value)
            }}
        />
    );
});

const { i18n } = declareComponentKeys<"add a todo" | "validate">()("AddTodo");

export type I18n = typeof i18n;
