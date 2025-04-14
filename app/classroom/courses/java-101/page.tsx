// app/classroom/courses/java/intro/page.tsx

import React from 'react';

export default function Java101Page() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-white">
      <h1 className="text-4xl font-bold mb-6">Java 101: Dasar Pemrograman Java</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Apa itu Java?</h2>
        <p className="text-gray-300">
          Java adalah bahasa pemrograman yang bersifat <strong>object-oriented</strong>, kuat, dan aman. Java sering digunakan untuk membuat aplikasi desktop, web, mobile, dan bahkan aplikasi enterprise.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Ciri Khas Java</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>Berorientasi Objek (OOP)</li>
          <li>Platform Independent (Write Once, Run Anywhere)</li>
          <li>Memiliki garbage collector (otomatis membersihkan memori)</li>
          <li>Digunakan dalam berbagai jenis aplikasi (mobile, web, desktop)</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Struktur Dasar Program Java</h2>
        <pre className="bg-gray-900 text-sm rounded p-4 overflow-auto">
{`public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`}
        </pre>
        <p className="text-gray-300 mt-2">Penjelasan:</p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code>public class HelloWorld</code>: Mendefinisikan sebuah class bernama HelloWorld.</li>
          <li><code>public static void main(String[] args)</code>: Titik awal eksekusi program Java.</li>
          <li><code>System.out.println()</code>: Menampilkan output ke layar.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Tipe Data di Java</h2>
        <div className="text-gray-300 space-y-1">
          <p><strong>Primitif:</strong> int, float, double, char, boolean, dll.</p>
          <p><strong>Referensi:</strong> String, Array, Object, dll.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Kontrol Alur</h2>
        <p className="text-gray-300 mb-2">Java memiliki struktur kontrol seperti:</p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code>if</code>, <code>else</code>, <code>switch</code></li>
          <li><code>for</code>, <code>while</code>, <code>do-while</code></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Kesimpulan</h2>
        <p className="text-gray-300">
          Java adalah bahasa yang sangat populer dan banyak digunakan di dunia nyata. Penguasaan dasar Java membuka banyak peluang untuk memahami teknologi backend, mobile Android, dan sistem skala besar.
        </p>
      </section>
    </main>
  );
}
