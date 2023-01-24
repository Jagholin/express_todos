import { Router } from "express";
import { getTodos, postTodo } from "../controllers/todos.js";

const router = Router();

// this will get all the todos
router.get("/", getTodos);

router.post("/", postTodo);

export default router;