# Kelas (*Classes*)

## OOP

OOP adalah singkatan dari *Object-Oriented Programming* atau *Pemrograman Berorientasi Objek*. Pemrograman prosedural berfokus pada penulisan prosedur atau metode yang menjalankan operasi terhadap data, sedangkan pemrograman berorientasi objek berfokus pada penciptaan objek yang memuat data sekaligus metode.

Pemrograman berorientasi objek memiliki beberapa keunggulan dibandingkan dengan pemrograman prosedural:
- OOP lebih cepat dan lebih mudah dijalankan
- OOP memberikan struktur yang jelas bagi program
- OOP membantu menjaga kode Java tetap DRY (*Don't Repeat Yourself*), dan membuat kode lebih mudah untuk dipelihara, dimodifikasi, dan *debug*
- OOP memungkinkan pembuatan aplikasi yang sepenuhnya dapat digunakan kembali, dengan lebih sedikit kode dan waktu pengembangan yang lebih singkat

**Tip**: Prinsip *Don't Repeat Yourself* (DRY) bertujuan untuk mengurangi pengulangan kode. Anda sebaiknya mengekstrak bagian-bagian kode yang bersifat umum, menempatkannya di satu lokasi, dan menggunakannya kembali daripada menuliskannya berulang kali.

## Apa Itu Kelas dan Objek?

Kelas dan objek adalah dua aspek utama dalam pemrograman berorientasi objek. Perhatikan ilustrasi berikut untuk memahami perbedaan antara kelas dan objek:

Jadi, kelas adalah *template* (cetakan) untuk objek, dan objek adalah instansi dari kelas tersebut. Ketika objek dibuat, mereka mewarisi semua variabel dan metode dari kelas tersebut. Anda akan mempelajari lebih banyak lagi tentang kelas dan objek pada bab selanjutnya.

## Membuat Sebuah Kelas

Untuk membuat sebuah kelas, gunakan kata kunci `class`:

```java filename=Main.java
// Membuat kelas bernama "Main" dengan sebuah variabel x:
public class Main {
    int x = 5;
}
```

Ingat kembali dari bab *Sintaks Java* bahwa sebuah kelas sebaiknya dimulai dengan huruf kapital, dan nama berkas `.java` harus sesuai dengan nama kelasnya.

## Membuat Sebuah Objek

Dalam Java, objek dibuat dari kelas. Kita sudah membuat kelas bernama `Main`, jadi sekarang kita bisa menggunakannya untuk membuat objek. Untuk membuat objek dari `Main`, tentukan nama kelasnya, diikuti dengan nama objek, dan gunakan kata kunci `new`:

```java filename=Main.java
// Membuat objek bernama "myObj" dan mencetak nilai x:
public class Main {
    int x = 5;

    public static void main(String[] args) {
        Main myObj = new Main();
        System.out.println(myObj.x);
    }
}
```

Anda juga dapat membuat beberapa objek dari satu kelas:

```java filename=Main.java
// Membuat dua objek dari kelas Main:
public class Main {
    int x = 5;

    public static void main(String[] args) {
        Main myObj1 = new Main();  // Objek 1
        Main myObj2 = new Main();  // Objek 2
        System.out.println(myObj1.x);
        System.out.println(myObj2.x);
    }
}
```