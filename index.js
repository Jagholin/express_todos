import "dotenv/config"
import express from "express";

import sql from "./db/db.js";
import cors from "cors";

import todosRouter from "./routes/todos.js";

const app = express();
app.use(cors());
const PORT = process.argv[2] || 3000;

app.use(express.json());
app.use("/todos", todosRouter);

app.use((req, res) => {
    res.status(404).send("This page doesn't exist");
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
})