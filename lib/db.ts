import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: "localhost",
    user: process.env.AD_SQL_USERNAME,
    password: process.env.AD_SQL_PASSWORD,
    port: 3306,
    database: "agapedim_codi",
    charset: "utf8mb4",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});