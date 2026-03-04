import mysql from "mysql2/promise";

export async function getMYSQLClient() {
    return await mysql.createConnection({
        host: "localhost",
        user: process.env.MYSQL_USER_NAME,
        password: process.env.MYSQL_USER_PASSWORD,
        database: process.env.MYSQL_DATABASE_NAME
    });
}