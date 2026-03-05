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

tasksRouter.put("/update-task-content/:taskId", async (req, res) => {
    const { taskId } = req.params;
    const { newContent } = req.body;

    try {
        const db = await getMYSQLClient();

        await db.execute("CREATE TABLE IF NOT EXISTS tasks (_id INT AUTO_INCREMENT PRIMARY KEY, content VARCHAR(200) NOT NULL, completed BOOL NOT NULL, userId INT NOT NULL)");

        const result = await db.execute("UPDATE tasks SET content = ? WHERE _id = ?", [newContent, taskId]);

        if(result[0].affectedRows > 0) {
            return res.json({success: true});
        }

        return res.json({success: false});
    }
    catch(ex) {
        return res.json({success: false, error: "Failed to update task in database. Error: " + ex.message});
    }
});

tasksRouter.put("/update-task-completed/:taskId", async (req, res) => {
    const { taskId } = req.params;
    const { newCompleted } = req.body;

    try {
        const db = await getMYSQLClient();

        await db.execute("CREATE TABLE IF NOT EXISTS tasks (_id INT AUTO_INCREMENT PRIMARY KEY, content VARCHAR(200) NOT NULL, completed BOOL NOT NULL, userId INT NOT NULL)");

        const result = await db.execute("UPDATE tasks SET completed = ? WHERE _id = ?", [newCompleted, taskId]);

        if(result[0].affectedRows > 0) {
            return res.json({success: true});
        }

        return res.json({success: false});
    }
    catch(ex) {
        return res.json({success: false, error: "Failed to update task in database. Error: " + ex.message});
    }
});

tasksRouter.delete("/delete-task/:taskId", async (req, res) => {
    const { taskId } = req.params;

    try {
        const db = await getMYSQLClient();

        await db.execute("CREATE TABLE IF NOT EXISTS tasks (_id INT AUTO_INCREMENT PRIMARY KEY, content VARCHAR(200) NOT NULL, completed BOOL NOT NULL, userId INT NOT NULL)");

        const result = await db.execute("DELETE FROM tasks WHERE _id = ?", [taskId]);

        if(result[0].affectedRows > 0) {
            return res.json({success: true});
        }

        return res.json({success: false});
    }
    catch(ex) {
        return res.json({success: false, error: "Failed to delete task in database. Error: " + ex.message});
    }
});