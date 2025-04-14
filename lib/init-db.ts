import dotenv from "dotenv"
dotenv.config()

import { db } from "@/lib/db"

const init = async () => {
	try {
		const sql = `
      -- Drop existing tables (in correct dependency order)
        DROP TABLE IF EXISTS Accounts_Course;
        DROP TABLE IF EXISTS Module;
        DROP TABLE IF EXISTS Type_Module;
        DROP TABLE IF EXISTS Course;
        DROP TABLE IF EXISTS accounts;

      -- Create tables
        CREATE TABLE IF NOT EXISTS accounts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            fullname TEXT CHARACTER SET utf8mb4,
            email VARCHAR(320) CHARACTER SET ascii COLLATE ascii_bin,
            password TEXT CHARACTER SET ascii COLLATE ascii_bin
        );


     CREATE TABLE IF NOT EXISTS Course (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        instructorName VARCHAR(255),
        instructorAvatar VARCHAR(255)
    );

    -- Create Type_Module table
    CREATE TABLE IF NOT EXISTS Type_Module (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama VARCHAR(255) NOT NULL
    );

    -- Create Module (formerly Post)
    CREATE TABLE IF NOT EXISTS Module (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        totalLessons INT DEFAULT 0,
        completedLessons INT DEFAULT 0,
        duration VARCHAR(50),
        image VARCHAR(255),
        id_type_module INT,
        id_course INT,
        FOREIGN KEY (id_type_module) REFERENCES Type_Module(id) ON DELETE SET NULL ON UPDATE CASCADE,
        FOREIGN KEY (id_course) REFERENCES Course(id) ON DELETE SET NULL ON UPDATE CASCADE
    );

    -- Create Accounts_Course with updated id_user as INT
    CREATE TABLE IF NOT EXISTS Accounts_Course (
        id_user INT NOT NULL,
        id_course INT NOT NULL,
        date_join DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id_user, id_course),
        FOREIGN KEY (id_user) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (id_course) REFERENCES Course(id) ON DELETE CASCADE ON UPDATE CASCADE
    );
    `

		await db.query(sql)
		console.log("✅ Tables dropped & created successfully.")
		process.exit(0)
	} catch (err) {
		console.error("❌ Error creating tables:", err)
		process.exit(1)
	}
}

init()
