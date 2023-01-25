import { ValidationError } from "sequelize";
import { Todos } from "../db/db.js";

export async function getTodos( req, res ) {
    const todos = await Todos.findAll();
    res.send(todos);
}

export async function postTodo(req, res) {
    try {
        const { value, status, deadline, priority } = req.body;
        const result = await Todos.create({value, status, deadline, priority});
        res.send(result);
    } catch (err) {
        console.log(err);
        if (err instanceof ValidationError) {
            res.status(400).send(err.message);
        } else {
            res.status(500).send(err.message);
        }
    }
}

// will update value of a Todo 
export async function updateTodo(req, res) {
    try {
        const { id } = req.params
        const { value, status, deadline, priority } = req.body
        const update = await Todos.update({ value: value, status: status, deadline: deadline, priority: priority}, { where: {id: id}})
        res.send(update)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

// will delete todo
export async function deleteTodo(req, res) {
    try {
        const { id } = req.params
        const remove = await Todos.destroy({ where: {id: id}})
        res.send(`Deleted row ${remove}`)
    } catch (err) {
        res.status(500).send(err.message)
    }
}