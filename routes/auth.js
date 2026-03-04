import { Router } from "express";
import { getMYSQLClient } from "../lib/mysql2/client.js";
import jwt from "jsonwebtoken";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const db = await getMYSQLClient();

        await db.execute("CREATE TABLE IF NOT EXISTS users (_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(200) NOT NULL, email VARCHAR(200) NOT NULL UNIQUE, password VARCHAR(200) NOT NULL)");

        await db.execute(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, password]);

        return res.json({success: true});
    }
    catch(ex) {
        return res.json({success: false, error: "Failed to register user in database. Error: " + ex.message});
    }
});

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = await getMYSQLClient();

        await db.execute("CREATE TABLE IF NOT EXISTS users (_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(200) NOT NULL, email VARCHAR(200) NOT NULL UNIQUE, password VARCHAR(200) NOT NULL)");

        const rows = await db.execute(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password]);

        if(rows[0].length > 0) {
            const accessToken = jwt.sign({_id: rows[0][0]._id}, process.env.JWT_SECRET);

            return res.json({success: true, accessToken, userId: rows[0][0]._id});
        }
        else {
            return res.json({success: false, error: "No user found with given credentials."});
        }
    }
    catch(ex) {
        return res.json({success: false, error: "Failed to login. Error: " + ex.message});
    }
});