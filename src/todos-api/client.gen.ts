/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * todos
 * OpenAPI spec version: 2.0.4
 */
import { fetch } from "./axiosInstance";
export type PutTodo200 = {
    /** The id of the newly created todo item */
    id: string;
};

export type PutTodoBody = {
    /** @minLength 1 */
    text: string;
};

export type PutTodoIdBody = {
    isDone?: boolean;
    /** @minLength 1 */
    text?: string;
};

export interface Todo {
    id: string;
    isDone: boolean;
    text: string;
}

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];

export const putTodoId = (
    id: string,
    putTodoIdBody: PutTodoIdBody,
    options?: SecondParameter<typeof fetch>
) => {
    return fetch<void>(
        {
            url: `/todo/${id}`,
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            data: putTodoIdBody
        },
        options
    );
};

export const deleteTodoId = (id: string, options?: SecondParameter<typeof fetch>) => {
    return fetch<void>({ url: `/todo/${id}`, method: "DELETE" }, options);
};

export const putTodo = (putTodoBody: PutTodoBody, options?: SecondParameter<typeof fetch>) => {
    return fetch<PutTodo200>(
        {
            url: `/todo`,
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            data: putTodoBody
        },
        options
    );
};

export const getTodos = (options?: SecondParameter<typeof fetch>) => {
    return fetch<Todo[]>({ url: `/todos`, method: "GET" }, options);
};

export type PutTodoIdResult = NonNullable<Awaited<ReturnType<typeof putTodoId>>>;
export type DeleteTodoIdResult = NonNullable<Awaited<ReturnType<typeof deleteTodoId>>>;
export type PutTodoResult = NonNullable<Awaited<ReturnType<typeof putTodo>>>;
export type GetTodosResult = NonNullable<Awaited<ReturnType<typeof getTodos>>>;
