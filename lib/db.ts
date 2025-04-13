import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: "103.123.17.195",
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    port: 3306,
    database: "agapedim_codi",
    charset: "utf8mb4",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});