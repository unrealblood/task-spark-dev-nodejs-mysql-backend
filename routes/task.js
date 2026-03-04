import { Router } from "express";
import { getMYSQLClient } from "../lib/mysql2/client.js";

export const tasksRouter = Router();

tasksRouter.get("/get-all/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const db = await getMYSQLClient();

        await db.execute("CREATE TABLE IF NOT EXISTS tasks (_id INT AUTO_INCREMENT PRIMARY KEY, content VARCHAR(200) NOT NULL, completed BOOL NOT NULL, userId INT NOT NULL)");

        const rows = await db.execute("SELECT * FROM tasks WHERE userId = ?", [userId]);

        if(rows[0].length > 0) {
            return res.json({success: true, tasks: rows[0]});
        }

        return res.json({success: false});
    }
    catch(error) {
        return res.json({success: false, error: "Failed to get all tasks of a user from database. Error: " + error.message});
    }
});

tasksRouter.post("/add-task", async (req, res) => {
    const { content, completed, userId } = req.body;

    try {
        const db = await getMYSQLClient();

        await db.execute("CREATE TABLE IF NOT EXISTS tasks (_id INT AUTO_INCREMENT PRIMARY KEY, content VARCHAR(200) NOT NULL, completed BOOL NOT NULL, userId INT NOT NULL)");

        const result = await db.execute("INSERT INTO tasks (content, completed, userId) VALUES (?, ?, ?)", [content, completed, userId]);

        if(result) {
            return res.json({success: true, taskId: result[0].insertId});
        }

        return res.json({success: false});
    }
    catch(error) {
        return res.json({success: false, error: "Failed to add task in database. Error: " + error.message});
    }
});