import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    // Extract courseId from URL path
    const segments = req.nextUrl.pathname.split('/');
    const courseId = segments[segments.length - 1]; // should be the dynamic [id]

    // Get course details
    const [courseRows] = await db.query(
      `SELECT id, title, description, instructorName, instructorAvatar
       FROM Course
       WHERE id = ?`,
      [courseId]
    );

    if (!courseRows || (courseRows as any[]).length === 0) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    const course = (courseRows as any[])[0];

    // Get modules for this course with type information
    const [moduleRows] = await db.query(
      `SELECT m.id, m.title, m.description, m.totalLessons, m.completedLessons, 
              m.duration, m.image, m.id_type_module, t.nama as type_name
       FROM Module m
       LEFT JOIN Type_Module t ON m.id_type_module = t.id
       WHERE m.id_course = ?
       ORDER BY m.id`,
      [courseId]
    );

    // Add modules to course
    course.modules = moduleRows || [];

    return NextResponse.json(course);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, courseId } = body;

  await db.query(
    "INSERT INTO Accounts_Course (id_user, id_course) VALUES (?, ?)",
    [userId, courseId]
  );

  return NextResponse.json({ success: true });
}
