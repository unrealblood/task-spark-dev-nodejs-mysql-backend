import { Router } from "express";
import { getMYSQLClient } from "../lib/mysql2/client.js";

export const userRouter = Router();

userRouter.get("/get-user/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const db = await getMYSQLClient();

        await db.execute("CREATE TABLE IF NOT EXISTS users (_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(200) NOT NULL, email VARCHAR(200) NOT NULL UNIQUE, password VARCHAR(200) NOT NULL)");

        const rows = await db.execute("SELECT * from users WHERE _id = ?", [userId]);

        if(rows[0].length > 0) {
            return res.json({success: true, user: rows[0][0]});
        }

        return res.json({success: false});
    }
    catch(error) {
        return res.json({success: false, error: "Failed to get user from database. Error: " + error.message});
    }
});