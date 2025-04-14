// scripts/seed-modul-acc.ts
import dotenv from "dotenv";
dotenv.config();

import { db } from "@/lib/db";

const seed = async () => {
  try {
    console.log("🌱 Starting database view...");

    // Insert Type_Module
    console.log(await db.query(`
        SELECT *
        FROM Course;
      `));
    console.log(await db.query(`
        SELECT *
        FROM Module;
      `));
    console.log(await db.query(`
        SELECT *
        FROM Course c
        RIGHT JOIN Module m ON c.id = m.id_course
        GROUP BY c.id
        ORDER BY c.id
      `));
    process.exit(0);

  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
};

seed();
