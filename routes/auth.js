import { Router } from "express";
import { getMYSQLClient } from "../lib/mysql2/client.js";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const db = await getMYSQLClient();

    console.log(await db.execute("SHOW DATABASES;"));
});