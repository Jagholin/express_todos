import express from "express";

import sql from "./db/db.js";

import todosRouter from "./routes/todos.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/todos", todosRouter);

app.listen(PORT, () => {
    console.log("Server is running");
})