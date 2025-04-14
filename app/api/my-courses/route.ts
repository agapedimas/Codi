// app/api/my-courses/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    // Hardcoded userId as requested
    const userId = 66;
    
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const [rows] = await db.query(
      `SELECT c.id, c.title as nama,
              JSON_ARRAYAGG(
                JSON_OBJECT('id', m.id, 'nama', m.title, 'slug', LOWER(REPLACE(m.title, ' ', '-')))
              ) as modules
       FROM Accounts_Course ac
       JOIN Course c ON c.id = ac.id_course
       LEFT JOIN Module m ON m.id_course = c.id
       WHERE ac.id_user = ?
       GROUP BY c.id;`,
      [userId]
    );

    console.log("Query executed successfully");
    const result = Array.isArray(rows)
      ? rows.map((row: any) => ({
          id: row.id,
          nama: row.nama,
          modules: row.modules || []
        }))
      : [];

    // Debug log to see what we're getting
    console.log("First row modules type:", typeof rows[0]?.modules);

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}