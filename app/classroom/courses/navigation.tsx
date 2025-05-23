"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Course = {
  id: number;
  nama: string;
  modules: {
    id: number;
    nama: string;
    slug: string;
  }[];
};

export default function Menu_Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/my-courses"); // <-- endpoint untuk ambil data dari Accounts_Course
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="separator">Kursus Saya</div>
      {courses.length === 0 ? (
        <div className="text-sm text-gray-500 px-2">
          Anda belum mengambil Kursus
        </div>
      ) : (
        courses.map((course) => (
          <div key={course.id}>
            <a
              className="dropdown expanded"
              ad-goto={`/classroom/courses/${course.id}`}
              suppressHydrationWarning
            >
              <span>{course.nama}</span>
            </a>
            {course.modules.map((modul) => {
              let path = `/classroom/courses/${course.id}/${modul.id}`;
              if (course.id === 1 && modul.id === 2) {
                path = "/classroom/courses/java/quiz";
              } else if (course.id === 1 && modul.id === 1) {
                path = "/classroom/courses/java-101";
              }

              return (
                <a
                  key={modul.id}
                  className="innerdropdown"
                  ad-goto={path}
                  suppressHydrationWarning
                >
                  <span>{modul.nama}</span>
                </a>
              );
            })}
          </div>
        ))
      )}
    </>
  );
}
