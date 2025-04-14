'use client'

import { useState, useEffect } from 'react';
// import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

interface Module {
  id: number;
  title: string;
  description: string;
  id_type_post: number;
  type_name?: string;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  image: string;
}

interface CourseDetails {
  id: number;
  nama: string;
  description: string;
  instructorName: string;
  instructorAvatar: string;
  modules: Module[];
}

// Placeholder image generator function
const getPlaceholderImage = (seed: number = 1, width: number = 400, height: number = 300): string => {
  // Generate a random color based on the seed
  const colors = ['264653', '2a9d8f', 'e9c46a', 'f4a261', 'e76f51', '023047', 'ffb703'];
  const color = colors[seed % colors.length];
  
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Crect width='100%25' height='100%25' fill='%23${color}'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dominant-baseline='middle'%3EModule ${seed}%3C/text%3E%3C/svg%3E`;
};

// Avatar placeholder
const getAvatarPlaceholder = (name: string = 'User'): string => {
  const initials = name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect width='100%25' height='100%25' fill='%233B82F6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dominant-baseline='middle'%3E${initials}%3C/text%3E%3C/svg%3E`;
};

export default function CoursePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'resources'>('overview');
  const [progress, setProgress] = useState<number>(0);
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(true);
  const [registering, setRegistering] = useState<boolean>(false);
  
  const params = useParams();
  const router = useRouter();
  const courseId = params.id;
  const userId = 66; // Hardcoded user ID as requested

  // Fetch course data
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/courses/${courseId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }
        
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError('Error loading course data. Please try again later.');
        console.error('Error fetching course:', err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  // Check if user is registered for this course
  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}/check-registration?userId=${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to check registration status');
        }
        
        const data = await response.json();
        setIsRegistered(data.isRegistered);
      } catch (err) {
        console.error('Error checking registration:', err);
        // Default to true to avoid showing register button if there's an error
        setIsRegistered(true);
      }
    };

    if (courseId) {
      checkRegistration();
    }
  }, [courseId, userId]);

  // Calculate overall progress
  useEffect(() => {
    if (course && course.modules.length > 0) {
      const totalLessons = course.modules.reduce((sum, module) => sum + module.totalLessons, 0);
      const completedLessons = course.modules.reduce((sum, module) => sum + module.completedLessons, 0);
      
      // Avoid division by zero
      if (totalLessons > 0) {
        setProgress(Math.round((completedLessons / totalLessons) * 100));
      } else {
        setProgress(0);
      }
    }
  }, [course]);

  // Handle course registration
  const handleRegisterCourse = async () => {
    try {
      setRegistering(true);
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          courseId: courseId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register for course');
      }

      setIsRegistered(true);
      // You could also show a success notification here
    } catch (err) {
      console.error('Error registering for course:', err);
      // You could show an error notification here
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-gray-700 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Memuat data kursus...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="p-6 max-w-6xl mx-auto text-center">
        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
          <p className="text-gray-300 mb-6">{error || 'Kursus tidak ditemukan'}</p>
          <button 
            onClick={() => router.push('/classroom')}
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-lg transition"
          >
            Kembali ke Daftar Kursus
          </button>
        </div>
      </div>
    );
  }

  // Generate avatar placeholder based on instructor name
  const instructorAvatar = course.instructorAvatar || getAvatarPlaceholder(course.instructorName);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{course.nama}</h1>
        <p className="text-gray-400 mb-6">{course.description}</p>
        
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-blue-600 flex items-center justify-center">
            {course.instructorAvatar ? (
              <img 
                src={instructorAvatar}
                alt={course.instructorName || "Instructor"}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-white text-lg font-bold">
                {course.instructorName ? course.instructorName.charAt(0).toUpperCase() : "I"}
              </span>
            )}
          </div>
          <div>
            <p className="text-gray-400">Instruktur</p>
            <h3 className="text-white font-medium">{course.instructorName || "Tidak tersedia"}</h3>
          </div>
          
          <div className="ml-auto">
            <div className="flex items-center">
              <div className="w-64 bg-gray-700 rounded-full h-4 mr-4">
                <div 
                  className="bg-blue-500 h-4 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-white font-medium">{progress}%</span>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-700 flex mb-6">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 font-medium ${activeTab === 'overview' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
          >
            Ringkasan
          </button>
          <button 
            onClick={() => setActiveTab('modules')}
            className={`py-3 px-4 font-medium ${activeTab === 'modules' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
          >
            Modul
          </button>
          <button 
            onClick={() => setActiveTab('resources')}
            className={`py-3 px-4 font-medium ${activeTab === 'resources' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
          >
            Sumber Belajar
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Tentang Kursus Ini</h2>
          <p className="text-gray-300 mb-6">
            {course.description || 'Tidak ada deskripsi tersedia untuk kursus ini.'}
          </p>
          
          <h3 className="text-xl font-bold text-white mb-3">Yang Akan Anda Pelajari</h3>
          <br />
          <ul className="flex flex-col gap-2">
            {course.modules.map((module, index) => (
              <li key={index} className="text-sm flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-gray-300">{module.title}</span>
              </li>
            ))}
          </ul>
          
          <br />
          <h3 className="text-xl font-bold text-white mb-3">Prasyarat</h3>
          <ul className="list-disc list-inside text-gray-300 mb-6 pl-4">
            <li>Tidak diperlukan pengalaman pemrograman sebelumnya</li>
            <li>Komputer dengan akses internet</li>
            <li>Dasar penggunaan komputer</li>
          </ul>
        </div>
      )}
      
      {activeTab === 'modules' && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Modul Pembelajaran</h2>
          
          <div className="space-y-6">
            {course.modules.map((module) => (
              <div key={module.id} className="bg-gray-800 rounded-lg p-4 transition hover:bg-gray-700">
                <div className="flex">
                  <div className="w-24 h-16 rounded overflow-hidden mr-4 bg-blue-600 relative">
                    <img 
                      src={module.image || getPlaceholderImage(module.id)}
                      alt={module.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-white">{module.title}</h3>
                      <div className="flex items-center">
                        <span className="text-gray-400 text-sm mr-2">{module.duration || 'N/A'}</span>
                        {module.type_name && (
                          <span className="bg-blue-900 text-blue-300 text-xs px-2 py-1 rounded">
                            {module.type_name}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-400 mb-3 text-sm">{module.description || 'Tidak ada deskripsi'}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-700 rounded-full h-2 mr-3">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ 
                              width: `${module.totalLessons > 0 ? 
                                (module.completedLessons / module.totalLessons) * 100 : 0}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-gray-400 text-sm">
                          {module.completedLessons}/{module.totalLessons} pelajaran
                        </span>
                      </div>
                      
                      <Link href={`/classroom/courses/${courseId}/module/${module.id}`}>
                        <span className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                          {module.completedLessons === 0 ? 'Mulai' : 
                           module.completedLessons === module.totalLessons ? 'Ulangi' : 'Lanjutkan'}
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'resources' && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Sumber Belajar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-5 hover:bg-gray-700 transition">
              <h3 className="text-xl font-medium text-white mb-2">Panduan Aksesibilitas</h3>
              <p className="text-gray-400 mb-4">
                Panduan penggunaan teknologi bantu untuk pemrograman bagi disabilitas tangan.
              </p>
              <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">Unduh PDF</a>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-5 hover:bg-gray-700 transition">
              <h3 className="text-xl font-medium text-white mb-2">Kode Sumber Contoh</h3>
              <p className="text-gray-400 mb-4">
                Kumpulan contoh proyek dan kode untuk semua modul dalam kursus.
              </p>
              <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">Akses Repository</a>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-5 hover:bg-gray-700 transition">
              <h3 className="text-xl font-medium text-white mb-2">Forum Diskusi</h3>
              <p className="text-gray-400 mb-4">
                Gabung dengan komunitas untuk berdiskusi dan saling membantu.
              </p>
              <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">Kunjungi Forum</a>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-5 hover:bg-gray-700 transition">
              <h3 className="text-xl font-medium text-white mb-2">Video Tutorial</h3>
              <p className="text-gray-400 mb-4">
                Video pembelajaran tambahan dengan penjelasan visual dan subtitle.
              </p>
              <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">Tonton Video</a>
            </div>
          </div>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="mt-8 flex justify-between">
        <button 
          onClick={() => router.push('/classroom')}
          className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-6 rounded-lg transition"
        >
          Kembali ke Daftar Kursus
        </button>
        
        {!isRegistered ? (
          <button 
            onClick={handleRegisterCourse}
            disabled={registering}
            className={`bg-green-600 hover:bg-green-500 text-white py-2 px-6 rounded-lg transition ${registering ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {registering ? 'Mendaftarkan...' : 'Daftar Kursus'}
          </button>
        ) : (
          <button 
            onClick={() => {
              if (course.modules.length > 0) {
                const nextModule = course.modules.find(m => m.completedLessons < m.totalLessons) || course.modules[0];
                router.push(`/classroom/courses/${courseId}/module/${nextModule.id}`);
              }
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-lg transition"
          >
            {progress === 0 ? 'Mulai Kursus' : 'Lanjutkan Belajar'}
          </button>
        )}
      </div>
    </div>
  );
}