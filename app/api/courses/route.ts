// src/app/api/courses/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Get all courses with module count
    const [coursesWithModuleCounts] = await db.query(`
      SELECT *
      FROM Course c
    `);

    console.log(coursesWithModuleCounts);
    return NextResponse.json(coursesWithModuleCounts);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}