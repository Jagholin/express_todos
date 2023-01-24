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
        res.status(500).send(err.message);
    }
}