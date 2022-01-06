"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todos_1 = require("../models/todos");
const TODOS = [];
const createTodo = (req, res, next) => {
    const { text } = req.body;
    const newTodo = new todos_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({
        message: 'TODO added successfully',
        createTodo: newTodo,
    });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const { id } = req.params;
    const { text } = req.body;
    const todoIndex = TODOS.findIndex(todo => todo.id === id);
    if (todoIndex < 0) {
        res.status(400).json({
            message: 'no such todo item'
        });
        return;
    }
    TODOS[todoIndex] = new todos_1.Todo(id, text);
    res.status(200).json({
        message: 'Updates',
        todo: TODOS[todoIndex]
    });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const { id } = req.params;
    const { text } = req.body;
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
};
exports.deleteTodo = deleteTodo;
