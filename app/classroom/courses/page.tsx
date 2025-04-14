// src/app/classroom/courses/page.tsx
'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Course {
  id: number;
  title: string;
  description: string;
  instructorName: string;
  instructorAvatar: string;
  moduleCount?: number;
}

// Generate course card image placeholder
const getCourseImagePlaceholder = (id: number): string => {
  // Generate a random color based on the id
  const colors = ['3B82F6', '10B981', 'F59E0B', 'EF4444', '8B5CF6', '06B6D4', 'EC4899'];
  const color = colors[id % colors.length];
  
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23${color}'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dominant-baseline='middle'%3ECourse ${id}%3C/text%3E%3C/svg%3E`;
};

// Avatar placeholder
const getAvatarPlaceholder = (name: string = 'User'): string => {
  const initials = name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect width='100%25' height='100%25' fill='%233B82F6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dominant-baseline='middle'%3E${initials}%3C/text%3E%3C/svg%3E`;
};

// Tambahkan di bagian atas component
const userId = 66;

const checkEnrollment = async (courseId: number): Promise<boolean> => {
  const res = await fetch(`/api/accounts-course?userId=${userId}&courseId=${courseId}`);
  if (!res.ok) return false;
  const data = await res.json();
  return data.enrolled; // asumsi API mengembalikan { enrolled: true/false }
};

const enrollInCourse = async (courseId: number) => {
  try {
    const res = await fetch('/api/accounts-course', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, courseId }),
    });

    if (!res.ok) throw new Error('Failed to enroll in course');

    alert('Berhasil mendaftar ke course!');
    window.location.reload(); // reload untuk update
  } catch (err) {
    alert('Gagal mendaftar course.');
  }
};


export default function CourseListingPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState<{ [courseId: number]: boolean }>({});

useEffect(() => {
  const fetchEnrollmentStatus = async () => {
    const statusMap: { [courseId: number]: boolean } = {};
    for (const course of courses) {
      const enrolled = await checkEnrollment(course.id);
      statusMap[course.id] = enrolled;
    }
    setEnrollmentStatus(statusMap);
  };

  if (courses.length > 0) {
    fetchEnrollmentStatus();
  }
}, [courses]);


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/courses');
        
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError('Error loading courses. Please try again later.');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-gray-700 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Memuat daftar kursus...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-6xl mx-auto text-center">
        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-lg transition"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Kursus Tersedia</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link href={`/classroom/courses/${course.id}`} key={course.id}>
            <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition h-full flex flex-col">
              <div className="h-40 bg-blue-600">
                <img 
                  src={getCourseImagePlaceholder(course.id)}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-5 flex-grow">
                <h3 className="text-sm font-bold text-white mb-2">{course.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{course.description}</p>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-3 bg-blue-600 flex items-center justify-center">
                    {course.instructorAvatar ? (
                      <img 
                        src={course.instructorAvatar || getAvatarPlaceholder(course.instructorName)}
                        alt={course.instructorName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-xs font-bold">
                        {course.instructorName ? course.instructorName.charAt(0).toUpperCase() : "I"}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-300">{course.instructorName}</span>
                </div>
              </div>
              
              <div className="bg-gray-900 px-5 py-3 flex justify-between items-center">
                <span className="text-gray-400 text-sm">
                  {course.moduleCount || '0'} modul
                </span>
                <span className="text-blue-400 text-sm font-medium">
                  Lihat Detail
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Tidak ada kursus tersedia saat ini.</p>
        </div>
      )}
    </div>
  );
}