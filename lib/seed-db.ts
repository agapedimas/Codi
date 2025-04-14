// scripts/seed-db.ts
import dotenv from "dotenv";
dotenv.config();

import { db } from "@/lib/db";

const seed = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Clear existing data
    await db.query("SET FOREIGN_KEY_CHECKS = 0;");
    await db.query("TRUNCATE TABLE Accounts_Course;");
    await db.query("TRUNCATE TABLE Module;");
    await db.query("TRUNCATE TABLE Type_Module;");
    await db.query("TRUNCATE TABLE Course;");
    // await db.query("TRUNCATE TABLE accounts;");
    await db.query("SET FOREIGN_KEY_CHECKS = 1;");
    
    console.log("✅ Cleared existing data");

    // Insert Type_Module
    await db.query(`
      INSERT INTO Type_Module (nama) VALUES 
      ('Materi'),
      ('Coding'),
      ('Quiz');
    `);
    console.log("✅ Inserted Type_Module data");

    // Insert Course
    await db.query(`
      INSERT INTO Course (id, title, description, instructorName, instructorAvatar) VALUES 
      (1, 'Pemrograman Java', 'Kursus ini dirancang khusus untuk membantu individu dengan disabilitas tangan belajar pemrograman java. Kami menggunakan pendekatan dan alat yang aksesibel untuk memastikan setiap peserta dapat mengikuti materi dengan nyaman.', 'Budi Santoso', '/api/placeholder/64/64'),
      (2, 'Pemrograman Mobile untuk Disabilitas', 'Pelajari cara mengembangkan aplikasi mobile yang aksesibel dan inklusif. Kursus ini fokus pada teknik pemrograman yang dapat digunakan oleh individu dengan keterbatasan motorik.', 'Siti Rahayu', '/api/placeholder/64/64'),
      (3, 'Dasar-dasar Python', 'Belajar bahasa pemrograman Python yang mudah dipelajari dan digunakan. Kursus ini mengajarkan konsep dasar hingga menengah dengan pendekatan yang aksesibel.', 'Ahmad Hidayat', '/api/placeholder/64/64');
    `);
    console.log("✅ Inserted Course data");

    // Insert Module
    await db.query(`
      INSERT INTO Module (id, title, description, id_type_module, id_course, totalLessons, completedLessons, duration, image) VALUES 
      -- Modules for Web Programming Course
      (1, 'Java 101', 'Belajar struktur dasar dokumen web dan elemen HTML', 1, 1, 5, 0, '2 jam', '/api/placeholder/120/80'),
      (2, 'Quiz Java', 'Memahami cara memberikan style pada halaman web', 3, 1, 8, 0, '3 jam', '/api/placeholder/120/80'),

      -- Modules for Mobile Programming Course
      (4, 'Pengenalan Mobile Development', 'Memahami prinsip dasar pengembangan aplikasi mobile', 1, 2, 4, 0, '1.5 jam', '/api/placeholder/120/80'),
      (5, 'UI Mobile yang Aksesibel', 'Belajar merancang antarmuka yang aksesibel untuk semua pengguna', 1, 2, 6, 0, '2 jam', '/api/placeholder/120/80'),
      (6, 'Pengembangan Aplikasi Sederhana', 'Membuat aplikasi mobile sederhana dengan fokus aksesibilitas', 2, 2, 5, 0, '3 jam', '/api/placeholder/120/80'),

      -- Modules for Python Course
      (7, 'Pengenalan Python', 'Mengenal bahasa Python dan lingkungan pengembangan', 1, 3, 3, 0, '1 jam', '/api/placeholder/120/80'),
      (8, 'Struktur Data Python', 'Mempelajari list, tuple, dictionary, dan set', 1, 3, 5, 0, '2 jam', '/api/placeholder/120/80'),
      (9, 'Fungsi dan OOP Python', 'Belajar membuat fungsi dan kelas dalam Python', 1, 3, 7, 0, '3 jam', '/api/placeholder/120/80');
    `);
    console.log("✅ Inserted Module data");

    console.log("✅ Database seeding completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
};

seed();
