import { Router } from "express";
import { getTodos, postTodo } from "../controllers/todos.js";

const router = Router();

// this will get all the todos
router.get("/", getTodos);
router.post("/", postTodo);

// put - to change a single todo
// delete - to delete a single todo
// get("/:id") - to get a single todo

export default router;