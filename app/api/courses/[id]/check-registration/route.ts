import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId parameter is required' },
        { status: 400 }
      );
    }

    const courseId = req.nextUrl.pathname.split('/')[4]; // or use regex if more robust extraction is needed

    // Check if user is registered for this course
    const [rows] = await db.query(
      `SELECT * FROM Accounts_Course 
       WHERE id_user = ? AND id_course = ?`,
      [userId, courseId]
    );

    const isRegistered = (rows as any[]).length > 0;

    return NextResponse.json({ isRegistered });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
