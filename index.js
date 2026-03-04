import "dotenv/config";

import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());

app.use("/auth", authRouter);

app.listen(parseInt(process.env.PORT_NUMBER), (error) => {
    if(error) {
        console.log("Failed to start the server. Error: " + error.message);
        return;
    }

    console.log("Server is up and running on port number: " + process.env.PORT_NUMBER);
});