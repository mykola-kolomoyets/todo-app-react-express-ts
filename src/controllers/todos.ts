import { RequestHandler } from "express";

import { Todo } from "../models/todos";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const { text } = req.body as Pick<Todo, 'text'>;

    const newTodo: Todo = new Todo(Math.random().toString(), text);

    TODOS.push(newTodo);

    res.status(201).json({
        message: 'TODO added successfully', 
        createTodo: newTodo,
    });
}

export const getTodos: RequestHandler = (req, res, next) => {
    res.json({todos: TODOS});
}

type UpdateTodo = {
    id: string
}

export const updateTodo: RequestHandler<UpdateTodo> = (req, res, next) => {
    const { id } = req.params;

    const { text } = req.body as Pick<Todo, 'text'>;

    const todoIndex = TODOS.findIndex(todo => todo.id === id);

    if (todoIndex < 0) {
        res.status(400).json({ 
            message: 'no such todo item'
        });
        return;
    }

    TODOS[todoIndex] = new Todo(id, text);

    res.status(200).json({
        message: 'Updates',
        todo: TODOS[todoIndex]
    });
}

export const deleteTodo: RequestHandler = (req, res, next) => {
    const { id } = req.params;

    const { text } = req.body as Pick<Todo, 'text'>;

    const todoIndex = TODOS.findIndex(todo => todo.id === id);

    if (todoIndex < 0) {
        res.status(400).json({ 
            message: 'no such todo item'
        });
        return;
    }

    TODOS.splice(todoIndex, 1);

    res.status(200).json({
        message: 'Todo removed'
    });
}